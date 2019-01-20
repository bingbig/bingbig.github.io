# System V共享内存区
System V共享内存区在概念上类似Posix共享内存区。对于每个共享内存区，内核维护如下信息结构，它定义在`<sys/shm.h>`头文件中。

```c
struct shmid_ds
{
	struct ipc_perm shm_perm;	/* Operation permission value */
	size_t		shm_segsz;	    /* Size of segment in bytes */
	pid_t		shm_lpid;	    /* PID of last shared memory op */
	pid_t		shm_cpid;	    /* PID of creator */
	shmatt_t	shm_nattch;	    /* Number of current attaches */
	time_t		shm_atime;	    /* Time of last shmat() */
	time_t		shm_dtime;	    /* Time of last shmdt() */
	time_t		shm_ctime;	    /* Time of last shmctl() change */
	void		*shm_internal;	/* reserved for kernel use */
};
```

## shmget 函数
```c
#include <sys/shm.h>

int shmget(key_t key, size_t size, int oflag); /* 返回： 若成功则共享内存区对象，若出错则为 -1 */
```
`shmget`函数创建一个新的共享内存区，或者访问一个已经存在的共享内存区。

`key`的值既可以是`ftok`的返回值，也可以是`IPC_PRIVATE`。

`size`以字节为单位指定内存区的大小。新建共享内存区时必须指定不为0的值，访问一个已存在的则应为0。

`oflag`是指读写权限值的组合，它还可以与`IPC_CREATE`或`IPC_CREAT|IPC_EXCL`按位或。（IPC_CREATE：Create entry if key does not exist；IPC_EXCL：Fail if key exists）。
返回值是一个称为`共享内存区标识符(shared memory identifier)`的整数。


## shmat 函数
```c
#include <sys/shm.h>

void *shmat(int shmid, const void *shmaddr, int flag); /* 返回：成功返回映射区的起始地址，若出错返回 -1 */
```
由shmget创建或者打开的共享内存区后，通过嗲用shmat把它附接到调用进程的地址空间。
shmid是标识符，shmat返回值是所指定的共享内存区在调用进程内的起始地址。
- 如果shmaddr是空指针，那么系统替调用者选择地址，推荐使用；
- 如果shmaddr非空，返回地址取决于调用者是否给flag参数指定了`SHM_RND`值：
    - 如果没有指定SHM_RND值，那么相应的内存附接到由shmaddr参数指定的地址
    - 如果有，那么相应的共享内存区附接到由shmaddr参数指定的地址向下舍入一个SHMLAB常值。LAB代表低端边界地址（Lower boundary address）。

默认情况下，只要调用进程具有某个共享内存区的读写权限，它附接到该内存后就能够同时读写该内存区。flag参数也可以指定 `SHM_RDONLY`值，限定只读。

## shmdt 函数
```c
#include <sys/shm.h>

int shmdt(const void *shmaddr); /* 返回：成功返回0，若出错返回 -1 */
```
当一个进程完成某个共享内存区的使用时，调用shmdt断接这个内存区。但不会删除所指定的共享内存区。

## shmctl 函数
```c
#include <sys/shm.h>

int shmctl(int shmid, int cmd, struct shmid_ds *buff); /* 返回：成功返回0，若出错返回 -1 */
```
shmctl函数提供了对一个共享内存区的多种操作：
- IPC_RMID

从系统中删除由shmid表示的共享内存区

- IPC_SET

给所指定的共享内存区设置其shmid_ds结构的以下三个成员：shm_perm.uid, shm_perm.gid, shm_perm.mode，它们的值来自buff参数所指向的结构体中的相应成员。shm_ctime的值也用当前时间替换。

- IPC_STAT

通过buff参数向调用者返回所指定共享内存区当前的shmid_ds结构。

## 示例
### 头文件unpipc.h
```c
#include <unistd.h>
#include <stdlib.h>
#include <sys/shm.h>
#include <stdio.h>
#include <stdarg.h>
#include <sys/ipc.h>

#define MAX_BUFF_SIZE 1024
#define SVSHM_MODE (SHM_R | SHM_W | SHM_R >> 3 | SHM_R >> 6)

void err_msg(const char *fmt, va_list ap)
{
    char buff[MAX_BUFF_SIZE];
    vsnprintf(buff, MAX_BUFF_SIZE, fmt, ap);
    perror(buff);
}

void err_printf(const char *fmt, ...)
{
    va_list ap;
    va_start(ap, fmt);
    err_msg(fmt, ap);
    va_end(ap);
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    char buff[MAX_BUFF_SIZE];

    va_start(ap, fmt);
    err_msg(fmt, ap); /* we can pass the args only to functions that 
                        take va_args as argument. These have a v in 
                        their name: vprintf, vfprintf, vsnprintf */
    va_end(ap);

    exit(0);
}

int Getopt(int argc, char * const *argv, const char *str)
{
    int opt;
    if ((opt = getopt(argc, argv, str)) == '?')
        exit(1);

    return opt;
}

key_t Ftok(const char *pathname, int id)
{
    key_t key;
    if((key = ftok(pathname, id)) == -1)
        err_quit("ftok error for pathname '%s' and id '%d'", pathname, id);
    
    return key;
}

int Shmget(key_t key, size_t size, int flags)
{
    int rc;
    if((rc = shmget(key, size, flags)) == -1)
        err_quit("shmget error");
    return rc;
}

void *Shmat(int id, const void *shmaddr, int flags)
{
    void *ptr;
    if ((ptr = shmat(id, shmaddr, flags)) == (void*) -1)
        err_quit("shmat error");
    return ptr;
}

void Shmdt(const void *shmaddr)
{
    if(shmdt(shmaddr) == -1)
        err_quit("shmdt error");
}


void Shmctl(int id, int cmd, struct shmid_ds *buff)
{
    if(shmctl(id, cmd, buff) == -1)
        err_quit("shmctl error");
}

```

### shmget.c
<<<@/clang/ipc/src/svshm/shmget.c

### shrmid.c
<<<@/clang/ipc/src/svshm/shrmid.c

### shmwrite.c
<<<@/clang/ipc/src/svshm/shmwrite.c

### shmread.c
<<<@/clang/ipc/src/svshm/shmread.c


### Makefile
```makefile
shmget.o: shmget.c unpipc.h
	$(CC) -c $^
shmget:	shmget.o
	$(CC) $^ -o $@

shmrmid.o: shmrmid.c unpipc.h
	$(CC) -c $^
shmrmid: shmrmid.o
	$(CC) $^ -o $@

shmwrite.o: shmwrite.c unpipc.h
	$(CC) -c $^
shmwrite: shmwrite.o
	$(CC) $^ -o $@

shmread.o: shmread.c unpipc.h
	$(CC) -c $^
shmread: shmread.o
	$(CC) $^ -o $@

.PHONY: all clean
all: shmget shmrmid shmwrite shmread
clean:
	rm *.o shmget *gch shmrmid shmwrite shmread

```
