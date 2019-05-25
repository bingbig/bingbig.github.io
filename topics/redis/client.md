---
sidebar: auto
---

# Redis客户端

推荐这篇文章: [Redis 是如何处理命令的（客户端）](https://www.jianshu.com/p/0944c16b2353)

本文我们追踪一下，一行命令是如何从Redis客户端发送到服务端，并且服务端将执行结果返回给客户端的。以客户端的命令行交互模式为例。

Redis客户端的命令行交互模式基于[`linenoise`](https://github.com/antirez/linenoise)行编辑库开发的，和redis是同一个作者。

在`redis-cli.c`文件中我们找到客户端程序的`main()`入口函数。函数的开始直接初始化`config`配置结构。`config`是一个结构体类型的全局变量，其成员包含了客户端所需的各种配置参数。在主函数的最后，我们可以找到进入交互模式的方法`repl()`。

```c
/* Start interactive mode when no command is provided */
if (argc == 0 && !config.eval) {
    /* Ignore SIGPIPE in interactive mode to force a reconnect */
    signal(SIGPIPE, SIG_IGN);

    /* Note that in repl mode we don't abort on connection error.
        * A new attempt will be performed for every command send. */
    cliConnect(0);
    repl();
}
```
当类型为`SOCK_STREAM`的套接字不再连接时，进程写该套接字会产生`SIGPIPE`信号。`signal(SIGPIPE, SIG_IGN);`只是简单的忽略这个信号，以免客户端因为和服务端失去连接而中断。

## 初始化和连接服务器
`cliConnect()`函数会根据配置`config`尝试通过TCP或者unix socket连接服务器，连接成功后为已连接的套接字设置`SO_KEEPALIVE`选项来检测服务端是否停止服务，也可以避免长时间任务执行因为超时而中断。如果redis设置了鉴权，客户端连接函数还会向服务端发送一条命令来验证用户是否合法。另外`cliConnect()`函数调用`redisConnect()`连接成功后会返回初始化的redis客户端的上下文描述结构体`context`，结构体的类型名为`redisContext`。

### auth命令

```c
/* Send AUTH command to the server */
static int cliAuth(void) {
    redisReply *reply;
    if (config.auth == NULL) return REDIS_OK;

    reply = redisCommand(context,"AUTH %s",config.auth);
    if (reply != NULL) {
        freeReplyObject(reply);
        return REDIS_OK;
    }
    return REDIS_ERR;
}
```
发送命令函数`redisCommand()`接受三个参数：`context`, auth命令格式字符串以及客户端配置中保存的auth信息（也是字符串）。下面列了`redisCommand()`函数调用其他函数的顺序，这条auth命令字符串经过了格式化之后被追加到`c->obuf`字符串的后面。
```
redisCommand
    redisvCommand
        redisvAppendCommand
            redisvFormatCommand
            __redisAppendCommand
                sdscatlen    
        __redisBlockForReply
            redisGetReply
                redisGetReplyFromReader
                    redisReaderGetReply
                redisBufferWrite
                redisBufferRead
                redisGetReplyFromReader
```
`c->obuf`这个字符串是redis客户端程序的全局变量`context`的成员`obuf`，它被用作命令缓冲区。`__redisBlockForReply()`会根据`c->flags & REDIS_BLOCK`来判断是否阻塞执行redis命令：如果是的话，命令将缓冲到缓冲区`obuf`中，待合适的时机一次性发送给客户端执行。

上面提到过，在调用`redisConnect()` 初始化了`context`全局变量。初始化时它执行了`c->flags |= REDIS_BLOCK;`，使得一开始redis客户端执行命令是阻塞型的。于是，`__redisBlockForReply()`就会执行`redisGetReply()`来发送(`redisBufferWrite()`)缓冲区中的命令并且读取(`redisBufferRead()`, `redisGetReplyFromReader()`)来自服务端的返回数据。

关于redis客户端和服务端之间的通信协议`RESP`，网上已经有很多的介绍了，这里就不加以赘述了。

### 选择数据库
在执行完auth命令，用户提供的密码正确时，连接函数最后还执行了`cliSelect()`命令向服务器发送了`SELECT` 命令选择数据库，告诉服务器客户端期望读取的数据库是哪个，同理，发送命令的方法如下：
```c
reply = redisCommand(context,"SELECT %d",config.dbnum);
```

## 进入不同的客户端模式
连接成功后，客户端将进入我们想要的环境，如命令行交互模式。执行`repl()`函数。`repl()`函数是一个大循环，读取终端输入的命令，格式化后通过RESP协议发送给服务端进程，服务端处理后将结果返回给客户端，客户端接收到后显示在终端。





