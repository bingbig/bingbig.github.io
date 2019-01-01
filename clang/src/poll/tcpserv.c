/* file: src/poll/unp.h */
#include "./unp.h"

int main(int argc, char const *argv[])
{
    int i, maxi, listenfd, connfd, nready, sockfd, n;
    struct sockaddr_in cli_addr, ser_addr;
    struct pollfd clients[OPEN_MAX];
    socklen_t cli_len;
    char buf[MAXLINE];

    listenfd = unpSocket(AF_INET, SOCK_STREAM, 0);
    
    bzero(&ser_addr, sizeof(ser_addr));
    ser_addr.sin_family = AF_INET;
    ser_addr.sin_addr.s_addr = htonl(INADDR_ANY);
    ser_addr.sin_port = htons(SERV_PORT);
    unpBind(listenfd, (struct sockaddr *) &ser_addr, sizeof(ser_addr));
    unpListen(listenfd, LISTENQ);

    clients[0].fd = listenfd;
    clients[0].events = POLLRDNORM;

    for(i=1;i<OPEN_MAX;i++)
        clients[i].fd = -1;
    maxi = 0;

    cli_len = sizeof(cli_addr);

    while(1){
        nready = unpPoll(clients, maxi+1, INFTIM);
        /* 处理监听套接字事件 */
        if(clients[0].revents & POLLRDNORM){
            connfd = unpAccept(listenfd, (struct sockaddr *)&cli_addr, &cli_len);
            for(i=1;i<OPEN_MAX;i++){
                if(clients[i].fd < 0){
                    printf("clients[%d] connected in\n", i);
                    clients[i].fd = connfd;
                    break;
                }
            }

            if(i == OPEN_MAX)
                err_sys("to many clients");
            
            clients[i].events = POLLRDNORM;
            maxi = max(maxi, i);
            if(--nready <= 0)
                continue;
        }

        /* 检测所有的客户端数据 */
        for(i=1;i<=maxi;i++){
            if((sockfd = clients[i].fd) < 0)
                continue;
            if (clients[i].revents & (POLLRDNORM | POLLERR))
            {
                if ((n = read(sockfd, buf, MAXLINE)) == -1) {
                    if(errno == ECONNRESET){
                        printf("client[%d] aborted connection\n", i);
                        unpClose(clients[i].fd);
                        clients[i].fd = -1;
                    }
                    else {
                        err_sys("read error");
                    }
                } else if(n == 0){
                    printf("client[%d] closed connection\n", i);
                    unpClose(clients[i].fd);
                    clients[i].fd = -1;
                } else {
                    unpWrite(sockfd, buf, n);
                }

                if(--nready <= 0)
                    break;
            }
        }
    }

    return 0;
}
