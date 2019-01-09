#include <netdb.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdarg.h>
#include <arpa/inet.h>

#define MAX_BUFF_SIZE   1024


void err_sys(const char *x)
{
    perror(x);
    exit(1);
}

void err_msg(const char *fmt, ...)
{
    va_list ap;
    char buff[MAX_BUFF_SIZE];

    va_start(ap, fmt);
    vsnprintf(buff, MAX_BUFF_SIZE, fmt, ap);
    perror(buff);
    va_end(ap);
}