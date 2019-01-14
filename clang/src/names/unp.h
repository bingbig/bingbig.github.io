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