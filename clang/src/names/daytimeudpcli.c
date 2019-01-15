#include "unp.h"

int main(int argc, char const *argv[])
{
    int sockfd, n;
    struct sockaddr *sa;
    socklen_t salen;
    char recvline[MAX_BUFF_SIZE];

    if (argc != 3)
        err_quit("usage: daytimeudpcli <hostname/ip address> <services/port>");

    sockfd = udp_client(argv[1], argv[2], &sa, &salen);
    char addrptr[128];
    struct sockaddr_in *sin = (struct sockaddr_in *) sa;
    printf("sending to %s\n", inet_ntop(AF_INET, &sin->sin_addr, addrptr, sizeof(addrptr)));

    sendto(sockfd, "", 1, 0, sa, salen);

    n = recvfrom(sockfd, recvline, MAX_BUFF_SIZE, 0, NULL, NULL);
    recvline[n] = 0;
    fputs(recvline, stdout);
    
    return 0;
}

