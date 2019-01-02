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
<<<@/clang/src/udpcliserv/01/unp.h

<<<@/clang/src/udpcliserv/01/udpserv.c

## UDP的connect函数

## 使用select函数的TCP和UDP回射服务器程序