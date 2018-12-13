#include <unistd.h>
#include <errno.h>
#include <stdio.h>

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

#ifndef main
#include <fcntl.h>
int main()
{
    int fh = open("./test.txt", O_RDWR | O_CREAT, 0777);
    writen(fh, "those words should be writen in.\n", 34);
    close(fh);
}
#endif