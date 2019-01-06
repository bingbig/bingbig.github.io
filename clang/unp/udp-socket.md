# 基本UDP套接字编程
TCP编程和UDP编程存在本质的差异：UDP是无连接不可靠的数据报协议，非常不同于TCP提供的面向连接的可靠字节流。使用UDP编写的一些常见的应用程序有：DNS，NFS（网络文件系统）和SNMP（简单网络管理协议）。

## recvfrom和sendto函数
```c
#include <sys/socket.h>

ssize_t recvfrom(int sockfd, void *buff, size_t nbytes, int flags, struct sockaddr *from, socklen_t *addrlen); /* addrlen是值-结果参数 */
ssize_t sendto(int sockfd, const void *buff, size_t nbytes, int flags, struct sockaddr *to, socklen_t addrlen);

/* 若成功返回读/写的字节数，若失败则返回 -1 */
```

前三个参数分别是描述符，输入/读入缓冲区，以及读写的字节数。flags参数之后讨论，先设置为0，from和to是发送者和接受者的套接字地址结构。

写一个长度为0的数据报是可行的。UDP不像TCP套接字上read返回0值表示对端已关闭连接，recvfrom返回0是可以接受的，因为UDP是无连接的，因此也没有关闭UDP之类的事情。

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

## 使用select函数的TCP和UDP回射服务器程序