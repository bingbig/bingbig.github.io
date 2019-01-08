#include "unp.h"

int main(int argc, char const *argv[])
{
    char **pptr;

    struct hostent *hptr;

    while(--argc){
        ++argv;
        if ((hptr = gethostbyname(*argv)) == NULL)
        {
            err_msg("gethostname error for hosrt: %s: %s", ptr, hstrerror(h_errno));
            continue;
        }

        printf("official hostname: %s\n", hptr->h_name);

        for (pptr = hptr->h_aliases; *pptr != NULL; ++pptr)
            printf("\t alias: %s\n", *pptr);

    }
    return 0;
}
