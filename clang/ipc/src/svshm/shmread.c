#include "unpipc.h"

int main(int argc, char const *argv[])
{
    int id, n;
    char *ptr, c;
    struct shmid_ds buff;

    if (argc != 2)
        err_quit("usage: shmread <pathname>");

    id = Shmget(Ftok(argv[1], 0), 0, SVSHM_MODE);
    ptr = Shmat(id, NULL, 0);
    Shmctl(id, IPC_STAT, &buff);

    for(n = 0; n < buff.shm_segsz; n++)
    {
        c = *ptr++;
        if(c != '\n')
            printf("%c", c);
        else
            printf("^");
    }
    return 0;
}
