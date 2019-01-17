#include "unp.h"
#include <time.h>

int main(int argc, char const *argv[])
{
    int sockfd, n;
    char buff[MAX_BUFF_SIZE];
    struct sockaddr_storage cliaddr;
    socklen_t len;
    time_t ticks;

    if (argc == 2)
        sockfd = udp_server(NULL, argv[1], NULL);
    else if(argc == 3)
        sockfd = udp_server(argv[1], argv[2], NULL);
    else
        err_quit("usage: daytimeudpsrv [<host>] <service or port>");
    
    len = sizeof(cliaddr);
    for(;;) {
        n = recvfrom(sockfd, buff, MAX_BUFF_SIZE, 0, (struct sockaddr *)&cliaddr, &len);
        printf("received a datagram with %d bytes\n", n);
        ticks = time(NULL);
        snprintf(buff, sizeof(buff), "%.24s\r\n", ctime(&ticks));
        sendto(sockfd, buff, strlen(buff), 0, (struct sockaddr *)&cliaddr, len);
    }
    
    return 0;
}
