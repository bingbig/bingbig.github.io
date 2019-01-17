# 名字与地址的转换

域名系统（Domain Name System， DNS）主要用于主机名字与IP地址之间的映射。主机名既可以是一个简单的名字，如bingbig，也可以是一个全限定名（Fully Qualified Domain Name， FQDN），如www.weibo.com。严格的来说FQDN必须一个点号结尾。

DNS中的条目称为资源记录（Resource Record，RR），我们感兴趣的RR类型只有几个，如下：
- **A** 

A记录把主机名映射成一个32位的IPv4地址，如 `bingbig  12.111.23.23`。

- **AAAA**

称为“四A”（quad A）记录的AAAA记录把一个主机名映射成一个128位的IPv6地址。是32位地址的4倍。

- **PTR**

称为“指针记录”（pointer record）的PTR记录把IP地址映射成主机名。对于IPv4地址，32位地址的4个字节反转顺序，每个字节都转换成各自的十进制ASCII值（0~255）后，再添上`in-addr.arpa`，结果字符串用于PTR查询。相应的IPv6地址，反转后每个四位组都被转换成十六进制的ASCII值（0~9，a~f），再添上`ip6.arpa`。

- **MX**

MX记录把一个主机指定作为给定主机的“邮件交换器“（mail exchanger）。

- **CNAME**

CNAME代表“canonical name”（规范名字），它的常见用法是为常用的服务（例如ftp，www）指派CNAME记录。如果人们使用这些服务名而不是真实的主机名，那么相应得服务挪到另一个主机时他们也不知道。

每个支机构往往运行着一个或多个`名字服务器（name server）`，我们通过调用称为`解析器（resolve）`的函数库中的函数结束DNS服务器。解析器通过读取其系统相关配置文件确定本组织机构的名字服务器们的所在位置，文件`/etc/resolve.conf`通过包含本地名字服务器主机的IP地址。

不适用DNS也能获取名字和地址信息，常用的替代方法有静态机主文件（通常是`/etc/hosts`）、网络信息系统（Network Information System， NIS）以及轻权目录访问权限（Lightweight Directory Access Protocol， LDAP）。对于应用程序开发人员来说这些通常是透明的，我们只需要调用诸如`gethostbyname`和`gethostbyaddr`这样的解析器函数。

## gethostbyname函数
:::tip 注意
从POSIX规范中撤销该函数意在声明新的程序不再使用它，我们鼓励在新的程序中改用`getaddrinfo`函数。
:::

```c
#include <netdb.h>

struct hostent *gethostname(const char *hostname); /** 返回： 若成功则为非空指针，若出错则为NULL且设置h_errno **/
```
本函数返回的非空指针指向如下的hostent结构。
```c
struct hostent {
    char *h_name;       /** CNAME **/
    char **h_aliases;   /** 指向别名指针数组的指针 **/
    int h_addrtype;     /** 主机地址类型：AF_INET **/
    int h_length;       /** 地址长度： 4 **/
    char **h_addr_list; /** 指向IPv4地址指针的指针 **/
}
```

gethostbyname发生错误时，它不设置errno变量，而是将全局整数变量h_errno设置为定义在<netdb.h>中的下列常值：`HOST_NOT_FOUND`, `TRY_AGAIN`, `NO_RECOVERY`, `NO_DATA`（等同于`NO_ADDRESS`）。

#### 例子
```c
#include <netdb.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdarg.h>
#include <arpa/inet.h>

#define MAX_BUFF_SIZE   1024


void err_sys(const char *x)
{
    perror(x);
    exit(1);
}

void err_msg(const char *fmt, ...)
{
    va_list ap;
    char buff[MAX_BUFF_SIZE];

    va_start(ap, fmt);
    vsnprintf(buff, MAX_BUFF_SIZE, fmt, ap);
    perror(buff);
    va_end(ap);
}
```
<<<@/clang/src/names/hostent.c

## gethostbyaddr函数
`gethostaddr`函数试图由一个二进制IP地址找到相应的主机名，与gethostbyname的行为刚好相反。
```c
#include <netdb.h>

struct hostent *gethostbyaddr(const char *addr, socklen_t len, int family); /** 返回：若成功则返回非空指针，若出错则为NULL且设置h_errno **/
```

## getservbyname 函数
通常`/etc/service`文件保存了名字到端口的映射关系。`getservbyname`函数用于给定的名字查找相应的服务。

```c
#include <netdb.h>

struct servent *getservbyname(const char *servname, const char *protoname); /** 返回：若成功则返回非空指针，若出错则为NULL **/
```
本函数返回的非空指针指向如下的servent结构：
```c
struct servent {
    char *s_name;       /* 官方的服务名 */
    char **s_aliases;   /* alias数组 */
    int s_port;         /* 端口号，网络字节序 */
    char *s_proto;      /* 使用的协议 */
}
```
#### 典型调用方法
```c
struct servent *sptr;
sptr = getservbyname("domain", "udp");
sptr = getservbyname("ftp", "tcp");
sptr = getservbyname("ftp", NULL);
sptr = getservbyname("ftp", "udp);
```

## getservbyport 函数

`getservbyport`用于根据给定的端口号和可选协议查找相应的服务。
```c
#include <netdb.h>

struct servent *getservbyport(int port, const char *protoname); /** 返回：若成功则为非空指针，若出错则为NULL **/
```

`port`参数必须为网络字节序。

#### 典型调用方法
```c
struct servent *sptr;
sptr = getservbyport(htons(53), "udp");
sptr = getservbyport(htons(21), "tcp");
sptr = getservbyport(htons(21), NULL);
sptr = getservbyport(htons(21), "udp";
```

## getaddrinfo函数
gethostbyname和gethostbyadde这两个函数仅仅支持IPv4。geaddrinfo函数能够处理名字到地址以及服务到端口的这两种转换，返回的是一个sockaddr结构而不是一个地址列表。它把协议相关性隐藏在这个库函数内部。
```c
#include <netdb.h>

int getaddrinfo(const char *hostname, const char *service, const strcut addrinfo *hints, struct addrinfo **result);

/** 返回： 若成功则为0， 若出错则非0 **/
```
#### result
本函数通过result指针参数返回一个指向addrinfo结构链表的指针，addrinfo结构定义在头文件`netdb.h`中：
```c
struct addrinfo {
    int         ai_flags;       /* AI_PASSIVE, AI_CANONNAME等 */
    int         ai_family;      /* AF_XXX 地址族 */
    int         ai_socktype;    /* SOCK_XXX */
    int         ai_protocol;    /* 0 or IPPROTO_XXX for IPv4 and IPv6 */
    socklen_t   ai_addrlen;     /* ai_addr的长度 */
    char        *ai_cannoname;  /* ptr to cannonical name for host，在第一个结构有值，其他结构中为NULL */
    struct sockaddr *ai_addr;   /* ptr to socket address structure */
    struct addrinfo *ai_next;   /* ptr to next structure in linked list */
}
```
#### hostname
hostname参数是一个主机名或地址串，IPv4的点分十进制数串或者IPv6的十六进制数串。

#### service
service参数是一个服务名或十进制端口号数串。

#### hints
hints参数可是一个空指针，也可以是一个指向某个addrinfo结构的指针，调用者在这个结构中填入关于期望返回的信息类型的暗示。hints结构中调用者可以设置的成员有：
- `ai_flags`
- `ai_family`
- `ai_socktype`
- `ai_protocol`

其中ai_flags成员可用的标志值及其含义如下：
- `AI_PASSIVE`            套接字将用于被动打开
- `AI_CANONNAME`          告知getaddrinfo函数返回主机的规范名字
- `AI_NUMERICHOST`        防止任何类型的名字到地址映射，hostname参数必须是一个地址串。
- `AI_NUMERICSERV`        防止任何类型的名字到服务映射，service参数必须是一个十进制端口号数串。

其他标志值如`AI_V4MAPPED`, `AI_ALL`, `AI_ADDRCONFIG`。

> 如果hints参数是一个空指针，本函数就假设ai_flag、ai_socktype和ai_protocol的值均为0，ai_family的值为`AF_UNSPEC`。

#### 说明
如果本函数成功返回，即返回0，那么由result参数指向的变量已被填入一个指针，它指向的是addrinfo结构链表（通过ai_next成员串联）。可以导致返回多个addrinfo结构的情形有以下两个：
1. 如果与hostname参数关联的地址有多个，那么适用于所请求地址族（hints结构的ai_family成员设置）的每个地址都返回一个对应的结构。
2. 如果service参数所指定的服务支持多个套接字类型，那么每个套接字类型都可以返回一个对应的结构，具体取决于hints结构的ai_socktype成员。

如果在hints结构中设置了AI_CANONNAME标志，那么本函数返回的一个addrinfo结构的ai_cannoname成员指向所查找主机的规范名字。

getaddrinfo有多种输入，有些是无效的，有些事没有多大意义的，下面只看一些常见的输入。
- 指定hostname和service。这是TCP或UDP客户端进程调用getaddrinfo的常规输入。
- 典型的服务器进程只指定service而不指定hostname，同事在hints结构中指定AI_PASSIVE标志。返回的套接字地址结构中应含有一个值为`INADDR_ANY（对于IPv4）`或`IN6ADDR_ANY_INIT（对于IPv6）`的IP地址。

#### 注意
1. getaddrinfo处理两个不同的输入：（1）套接字地址结构类型，调用者期待返回的地址结构符合这个类型；（2）资源记录类型，在DNS或者其他数据库中执行的查找符合这个类型。
2. 在hints结构中的执行的返回的套接字地址结构的类型。如果指定了AF_INET，函数就不会返回sockaddr_in6结构，同样如果指定了AF_INET6，就不能返回sockaddr_in结构。
3. 如果指定了AF_UNSPEC，函数返回的是适用于指定主机名和服务名且适合任意协议族的地址。这就意味着如果主机既有AAAA记录又有A记录，那么AAAA记录将作为sockaddr_in6结构返回，A记录将作为sockaddr_in结构返回。
4. 如果设置了AI_PASSIVE标志但是没有指定主机名，那么IPv6统配地址（IN……ADDR_ANY_INIT或0::0）应该作为sockaddr_in6结构返回，通过IPv4通配地址（INADDR_ANY或0.0.0.0）应该作为sockaddr_in结构返回。
5. 在hints结构的ai_family成员中指定的地址族以及ai_flags成员中指定的AI_V4MAPPED和AI_ALL等标志决定了在DNS中查找的资源记录类型（A和/或AAAA），也决定了返回地址的类型（IPv4、IPv6和/或IPv4映射的IPv6）。
6. 主机名参数还可以是IPv6的十六进制数串或IPv4的点分十进制数串。有效性取决于指定的地址族。


## gai_strerror函数
gai_strerror函数以getaddrinfo返回的非0错误值为参数，返回一个指向对应的出错信息串的指针。

```c
#include <netdb.h>

const char *gai_strerror(int error); /* 返回：指向错误信息的消息字符串的指针 */
```

表：getaddrinfo返回的非0错误常值

| 常值           | 说明                            |
| ------------ | ----------------------------- |
| EAI_AGAIN    | 名字解析中的临时失败                    |
| EAI_BADFLAGS | ai_flags的值无效                  |
| EAI_FAIL     | 名字解析中的不可恢复地失败                 |
| EAI_FAMILY   | 不支持ai_family                  |
| EAI_MEMORY   | 内存分配失败                        |
| EAI_NONAME   | hostname或service未提供，或者不可知     |
| EAI_OVERFLOW | 用户参数缓冲区溢出(仅限于getnameinfo()函数) |
| EAI_SERVICE  | 不支持ai_socktype类型的service      |
| EAI_SOCKTYPE | 不支持ai_socktype                |
| EAI_SYSTEM   | 在errno变量中有系统错误返回              |

## freeaddrinfo函数
有getaddrinfo返回的所有存储空间都是动态获取的，包括addrinfo结构，ai_addr结构和ai_cannoname字符串。通过调用freeaddrinfo返回给系统。
```c
#include <netdb.h>

void freeaddrinfo(struct addrinfo *ai);
```

### 例子
#### 头文件unp.h
```c
#include <netdb.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdarg.h>
#include <arpa/inet.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>

#define MAX_BUFF_SIZE   1024
#define LISTENQ 5

void err_msg(const char *fmt, va_list ap)
{
    char buff[MAX_BUFF_SIZE];
    vsnprintf(buff, MAX_BUFF_SIZE, fmt, ap);
    perror(buff);
}

void err_printf(const char *fmt, ...)
{
    va_list ap;
    va_start(ap, fmt);
    err_msg(fmt, ap);
    va_end(ap);
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    char buff[MAX_BUFF_SIZE];

    va_start(ap, fmt);
    err_msg(fmt, ap); /* we can pass the args only to functions that 
                        take va_args as argument. These have a v in 
                        their name: vprintf, vfprintf, vsnprintf */
    va_end(ap);

    exit(0);
}

struct addrinfo *host_serv(const char *host, const char *serv, int family, int socktype)
{
    struct addrinfo hints, *res;
    bzero(&hints, sizeof(struct addrinfo));

    hints.ai_flags = AI_CANONNAME;
    hints.ai_family = family;
    hints.ai_socktype = socktype;

    if ((getaddrinfo(host, serv, &hints, &res)) != 0)
        return NULL;
    
    return res;
}

/**
 *  创建一个TCP套接字并连接到服务器
 */
int tcp_connect(const char *host, const char *serv)
{
    int sockfd, n;
    struct addrinfo hints, *res, *ressave;

    bzero(&hints, sizeof(struct addrinfo));
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;

    if((n = getaddrinfo(host, serv, &hints, &res)) != 0){
        err_quit("tcp_connect error for %s, %s: %s\n", host, serv, gai_strerror(n));
    }
    
    ressave = res;

    do {
        sockfd = socket(res->ai_family, res->ai_socktype, res->ai_protocol);
        if(sockfd < 0)
            continue;
        if(connect(sockfd, res->ai_addr, res->ai_addrlen) == 0)
            break; /* 成功 */
        
        close(sockfd);
    } while((res = res->ai_next) != NULL);

    if(res == NULL)
        err_quit("tcp_connect error for %s, %s", host, serv);
    
    freeaddrinfo(ressave);

    return sockfd;
}

/**
 * 创建一个TCP套接字并捆绑服务器的众所周知的端口，而接受外来的请求
 */
int tcp_listen(const char *host, const char *serv, socklen_t *addrlenp)
{
    int listend, n;
    const int on = 1;

    struct addrinfo hints, *res, *_res;

    bzero(&hints, sizeof(hints));
    hints.ai_flags = AI_PASSIVE;
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;
    if((n = getaddrinfo(host, serv, &hints, &res) != 0 ))
        err_quit("tcp_listen error for %s, %s: %s", host, serv, gai_strerror(n));

    _res = res;

    do {
        listend = socket(res->ai_family, res->ai_socktype, res->ai_protocol);
        if(listend < 0)
            continue;
        setsockopt(listend, SOL_SOCKET, SO_REUSEADDR, &on, sizeof(on));

        if(bind(listend, res->ai_addr, res->ai_addrlen) == 0)
            break;
        close(listend);
    } while ((res = res->ai_next) != NULL);

    if(res == NULL)
        err_quit("tcp_listen error for %s, %s\n", host, serv);

    listen(listend, LISTENQ); /* UDP套接字不需要调用listen，listen由TCP套接字调用，否则会报Operation not supported on socket错误 */

    if(addrlenp)
        *addrlenp = res->ai_addrlen;
    freeaddrinfo(_res);
    return listend;
}

/**
 * 创建未连接的UDP套接字 
 */
int udp_client(const char *host, const char *serv, struct sockaddr **saptr, socklen_t *lenp)
{
    int n, sockfd;
    struct addrinfo hints, *res, *_res;

    bzero(&hints, sizeof(struct addrinfo));

    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_DGRAM;

    if((n = getaddrinfo(host, serv, &hints, &res)) != 0)
        err_quit("udp_client error for %s, %s: %s", host, serv, gai_strerror(n));

    _res = res;
    do {
        sockfd = socket(res->ai_family, res->ai_socktype, res->ai_protocol);
        if(sockfd >= 0)
            break;
    } while ((res = res->ai_next) != NULL);
    if(res == NULL)
        err_quit("udp_client error for %s, %s", host, serv);
    
    *saptr = malloc(res->ai_addrlen);
    memcpy(*saptr, res->ai_addr, res->ai_addrlen);
    *lenp = res->ai_addrlen;

    freeaddrinfo(_res);
    
    return sockfd;
}

/**
 * 创建已连接套接字。
 * （1）本函数相比udp_client不需要结尾两个参数，调用者可以改用write代替sendto，因此本函数不必返
 * 回一个套接字地址结构及其长度。
 * （2）本函数几乎等同于tcp_connect，差别之一在于UDP套接字上的connect调用不会发送任何东西到对端，
 * 如果存在错误（譬如对端不可达或所指定的端口上没有服务器），调用者就得等到向对端发送一个数据报
 * 之后才能发现。
 */ 
int udp_connect(const char *host, const char *serv)
{
    int sockfd, n;
    struct addrinfo hints, *res, *_res;

    if((n = getaddrinfo(host, serv, &hints, &res)) != 0)
        err_quit("udp_connect error for %s, %s: %s", host, serv, gai_strerror(n));
    
    _res = res;
    do {
        sockfd = socket(res->ai_family, res->ai_socktype, res->ai_protocol);
        if(sockfd == -1)
            continue;
        if(connect(sockfd, res->ai_addr, res->ai_addrlen) == 0)
            break;
        close(sockfd);
    } while((res = res->ai_next) != NULL);

    if(res == NULL)
        err_quit("udp connection error for %s, %s", host, serv);

    freeaddrinfo(_res);

    return sockfd;
}

/**
 * 为UDP服务器创建未连接套接字
 */ 
int udp_server(const char *host, const char *serv, socklen_t *lenptr)
{
    int sockfd, n;
    struct addrinfo hints, *res, *_res;
    
    bzero(&hints, sizeof(struct addrinfo));
    hints.ai_flags = AI_PASSIVE;
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_DGRAM;

    if ((n = getaddrinfo(host, serv, &hints, &res)) != 0)
        err_quit("udp_server error for %s, %s: %s", host, serv, gai_strerror(n));
    
    _res = res;
    do {
        sockfd = socket(res->ai_family, res->ai_socktype, res->ai_protocol);
        if(sockfd == -1)
            continue;
        
        if(bind(sockfd, res->ai_addr, res->ai_addrlen) == 0)
            break;
        
        close(sockfd);
    } while((res = res->ai_next) != NULL);

    if(res == NULL)
        err_quit("udp_server error for %s, %s", host, serv);
    
    if(lenptr)
        *lenptr = res->ai_addrlen;
    freeaddrinfo(_res);

    return sockfd;
}
```
#### 客户端程序
<<<@/clang/src/names/daytimeudpcli.c

#### 服务端程序
<<<@/clang/src/names/daytimeudpsrv.c

## getnameinfo函数
getnameinfo是getaddrinfo函数的互补函数。本函数以协议无关的方式提供主机和服务信息。

```c
#include <netdb.h>

int getnameinfo(const struct addrinfo *sockaddr, socklen_t addrlen,
                char *host, socklen_t hostlen,
                char *serv, socklen_r servlen, int flags); /* 返回：若成功则为0， 出错为非0  */
```

## 可重入函数
gethostbyname是`不可重入（re-entrant）`。
- 由于历史的原因，`gethostbyname`，`gethostbyaddr`、`getservbyname`和`getservbyport`这几个函数是不可重入的，因为它们都返回指向同一个静态结构的指针。

- `inet_pton` 和 `inet_ntop` 总是可重入的， `inet_ntoa` 是不可重入的。

- `getaddrinfo` 可重入的前提是由它调用的函数都可重入。也就是说，它应该调用可重入版本的 `gethostbyname`（以解析主机名）和 `getservbyname`（以解析服务名），本函数返回的结果全部存放在动态分配的内存空间的原因之一就是允许它可重入。

- `getnameinfo` 可重入的前提是由它调用的函数都可以重入。也就是说，它应该调用可重入版本的 `gethosrbyaddr`（以反向解析主机名）和 `getservbyport`（以反向解析服务名）。它的两个结果字符串（分别为主机名和服务名）由调用者分配存储空间，从而允许它们可重入。

## gethostbyname_r和gethostbyaddr_r函数
有两种方法把不可重入的函数改为可重入的函数：
1. 把由不可重入函数填写并返回静态结构的做法改为由调用者分配再由可重入函数填写结构。
2. 由可重入函数调用 `malloc `以动态分配内存空间。

```c
#include <netdb.h>

struct hostent *gethostbyname_r(const char *hostname,
                                struct hostent *result,
                                char *buf, int buflen, int *h_errnop);
struct hostent *gethostbyaddr_r(const char *addr, int len, int type,
                                struct hostent *result,
                                char *buf, int buflen, int *h_errnop);
```

其中result参数由调用者分配并由被调用者填写的hostent结构。
