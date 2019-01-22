#include <netdb.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdarg.h>
#include <arpa/inet.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <syslog.h>
#include <fcntl.h>

#define MAX_BUFF_SIZE   1024
#define LISTENQ 5
#define MAX_FD_SIZE 64

int is_daemon_proc;

void err_msg(const char *, va_list);
void err_printf(const char *, ...);
void err_quit(const char *, ...);
struct addrinfo *host_serv(const char *, const char *, int, int);
int tcp_connect(const char *, const char *);
int tcp_listen(const char *, const char *, socklen_t *);
int udp_client(const char *, const char *, struct sockaddr **, socklen_t *);
int udp_connect(const char *, const char *);
int udp_server(const char *, const char *, socklen_t *);
int daemon_init(const char *, int);