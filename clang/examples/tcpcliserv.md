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
            perror("writen error");
        printf("[cli] %s", buf);
        memset(buf, 0, MAXLINE);
    }
    if(n < 0 && errno == EINTR)
        goto again;
    else if (n < 0)
        perror("str_echo: read_error");
}

char * Fgets(char *ptr, int n, FILE *stream)
{
    char *rptr;
    if((rptr = fgets(ptr, n, stream)) == NULL && ferror(stream)){
        perror("fgets error");
        exit(0);
    }
    return rptr;
}
void Fputs(const char *ptr, FILE *stream)
{
    if(fputs(ptr, stream) == EOF)
        perror("fputs error");
}


void str_cli(FILE *fp, int sockfd)
{
    char sendline[MAXLINE], recvline[MAXLINE];
    Fputs(">>> ", stdout);
    while(Fgets(sendline, MAXLINE, fp) != NULL) {
        if(write(sockfd, sendline, strlen(sendline)) != strlen(sendline))
            perror("write error");
        if (read(sockfd, recvline, MAXLINE) < 0)
            perror("str_cli: server terminated prematurely");
        
        Fputs("[server] ", stdout);
        Fputs(recvline, stdout);
        Fputs(">>> ", stdout);
        memset(sendline, '\0', MAXLINE);
        memset(recvline, '\0', MAXLINE);
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

:::tip 注意
在服务器子进程终止时，会给父进程发送一个`SIGCHLD`信号，这一点在本例中发生了，但是我们没有在代码中捕获该信号，而该信号的默认行为是被**忽略**，父进程没有加以处理，那么子进程就进入了[僵死状态](/Linux/zombie_process.md)。
:::

## POSIX 信号处理
`信号`就是告知进程发生了某个事件的通知，有时也称为`软件中断（software interrupt）`。信号通常是异步的，也就是说进程预先并不知道信号的准确发生时间。

每个信号都一个与之关联的`处置(dispostion)`，也称为`行为(action)`。我们通过调用`sigaction`函数来设定一个信号的处置，并有三种选择。

1. `信号处理函数(signal handler)`：提供信号处理函数，只要有特定的信号发生它就被调用，这种行为被称为`捕获(catching)`信号。有两个信号不能被捕获，他们是`SIGKILL`和`SIGSTOP`。函数原型如下:
```c
void handle(int signo);
```
2. 将信号设定为`SIG_IGN`来忽略它，同样，`SIGKILL`和`SIGSTOP`不能被忽略。
3. 通过设定`SIG_DFL`来弃用它的默认处置。

### signal函数
```c
typedef void Sigfunc(int);

Sigfunc *signal(int signo, Sigfunc *func)
{
	struct sigaction	act, oact;

	act.sa_handler = func;
    /* 
     * sa_mask设置为空集，意味着该信号处理函数运行期间，不阻塞额外的信号。
     * POSIX保证被捕获的信号在其信号处理函数运行期间总是阻塞的。
     * */
	sigemptyset(&act.sa_mask); 
	act.sa_flags = 0;
	if (signo == SIGALRM) {
#ifdef	SA_INTERRUPT
		act.sa_flags |= SA_INTERRUPT;	/* SunOS 4.x */
#endif
	} else {
#ifdef	SA_RESTART
		act.sa_flags |= SA_RESTART;		/* SVR4, 44BSD */
#endif
	}
	if (sigaction(signo, &act, &oact) < 0)
		return(SIG_ERR);
	return(oact.sa_handler);
}
/* end signal */

Sigfunc *
Signal(int signo, Sigfunc *func)	/* for our signal() function */
{
	Sigfunc	*sigfunc;

	if ( (sigfunc = signal(signo, func)) == SIG_ERR)
		err_sys("signal error");
	return(sigfunc);
}
```
:::danger 注意
这里的阻塞不同于我们此前一直使用的名词。这里的阻塞是指阻塞某个信号或者某个信号集，防止它们在阻塞期间递交。此前一直使用的阻塞是指阻塞在某个系统调用上，因为目前没有必要资源可用而等待，直到这些资源变为可用才返回，等待期间进程进入睡眠状态。非阻塞的系统调用是没有必要资源也立即返回，并且告诉调用者发生了这种情况，调用者可以继续调用同一个系统调用。
:::

### POSIX信号语义
1. 一旦安装上了信号处理函数，它便一直安装着（较早的系统是每执行一次就将其拆除）。
2. 在一个信号处理函数运行期间，正被递交的信号是阻塞的。而且，安装处理函数时在传递给sigaction函数的sa_mask信号集中指定的额外信号也被阻塞。我们将sa_mask置为空集，意味着除了被捕获信号外，没有额外的信号被阻塞。
3. 如果一个信号在被阻塞期间产生了一次或者多次，那么该信号被解除阻塞之后通常只递交一次。

### 处理SIGCHLD信号
设置僵尸状态是为了维护子进程的信息，以便父进程在以后某个时候获取。这些信息包括子进程的进程ID、终止状态以及资源利用信息（CPU时间，内存使用量等等）。我们显然不愿意留在僵尸进程，为此我们的程序需要建立俘获SIGCHLD信号的信号处理函数。

在我们的服务端程序中，我们必须在fork第一个子进程之前建立信号处理函数，通过调用：
```c
Signal(SIGCHLD, sig_chld);
```

接着定义`sig_chld`函数信号处理函数，简单的例子如下：
```c
void sig_chld(int signo)
{
	pid_t	pid;
	int		stat;

	pid = wait(&stat);
	printf("child %d terminated\n", pid);
	return;
}
```
:::danger ⚠️
在信号处理函数中调用诸如`printf`之类的标准I/O函数（许多库是不可重入的）是不合适的，我们在此仅仅是一种诊断手段。
:::

当我们在运行的客户端程序端键入EOF时，客户TCP发送FIN给服务器，服务器响应一个ACK。服务器再传递一个EOF给子进程阻塞中的readline，子进程终止。当SIGCHLD信号递交时，父进程阻塞于accept调用，sig_chld函数执行。**既然信号是在父进程阻塞于慢系统调用accept时由父进程捕获的，内核就会使accept返回一个`EINTR`错误（被中断的系统调用）**。慢系统调用，该术语适用于那些可能永远阻塞的系统调用。

### 处理被中断的系统调用
当阻塞于某个慢系统调用的进程捕获某个信号且相应信号处理函数返回时，该系统调用返回一个EINTR错误。有些内核会自动重启某些被中断的系统调用，不过为了移植性，当我们编写捕获信号时必须考虑慢系统调用返回的EINTR。
:::danger ⚠️
connect函数不能被重启，必须重新调用！
:::

