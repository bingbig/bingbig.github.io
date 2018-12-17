# 基本TCP套接字编程

## socket函数
```c
#include <sys/socket.h>
int socket(int family, int type, int protocol); /* 若成功，返回非负描述符，若出错返回-1 */
```

其中`family`参数指明协议族，也称为协议域。`type`参数知名套接字类型。`protocol`指的是协议，设为`0`则选择`family`和`type`组合的系统默认值。



| family   | 说明      |      | type           | 说明      |      | protocol     | 说明       |
| :------- | ------- | ---- | -------------- | ------- | ---- | ------------ | -------- |
| AF_INET  | IPv4协议  |      | SOCK_STREAM    | 字节流套接字  |      | IPPROTO_TCP  | TCP传输协议  |
| AF_INET6 | IPv6协议  |      | SOCK_DGRAM     | 数据报套接字  |      | IPPROTO_UDP  | UDP传输协议  |
| AF_LOCAL | Unix域协议 |      | SOCK_SEQPACKET | 有序分组套接字 |      | IPPROTO_SCTP | SCTP传输协议 |
| AF_ROUTE | 路由套接字   |      | SOCK_RAW       | 原始套接字   |      |              |          |
| AF_KEY   | 密钥套接字   |      |                |         |      |              |          |



socket函数中family和type的参数组合（空白表示无效）

|                 | AF_INET   | AF_INET6  | AF_LOCAL | AF_ROUTE | AF_KEY |
| --------------- | --------- | --------- | -------- | -------- | ------ |
| SOCK_STREAM     | TCP\|SCTP | TCP\|SCTP | 有效       |          |        |
| SOCK_DGRAM      | UDP       | UDP       | 有效       |          |        |
| SOCK_SEQPACKAGE | SCTP      | SCTP      | 有效       |          |        |
| SOCK_RAW        | IPv4      | IPv6      |          | 有效       | 有效     |



## connect函数

```c
#include <sys/socket.h>
int connect(int sockfd, const struct sockaddr *servadder, socklen_t addrlen); /* 成功返回0，若出错返回 -1 */
```

如果是TCP套接字，调用connect函数将激发TCP的三路握手过程，而且仅在连接成功或者出错时返回，其中出错返回可能有以下几种情况：

1. **若TCP客户没有收到SYN分节的响应，则返回`ETIMEDOUT`错误。** 调用本函数时，内核发送一个SYN给服务端，若无响应则等待6s再发送一个，仍无响应时等待24s再发送一个，若总共等待75s没有收到响应则返回本错误。
2. **若对客户端的SYN响应是RST（复位），则表明该服务器主机在我们指定的端口没有进程在等待与之连接**。这是一种硬错误（hard error），客户端一接收到RST就马上返回`ECONNREFUSED`错误。
3. **若客户发送的SYN在中间某个路由器中引发一个“destination unreadchable” ICMP错误，则认为是一种软错误（soft error）**。客户主机按第一种情况继续发送SYN，若在某个规定的时间后未收到响应，则把ICMP错误作为`EHOSTUNREACH`或`ENETUNREACH`错误返回给进程。


## bind函数

```c
#include <sys/socket.h>
int bind(int sockfd, const struct sockaddr *myaddr, socklen_r addlen); /* 若成功则为0，出错返回 -1 */
```

服务器进程在启动时捆绑它们的众所周知的端口，而客户端则由内核自动分配一个临时端口，不需要调用bind函数。



## listen函数

```c
#include <sys/socket.h>
int listen(int sockfd, int backlog); /* 成功则返回0， 出错则返回 -1 */
```

当socket函数创建一个套接字时，它被假设为一个`主动套接字`（主动通过调用connect函数发起连接的客户套接字），listen函数把一个未连接的套接字转换成一个`被动套接字`。第二个参数规定了内核应该为相应的套接字排队的最大连接个数。内核为给定的监听套接字维护了两个队列：

1. 未完成连接的队列，这些套接字处于`SYN_RCVD`状态；

2. 已完成连接的队列，这些套接字处于`ESTABLISHED`状态。

## ​accept函数

```c
#include <sys/socket.h>
int accept(int sockfd, struct sockaddr *cliaddr, socklen_t *addrlen); /* 成功返回非负描述符，若出错则返回-1 */
```

accept函数由TCP服务器调用，用于从已经完成连接的队列头返回一个已完成连接。参数`cliaddr`	和`addrlen`用来返回已连接的对端进程（客户端）的协议地址及大小。在讨论accept函数时，我们称第一个参数为`监听套接字(listening socket)`描述符（由socket创建，随后用做bind和listen的第一个参数的描述符），称它的返回值为`已连接套接字（connected socket）`描述符。服务器通常仅仅创建一个监听套接字，它在服务器的生命周期内一直存在。内核为每个连接创建一个已连接套接字，当服务器与客户端断开连接时，已连接套接字也就被关闭。

本函数最多返回三个值：1⃣️一个既可能是新的套接字描述符，也可能是出错指示的整数、2⃣️客户端进程的协议地址以及3⃣️该地址的大小。如果我们对客户端协议地址不感兴趣，那么可以把`cliaddr`和`addrlen`均置为空指针。

## close函数

```c
#include <unistd.h>
int close(int sockfd); /* 成功返回0， 出错则返回-1 */
```

close一个TCP套接字的默认行为是把该套接字标记成已关闭，然后立即返回到调用进程，该套接字描述符不能再由调用的进程使用，也就是说它不能再作为read或write的第一个参数，然而TCP将尝试发送已排队等待发送到对端的任何数据，数据发送完毕后发送的是正常的TCP连接终止序列。

## 示例：获取服务器时间的程序

### 头文件
<<<@/clang/src/lib/unp.h

### 客户端程序
<<< @/clang/src/daytimetcpcli.c

### 服务端程序
<<<@/clang/src/daytimetcpsrv.c

### 编译和运行
```bash
cc daytimetcpsrv.c -o server
cc daytimetcpcli.c -o cli
sudo ./server
# 另外一个shell窗口，重复执行多次
./cli 127.0.0.1
```

服务端输出：
```
bingbig@macbook $ sudo ./server
binding on 127.0.0.1:8000
binding on 127.0.0.1:8000
A client from 127.0.0.1:51436 connected in
A client from 127.0.0.1:51437 connected in
A client from 127.0.0.1:51438 connected in
A client from 127.0.0.1:51439 connected in
```

客户端输出：
```
bingbig@macbook $ ./cli 127.0.0.1
connecting on 127.0.0.1:8000
Mon Dec 17 22:18:07 2018
bingbig@macbook $ ./cli 127.0.0.1
connecting on 127.0.0.1:8000
Mon Dec 17 22:18:09 2018
bingbig@macbook $ ./cli 127.0.0.1
connecting on 127.0.0.1:8000
Mon Dec 17 22:18:10 2018
bingbig@macbook $ ./cli 127.0.0.1
connecting on 127.0.0.1:8000
Mon Dec 17 22:18:10 2018
```
:::tip
在Mac上，可以通过`sudo lsof -nP -iTCP:端口号 -sTCP:LISTEN` 命令查看端口的占用情况。
:::