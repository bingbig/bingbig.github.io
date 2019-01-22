#include "unp.h"

int daemon_init(const char *pname, int facility)
{
    int i;
    pid_t pid;

    /* 退出父进程，留下子进程继续运行 */
    if ((pid = fork()) < 0){
        return -1;
    }
    else if (pid){
        printf("parent process exited\n");
        exit(0);
    }

    /* 创建一个新的session。当前进程称为新会话的会话头进程以及新进程组的进程组头进程，从而不再有控制终端 */
    if (setsid() < 0)
        return -1;

    /**
     * 忽略SIGHUP并再次fork
     * 再次fork的目的是确保本守护进程将来即使打开了一个终端设备，也不会自动获得控制终端。当没有控制终端的一个
     * 会话头进程打开了一个终端设备时会自动成为这个会话头进程的控制终端。再次调用fork之后我们确保新的子进程不
     * 再是一个会话头进程，从而不能自动获得一个控制终端。当会话头进程终止时，其会话中的所有进程都会收到SIHUP信号。
     */
    signal(SIGHUP, SIG_IGN);
    if ((pid = fork()) < 0)
        return -1;
    else if (pid)
    {
        printf("1st child process exited\n");
        printf("Daemon process id is %d\n", pid);
        exit(0);
    }

    is_daemon_proc = 1;

    /**
     * 把工作目录改到根目录下。避免出现文件系统无法卸载的问题。
     */
    chdir("/");
    printf("change workdir to root\n");

    /**
     * 关闭所有可能打开的描述符
     */
    for (i = 0; i < MAX_FD_SIZE; i++)
        close(i);

    /**
     * Presumably file descriptors 0, 1, and 2 have already been closed when this code executes, 
     * and there are no other threads which might be allocating new file descriptors. In this 
     * case, since open is required to always allocate the lowest available file descriptor 
     * number, these three calls to open will yield file descriptors 0, 1, and 2, unless they 
     * fail.
     * 
     * https://stackoverflow.com/questions/4263173/redirecting-stdin-stdout-stderr-to-dev-null-in-c
     */
    open("/dev/null", O_RDONLY);
    open("/dev/null", O_RDWR);
    open("/dev/null", O_RDWR);

    openlog(pname, LOG_PID, facility);

    return 0;
}