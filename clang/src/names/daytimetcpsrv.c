#include "unp.h"
#include <time.h>

int main(int argc, char const *argv[])
{
    int listenfd, connfd;
    socklen_t   len, addrlen;
    struct sockaddr_storage cliaddr;
    char addrstr[64], buff[MAX_BUFF_SIZE];
    time_t  ticks;

    if(argc == 2)
        listenfd = tcp_listen(NULL, argv[1], &addrlen);
    else if(argc == 3)
        listenfd = tcp_listen(argv[1], argv[2], &addrlen);
    else
        err_quit("usage: daytimetcpsrv [<host>] <service or port>");

    len = sizeof(cliaddr);
    for(;;){
        connfd = accept(listenfd, (struct sockaddr *) &cliaddr, &len);
        if(connfd == -1){
            continue;
        }

        ticks = time(NULL);
        snprintf(buff, MAX_BUFF_SIZE, "%.24s\r\n", ctime(&ticks));
        write(connfd, buff, strlen(buff));
        close(connfd);
    }

    return 0;
}
