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


// #include <fcntl.h>
// int main()
// {
//     char ptr[200];
//     int fh = open("./test.txt", O_RDONLY, 0777);
//     readn(fh, ptr, 34);
//     close(fh);
//     printf("%s", ptr);
// }
