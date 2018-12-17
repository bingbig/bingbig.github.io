/* file: lib/unp.h */

#include <stdio.h>
#include <unistd.h>
#include <errno.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <arpa/inet.h>

/* Miscellaneous constants */
#define MAXLINE 4096 /* max text line length */

#define LISTENQ 1024 /* 2nd argument to listen() */
