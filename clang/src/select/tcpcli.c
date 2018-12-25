/* file: src/select/tcpcli01.c */
#include "./unp.h"

int main(int argc, char const *argv[])
{
    int                     sockfd;
    struct sockaddr_in servaddr;
    if(argc != 2) {
        printf("usage: %s <ip address>\n", argv[0]);
        exit(0);
    }

    sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if(sockfd < 0)
        perror("socker error");

    memset(&servaddr, 0, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERV_PORT);
    if(inet_pton(AF_INET, argv[1], &servaddr.sin_addr) < 0)
        perror("inet_pton error");
    
    if(connect(sockfd, (struct sockaddr *) &servaddr, sizeof(servaddr))<0)
        perror("connect error");
    
    str_cli(stdin, sockfd);
    return 0;
}