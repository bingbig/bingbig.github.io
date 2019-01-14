# 基本UDP套接字编程
TCP编程和UDP编程存在本质的差异：UDP是无连接不可靠的数据报协议，非常不同于TCP提供的面向连接的可靠字节流。使用UDP编写的一些常见的应用程序有：DNS，NFS（网络文件系统）和SNMP（简单网络管理协议）。

## recvfrom和sendto函数
```c
#include <sys/socket.h>

ssize_t recvfrom(int sockfd, void *buff, size_t nbytes, int flags, struct sockaddr *from, socklen_t *addrlen); /* addrlen是值-结果参数 */
ssize_t sendto(int sockfd, const void *buff, size_t nbytes, int flags, struct sockaddr *to, socklen_t addrlen);

/* 若成功返回读/写的字节数，若失败则返回 -1 */
```

前三个参数分别是描述符，输入/读入缓冲区，以及读写的字节数。flags参数之后讨论，先设置为0，from和to是发送者和接收者的套接字地址结构。

写一个长度为0的数据报是可行的。UDP不像TCP套接字上read返回0值表示对端已关闭连接，recvfrom返回0是可以接受的，因为UDP是无连接的，因此也没有关闭UDP之类的事情。UDP套接字也不需要调用`listen`函数，listen由TCP套接字调用，否则会报`Operation not supported on socket` 错误。

如果recvfrom是一个空指针，那么相应的addrlen也必须是一个空指针。

## UDP回射服务器和客户端程序
### 头文件
```c
#include <stdlib.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <stdio.h>
#include <string.h>
#include <arpa/inet.h>

#define SERV_UDP_PORT 8765
#define BUFF_SIZE 1024

void err_sys(const char *x)
{
    perror(x);
    exit(1);
}

void Inet_pton(int family, const char *strptr, void *addrptr)
{
    if (inet_pton(family, strptr, addrptr) < 0)
        err_sys("inet_pton error");
}

char *Fgets(char *buff, int bytes, FILE *fp)
{
    char *rbuff;
    if ((rbuff = fgets(buff, bytes, fp)) == NULL && ferror(fp))
        err_sys(rbuff);
    return buff;
}

void Fputs(const char *ptr, FILE *stream)
{
    if (fputs(ptr, stream) == EOF)
        err_sys("fputs error");
}

int Socket(int family, int type, int protocol)
{
    int n;
    n = socket(family, type, protocol);
    
    if(n < 0)
        err_sys("create socket error");
    return n;
}

int Bind(int sockfd, const struct sockaddr *servaddr, socklen_t addrlen)
{
    int n;
    n = bind(sockfd, servaddr, addrlen);
    if(n < 0)
        err_sys("bind error");

    return n;
}

ssize_t Recvfrom(int sockfd, void *buff, size_t nbytes, int flags, struct sockaddr *from, socklen_t *addrlen)
{
    ssize_t n;
    n = recvfrom(sockfd, buff, nbytes, flags, from, addrlen);
    if(n < 0)
        err_sys("recvfrom error");
    
    return n;
}

void Sendto(int sockfd, void *buff, size_t nbytes, int flags, struct sockaddr *to, socklen_t addrlen)
{
    if(sendto(sockfd, buff, nbytes, flags, to, addrlen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

void dg_echo(int sockfd, struct sockaddr *pcliaddr, socklen_t clilen)
{
    ssize_t n;
    socklen_t len;
    char msg[BUFF_SIZE];
    
    while(1){
        bzero(&msg, BUFF_SIZE);
        len = clilen;
        n = Recvfrom(sockfd, msg, BUFF_SIZE, 0, pcliaddr, &len);
        Fputs(msg, stdout);
        Sendto(sockfd, msg, n, 0, pcliaddr, len);
    }
}

void dg_cli(FILE *fp, int sockfd, struct sockaddr *pservaddr, socklen_t servlen)
{
    int n;
    char sendline[BUFF_SIZE], recvline[BUFF_SIZE + 1];
    while(Fgets(sendline, BUFF_SIZE, fp)){
        Sendto(sockfd, sendline, strlen(sendline), 0, pservaddr, servlen);

        n = Recvfrom(sockfd, recvline, BUFF_SIZE, 0, NULL, NULL);
        recvline[n] = 0;
        Fputs(recvline, stdout);
    }
}
```

### 服务器程序
<<<@/clang/src/udpcliserv/01/udpserv.c

### 客户端程序
<<<@/clang/src/udpcliserv/01/udpcli.c

## UDP的connect函数
除非套接字已连接，否则异步错误（ICMP错误）是不会返回到UDP套接字的，因为sendto引起该错误，但是sendto成功返回仅仅表示在接口输出队列中具有存放所形成IP数据报的空间，而ICMP错误直到后来才返回。在UDP中调用connect没有三次握手过程，内核只是检查是否存在立即可知的错误，记录对端的IP地址和端口，然后立即返回到调用进程。

相对于未连接UDP套接字，已连接套接字发生了以下变化：
> 1. 不能再给输出操作指定目的IP和端口号

也就是说我们不使用sendto，而是改为write或send。写到UDP套接字上的任何内容都自动发送到connect指定的协议地址。

> 2. 不必使用recvfrom获悉数据报的发送者，而改用read、recv或recvmsg

> 3. 由已连接UDP套接字引发的异步错误会返回给他们所在的进程，而未连接UDP套接字不会接收任何异步错误。

### 性能比较
在一个未连接的UDP套接字上调用sendto发送两个数据报内核会执行下列6个步骤：
1. 连接套接字（可能需要搜索路由）
2. 输出第一个数据报
3. 断开套接字
4. 连接套接字（可能不需要搜索路由）
5. 输出第二个数据报
6. 断开套接字

对于已连接UDP套接字来说：
1. 连接套接字
2. 输出第一个数据报
3. 输出第二个数据报

在这种情况下，内核只需要复制一次含有目的IP地址和端口号的套接字地址结构。临时连接未连接套接字大约会耗费每个UDP传输三分之一的开销。

#### 修改客户端程序为连接UDP套接字
```c{76-114,147-165}
/* file:src/udpcliserv/02/unp.h */
#include <stdlib.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <stdio.h>
#include <string.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <unistd.h>

#define SERV_UDP_PORT 8765
#define BUFF_SIZE 10

void err_sys(const char *x)
{
    perror(x);
    exit(1);
}

void Inet_pton(int family, const char *strptr, void *addrptr)
{
    if (inet_pton(family, strptr, addrptr) < 0)
        err_sys("inet_pton error");
}

char *Fgets(char *buff, int bytes, FILE *fp)
{
    char *rbuff;
    if ((rbuff = fgets(buff, bytes, fp)) == NULL && ferror(fp))
        err_sys("fgets error");
    return buff;
}

void Fputs(const char *ptr, FILE *stream)
{
    if (fputs(ptr, stream) == EOF)
        err_sys("fputs error");
}

int Socket(int family, int type, int protocol)
{
    int n;
    n = socket(family, type, protocol);
    
    if(n < 0)
        err_sys("create socket error");
    return n;
}

int Bind(int sockfd, const struct sockaddr *servaddr, socklen_t addrlen)
{
    int n;
    n = bind(sockfd, servaddr, addrlen);
    if(n < 0)
        err_sys("bind error");

    return n;
}

ssize_t Recvfrom(int sockfd, void *buff, size_t nbytes, int flags, struct sockaddr *from, socklen_t *addrlen)
{
    ssize_t n;
    n = recvfrom(sockfd, buff, nbytes, flags, from, addrlen);
    if(n < 0)
        err_sys("recvfrom error");
    
    return n;
}

void Sendto(int sockfd, void *buff, size_t nbytes, int flags, struct sockaddr *to, socklen_t addrlen)
{
    if(sendto(sockfd, buff, nbytes, flags, to, addrlen) != (ssize_t) nbytes)
        err_sys("sendto error");
}

void Connect(int sockfd, const struct sockaddr *servadder, socklen_t addrlen)
{
    if (connect(sockfd, servadder, addrlen) < 0)
        err_sys("connect error");
}

ssize_t Write(int fd, char *buf, size_t count)
{
    size_t nwritten,total_written = 0;
    while (total_written != count)
    {
        nwritten = write(fd, buf, count - total_written);
        if (nwritten == -1)
            err_sys("write error");
        if (nwritten == 0)
            return total_written;
        total_written += nwritten;
        buf += nwritten;
    }

    return total_written;
}

ssize_t Read(int fd, char *buf, size_t count)
{
    size_t nread, read_total = 0;
    
    while(read_total != count)
    {
        nread = read(fd, buf, count-read_total);
        if(nread == -1)
            err_sys("read error");
        if(nread == 0)
            return read_total;
        read_total += nread;
        buf += nread;
    }
    return read_total;
}

void dg_echo(int sockfd, struct sockaddr *pcliaddr, socklen_t clilen)
{
    ssize_t n;
    socklen_t len;
    char msg[BUFF_SIZE];
    
    while(1){
        bzero(&msg, BUFF_SIZE);
        len = clilen;
        n = Recvfrom(sockfd, msg, BUFF_SIZE, 0, pcliaddr, &len);
        Fputs(msg, stdout);
        Sendto(sockfd, msg, n, 0, pcliaddr, len);
    }
}

char *Sock_ntop(const struct sockaddr *addrptr, char *str, size_t len)
{
    char portstr[8];
    struct sockaddr_in *addr = (struct sockaddr_in *) addrptr;

    if (inet_ntop(AF_INET, &addr->sin_addr, str, len) == NULL)
        err_sys("Sock_ntop error");

    if (ntohs(addr->sin_port) != 0)
    {
        snprintf(portstr, sizeof(portstr), ":%d", ntohs(addr->sin_port));
        strcat(str, portstr);
    }
    return str;
}

void dg_cli(FILE *fp, int sockfd, struct sockaddr *pservaddr, socklen_t servlen)
{
    int n;
    char sendline[BUFF_SIZE], recvline[BUFF_SIZE+1];

    Connect(sockfd, (struct sockaddr *) pservaddr, servlen);

    while(Fgets(sendline, BUFF_SIZE, fp)){
        Write(sockfd, sendline, strlen(sendline));

        n = Read(sockfd, recvline, strlen(sendline)); /* 读取字节数不能超过发送字节数，否则阻塞在read上 */

        recvline[n] = 0;
        Fputs(recvline, stdout);

        bzero(&sendline, BUFF_SIZE);
        bzero(&recvline, BUFF_SIZE+1);
    }
}
```
<<<@/clang/src/udpcliserv/02/udpcli.c

## UDP套接字接收缓冲区
在FreeBSD下UDP套接字接收缓冲区的默认大小为42,080字节，可以通过`setsockopt`函数设置其大小。如下：
```c
int n = 220 * 1024;
setsockopt(sockfd, SOL_SOCKET, SO_RCVBUF, &n, sizeof(n));
```