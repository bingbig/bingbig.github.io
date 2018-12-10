# 字节排序函数
>考虑一个16位的整数，它由2个直接组成。在内存中，存储这16位整数的方法有两种：
>1. 将底序字节存储在起始地址，这称为小端（little-endian）字节序；
>2. 将高序字节存储在起始地址，成为大端（big-endian）字节序。

可以用C代码验证你的机器是那种存储方式：
```c
#include <stdio.h>

int main(int argc, char const *argv[])
{
    union 
    {
        short s;
        char c[sizeof(short)];
    } un;

    un.s = 0x0102; /* 二进制为：100000010 */

    if(sizeof(short) == 2){
        if(un.c[0] == 1 && un.c[1] == 2)
            printf("big-endian\n");
        else if(un.c[0] == 2 && un.c[1] == 1)
            printf("little-endian\n");
        else
            printf("unknown!\n");
    }
    else
        printf("The short size is not 2!\n");
    
    return 0;
}
```

由于历史的原因和POSIX规范的规定，套接字地址结构中的某些字段必须按照网络字节序进行维护，因此我们要关注如何在主机字节序和网络字节序之间互相转换。这两种字节序之间的转换使用以下四个函数。

```c
#include <netinet/in.h>

/* 返回网络字节序 */
u_int16_t htons(u_int16_t host16bitvalue);
u_int32_t htonl(u_int32_t host32bitvalue);

/* 返回主机字节序 */
u_int16_t ntohs(u_int16_t net16bitvalue);
u_int32_t ntohl(u_int32_t net32bitvalue);

```
在这些字节序函数中，`h`代表`host`， `n` 代表 `network`， `s` 代表 `short`，`l`代表`long`。

当使用这些函数时，我们不需要关心主机字节序和网络字节序的到底是什么，我们只需要调用适当的调整函数在主机和网络之间转换某个值。在那些和网际协议所用字节序（**大端**）相同的系统中，这四个函数通常被定义为空宏。