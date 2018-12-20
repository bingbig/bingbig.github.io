/* file: src/lib/unp.h */

#include <stdio.h>
#include <unistd.h>
#include <errno.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <arpa/inet.h>

/* Miscellaneous constants */
#define MAXLINE 4096 /* max text line length */

#define LISTENQ 1024 /* 2nd argument to listen() */

#define SERV_PORT 9877       /* TCP and UDP client-servers */
#define SERV_PORT_STR "9877" /* TCP and UDP client-servers */

ssize_t writen(int fd, const void *vptr, ssize_t n)
{
    ssize_t nleft;
    ssize_t nwritten;
    const char *ptr;

    ptr = vptr;
    nleft = n;
    while (nleft > 0)
    {
        if ((nwritten = write(fd, ptr, nleft)) <= 0)
        {
            if (nwritten < 0 && errno == EINTR)
                nwritten = 0;
            else
                return -1;
        }
        nleft -= nwritten;
        ptr += nwritten;
    }

    return n;
}

void str_echo(int sockfd)
{
    char        buf[MAXLINE];
    ssize_t     n;
again:
    while((n = read(sockfd, buf, MAXLINE)) > 0){
        if(writen(sockfd, buf, n) != n)
            perror("writen error");
        printf("[cli] %s", buf);
        memset(buf, 0, MAXLINE);
    }
    if(n < 0 && errno == EINTR)
        goto again;
    else if (n < 0)
        perror("str_echo: read_error");
}

char * Fgets(char *ptr, int n, FILE *stream)
{
    char *rptr;
    if((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream)){
        perror("fgets error");
        exit(0);
    }
    return rptr;
}
void Fputs(const char *ptr, FILE *stream)
{
    if(fputs(ptr, stream) == EOF)
        perror("fputs error");
}


void str_cli(FILE *fp, int sockfd)
{
    char sendline[MAXLINE], recvline[MAXLINE];
    Fputs(">>> ", stdout);
    while(Fgets(sendline, MAXLINE, fp) != NULL) {
        if(write(sockfd, sendline, strlen(sendline)) != strlen(sendline))
            perror("write error");
        if (read(sockfd, recvline, MAXLINE) < 0)
            perror("str_cli: server terminated prematurely");
        
        Fputs("[server] ", stdout);
        Fputs(recvline, stdout);
        Fputs(">>> ", stdout);
        memset(sendline, '\0', MAXLINE);
        memset(recvline, '\0', MAXLINE);
    }
}