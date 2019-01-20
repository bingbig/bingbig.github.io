#include <unistd.h>
#include <stdlib.h>
#include <sys/shm.h>
#include <stdio.h>
#include <stdarg.h>
#include <sys/ipc.h>

#define MAX_BUFF_SIZE 1024
#define SVSHM_MODE (SHM_R | SHM_W | SHM_R >> 3 | SHM_R >> 6)

void err_msg(const char *fmt, va_list ap)
{
    char buff[MAX_BUFF_SIZE];
    vsnprintf(buff, MAX_BUFF_SIZE, fmt, ap);
    perror(buff);
}

void err_printf(const char *fmt, ...)
{
    va_list ap;
    va_start(ap, fmt);
    err_msg(fmt, ap);
    va_end(ap);
}

void err_quit(const char *fmt, ...)
{
    va_list ap;

    char buff[MAX_BUFF_SIZE];

    va_start(ap, fmt);
    err_msg(fmt, ap); /* we can pass the args only to functions that 
                        take va_args as argument. These have a v in 
                        their name: vprintf, vfprintf, vsnprintf */
    va_end(ap);

    exit(0);
}

int Getopt(int argc, char * const *argv, const char *str)
{
    int opt;
    if ((opt = getopt(argc, argv, str)) == '?')
        exit(1);

    return opt;
}

key_t Ftok(const char *pathname, int id)
{
    key_t key;
    if((key = ftok(pathname, id)) == -1)
        err_quit("ftok error for pathname '%s' and id '%d'", pathname, id);
    
    return key;
}

int Shmget(key_t key, size_t size, int flags)
{
    int rc;
    if((rc = shmget(key, size, flags)) == -1)
        err_quit("shmget error");
    return rc;
}

void *Shmat(int id, const void *shmaddr, int flags)
{
    void *ptr;
    if ((ptr = shmat(id, shmaddr, flags)) == (void*) -1)
        err_quit("shmat error");
    return ptr;
}

void Shmdt(const void *shmaddr)
{
    if(shmdt(shmaddr) == -1)
        err_quit("shmdt error");
}


void Shmctl(int id, int cmd, struct shmid_ds *buff)
{
    if(shmctl(id, cmd, buff) == -1)
        err_quit("shmctl error");
}
