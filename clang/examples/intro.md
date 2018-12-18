# 套接字编程简介

## 套接字地址结构
### IPv4套接字地址结构

```c
/* 定义在<netinet/in.h> 头文件中*/
struct in_addr {
    in_addr_t s_addr; 				/* 32位IPv4地址，网络字节序 */
};

struct sockaddr_in {
    unit8_t 		sin_len;		/* 结构体的长度 */
  	sa_family_t		sin_family;		/* AF_INET */
  	in_port_t		sin_port;		/* 16位的TCP或UDP端口号 */
  	struct in_addr	sin_addr;		/* 32位的IPv4地址，网络字节序 */
  	char			sin_zero[8];	/* 未使用 */
};
```
### 通用套接字地址结构

```c
/* <sys/socket.h> */
struct sockaddr {
	unit8_t		sa_len;
	sa_family_t	sa_family;		/* AF_XXX */
	char		sa_data[4]		/* 特定协议的地址 */
};
```
`套接字函数`的某个参数就是指向某个通用套接字地址结构的一个指针，如bind函数的原型为：
```c
int bind(int, struct sockaddr *, socklen_t);
```
这就要求对这些套接字函数的调用都必须将指向特定于协议的套接字地址结构的指针进行类型强制转换（casting），变成指向某个通用套接字地址结构的指针。

### IPv6套接字地址结构
```c
/* <netinet/in.h */
struct in6_addr {
	unit8_t s6_addr[16]; 		/* 128位IPv6地址 */
}
#define SIN6_LEN				/* 编译期测试使用 */
struct sockaddr_in6 {
	unit8_t			sin6_len;		/* 结构体的长度 */
	sa_family_t		sin6_family;	/* AF_INET6 */
	in_port_t		sin6_port;		/* 传输层端口号 */
	uint32_t		sin6_flowinfo;	/* 流信息，还未定义 */
	struct in6_addr	sin6_addr;		/* IPv6地址，网络字节序 */
	uint32_t		sin6_scope_id;	/* set of interfaces for a scope */
}
```

## 字节操纵函数
### 字节排序函数
[请看上一篇文章](./byteorder.md)
### inet_aton、inet_addr和inet_ntoa函数
```c
#include <arpa/inet.h>
int inet_aton(const char *strptr, struct in_addr *addrptr); /* 返回： 若字符串有效返回1，否则0 */
in_addr_t inet_addr(const char *strptr); /* 返回：若字符串有效则返回32位的二进制网路字节序的IPv4地址，否则为`INADDR_NONE` */
char *inet_ntoa(struct in_addr inaddr);	/* 返回一个指向点分十进制数串的指针 */
```
这几个函数在`点分十进制数串`(例如192.168.0.1)与它的长度为32位的`网络字节序二进制值`间转换IPv4地址。
- inet_aton将strptr所指向的C字符串转换成一个32位的网络字节序二进制值。若成功则返回1，否则返回0。
- inet_addr进行相同的转换，返回值为32位的网络字节学二进制值。但是该函数出错时返回`INADDR_NONE`常值（通常是一个32位均为1的值）。这意味着点分十进制数串255.255.255.255（这是IPv4的有限广播地址）不能由该函数处理，因为它的二进制值被用来指示该函数失败。（**如今inet_addr已被弃用，新的代码应该改用inet_aton函数**）
- inet_ntoa函数将一个32位的网络字节序二进制IPv4地址转换成相应的点分十进制数串，由该函数的返回值所指向的字符串驻留在静态内存中，这意味着该函数是不可重入的。该函数一个结构体而不是以指向该结构体的一个指针作为其参数。

### inet_pton和inet_ntop函数

### sock_ntop函数
### readn、writen和readline函数
字节流套接字上的read和write函数所表现的行为不同于通常的文件I/O。字节流套接字上调用read或write函数输入或输出的字节数可能会比请求的数量少，然而这不是bug，原因在于内核中用于套接字的缓冲区可能已经达到了极限，因此需要调用者再次调用read或write函数，以输入或输出剩余的字节。为了以防万一，可以封装这两个函数。

#### unp.h
```c
/* file: lib/unp.h */

#include <stdio.h>
#include <unistd.h>
#include <errno.h>
#include <stdlib.h>

/* Miscellaneous constants */
#define MAXLINE 4096 /* max text line length */
```

#### readn函数
<<<@/clang/src/lib/readn.c

#### writen函数
<<<@/clang/src/lib/writen.c

#### readline 函数
<<<@/clang/src/lib/readline.c

::: danger 注意
readline使用静态变量实现跨相继函数调用的状态信息维护，其结果是这些函数变得不可重入或者说非线性安全了。之后会有新的版本来代替。
:::