#include "unpipc.h"

int main(int argc, char const *argv[])
{
    int id, n;
    char *ptr;
    struct shmid_ds buff;

    if(argc != 2)
        err_quit("usage: shmwrite <pathname>");
    
    id = Shmget(Ftok(argv[1], 0), 0, SVSHM_MODE);
    ptr = Shmat(id, NULL, 0);
    Shmctl(id, IPC_STAT, &buff);

    printf("Share memory size is %zu bytes\n", buff.shm_segsz);

    fgets(ptr, buff.shm_segsz, stdin);
    return 0;
}
