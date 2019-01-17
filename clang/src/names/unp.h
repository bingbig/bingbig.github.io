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