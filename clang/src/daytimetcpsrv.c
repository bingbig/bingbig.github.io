#include "lib/unp.h"
#include <time.h>

int main(int argc, char const *argv[])
{
    int listenfd, connfd;
    socklen_t len;
    struct sockaddr_in servaddr, cliaddr;
    char buff[MAXLINE];
    time_t ticks;

    listenfd = socket(AF_INET, SOCK_STREAM, 0);
    memset(&servaddr, 0, sizeof(servaddr));

    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = inet_addr("127.0.0.1");
    servaddr.sin_port = htons(8000);

    if(bind(listenfd, (struct sockaddr *)&servaddr, sizeof(servaddr)) < 0)
        perror("bind error");
    char addr[MAXLINE];
    printf("binding on %s:%hu\n", inet_ntop(AF_INET, &servaddr.sin_addr, addr, sizeof(addr)), ntohs(servaddr.sin_port));

    if(listen(listenfd, LISTENQ) < 0)
        perror("listen error");
    
    
    for(;;)
    {
        len = sizeof(cliaddr);
        connfd = accept(listenfd, (struct sockaddr *) &cliaddr, &len);
        if(connfd < -1) perror("accept error");

        char addr[MAXLINE];
        printf("A client from %s:%hu connected in \n", inet_ntop(AF_INET, &cliaddr.sin_addr, addr, sizeof(addr)), ntohs(cliaddr.sin_port));

        ticks = time(NULL);
        snprintf(buff, sizeof(buff), "%.24s\r\n", ctime(&ticks));
        if(write(connfd, buff, strlen(buff)) < -1)
            perror("write error");

        close(connfd);
    }
    
    return 0;
}
