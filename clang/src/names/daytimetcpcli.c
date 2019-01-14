#include "unp.h"

int main(int argc, char const *argv[])
{
    int sockfd, n;
    socklen_t len;
    struct sockaddr_storage ss;
    char recvline[MAX_BUFF_SIZE], addrptr[128];

    if (argc < 3)
    {
        err_quit("usage: daytimecli hostname/IP port/service");
    }
    
    sockfd = tcp_connect(argv[1], argv[2]);

    len = sizeof(ss);
    getpeername(sockfd, (struct sockaddr *)&ss, &len);

    while((n = read(sockfd, recvline, MAX_BUFF_SIZE-1)) > 0){
        recvline[n] = 0;
        fputs(recvline, stdout);
    }

    exit(0);
}
