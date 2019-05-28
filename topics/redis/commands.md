---
sidebar: auto
---

# Redis命令
在本文，我们将阅读Redis源码以了解Redis如何执行来自客户端命令的。

在redis的启动过程中，会监听redis服务器配置文件指定的地址和端口，并且初始化一组TCP socket文件描述符，这些监听描述符保存在全局变量`server`的`ipfd`成员中（该成员是一个16个元素的数组），其数量由`server.ipfd_count`记录。来自unix域socket连接描述符记录在`server.sofd`，我们暂时只讨论TCP连接。

## 监听端口
```c
/* Open the TCP listening socket for the user commands. */
if (server.port != 0 &&
    listenToPort(server.port,server.ipfd,&server.ipfd_count) == C_ERR)
    exit(1);
```

## 连接应答处理器
在初始化监听描述符之后，redis为这些描述符的可读事件绑定了[连接应答处理器](./event_driven_library.html#_1-reactor)。

```c
/* Create an event handler for accepting new connections in TCP and Unix
     * domain sockets. */
for (j = 0; j < server.ipfd_count; j++) {
    if (aeCreateFileEvent(server.el, server.ipfd[j], AE_READABLE, acceptTcpHandler,NULL) == AE_ERR) {
        serverPanic("Unrecoverable error creating server.ipfd file event.");
    }
}
```
当一个或者多个客户端和服务器之间TCP连接建立后，会触发相应监听描述符的可读事件的发生，redis服务器的事件驱动模型会很快执行描述符绑定的处理器`acceptTcpHandler`。

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
到这里，我们找到了redis服务器读取客户端命令的关键函数`readQueryFromClient()`。该函数从发生可读事件的已连接描述符中读取最大`PROTO_IOBUF_LEN`长度的数据并追加到在`c->querybuf`缓冲区后面，随后调用`processInputBufferAndReplicate()`函数处理缓冲区。
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

如果客户端发来的数据的第一个字符是`*`（或者下一次解析的第一个字符是`*`）时，那么数据将被当做`multibulk`处理，否则将被当做`inline`处理。`Inline`的具体解析函数是`processInlineBuffer()`，`multibulk`的具体解析函数是`processMultibulkBuffer()`。 当客户端传送的数据已经解析出命令字段和参数字段，字段数组保存在`client->argv`（各个字段已经被转换成redis字符串对象`createObject(OBJ_STRING,argv[j])`），字段个数保存在`client->argc`。接下来进行命令处理，函数是`processCommand()`。

## 执行命令
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
`lookupCommand()`函数从字典`server.commands`中查找和第一个参数`c->argv[0]->ptr`一直的命令。

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
 * redis.conf using the rename-command directive. */
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
其中`populateCommandTable()`函数将写死的命令列表经过一些处理后保存到`server.commands`和`server.orig_commands`中。下面我们列出部分命令列表中的命令来看：数组的每个元素都是`redisCommand`类型的结构体，其成员分别表示`命令名`，`命令函数`，`参数个数`(-N表示 >=N)，`sflag`(字符串表示的命令标志)，`flag`(位掩码表示的命令标志),`获取key的函数`，`第一个key的索引`，`最后一个key的索引`，`key和key之间的步长`,`微秒数`(由redis计算得到)，`调用次数`。

在下面的代码中我们可以看到字符串表示的命令标志如`rF`，`wm`, `wRF`等等分别是什么意思呢？

- w 写命令
- r 读命令
- m 每次调用都会增加内存使用，不允许超出内存
- F 快速命令，时间复杂度为O(1),或者O(log(N))
- 等等

```c
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
    // ...
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
函数`populateCommandTable()`初始化命令表时，会以命令名为key, `redisCommand`结构体为值保存到`server.commands`和`server.orig_commands`中。

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
### 最大内存设置
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


```

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

    /* Don't accept write commands if this is a read only slave. But
     * accept write commands if this is our master. */
    if (server.masterhost && server.repl_slave_ro &&
        !(c->flags & CLIENT_MASTER) &&
        c->cmd->flags & CMD_WRITE)
    {
        addReply(c, shared.roslaveerr);
        return C_OK;
    }

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

    /* Loading DB? Return an error if the command has not the
     * CMD_LOADING flag. */
    if (server.loading && !(c->cmd->flags & CMD_LOADING)) {
        addReply(c, shared.loadingerr);
        return C_OK;
    }

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
    return C_OK;
}
```
