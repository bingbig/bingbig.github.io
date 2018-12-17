# 套接字编程简介

## 套接字地址结构
### IPv4套接字地址结构

```c
/* 定义在<netinet/in.h> 头文件中*/
struct in_addr {
    in_addr_t s_addr; /* 32位IPv4地址，网络字节序 */
};

struct sockaddr_in {
    unit8_t 		sin_len;	/* 结构体的长度（16） */
  	sa_family_t		sin_family;	/* AF_INET */
  	in_port_t		sin_port;	/* 16位的TCP或UDP端口号 */
  	struct in_addr	sin_addr;	/* 32位的IPv4地址，网络字节序 */
  	char			sin_zero[8];/* 未使用 */
}
```
### 通用套接字地址结构

```c
/*  */
```

