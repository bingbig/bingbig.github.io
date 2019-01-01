/* file: src/poll/unp.h */

#include <stdio.h>
#include <unistd.h>
#include <errno.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <arpa/inet.h>
#include <sys/poll.h>
#include <sys/time.h>

#define min(a, b) ((a) < (b) ? (a) : (b))
#define max(a, b) ((a) > (b) ? (a) : (b))

/* Miscellaneous constants */
#define MAXLINE 4096 /* max text line length */
#define UNP_ERR -1
#define UNP_OK 0

#define LISTENQ 1024 /* 2nd argument to listen() */

#define SERV_PORT 9877       /* TCP and UDP client-servers */
#define SERV_PORT_STR "9877" /* TCP and UDP client-servers */

#define OPEN_MAX 10240       /* max open files per process - todo, make a config option? */
#define INFTIM (-1)          /* infinite poll timeout */

void err_sys(const char *x)
{
    perror(x);
    exit(1);
}

int unpSocket(int family, int type, int protocol)
{
    int n;
    n = socket(family, type, protocol);
    if (n < 0)
        err_sys("socket error");
    return n;
}

void unpConnect(int sockfd, const struct sockaddr *sa, socklen_t sa_len)
{
    if (connect(sockfd, sa, sa_len) < 0)
        err_sys("connect error");
}

void unpBind(int sockfd, const struct sockaddr *sa, socklen_t sa_len)
{
    if (bind(sockfd, sa, sa_len) < 0)
        err_sys("bind error");
}

void unpListen(int sockfd, int backlog)
{
    if (listen(sockfd, backlog) < 0)
        err_sys("listen error");
}

int unpAccept(int sockfd, struct sockaddr *cliaddr, socklen_t *addr_len)
{
    int n;
    n = accept(sockfd, cliaddr, addr_len);
    if (n < 0)
        err_sys("accept error");
    return n;
}

void unpClose(int sockfd)
{
    if (close(sockfd) < 0)
        err_sys("close error");
}

int unpRead(int fd, char *buf, int count)
{
    ssize_t nread, totlen = 0;

    while (totlen != count)
    {
        nread = read(fd, buf, count - totlen);
        if (nread == 0)
            return totlen;
        if (nread == -1)
            return -1;
        totlen += nread;
        buf += nread;
    }
    return totlen;
}

int unpWrite(int fd, char *buf, int count)
{
    ssize_t nwritten, totlen = 0;
    while (totlen != count)
    {
        nwritten = write(fd, buf, count - totlen);
        if (nwritten == 0)
            return totlen;
        if (nwritten == -1)
            return -1;
        totlen += nwritten;
        buf += nwritten;
    }
    return totlen;
}

int unpPoll(struct pollfd *fdarray, unsigned long nfds, int timeout)
{
    unsigned long n;
    n = poll(fdarray, nfds, timeout);
    if(n == -1)
        err_sys("poll error");
    return n;
}