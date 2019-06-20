---
sidebar: auto
---

# Redis命令
在本文，我们将阅读Redis源码以了解Redis如何执行来自客户端命令的。

在Redis的启动过程中，会监听Redis服务器配置文件指定的地址和端口，并且初始化一组TCP socket文件描述符，这些监听描述符保存在全局变量`server`的`ipfd`成员中（该成员是一个16个元素的数组），其数量由`server.ipfd_count`记录。来自unix域socket连接描述符记录在`server.sofd`，我们暂时只讨论TCP连接。

## 监听端口
```c
/* Open the TCP listening socket for the user commands. */
if (server.port != 0 &&
    listenToPort(server.port,server.ipfd,&server.ipfd_count) == C_ERR)
    exit(1);
```

## 连接应答处理器
在初始化监听描述符之后，Redis为这些描述符的可读事件绑定了[连接应答处理器](./event_driven_library.html#_1-reactor)。

```c
/* Create an event handler for accepting new connections in TCP and Unix
     * domain sockets. */
for (j = 0; j < server.ipfd_count; j++) {
    if (aeCreateFileEvent(server.el, server.ipfd[j], AE_READABLE, acceptTcpHandler,NULL) == AE_ERR) {
        serverPanic("Unrecoverable error creating server.ipfd file event.");
    }
}
```
当一个或者多个客户端和服务器之间TCP连接建立后，会触发相应监听描述符的可读事件的发生，Redis服务器的事件驱动模型会很快执行描述符绑定的处理器`acceptTcpHandler`。

```c
void acceptTcpHandler(aeEventLoop *el, int fd, void *privdata, int mask) {
    int cport, cfd, max = MAX_ACCEPTS_PER_CALL;
    char cip[NET_IP_STR_LEN];
    UNUSED(el);
    UNUSED(mask);
    UNUSED(privdata);

    while(max--) {
        cfd = anetTcpAccept(server.neterr, fd, cip, sizeof(cip), &cport);
        if (cfd == ANET_ERR) {
            if (errno != EWOULDBLOCK)
                serverLog(LL_WARNING,
                    "Accepting client connection: %s", server.neterr);
            return;
        }
        serverLog(LL_VERBOSE,"Accepted %s:%d", cip, cport);
        acceptCommonHandler(cfd,0,cip);
    }
}
```
连接应答处理器(`acceptTcpHandler`)调用套接字函数`accept`获取到相应的连接描述符，然后执行接受处理器(`acceptCommonHandler`)为该连接套接字初始化一个`client`对象，并且为这个已连接套接字绑定了可读事件的处理器(`readQueryFromClient`)，最后这个`client`对象连接到`server.clients`链表的尾部。

## 解析缓冲区命令
```c{11}
acceptTcpHandler
    anetTcpAccept
        anetGenericAccept
            accept
    acceptCommonHandler
        createClient
            client *c = zmalloc(sizeof(client));
            anetNonBlock
            anetEnableTcpNoDelay
            anetKeepAlive
            aeCreateFileEvent(server.el,fd,AE_READABLE,readQueryFromClient, c)
            selectDb
            atomicGetIncr(server.next_client_id,client_id,1);
            linkClient
                listAddNodeTail
```
到这里，我们找到了Redis服务器读取客户端命令的关键函数`readQueryFromClient()`。该函数从发生可读事件的已连接描述符中读取最大`PROTO_IOBUF_LEN`长度的数据并追加到在`c->querybuf`缓冲区后面，随后调用`processInputBufferAndReplicate()`函数处理缓冲区。
```c
/* This is a wrapper for processInputBuffer that also cares about handling
 * the replication forwarding to the sub-slaves, in case the client 'c'
 * is flagged as master. Usually you want to call this instead of the
 * raw processInputBuffer(). */
void processInputBufferAndReplicate(client *c) {
    if (!(c->flags & CLIENT_MASTER)) {
        processInputBuffer(c);
    } else {
        size_t prev_offset = c->reploff;
        processInputBuffer(c);
        size_t applied = c->reploff - prev_offset;
        if (applied) {
            replicationFeedSlavesFromMasterStream(server.slaves,
                    c->pending_querybuf, applied);
            sdsrange(c->pending_querybuf,applied,-1);
        }
    }
}
```
`processInputBufferAndReplicate()`函数会**处理客户端向服务器发送命令**和**主节点向从节点发送命令**这两种情况，不过最后都会调用`processInputBuffer()`函数。

```c
/* Determine request type when unknown. */
if (!c->reqtype) {
    if (c->querybuf[c->qb_pos] == '*') {
        c->reqtype = PROTO_REQ_MULTIBULK;
    } else {
        c->reqtype = PROTO_REQ_INLINE;
    }
}

if (c->reqtype == PROTO_REQ_INLINE) {
    if (processInlineBuffer(c) != C_OK) break;
} else if (c->reqtype == PROTO_REQ_MULTIBULK) {
    if (processMultibulkBuffer(c) != C_OK) break;
} else {
    serverPanic("Unknown request type");
}
```

如果客户端发来的数据的第一个字符是`*`（或者下一次解析的第一个字符是`*`）时，那么数据将被当做`multibulk`处理，否则将被当做`inline`处理。`Inline`的具体解析函数是`processInlineBuffer()`，`multibulk`的具体解析函数是`processMultibulkBuffer()`。 当客户端传送的数据已经解析出命令字段和参数字段，字段数组保存在`client->argv`（各个字段已经被转换成Redis字符串对象`createObject(OBJ_STRING,argv[j])`），字段个数保存在`client->argc`。接下来进行命令处理，函数是`processCommand()`。

## 处理命令
`processCommand()`函数体很长，我们来一步步分解。
### `quit`特殊处理
```c
/* The QUIT command is handled separately. Normal command procs will
 * go through checking for replication and QUIT will cause trouble
 * when FORCE_REPLICATION is enabled and would be implemented in
 * a regular command proc. */
if (!strcasecmp(c->argv[0]->ptr,"quit")) {
    addReply(c,shared.ok);
    c->flags |= CLIENT_CLOSE_AFTER_REPLY;
    return C_ERR;
}
```
`quit`命令比较特殊，一般的命令会走完复制过程，但是当启用了`FORCE_REPLICATION`时，`quit`命令会引起问题。

### 查询命令表
`lookupCommand()`函数从字典`server.commands`中查找和第一个参数`c->argv[0]->ptr`一致的命令。

```c{3}
/* Now lookup the command and check ASAP about trivial error conditions
* such as wrong arity, bad command name and so forth. */
c->cmd = c->lastcmd = lookupCommand(c->argv[0]->ptr);
if (!c->cmd) {
    flagTransaction(c);
    sds args = sdsempty();
    int i;
    for (i=1; i < c->argc && sdslen(args) < 128; i++)
        args = sdscatprintf(args, "`%.*s`, ", 128-(int)sdslen(args), (char*)c->argv[i]->ptr);
    addReplyErrorFormat(c,"unknown command `%s`, with args beginning with: %s",
    (char*)c->argv[0]->ptr, args);
    sdsfree(args);
    return C_OK;
} else if ((c->cmd->arity > 0 && c->cmd->arity != c->argc) ||
        (c->argc < -c->cmd->arity)) {
    flagTransaction(c);
    addReplyErrorFormat(c,"wrong number of arguments for '%s' command",
    c->cmd->name);
    return C_OK;
}
```
那命令表是什么呢？在Redis服务器初始化配置函数`initServerConfig()`中初始化了全局变量`server`中与命令相关的成员。

```c
/* Command table -- we initiialize it here as it is part of the
 * initial configuration, since command names may be changed via
 * Redis.conf using the rename-command directive. */
server.commands = dictCreate(&commandTableDictType,NULL);
server.orig_commands = dictCreate(&commandTableDictType,NULL);
populateCommandTable();
server.delCommand = lookupCommandByCString("del");
server.multiCommand = lookupCommandByCString("multi");
server.lpushCommand = lookupCommandByCString("lpush");
server.lpopCommand = lookupCommandByCString("lpop");
server.rpopCommand = lookupCommandByCString("rpop");
server.zpopminCommand = lookupCommandByCString("zpopmin");
server.zpopmaxCommand = lookupCommandByCString("zpopmax");
server.sremCommand = lookupCommandByCString("srem");
server.execCommand = lookupCommandByCString("exec");
server.expireCommand = lookupCommandByCString("expire");
server.pexpireCommand = lookupCommandByCString("pexpire");
server.xclaimCommand = lookupCommandByCString("xclaim");
server.xgroupCommand = lookupCommandByCString("xgroup");
```
其中`populateCommandTable()`函数将写死的命令列表经过一些处理后保存到`server.commands`和`server.orig_commands`中。下面我们列出部分命令列表中的命令来看：数组的每个元素都是`redisCommand`类型的结构体，其成员分别表示`命令名`，`命令函数`，`参数个数`(-N表示 >=N)，`sflag`(字符串表示的命令标志)，`flag`(位掩码表示的命令标志),`获取key的函数`，`第一个key的索引`，`最后一个key的索引`，`key和key之间的步长`,`微秒数`(由Redis计算得到)，`调用次数`。

在下面的代码中我们可以看到字符串表示的命令标志如`rF`，`wm`, `wRF`等等分别是什么意思呢？

- w 写命令
- r 读命令
- m 每次调用都会增加内存使用，不允许超出内存
- F 快速命令，时间复杂度为O(1),或者O(log(N))
- 等等

```c
/* Our command table.
 *
 * Every entry is composed of the following fields:
 *
 * name: a string representing the command name.
 * function: pointer to the C function implementing the command.
 * arity: number of arguments, it is possible to use -N to say >= N
 * sflags: command flags as string. See below for a table of flags.
 * flags: flags as bitmask. Computed by Redis using the 'sflags' field.
 * get_keys_proc: an optional function to get key arguments from a command.
 *                This is only used when the following three fields are not
 *                enough to specify what arguments are keys.
 * first_key_index: first argument that is a key
 * last_key_index: last argument that is a key
 * key_step: step to get all the keys from first to last argument. For instance
 *           in MSET the step is two since arguments are key,val,key,val,...
 * microseconds: microseconds of total execution time for this command.
 * calls: total number of calls of this command.
 *
 * The flags, microseconds and calls fields are computed by Redis and should
 * always be set to zero.
 *
 * Command flags are expressed using strings where every character represents
 * a flag. Later the populateCommandTable() function will take care of
 * populating the real 'flags' field using this characters.
 *
 * This is the meaning of the flags:
 *
 * w: write command (may modify the key space).
 * r: read command  (will never modify the key space).
 * m: may increase memory usage once called. Don't allow if out of memory.
 * a: admin command, like SAVE or SHUTDOWN.
 * p: Pub/Sub related command.
 * f: force replication of this command, regardless of server.dirty.
 * s: command not allowed in scripts.
 * R: random command. Command is not deterministic, that is, the same command
 *    with the same arguments, with the same key space, may have different
 *    results. For instance SPOP and RANDOMKEY are two random commands.
 * S: Sort command output array if called from script, so that the output
 *    is deterministic.
 * l: Allow command while loading the database.
 * t: Allow command while a slave has stale data but is not allowed to
 *    server this data. Normally no command is accepted in this condition
 *    but just a few.
 * M: Do not automatically propagate the command on MONITOR.
 * k: Perform an implicit ASKING for this command, so the command will be
 *    accepted in cluster mode if the slot is marked as 'importing'.
 * F: Fast command: O(1) or O(log(N)) command that should never delay
 *    its execution as long as the kernel scheduler is giving us time.
 *    Note that commands that may trigger a DEL as a side effect (like SET)
 *    are not fast commands.
 */
struct redisCommand redisCommandTable[] = {
    {"module",moduleCommand,-2,"as",0,NULL,0,0,0,0,0},
    {"get",getCommand,2,"rF",0,NULL,1,1,1,0,0},
    {"set",setCommand,-3,"wm",0,NULL,1,1,1,0,0},
    {"setnx",setnxCommand,3,"wmF",0,NULL,1,1,1,0,0},
    {"setex",setexCommand,4,"wm",0,NULL,1,1,1,0,0},
    {"psetex",psetexCommand,4,"wm",0,NULL,1,1,1,0,0},
    {"append",appendCommand,3,"wm",0,NULL,1,1,1,0,0},
    {"strlen",strlenCommand,2,"rF",0,NULL,1,1,1,0,0},
    {"del",delCommand,-2,"w",0,NULL,1,-1,1,0,0},
    {"unlink",unlinkCommand,-2,"wF",0,NULL,1,-1,1,0,0},
    {"exists",existsCommand,-2,"rF",0,NULL,1,-1,1,0,0},
    {"setbit",setbitCommand,4,"wm",0,NULL,1,1,1,0,0},
    {"getbit",getbitCommand,3,"rF",0,NULL,1,1,1,0,0},
    {"bitfield",bitfieldCommand,-2,"wm",0,NULL,1,1,1,0,0},
    {"setrange",setrangeCommand,4,"wm",0,NULL,1,1,1,0,0},
    {"getrange",getrangeCommand,4,"r",0,NULL,1,1,1,0,0},
    {"substr",getrangeCommand,4,"r",0,NULL,1,1,1,0,0},
    {"incr",incrCommand,2,"wmF",0,NULL,1,1,1,0,0},
    {"decr",decrCommand,2,"wmF",0,NULL,1,1,1,0,0},
    {"mget",mgetCommand,-2,"rF",0,NULL,1,-1,1,0,0},
    {"rpush",rpushCommand,-3,"wmF",0,NULL,1,1,1,0,0},
    {"lpush",lpushCommand,-3,"wmF",0,NULL,1,1,1,0,0},
    {"rpushx",rpushxCommand,-3,"wmF",0,NULL,1,1,1,0,0},
    {"lpushx",lpushxCommand,-3,"wmF",0,NULL,1,1,1,0,0},
    {"linsert",linsertCommand,5,"wm",0,NULL,1,1,1,0,0},
    {"rpop",rpopCommand,2,"wF",0,NULL,1,1,1,0,0},
    {"lpop",lpopCommand,2,"wF",0,NULL,1,1,1,0,0},
    {"brpop",brpopCommand,-3,"ws",0,NULL,1,-2,1,0,0},
    {"brpoplpush",brpoplpushCommand,4,"wms",0,NULL,1,2,1,0,0},
    {"blpop",blpopCommand,-3,"ws",0,NULL,1,-2,1,0,0},
    {"llen",llenCommand,2,"rF",0,NULL,1,1,1,0,0},
    {"lindex",lindexCommand,3,"r",0,NULL,1,1,1,0,0},
    {"lset",lsetCommand,4,"wm",0,NULL,1,1,1,0,0},
    {"lrange",lrangeCommand,4,"r",0,NULL,1,1,1,0,0},
    {"ltrim",ltrimCommand,4,"w",0,NULL,1,1,1,0,0},
    {"lrem",lremCommand,4,"w",0,NULL,1,1,1,0,0},
    {"rpoplpush",rpoplpushCommand,3,"wm",0,NULL,1,2,1,0,0},
    {"sadd",saddCommand,-3,"wmF",0,NULL,1,1,1,0,0},
    {"srem",sremCommand,-3,"wF",0,NULL,1,1,1,0,0},
    {"smove",smoveCommand,4,"wF",0,NULL,1,2,1,0,0},
    {"sismember",sismemberCommand,3,"rF",0,NULL,1,1,1,0,0},
    {"scard",scardCommand,2,"rF",0,NULL,1,1,1,0,0},
    {"spop",spopCommand,-2,"wRF",0,NULL,1,1,1,0,0},
    {"srandmember",srandmemberCommand,-2,"rR",0,NULL,1,1,1,0,0},
    {"sinter",sinterCommand,-2,"rS",0,NULL,1,-1,1,0,0},
    {"sinterstore",sinterstoreCommand,-3,"wm",0,NULL,1,-1,1,0,0},
    {"sunion",sunionCommand,-2,"rS",0,NULL,1,-1,1,0,0},
    {"sunionstore",sunionstoreCommand,-3,"wm",0,NULL,1,-1,1,0,0},
    {"sdiff",sdiffCommand,-2,"rS",0,NULL,1,-1,1,0,0},
    {"sdiffstore",sdiffstoreCommand,-3,"wm",0,NULL,1,-1,1,0,0},
    {"smembers",sinterCommand,2,"rS",0,NULL,1,1,1,0,0},
    {"sscan",sscanCommand,-3,"rR",0,NULL,1,1,1,0,0},
    {"zadd",zaddCommand,-4,"wmF",0,NULL,1,1,1,0,0},
    {"zincrby",zincrbyCommand,4,"wmF",0,NULL,1,1,1,0,0},
    {"zrem",zremCommand,-3,"wF",0,NULL,1,1,1,0,0},
    {"zremrangebyscore",zremrangebyscoreCommand,4,"w",0,NULL,1,1,1,0,0},
    {"zremrangebyrank",zremrangebyrankCommand,4,"w",0,NULL,1,1,1,0,0},
    {"zremrangebylex",zremrangebylexCommand,4,"w",0,NULL,1,1,1,0,0},
    {"zunionstore",zunionstoreCommand,-4,"wm",0,zunionInterGetKeys,0,0,0,0,0},
    {"zinterstore",zinterstoreCommand,-4,"wm",0,zunionInterGetKeys,0,0,0,0,0},
    {"zrange",zrangeCommand,-4,"r",0,NULL,1,1,1,0,0},
    {"zrangebyscore",zrangebyscoreCommand,-4,"r",0,NULL,1,1,1,0,0},
    {"zrevrangebyscore",zrevrangebyscoreCommand,-4,"r",0,NULL,1,1,1,0,0},
    {"zrangebylex",zrangebylexCommand,-4,"r",0,NULL,1,1,1,0,0},
    {"zrevrangebylex",zrevrangebylexCommand,-4,"r",0,NULL,1,1,1,0,0},
    {"zcount",zcountCommand,4,"rF",0,NULL,1,1,1,0,0},
    {"zlexcount",zlexcountCommand,4,"rF",0,NULL,1,1,1,0,0},
    {"zrevrange",zrevrangeCommand,-4,"r",0,NULL,1,1,1,0,0},
    {"zcard",zcardCommand,2,"rF",0,NULL,1,1,1,0,0},
    {"zscore",zscoreCommand,3,"rF",0,NULL,1,1,1,0,0},
    {"zrank",zrankCommand,3,"rF",0,NULL,1,1,1,0,0},
    {"zrevrank",zrevrankCommand,3,"rF",0,NULL,1,1,1,0,0},
    {"zscan",zscanCommand,-3,"rR",0,NULL,1,1,1,0,0},
    {"zpopmin",zpopminCommand,-2,"wF",0,NULL,1,1,1,0,0},
    {"zpopmax",zpopmaxCommand,-2,"wF",0,NULL,1,1,1,0,0},
    {"bzpopmin",bzpopminCommand,-3,"wsF",0,NULL,1,-2,1,0,0},
    {"bzpopmax",bzpopmaxCommand,-3,"wsF",0,NULL,1,-2,1,0,0},
    {"hset",hsetCommand,-4,"wmF",0,NULL,1,1,1,0,0},
    {"hsetnx",hsetnxCommand,4,"wmF",0,NULL,1,1,1,0,0},
    {"hget",hgetCommand,3,"rF",0,NULL,1,1,1,0,0},
    {"hmset",hsetCommand,-4,"wmF",0,NULL,1,1,1,0,0},
    {"hmget",hmgetCommand,-3,"rF",0,NULL,1,1,1,0,0},
    {"hincrby",hincrbyCommand,4,"wmF",0,NULL,1,1,1,0,0},
    {"hincrbyfloat",hincrbyfloatCommand,4,"wmF",0,NULL,1,1,1,0,0},
    {"hdel",hdelCommand,-3,"wF",0,NULL,1,1,1,0,0},
    {"hlen",hlenCommand,2,"rF",0,NULL,1,1,1,0,0},
    {"hstrlen",hstrlenCommand,3,"rF",0,NULL,1,1,1,0,0},
    {"hkeys",hkeysCommand,2,"rS",0,NULL,1,1,1,0,0},
    {"hvals",hvalsCommand,2,"rS",0,NULL,1,1,1,0,0},
    {"hgetall",hgetallCommand,2,"rR",0,NULL,1,1,1,0,0},
    {"hexists",hexistsCommand,3,"rF",0,NULL,1,1,1,0,0},
    {"hscan",hscanCommand,-3,"rR",0,NULL,1,1,1,0,0},
    {"incrby",incrbyCommand,3,"wmF",0,NULL,1,1,1,0,0},
    {"decrby",decrbyCommand,3,"wmF",0,NULL,1,1,1,0,0},
    {"incrbyfloat",incrbyfloatCommand,3,"wmF",0,NULL,1,1,1,0,0},
    {"getset",getsetCommand,3,"wm",0,NULL,1,1,1,0,0},
    {"mset",msetCommand,-3,"wm",0,NULL,1,-1,2,0,0},
    {"msetnx",msetnxCommand,-3,"wm",0,NULL,1,-1,2,0,0},
    {"randomkey",randomkeyCommand,1,"rR",0,NULL,0,0,0,0,0},
    {"select",selectCommand,2,"lF",0,NULL,0,0,0,0,0},
    {"swapdb",swapdbCommand,3,"wF",0,NULL,0,0,0,0,0},
    {"move",moveCommand,3,"wF",0,NULL,1,1,1,0,0},
    {"rename",renameCommand,3,"w",0,NULL,1,2,1,0,0},
    {"renamenx",renamenxCommand,3,"wF",0,NULL,1,2,1,0,0},
    {"expire",expireCommand,3,"wF",0,NULL,1,1,1,0,0},
    {"expireat",expireatCommand,3,"wF",0,NULL,1,1,1,0,0},
    {"pexpire",pexpireCommand,3,"wF",0,NULL,1,1,1,0,0},
    {"pexpireat",pexpireatCommand,3,"wF",0,NULL,1,1,1,0,0},
    {"keys",keysCommand,2,"rS",0,NULL,0,0,0,0,0},
    {"scan",scanCommand,-2,"rR",0,NULL,0,0,0,0,0},
    {"dbsize",dbsizeCommand,1,"rF",0,NULL,0,0,0,0,0},
    {"auth",authCommand,2,"sltF",0,NULL,0,0,0,0,0},
    {"ping",pingCommand,-1,"tF",0,NULL,0,0,0,0,0},
    {"echo",echoCommand,2,"F",0,NULL,0,0,0,0,0},
    {"save",saveCommand,1,"as",0,NULL,0,0,0,0,0},
    {"bgsave",bgsaveCommand,-1,"as",0,NULL,0,0,0,0,0},
    {"bgrewriteaof",bgrewriteaofCommand,1,"as",0,NULL,0,0,0,0,0},
    {"shutdown",shutdownCommand,-1,"aslt",0,NULL,0,0,0,0,0},
    {"lastsave",lastsaveCommand,1,"RF",0,NULL,0,0,0,0,0},
    {"type",typeCommand,2,"rF",0,NULL,1,1,1,0,0},
    {"multi",multiCommand,1,"sF",0,NULL,0,0,0,0,0},
    {"exec",execCommand,1,"sM",0,NULL,0,0,0,0,0},
    {"discard",discardCommand,1,"sF",0,NULL,0,0,0,0,0},
    {"sync",syncCommand,1,"ars",0,NULL,0,0,0,0,0},
    {"psync",syncCommand,3,"ars",0,NULL,0,0,0,0,0},
    {"replconf",replconfCommand,-1,"aslt",0,NULL,0,0,0,0,0},
    {"flushdb",flushdbCommand,-1,"w",0,NULL,0,0,0,0,0},
    {"flushall",flushallCommand,-1,"w",0,NULL,0,0,0,0,0},
    {"sort",sortCommand,-2,"wm",0,sortGetKeys,1,1,1,0,0},
    {"info",infoCommand,-1,"ltR",0,NULL,0,0,0,0,0},
    {"monitor",monitorCommand,1,"as",0,NULL,0,0,0,0,0},
    {"ttl",ttlCommand,2,"rFR",0,NULL,1,1,1,0,0},
    {"touch",touchCommand,-2,"rF",0,NULL,1,1,1,0,0},
    {"pttl",pttlCommand,2,"rFR",0,NULL,1,1,1,0,0},
    {"persist",persistCommand,2,"wF",0,NULL,1,1,1,0,0},
    {"slaveof",replicaofCommand,3,"ast",0,NULL,0,0,0,0,0},
    {"replicaof",replicaofCommand,3,"ast",0,NULL,0,0,0,0,0},
    {"role",roleCommand,1,"lst",0,NULL,0,0,0,0,0},
    {"debug",debugCommand,-2,"as",0,NULL,0,0,0,0,0},
    {"config",configCommand,-2,"last",0,NULL,0,0,0,0,0},
    {"subscribe",subscribeCommand,-2,"pslt",0,NULL,0,0,0,0,0},
    {"unsubscribe",unsubscribeCommand,-1,"pslt",0,NULL,0,0,0,0,0},
    {"psubscribe",psubscribeCommand,-2,"pslt",0,NULL,0,0,0,0,0},
    {"punsubscribe",punsubscribeCommand,-1,"pslt",0,NULL,0,0,0,0,0},
    {"publish",publishCommand,3,"pltF",0,NULL,0,0,0,0,0},
    {"pubsub",pubsubCommand,-2,"pltR",0,NULL,0,0,0,0,0},
    {"watch",watchCommand,-2,"sF",0,NULL,1,-1,1,0,0},
    {"unwatch",unwatchCommand,1,"sF",0,NULL,0,0,0,0,0},
    {"cluster",clusterCommand,-2,"a",0,NULL,0,0,0,0,0},
    {"restore",restoreCommand,-4,"wm",0,NULL,1,1,1,0,0},
    {"restore-asking",restoreCommand,-4,"wmk",0,NULL,1,1,1,0,0},
    {"migrate",migrateCommand,-6,"wR",0,migrateGetKeys,0,0,0,0,0},
    {"asking",askingCommand,1,"F",0,NULL,0,0,0,0,0},
    {"readonly",readonlyCommand,1,"F",0,NULL,0,0,0,0,0},
    {"readwrite",readwriteCommand,1,"F",0,NULL,0,0,0,0,0},
    {"dump",dumpCommand,2,"rR",0,NULL,1,1,1,0,0},
    {"object",objectCommand,-2,"rR",0,NULL,2,2,1,0,0},
    {"memory",memoryCommand,-2,"rR",0,NULL,0,0,0,0,0},
    {"client",clientCommand,-2,"as",0,NULL,0,0,0,0,0},
    {"eval",evalCommand,-3,"s",0,evalGetKeys,0,0,0,0,0},
    {"evalsha",evalShaCommand,-3,"s",0,evalGetKeys,0,0,0,0,0},
    {"slowlog",slowlogCommand,-2,"aR",0,NULL,0,0,0,0,0},
    {"script",scriptCommand,-2,"s",0,NULL,0,0,0,0,0},
    {"time",timeCommand,1,"RF",0,NULL,0,0,0,0,0},
    {"bitop",bitopCommand,-4,"wm",0,NULL,2,-1,1,0,0},
    {"bitcount",bitcountCommand,-2,"r",0,NULL,1,1,1,0,0},
    {"bitpos",bitposCommand,-3,"r",0,NULL,1,1,1,0,0},
    {"wait",waitCommand,3,"s",0,NULL,0,0,0,0,0},
    {"command",commandCommand,0,"ltR",0,NULL,0,0,0,0,0},
    {"geoadd",geoaddCommand,-5,"wm",0,NULL,1,1,1,0,0},
    {"georadius",georadiusCommand,-6,"w",0,georadiusGetKeys,1,1,1,0,0},
    {"georadius_ro",georadiusroCommand,-6,"r",0,georadiusGetKeys,1,1,1,0,0},
    {"georadiusbymember",georadiusbymemberCommand,-5,"w",0,georadiusGetKeys,1,1,1,0,0},
    {"georadiusbymember_ro",georadiusbymemberroCommand,-5,"r",0,georadiusGetKeys,1,1,1,0,0},
    {"geohash",geohashCommand,-2,"r",0,NULL,1,1,1,0,0},
    {"geopos",geoposCommand,-2,"r",0,NULL,1,1,1,0,0},
    {"geodist",geodistCommand,-4,"r",0,NULL,1,1,1,0,0},
    {"pfselftest",pfselftestCommand,1,"a",0,NULL,0,0,0,0,0},
    {"pfadd",pfaddCommand,-2,"wmF",0,NULL,1,1,1,0,0},
    {"pfcount",pfcountCommand,-2,"r",0,NULL,1,-1,1,0,0},
    {"pfmerge",pfmergeCommand,-2,"wm",0,NULL,1,-1,1,0,0},
    {"pfdebug",pfdebugCommand,-3,"w",0,NULL,0,0,0,0,0},
    {"xadd",xaddCommand,-5,"wmFR",0,NULL,1,1,1,0,0},
    {"xrange",xrangeCommand,-4,"r",0,NULL,1,1,1,0,0},
    {"xrevrange",xrevrangeCommand,-4,"r",0,NULL,1,1,1,0,0},
    {"xlen",xlenCommand,2,"rF",0,NULL,1,1,1,0,0},
    {"xread",xreadCommand,-4,"rs",0,xreadGetKeys,1,1,1,0,0},
    {"xreadgroup",xreadCommand,-7,"ws",0,xreadGetKeys,1,1,1,0,0},
    {"xgroup",xgroupCommand,-2,"wm",0,NULL,2,2,1,0,0},
    {"xsetid",xsetidCommand,3,"wmF",0,NULL,1,1,1,0,0},
    {"xack",xackCommand,-4,"wF",0,NULL,1,1,1,0,0},
    {"xpending",xpendingCommand,-3,"rR",0,NULL,1,1,1,0,0},
    {"xclaim",xclaimCommand,-6,"wRF",0,NULL,1,1,1,0,0},
    {"xinfo",xinfoCommand,-2,"rR",0,NULL,2,2,1,0,0},
    {"xdel",xdelCommand,-3,"wF",0,NULL,1,1,1,0,0},
    {"xtrim",xtrimCommand,-2,"wFR",0,NULL,1,1,1,0,0},
    {"post",securityWarningCommand,-1,"lt",0,NULL,0,0,0,0,0},
    {"host:",securityWarningCommand,-1,"lt",0,NULL,0,0,0,0,0},
    {"latency",latencyCommand,-2,"aslt",0,NULL,0,0,0,0,0},
    {"lolwut",lolwutCommand,-1,"r",0,NULL,0,0,0,0,0}
};
```
函数`populateCommandTable()`初始化命令表时，会以命令名为key, `RedisCommand`结构体为值保存到`server.commands`和`server.orig_commands`中。

在查询命令表时，如果没有找到命令或者`client->argc`的参数的数目和命令表中设定的命令需要的参数数不一致时，会向客户发发送错误信息。

### 检查是否鉴权
```c
/* Check if the user is authenticated */
if (server.requirepass && !c->authenticated && c->cmd->proc != authCommand)
{
    flagTransaction(c);
    addReply(c,shared.noautherr);
    return C_OK;
}
```

### 检查是否在集群模式下执行
如果是在集群模式下执行，可能还需要在集群中重定向客户端。
```c
/* If cluster is enabled perform the cluster redirection here.
* However we don't perform the redirection if:
* 1) The sender of this command is our master.
* 2) The command has no key arguments. */
if (server.cluster_enabled && !(c->flags & CLIENT_MASTER) && !(c->flags & CLIENT_LUA && 
    server.lua_caller->flags & CLIENT_MASTER) && 
    !(c->cmd->getkeys_proc == NULL && c->cmd->firstkey == 0 &&
        c->cmd->proc != execCommand))
{
    int hashslot;
    int error_code;
    clusterNode *n = getNodeByQuery(c,c->cmd,c->argv,c->argc,
                                    &hashslot,&error_code);
    if (n == NULL || n != server.cluster->myself) {
        if (c->cmd->proc == execCommand) {
            discardTransaction(c);
        } else {
            flagTransaction(c);
        }
        clusterRedirectClient(c,n,hashslot,error_code);
        return C_OK;
    }
}
```
### 维持最大内存设置
```c
/* Handle the maxmemory directive.
 *
 * Note that we do not want to reclaim memory if we are here re-entering
 * the event loop since there is a busy Lua script running in timeout
 * condition, to avoid mixing the propagation of scripts with the
 * propagation of DELs due to eviction. */
if (server.maxmemory && !server.lua_timedout) {
    int out_of_memory = freeMemoryIfNeededAndSafe() == C_ERR;
    /* freeMemoryIfNeeded may flush slave output buffers. This may result
        * into a slave, that may be the active client, to be freed. */
    if (server.current_client == NULL) return C_ERR;

    /* It was impossible to free enough memory, and the command the client
        * is trying to execute is denied during OOM conditions or the client
        * is in MULTI/EXEC context? Error. */
    if (out_of_memory &&
        (c->cmd->flags & CMD_DENYOOM ||
            (c->flags & CLIENT_MULTI && c->cmd->proc != execCommand))) {
        flagTransaction(c);
        addReply(c, shared.oomerr);
        return C_OK;
    }
}
```

### 磁盘故障禁止写命令
```c
/* Don't accept write commands if there are problems persisting on disk
    * and if this is a master instance. */
int deny_write_type = writeCommandsDeniedByDiskError();
if (deny_write_type != DISK_ERROR_TYPE_NONE &&
    server.masterhost == NULL &&
    (c->cmd->flags & CMD_WRITE ||
        c->cmd->proc == pingCommand))
{
    flagTransaction(c);
    if (deny_write_type == DISK_ERROR_TYPE_RDB)
        addReply(c, shared.bgsaveerr);
    else
        addReplySds(c,
            sdscatprintf(sdsempty(),
            "-MISCONF Errors writing to the AOF file: %s\r\n",
            strerror(server.aof_last_write_errno)));
    return C_OK;
}
```

### 可用从库数目不够时禁写命令
```c
/* Don't accept write commands if there are not enough good slaves and
    * user configured the min-slaves-to-write option. */
if (server.masterhost == NULL &&
    server.repl_min_slaves_to_write &&
    server.repl_min_slaves_max_lag &&
    c->cmd->flags & CMD_WRITE &&
    server.repl_good_slaves_count < server.repl_min_slaves_to_write)
{
    flagTransaction(c);
    addReply(c, shared.noreplicaserr);
    return C_OK;
}
```

### 只读从库禁止非主库的写命令
```c
/* Don't accept write commands if this is a read only slave. But
    * accept write commands if this is our master. */
if (server.masterhost && server.repl_slave_ro &&
    !(c->flags & CLIENT_MASTER) &&
    c->cmd->flags & CMD_WRITE)
{
    addReply(c, shared.roslaveerr);
    return C_OK;
}
```

### 订阅与发布
```c
/* Only allow SUBSCRIBE and UNSUBSCRIBE in the context of Pub/Sub */
if (c->flags & CLIENT_PUBSUB &&
    c->cmd->proc != pingCommand &&
    c->cmd->proc != subscribeCommand &&
    c->cmd->proc != unsubscribeCommand &&
    c->cmd->proc != psubscribeCommand &&
    c->cmd->proc != punsubscribeCommand) {
    addReplyError(c,"only (P)SUBSCRIBE / (P)UNSUBSCRIBE / PING / QUIT allowed in this context");
    return C_OK;
}
```

### 主从连接断开且关闭`slave-serve-stale-data`只允许`t`命令
```c
/* Only allow commands with flag "t", such as INFO, SLAVEOF and so on,
 * when slave-serve-stale-data is no and we are a slave with a broken
 * link with master. */
if (server.masterhost && server.repl_state != REPL_STATE_CONNECTED &&
    server.repl_serve_stale_data == 0 &&
    !(c->cmd->flags & CMD_STALE))
{
    flagTransaction(c);
    addReply(c, shared.masterdownerr);
    return C_OK;
}
```

### `CMD_LOADING`标志
```c
/* Loading DB? Return an error if the command has not the
 * CMD_LOADING flag. */
if (server.loading && !(c->cmd->flags & CMD_LOADING)) {
    addReply(c, shared.loadingerr);
    return C_OK;
}
```

### 慢速lua脚本
```c
/* Lua script too slow? Only allow a limited number of commands. */
if (server.lua_timedout &&
        c->cmd->proc != authCommand &&
        c->cmd->proc != replconfCommand &&
    !(c->cmd->proc == shutdownCommand &&
        c->argc == 2 &&
        tolower(((char*)c->argv[1]->ptr)[0]) == 'n') &&
    !(c->cmd->proc == scriptCommand &&
        c->argc == 2 &&
        tolower(((char*)c->argv[1]->ptr)[0]) == 'k'))
{
    flagTransaction(c);
    addReply(c, shared.slowscripterr);
    return C_OK;
}
```

### 执行命令
```c
/* Exec the command */
if (c->flags & CLIENT_MULTI &&
    c->cmd->proc != execCommand && c->cmd->proc != discardCommand &&
    c->cmd->proc != multiCommand && c->cmd->proc != watchCommand)
{
    queueMultiCommand(c);
    addReply(c,shared.queued);
} else {
    call(c,CMD_CALL_FULL);
    c->woff = server.master_repl_offset;
    if (listLength(server.ready_keys))
        handleClientsBlockedOnKeys();
}
```
如果客户端设置了开启事务，那么就会将命令加到事务队列中`queueMultiCommand()`，函数如下：
```c
/* Add a new command into the MULTI commands queue */
void queueMultiCommand(client *c) {
    multiCmd *mc;
    int j;

    c->mstate.commands = zrealloc(c->mstate.commands,
            sizeof(multiCmd)*(c->mstate.count+1));
    mc = c->mstate.commands+c->mstate.count;
    mc->cmd = c->cmd;
    mc->argc = c->argc;
    mc->argv = zmalloc(sizeof(robj*)*c->argc);
    memcpy(mc->argv,c->argv,sizeof(robj*)*c->argc);
    for (j = 0; j < c->argc; j++)
        incrRefCount(mc->argv[j]);
    c->mstate.count++;
    c->mstate.cmd_flags |= c->cmd->flags;
}
```
该函数将命令通过`memcpy`复制命令参数对象到`c->mstate.commands`的数组（队列）尾部，然后调用`incrRefCount`增加引用次数。值得注意的是：`memcpy`支持复制了对象结构，并没有复制对象指向的数据，但是也仅仅是增加了`mc->argv[j]`的引用次数，没有增加或者释放`c->argv[j]`，这是为何呢？？？【这里mark一下】。

之后执行`call()函数`，该函数会调用`c->cmd->proc(c)`来执行命令。

## 命令的实现
下面我们再看看几个常见命令是怎么实现的。

### `get`
`get`命令的实现函数是`getCommand`。返回key所关联的字符串值。如果key不存在那么返回特殊值 `nil` 。假如key储存的值不是字符串类型，返回一个错误，因为`GET`只能用于处理字符串值。

`getCommand`函数调用的是`getGenericCommand()`并把参数客户端在服务器中的上下文结构体`client`作为参数传递给它。查找整个Redis项目，`getGenericCommand()`只被`getCommand`和`getsetCommand`调用了，它应该是用来查找字符串`GET`和`GETSET`命令的公共逻辑。
```c
int getGenericCommand(client *c) {
    robj *o;

    if ((o = lookupKeyReadOrReply(c,c->argv[1],shared.nullbulk)) == NULL)
        return C_OK;

    if (o->type != OBJ_STRING) {
        addReply(c,shared.wrongtypeerr);
        return C_ERR;
    } else {
        addReplyBulk(c,o);
        return C_OK;
    }
}

void getCommand(client *c) {
    getGenericCommand(c);
}
```
`c->argv[0]`是命令名（`get`），`c->argv[1]`是第一个参数，也就是key字符串。`lookupKeyReadOrReply()`函数是查询的核心。

```c
robj *lookupKeyReadOrReply(client *c, robj *key, robj *reply) {
    robj *o = lookupKeyRead(c->db, key);
    if (!o) addReply(c,reply);
    return o;
}
```
`lookupKeyReadOrReply()`调用`lookupKeyRead()`去查找key对应的值，如果没有查到，则向客户端发送预设好的回复（第三个参数），查到了就返回值对象。`lookupKeyRead()`继续调用`lookupKeyReadWithFlags()`并带入第三个参数`LOOKUP_NONE`标志这是一次普通的查找。

```c
/* Like lookupKeyReadWithFlags(), but does not use any flag, which is the
 * common case. */
robj *lookupKeyRead(RedisDb *db, robj *key) {
    return lookupKeyReadWithFlags(db,key,LOOKUP_NONE);
}
```

`LOOKUP_NONE`表示没有特殊的标志，而`LOOKUP_NOTOUCH`表示不更新key的最近访问时间。

```c
/* Lookup a key for read operations, or return NULL if the key is not found
 * in the specified DB.
 *
 * As a side effect of calling this function:
 * 1. A key gets expired if it reached it's TTL.
 * 2. The key last access time is updated.
 * 3. The global keys hits/misses stats are updated (reported in INFO).
 *
 * This API should not be used when we write to the key after obtaining
 * the object linked to the key, but only for read only operations.
 *
 * Flags change the behavior of this command:
 *
 *  LOOKUP_NONE (or zero): no special flags are passed.
 *  LOOKUP_NOTOUCH: don't alter the last access time of the key.
 *
 * Note: this function also returns NULL if the key is logically expired
 * but still existing, in case this is a slave, since this API is called only
 * for read operations. Even if the key expiry is master-driven, we can
 * correctly report a key is expired on slaves even if the master is lagging
 * expiring our key via DELs in the replication link. */
robj *lookupKeyReadWithFlags(redisDb *db, robj *key, int flags) {
    robj *val;

    if (expireIfNeeded(db,key) == 1) {
        /* Key expired. If we are in the context of a master, expireIfNeeded()
         * returns 0 only when the key does not exist at all, so it's safe
         * to return NULL ASAP. */
        if (server.masterhost == NULL) {
            server.stat_keyspace_misses++;
            return NULL;
        }

        /* However if we are in the context of a slave, expireIfNeeded() will
         * not really try to expire the key, it only returns information
         * about the "logical" status of the key: key expiring is up to the
         * master in order to have a consistent view of master's data set.
         *
         * However, if the command caller is not the master, and as additional
         * safety measure, the command invoked is a read-only command, we can
         * safely return NULL here, and provide a more consistent behavior
         * to clients accessign expired values in a read-only fashion, that
         * will say the key as non existing.
         *
         * Notably this covers GETs when slaves are used to scale reads. */
        if (server.current_client &&
            server.current_client != server.master &&
            server.current_client->cmd &&
            server.current_client->cmd->flags & CMD_READONLY)
        {
            server.stat_keyspace_misses++;
            return NULL;
        }
    }
    val = lookupKey(db,key,flags);
    if (val == NULL)
        server.stat_keyspace_misses++;
    else
        server.stat_keyspace_hits++;
    return val;
}
```
如果这个key过期了：对于master来说，记录一下查询miss后直接返回；对于只读的slave来说，也仅仅是记一下miss后直接返回。`expireIfNeeded`函数不会真正的删除slave中的key，当master中的key过期了，这些过期的key会从数据库中驱逐，并引发在AOF/复制流中传播`DEL/UNLINK`命令来删除过期的key。我们再看看的实现`expireIfNeeded()`。
```c
/* This function is called when we are going to perform some operation
 * in a given key, but such key may be already logically expired even if
 * it still exists in the database. The main way this function is called
 * is via lookupKey*() family of functions.
 *
 * The behavior of the function depends on the replication role of the
 * instance, because slave instances do not expire keys, they wait
 * for DELs from the master for consistency matters. However even
 * slaves will try to have a coherent return value for the function,
 * so that read commands executed in the slave side will be able to
 * behave like if the key is expired even if still present (because the
 * master has yet to propagate the DEL).
 *
 * In masters as a side effect of finding a key which is expired, such
 * key will be evicted from the database. Also this may trigger the
 * propagation of a DEL/UNLINK command in AOF / replication stream.
 *
 * The return value of the function is 0 if the key is still valid,
 * otherwise the function returns 1 if the key is expired. */
int expireIfNeeded(redisDb *db, robj *key) {
    if (!keyIsExpired(db,key)) return 0;

    /* If we are running in the context of a slave, instead of
     * evicting the expired key from the database, we return ASAP:
     * the slave key expiration is controlled by the master that will
     * send us synthesized DEL operations for expired keys.
     *
     * Still we try to return the right information to the caller,
     * that is, 0 if we think the key should be still valid, 1 if
     * we think the key is expired at this time. */
    if (server.masterhost != NULL) return 1;

    /* Delete the key */
    server.stat_expiredkeys++;
    propagateExpire(db,key,server.lazyfree_lazy_expire);
    notifyKeyspaceEvent(NOTIFY_EXPIRED,
        "expired",key,db->id);
    return server.lazyfree_lazy_expire ? dbAsyncDelete(db,key) :
                                         dbSyncDelete(db,key);
}
```
`expireIfNeeded()`首先判断key是否过期，如果过期了，对于master来说，传播这个过期命令，并且同步或者异步的方式删除过期的key。其中调用的`keyIsExpired()`函数通过比较数据库中`expires`字典中记录的key的过期时间和当前时间进行比较来判断是否过期（`dictFind(db->expires,key->ptr)`）。

回到`lookupKeyReadWithFlags()`函数，如果该key没有过期，就调用`lookupKey()`函数去数据库的`dict`字典成员查找该key对应的键值对`dictEntry`。

```c
/* Low level key lookup API, not actually called directly from commands
 * implementations that should instead rely on lookupKeyRead(),
 * lookupKeyWrite() and lookupKeyReadWithFlags(). */
robj *lookupKey(redisDb *db, robj *key, int flags) {
    dictEntry *de = dictFind(db->dict,key->ptr);
    if (de) {
        robj *val = dictGetVal(de);

        /* Update the access time for the ageing algorithm.
         * Don't do it if we have a saving child, as this will trigger
         * a copy on write madness. */
        if (server.rdb_child_pid == -1 &&
            server.aof_child_pid == -1 &&
            !(flags & LOOKUP_NOTOUCH))
        {
            if (server.maxmemory_policy & MAXMEMORY_FLAG_LFU) {
                updateLFU(val);
            } else {
                val->lru = LRU_CLOCK();
            }
        }
        return val;
    } else {
        return NULL;
    }
}
```
`lookupKey()`函数如果找到了key对应的键值对，如果服务器没有在执行持久化操作，并且该操作没有标志是`LOOKUP_NOTOUCH`，则更新这个值的LFU或者LRU。

最后`getGenericCommand()`函数拿到了key的查找结果，如果值对象是字符串对象，则调用`addReplyBulk()`回复客户端，否则回复`shared.wrongtypeerr`类型错误。

### 过期键：删除or惰性删除
上面已经提到过了，查找某个key时，会先调用`expireIfNeeded`判断这个key是不是已经过期了，判断过期的方法是在相应的数据库中的`expire`字典里查找这个key的值，如果值大于0（小于0则表示不过期）且小于当前时间戳（精确到毫米ms）则表示这个key过期了。

根据配置，`lazyfree-lazy-expire`，Redis会选择异步（惰性）`dbAsyncDelete`或者同步`dbSyncDelete`的方式删除过期的key。

#### 惰性删除
惰性删除首先会将这个key和值对象从`expire`字典中找出来并且回收。然后从数据库`db.dict`中找到这个key，然后并不会立即回收这个key和对应的值对象，而是先计算回收值对象所需付出的代价。Redis调用函数`lazyfreeGetFreeEffort`来计算回收一个对象的时间代价。

```c
/* Delete a key, value, and associated expiration entry if any, from the DB.
 * If there are enough allocations to free the value object may be put into
 * a lazy free list instead of being freed synchronously. The lazy free list
 * will be reclaimed in a different bio.c thread. */
#define LAZYFREE_THRESHOLD 64
int dbAsyncDelete(redisDb *db, robj *key) {
    /* Deleting an entry from the expires dict will not free the sds of
     * the key, because it is shared with the main dictionary. */
    if (dictSize(db->expires) > 0) dictDelete(db->expires,key->ptr);

    /* If the value is composed of a few allocations, to free in a lazy way
     * is actually just slower... So under a certain limit we just free
     * the object synchronously. */
    dictEntry *de = dictUnlink(db->dict,key->ptr);
    if (de) {
        robj *val = dictGetVal(de);
        size_t free_effort = lazyfreeGetFreeEffort(val);

        /* If releasing the object is too much work, do it in the background
         * by adding the object to the lazy free list.
         * Note that if the object is shared, to reclaim it now it is not
         * possible. This rarely happens, however sometimes the implementation
         * of parts of the Redis core may call incrRefCount() to protect
         * objects, and then call dbDelete(). In this case we'll fall
         * through and reach the dictFreeUnlinkedEntry() call, that will be
         * equivalent to just calling decrRefCount(). */
        if (free_effort > LAZYFREE_THRESHOLD && val->refcount == 1) {
            atomicIncr(lazyfree_objects,1);
            bioCreateBackgroundJob(BIO_LAZY_FREE,val,NULL,NULL);
            dictSetVal(db->dict,de,NULL);
        }
    }

    /* Release the key-val pair, or just the key if we set the val
     * field to NULL in order to lazy free it later. */
    if (de) {
        dictFreeUnlinkedEntry(db->dict,de);
        if (server.cluster_enabled) slotToKeyDel(key);
        return 1;
    } else {
        return 0;
    }
}
```
如果代价值大于`LAZYFREE_THRESHOLD`(64)就会创建一个后台任务，在io线程里删除这个对象，否则就直接删除了。

那么什么样的对象其回收代价大于64呢？元素个数大于64的列表、集合、有序集合或者字典。对于字符串对象，其回收代价永远是1。

```c
/* Return the amount of work needed in order to free an object.
 * The return value is not always the actual number of allocations the
 * object is compoesd of, but a number proportional to it.
 *
 * For strings the function always returns 1.
 *
 * For aggregated objects represented by hash tables or other data structures
 * the function just returns the number of elements the object is composed of.
 *
 * Objects composed of single allocations are always reported as having a
 * single item even if they are actually logical composed of multiple
 * elements.
 *
 * For lists the function returns the number of elements in the quicklist
 * representing the list. */
size_t lazyfreeGetFreeEffort(robj *obj) {
    if (obj->type == OBJ_LIST) {
        quicklist *ql = obj->ptr;
        return ql->len;
    } else if (obj->type == OBJ_SET && obj->encoding == OBJ_ENCODING_HT) {
        dict *ht = obj->ptr;
        return dictSize(ht);
    } else if (obj->type == OBJ_ZSET && obj->encoding == OBJ_ENCODING_SKIPLIST){
        zset *zs = obj->ptr;
        return zs->zsl->length;
    } else if (obj->type == OBJ_HASH && obj->encoding == OBJ_ENCODING_HT) {
        dict *ht = obj->ptr;
        return dictSize(ht);
    } else {
        return 1; /* Everything else is a single allocation. */
    }
}
```

### `set`
`set`命令的格式如下
```
SET key value [NX] [XX] [EX <seconds>] [PX <milliseconds>]
```
命令参数解释如下【[参考](http://doc.Redisfans.com/string/set.html)】：
- EX second ：设置键的过期时间为 second 秒。 SET key value EX second 效果等同于 SETEX key second value 。
- PX millisecond ：设置键的过期时间为 millisecond 毫秒。 SET key value PX millisecond 效果等同于 PSETEX key millisecond value 。
- NX ：只在键不存在时，才对键进行设置操作。 SET key value NX 效果等同于 SETNX key value 。
- XX ：只在键已经存在时，才对键进行设置操作。

命令实现如下：
```c
void setCommand(client *c) {
    int j;
    robj *expire = NULL;
    int unit = UNIT_SECONDS;
    int flags = OBJ_SET_NO_FLAGS;

    for (j = 3; j < c->argc; j++) {
        char *a = c->argv[j]->ptr;
        robj *next = (j == c->argc-1) ? NULL : c->argv[j+1];

        if ((a[0] == 'n' || a[0] == 'N') &&
            (a[1] == 'x' || a[1] == 'X') && a[2] == '\0' &&
            !(flags & OBJ_SET_XX))
        {
            flags |= OBJ_SET_NX;
        } else if ((a[0] == 'x' || a[0] == 'X') &&
                   (a[1] == 'x' || a[1] == 'X') && a[2] == '\0' &&
                   !(flags & OBJ_SET_NX))
        {
            flags |= OBJ_SET_XX;
        } else if ((a[0] == 'e' || a[0] == 'E') &&
                   (a[1] == 'x' || a[1] == 'X') && a[2] == '\0' &&
                   !(flags & OBJ_SET_PX) && next)
        {
            flags |= OBJ_SET_EX;
            unit = UNIT_SECONDS;
            expire = next;
            j++;
        } else if ((a[0] == 'p' || a[0] == 'P') &&
                   (a[1] == 'x' || a[1] == 'X') && a[2] == '\0' &&
                   !(flags & OBJ_SET_EX) && next)
        {
            flags |= OBJ_SET_PX;
            unit = UNIT_MILLISECONDS;
            expire = next;
            j++;
        } else {
            addReply(c,shared.syntaxerr);
            return;
        }
    }

    c->argv[2] = tryObjectEncoding(c->argv[2]);
    setGenericCommand(c,flags,c->argv[1],c->argv[2],expire,unit,NULL,NULL);
}
```
Redis首先判断用户是否输入了`NX`或者`XX`，并设置相应的flag。并且判断是否设置了`px`或者`ex`以定义过期时间。在保存键值对前先对值进行对象编码，前面提到了，Redis将用户输入的所有参数都保存成字符串对象。`tryObjectEncoding()`函数对值重新进行编码。重新编码的目的是为了节省空间。
```c
/* Try to encode a string object in order to save space */
robj *tryObjectEncoding(robj *o) {
    long value;
    sds s = o->ptr;
    size_t len;

    /* Make sure this is a string object, the only type we encode
     * in this function. Other types use encoded memory efficient
     * representations but are handled by the commands implementing
     * the type. */
    /**
     * 只对字符串对象进行编码
     * */
    serverAssertWithInfo(NULL,o,o->type == OBJ_STRING);

    /* We try some specialized encoding only for objects that are
     * RAW or EMBSTR encoded, in other words objects that are still
     * in represented by an actually array of chars. */
    /**
     * 只对 encoding为RAW 或者 EMBSTR的对象编码
     * */
    if (!sdsEncodedObject(o)) return o;

    /* It's not safe to encode shared objects: shared objects can be shared
     * everywhere in the "object space" of Redis and may end in places where
     * they are not handled. We handle them only as values in the keyspace. */
     /**
      * 已经被引用的对象不再编码
      * */
     if (o->refcount > 1) return o;

    /* Check if we can represent this string as a long integer.
     * Note that we are sure that a string larger than 20 chars is not
     * representable as a 32 nor 64 bit integer. */
    len = sdslen(s);
    /*
     * string2l将字符串转换成长整形，目的是为了共享整数类型的对象，以节省空间
     **/
    if (len <= 20 && string2l(s,len,&value)) {
        /* This object is encodable as a long. Try to use a shared object.
         * Note that we avoid using shared integers when maxmemory is used
         * because every object needs to have a private LRU field for the LRU
         * algorithm to work well. */
        if ((server.maxmemory == 0 ||
            !(server.maxmemory_policy & MAXMEMORY_FLAG_NO_SHARED_INTEGERS)) &&
            value >= 0 &&
            value < OBJ_SHARED_INTEGERS)
        {
            decrRefCount(o); /* 减少o的引用次数，如果引用次数为0，则对象被回收 */
            incrRefCount(shared.integers[value]); /* 对共享对象增加引用，实际上没有任何操作 */
            return shared.integers[value];
        } else {
            if (o->encoding == OBJ_ENCODING_RAW) sdsfree(o->ptr);
            o->encoding = OBJ_ENCODING_INT;
            o->ptr = (void*) value;
            return o;
        }
    }

    /* If the string is small and is still RAW encoded,
     * try the EMBSTR encoding which is more efficient.
     * In this representation the object and the SDS string are allocated
     * in the same chunk of memory to save space and cache misses. */
    if (len <= OBJ_ENCODING_EMBSTR_SIZE_LIMIT) {
        robj *emb;

        if (o->encoding == OBJ_ENCODING_EMBSTR) return o;
        emb = createEmbeddedStringObject(s,sdslen(s));
        decrRefCount(o);
        return emb;
    }

    /* We can't encode the object...
     *
     * Do the last try, and at least optimize the SDS string inside
     * the string object to require little space, in case there
     * is more than 10% of free space at the end of the SDS string.
     *
     * We do that only for relatively large strings as this branch
     * is only entered if the length of the string is greater than
     * OBJ_ENCODING_EMBSTR_SIZE_LIMIT. */
    trimStringObjectIfNeeded(o);

    /* Return the original object. */
    return o;
}
```

最后调用`setGenericCommand()`将编码后的键值对对象保存到数据库中。
#### string2ll
我们再来看看Redis是怎么把字符串解析成long long的。
```c
/* Convert a string into a long long. Returns 1 if the string could be parsed
 * into a (non-overflowing) long long, 0 otherwise. The value will be set to
 * the parsed value when appropriate.
 *
 * Note that this function demands that the string strictly represents
 * a long long: no spaces or other characters before or after the string
 * representing the number are accepted, nor zeroes at the start if not
 * for the string "0" representing the zero number.
 *
 * Because of its strictness, it is safe to use this function to check if
 * you can convert a string into a long long, and obtain back the string
 * from the number without any loss in the string representation. */
int string2ll(const char *s, size_t slen, long long *value) {
    const char *p = s;
    size_t plen = 0;
    int negative = 0;
    unsigned long long v;

    /* A zero length string is not a valid number. */
    if (plen == slen)
        return 0;

    /* Special case: first and only digit is 0. */
    if (slen == 1 && p[0] == '0') {
        if (value != NULL) *value = 0;
        return 1;
    }

    /* Handle negative numbers: just set a flag and continue like if it
     * was a positive number. Later convert into negative. */
    if (p[0] == '-') {
        negative = 1;
        p++; plen++;

        /* Abort on only a negative sign. */
        if (plen == slen)
            return 0;
    }

    /* First digit should be 1-9, otherwise the string should just be 0. */
    if (p[0] >= '1' && p[0] <= '9') {
        v = p[0]-'0';
        p++; plen++;
    } else {
        return 0;
    }

    /* Parse all the other digits, checking for overflow at every step. */
    while (plen < slen && p[0] >= '0' && p[0] <= '9') {
        if (v > (ULLONG_MAX / 10)) /* Overflow. */
            return 0;
        v *= 10;

        if (v > (ULLONG_MAX - (p[0]-'0'))) /* Overflow. */
            return 0;
        v += p[0]-'0';

        p++; plen++;
    }

    /* Return if not all bytes were used. */
    if (plen < slen)
        return 0;

    /* Convert to negative if needed, and do the final overflow check when
     * converting from unsigned long long to long long. */
    if (negative) {
        if (v > ((unsigned long long)(-(LLONG_MIN+1))+1)) /* Overflow. */
            return 0;
        if (value != NULL) *value = -v;
    } else {
        if (v > LLONG_MAX) /* Overflow. */
            return 0;
        if (value != NULL) *value = v;
    }
    return 1;
}
```

