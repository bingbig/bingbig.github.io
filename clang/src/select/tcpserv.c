/* file: src/select/tcpserv01.c */
#include "./unp.h"

int main(int argc, char const *argv[])
{
    int                     i, maxi, maxfd, listenfd, connfd, sockfd;
    int                     nready, client[FD_SETSIZE];
    ssize_t                 n;
    fd_set                  rset, allset;
    char                    buf[MAXLINE];
    char                    addstr[20];
    socklen_t               cliaddr_len;
    struct sockaddr_in      cliaddr, servaddr;

    listenfd = socket(AF_INET, SOCK_STREAM, 0);
    if(listenfd < 0)
        perror("socket error");
    
    memset(&servaddr, 0, sizeof(servaddr));
    servaddr.sin_family         = AF_INET;
    servaddr.sin_addr.s_addr    = htonl(INADDR_ANY);
    servaddr.sin_port           = htons(SERV_PORT);

    if (bind(listenfd, (struct sockaddr *) &servaddr, sizeof(servaddr)) < 0)
        perror("bind error");
    
    if(listen(listenfd, LISTENQ) < 0)
        perror("listen error");

    printf("Listening[%d] at %s:%d\n", 
        listenfd, 
        inet_ntop(AF_INET, &servaddr.sin_addr.s_addr, addstr, sizeof(addstr)), 
        SERV_PORT);

    /* 初始化参数 */
    maxfd = listenfd;
    maxi = -1;
    for(i=0; i < FD_SETSIZE; i++)
        client[i] = -1;
    FD_ZERO(&allset);
    FD_SET(listenfd, &allset);

    for(;;) {
        rset = allset;
        nready = select(maxfd+1, &rset, NULL, NULL, NULL);
        if(nready < -1){
            perror("select error");
            exit(0);
        }

        if(FD_ISSET(listenfd, &rset)) {
            cliaddr_len = sizeof(cliaddr);
            connfd = accept(listenfd, (struct sockaddr *)&cliaddr, &cliaddr_len);
            if (connfd < 0)
            {
                if (errno == EINTR)
                    continue;
                else
                {
                    perror("accept error");
                    exit(0);
                }
            }
            printf("client[%d] from %s:%d connected\n", connfd,
                   inet_ntop(AF_INET, &cliaddr.sin_addr.s_addr, addstr, sizeof(addstr)),
                   ntohs(cliaddr.sin_port));

            /* 保存描述符 */
            for (i = 0; i < FD_SETSIZE; i++) {
                if (client[i] < 0){
                    client[i] = connfd;
                    break;
                }
            }
            if (i == FD_SETSIZE){
                perror("too many clients");
                exit(0);
            }

            FD_SET(connfd, &allset);
            /* 保存最大描述符和client[]索引 */
            maxfd = maxfd < connfd ? connfd : maxfd;
            maxi = maxi < i ? i : maxi;
            if(--nready <= 0)
                continue;
        }

        for(i = 0; i <= maxi; i++){
            if((sockfd = client[i]) < 0)
                continue;

            if(FD_ISSET(sockfd, &rset)){
                printf("sockfd[%d] is ready to read\n", sockfd);

                if((n = read(sockfd, buf, MAXLINE)) == 0){
                    printf("client[%d] closed\n", i);
                    close(sockfd);
                    FD_CLR(sockfd, &allset);
                    client[i] = -1;
                } else {
                    write(sockfd, buf, n);
                }
                if(--nready <= 0)
                    break;
            }
        }
    }

    return 0;
}
