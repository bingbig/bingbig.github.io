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
    while (nwritten != count)
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

        n = Read(sockfd, recvline, BUFF_SIZE);

        recvline[n] = 0;
        Fputs(recvline, stdout);

        bzero(&sendline, BUFF_SIZE);
        bzero(&recvline, BUFF_SIZE+1);
    }
}