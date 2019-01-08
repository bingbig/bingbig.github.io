#include "unp.h"

int main(int argc, char const *argv[])
{
    char *ptr;

    struct hostent *hptr;

    while(--argc){
        ptr = *++argv;
        if((hptr = gethostbyname(ptr)) == NULL){
            err_msg("gethostname error for hosrt: %s: %s", ptr, hstrerror(h_errno));
            continue;
        }

        printf("official hostname: %s\n", hptr->h_name);
    }
    return 0;
}
