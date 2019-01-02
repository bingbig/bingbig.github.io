#include <stdlib.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <stdio.h>
#include <string.h>

#define SERV_UDP_PORT 8765
#define BUFF_SIZE 1024

void err_sys(const char *x)
{
    perror(x);
    exit(1);
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
        len = clilen;
        n = Recvfrom(sockfd, msg, BUFF_SIZE, 0, pcliaddr, &len);

        Sendto(sockfd, msg, n, 0, pcliaddr, len);
    }
}