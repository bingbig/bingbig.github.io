#include "unpipc.h"

int main(int argc, char **argv)
{
    int c, id, oflag;
    size_t shm_size;
    char *ptr;

    oflag = IPC_CREAT | SVSHM_MODE;
    while ((c = Getopt(argc, argv, "e")) != -1)
    {
        switch (c)
        {
            case 'c':
                oflag |= IPC_EXCL;
                break;
        }
    }

    if(optind != argc - 2)
        err_quit("usage:shmget [ -e ] <pathname> <size>");

    shm_size = atoi(argv[optind + 1]);

    id = Shmget(Ftok(argv[optind], 0), shm_size, oflag);
    ptr = Shmat(id, NULL, 0);

    return 0;
}
