#include "unp.h"

int main(int argc, char const *argv[])
{
    char **pptr;

    struct hostent *hptr;
    char str[INET6_ADDRSTRLEN];

    while(--argc){
        ++argv;
        if ((hptr = gethostbyname(*argv)) == NULL)
        {
            err_msg("gethostname error for host: %s: %s", *argv, hstrerror(h_errno));
            continue;
        }

        printf("official hostname: %s\n", hptr->h_name);

        for (pptr = hptr->h_aliases; *pptr != NULL; ++pptr)
            printf("\t alias: %s\n", *pptr);

        
        switch (hptr->h_addrtype)
        {
            case AF_INET:
                pptr = hptr->h_addr_list;
                for(;*pptr!=NULL;++pptr){
                    printf("\taddress: %s\n", inet_ntop(hptr->h_addrtype, *pptr, str, sizeof(str)));
                }
                break;
        
            default:
                err_sys("unknown address type");
                break;
        }
    }
    return 0;
}
