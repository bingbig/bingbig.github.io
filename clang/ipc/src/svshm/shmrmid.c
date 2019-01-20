#include "unpipc.h"

int main(int argc, char const *argv[])
{
    int id;
    int oflag = SVSHM_MODE;
    if(argc != 2)
        err_quit("usage: shmrimid <pathname>");

    id = Shmget(Ftok(argv[1], 0), 0, oflag);
    Shmctl(id, IPC_RMID, NULL);
    
    return 0;
}
