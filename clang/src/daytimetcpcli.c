#include "lib/unp.h"


int main(int argc, char const *argv[])
{
    int sockfd, n;
    char recvline[MAXLINE + 1];
    struct sockaddr_in servaddr;
    struct in_addr in_val;

    if(argc != 2){
        perror("usage: ./a.out <ip address>");
    }

    if((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0)
        perror("socket error");
    
    memset(&servaddr, 0, sizeof(servaddr));

    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(8000);
    servaddr.sin_addr.s_addr = inet_addr(argv[1]);

    if (connect(sockfd, (struct sockaddr *)&servaddr, sizeof(servaddr)) < 0)
    {
        perror("connect error");
    }
    printf("connecting on %s:%hu\n", inet_ntop(AF_INET, &servaddr.sin_addr, recvline, sizeof(recvline)), ntohs(servaddr.sin_port));

    while((n = read(sockfd, recvline, MAXLINE)) > 0){
        recvline[n] = 0;
        if(fputs(recvline, stdout) == EOF)
            perror("fputs error");
    }

    if(n < 0) perror("read error");
    return 0;
}
