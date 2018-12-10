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