# readn、writen和readline函数
字节流套接字上的read和write函数所表现的行为不同于通常的文件I/O。字节流套接字上调用read或write函数输入或输出的字节数可能会比请求的数量少，然而这不是bug，原因在于内核中用于套接字的缓冲区可能已经达到了极限，因此需要调用者再次调用read或write函数，以输入或输出剩余的字节。为了以防万一，可以封装这两个函数。

## readn函数
```c
/* file: lib/readn.c */

#include <unistd.h>
#include <errno.h>

/**
 * Read n bytes from a decriptor
 */
ssize_t readn(int fd, void *vptr, size_t n)
{
    size_t nleft;  /* size_t: unsigned int */
    ssize_t nread; /* ssize_t: signed size_t */
    char *ptr;

    ptr = vptr;
    nleft = n;

    while (nleft > 0)
    {
        if ((nread = read(fd, ptr, nleft)) < 0)
        {
            /**
             * EINTR
             *  write: The call was interrupted by a signal before any data was written. 
             *  read: The call was interrupted by a signal before any data was read.
             *  sem_wait: The call was interrupted by a signal handler.
             *  recv: function was interrupted by a signal that was caught, before any data was available.
             */
            if (errno == EINTR)
                nread = 0; /* The call was interrupted and call read() again */
            else
                return (-1);
        }
        else if (nread == 0)
            break; /* EOF */

        nleft -= nread;
        ptr += nread;
    }

    return (n - nleft);
}
```

## writen函数
```c

```
