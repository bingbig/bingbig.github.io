# readn、writen和readline函数
字节流套接字上的read和write函数所表现的行为不同于通常的文件I/O。字节流套接字上调用read或write函数输入或输出的字节数可能会比请求的数量少，然而这不是bug，原因在于内核中用于套接字的缓冲区可能已经达到了极限，因此需要调用者再次调用read或write函数，以输入或输出剩余的字节。为了以防万一，可以封装这两个函数。

## unp.h
```c
/* file: lib/unp.h */

#include <stdio.h>
#include <unistd.h>
#include <errno.h>
#include <stdlib.h>

/* Miscellaneous constants */
#define MAXLINE 4096 /* max text line length */
```

## readn函数
```c
/* file: lib/readn.c */

#include "unp.h"

/**
 * Read n bytes from a decriptor
 */
ssize_t readn(int fd, void *vptr, size_t n){
    size_t nleft; /* size_t: unsigned int */
    ssize_t nread; /* ssize_t: signed size_t */
    char *ptr;
    
    ptr = vptr;
    nleft = n;
    
    while(nleft > 0){
        if((nread = read(fd, ptr, nleft)) < 0) {
            /**
             * EINTR
             *  write: The call was interrupted by a signal before any data was written. 
             *  read: The call was interrupted by a signal before any data was read.
             *  sem_wait: The call was interrupted by a signal handler.
             *  recv: function was interrupted by a signal that was caught, before any data was available.
             */
            if(errno == EINTR)
                nread = 0;          /* The call was interrupted and call read() again */
            else
                return (-1);
        } else if(nread == 0)
            break;                  /* EOF */
        
        nleft -= nread;
        ptr += nread;
    }

    return (n - nleft);
}

```

## writen函数
```c
/* file: lib/readn.c */

#include "unp.h"

ssize_t writen(int fd, const void *vptr, size_t n)
{
    size_t nleft;
    ssize_t nwriten;
    const char *ptr;

    ptr = vptr;
    nleft = n;
    
    while(nleft > 0){
        if((nwriten = write(fd, ptr, nleft) ) <= 0) {
            if(nwriten < 0 && errno == EINTR)
                nwriten = 0;        /* call write() again */
            else
                return -1;
        }

        nleft -= nwriten;
        ptr += nwriten;
    }

    return n;
}

```

## readline 函数
```c
#include "unp.h"

static int	read_cnt;
static char	*read_ptr;
static char	read_buf[MAXLINE];

static ssize_t
my_read(int fd, char *ptr)
{

	if (read_cnt <= 0) {
again:
		if ( (read_cnt = read(fd, read_buf, sizeof(read_buf))) < 0) {
			if (errno == EINTR)
				goto again;
			return(-1);
		} else if (read_cnt == 0)
			return(0);
		read_ptr = read_buf;
	}

	read_cnt--;
	*ptr = *read_ptr++;
	return(1);
}

ssize_t
readline(int fd, void *vptr, size_t maxlen)
{
	ssize_t	n, rc;
	char	c, *ptr;

	ptr = vptr;
	for (n = 1; n < maxlen; n++) {
		if ( (rc = my_read(fd, &c)) == 1) {
            *ptr++ = c;
            if (c == '\n'){
                break; /* newline is stored, like fgets() */
            }
				
		} else if (rc == 0) {
            *ptr = 0;
            return(n - 1);	/* EOF, n - 1 bytes were read */
		} else{
            return(-1);		/* error, errno set by read() */
        }
	}

	*ptr = 0;	/* null terminate like fgets() */
	return(n);
}

/* 缓冲区中是否还有数据 */
ssize_t readlinebuf(void **vptrptr)
{
    if(read_cnt)
        *vptrptr = read_ptr;
    return read_cnt;
}
```

::: danger 注意
readline使用静态变量实现跨相继函数调用的状态信息维护，其结果是这些函数变得不可重入或者说非线性安全了。之后会有新的版本来代替。
:::