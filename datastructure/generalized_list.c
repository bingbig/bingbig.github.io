#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int flag;               /* 标志域：0时data存放原子元素数据，1时pointer存放子表第一个元素地址 */
    union
    {
        int data;
        struct node *pointer;
    };
    struct node *link;      /* 同一层的元素通过link链接为一个线性链表 */
} node;

