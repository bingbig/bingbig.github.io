/* file: src/tcpcliserv/tcpserv01.c */
#include "../lib/unp.h"

void sig_chld_handler(int signo)
{
    pid_t pid;
    int stat;

    while ((pid = waitpid(-1, &stat, WNOHANG)) > 0)
    {
        printf("child %d terminated\n", pid);
        return;
    }
    perror("waitpid error");
}

int main(int argc, char const *argv[])
{
    int                     listenfd, connfd;
    pid_t                   childpid;
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
    
    signal(SIGCHLD, sig_chld_handler);
    for(;;) {
        cliaddr_len = sizeof(cliaddr);
        connfd = accept(listenfd, (struct sockaddr *) &cliaddr, &cliaddr_len);
        if (connfd < 0) {
            if (errno == EINTR)
                continue;
            else {
                perror("accept error");
                exit(0);
            }
        }
            
        
        childpid = fork();
        if(childpid < 0)
            perror("fork error");
        if(childpid == 0){ /* 子进程 */
            if(close(listenfd) < 0)
                perror("error closing listefd");
            
            str_echo(connfd);
            exit(0);
        }
        printf("child %d connected.\n", childpid);
        if(close(connfd) < 0)  /* 父进程关闭共享的已连接套接字 */
            perror("parent process failed to close connfd");
    }

    return 0;
}
