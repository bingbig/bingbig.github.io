# TCP 客户/服务器程序示例

在学习如何编写并发服务器程序之前，我们必须了解Unix环境下派生新进程方法——`fork`函数（包括有些系统中的各种变体，但是它是unix中派生新进程的唯一方法）。
```c
#include <unistd.h>
pid_t fork(void);       /* 返回：在子进程中返回为0，在父进程中为子进程的进程ID，若出错则为-1 */
```
父进程调用fork之前打开的所有描述符在fork返回之后由子进程共享。网络服务器利用了这个特性：父进程调用accept之后调用fork。所接受的所有已连接套接字在父进程和子进程之间共享。通常情况下，父进程关闭这个套接字而子进程读写这个已连接套接字。描述符的访问计数值在父进程fork后加1，当父进程调用close关闭描述符时，仅仅是将计数值减1，并不会真正关闭和清理套接字资源。

存放在硬盘上的可执行文件能够被unix执行的唯一方法是：有一个现有的进程调用六个`exec`函数中的某一个（它们统称exec函数）。exec把当前进程映像替换成新的程序文件，而且该新程序通常从main函数开始执行，进程的ID不变。我们称调用exec的进程为`调用进程（calling process）`，称新执行的进程为`新进程（new program）`。
```c
#include <unistd.h>
int execl(const char *pathname, const char *arg0, ... /* (char *) 0 */);
int execv(const char *pathname, char *const *argv[]);
int execle(const char *pathname, const char *arg0, ... /* (char *) 0, char *const envp[] */);
int execve(const char *pathname, char *const argv[], char *const envp[]);
int execlp(const char *filename, const char *arg0, ... /* (char *) 0 */);
int execvp(const char *filename, char *const argv[0]);
```

## TCP回射客户/服务器程序
### unp.h头文件
```c
/* file: src/lib/unp.h */

#include <stdio.h>
#include <unistd.h>
#include <errno.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <arpa/inet.h>

/* Miscellaneous constants */
#define MAXLINE 4096 /* max text line length */

#define LISTENQ 1024 /* 2nd argument to listen() */

#define SERV_PORT 9877       /* TCP and UDP client-servers */
#define SERV_PORT_STR "9877" /* TCP and UDP client-servers */

ssize_t writen(int fd, const void *vptr, ssize_t n)
{
    ssize_t nleft;
    ssize_t nwritten;
    const char *ptr;

    ptr = vptr;
    nleft = n;
    while (nleft > 0)
    {
        if ((nwritten = write(fd, ptr, nleft)) <= 0)
        {
            if (nwritten < 0 && errno == EINTR)
                nwritten = 0;
            else
                return -1;
        }
        nleft -= nwritten;
        ptr += nwritten;
    }

    return n;
}

void str_echo(int sockfd)
{
    char        buf[MAXLINE];
    ssize_t     n;
again:
    while((n = read(sockfd, buf, MAXLINE)) > 0){
        if(writen(sockfd, buf, n) != n)
            perror("writen error: ");
    }
    if(n < 0 && errno == EINTR)
        goto again;
    else if (n < 0)
        perror("str_echo: read_error: ");
}

char * Fgets(char *ptr, int n, FILE *stream)
{
    char *rptr;
    if((rptr = fgets(ptr, n ,stream)) == NULL && ferror(stream))
        perror("fgets error: ");
    return ptr;
}
void Fputs(const char *ptr, FILE *stream)
{
    if(fputs(ptr, stream) == EOF)
        perror("fputs error: ");
}


void str_cli(FILE *fp, int sockfd)
{
    char sendline[MAXLINE], recvline[MAXLINE];
    while(Fgets(sendline, MAXLINE, fp) != NULL) {
        if(write(sockfd, sendline, strlen(sendline)) != strlen(sendline))
            perror("write error:");
        if (read(sockfd, recvline, MAXLINE) < 0)
            perror("str_cli: server terminated prematurely");

        Fputs(recvline, stdout);
    }
}
```

### 服务器程序
<<<@/clang/src/tcpcliserv/tcpserv01.c

### 客户端程序
<<<@/clang/src/tcpcliserv/tcpcli01.c

### 正常启动
```bash
cd src/tcpcliserv/
cc tcpserv01.c -o serv
cc tcpcli01.c -o cli
sudo ./sev
./cli
```
