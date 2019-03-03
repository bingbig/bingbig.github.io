/**
 * 
 * 已知非空二叉树采用顺序存储结构，结点的数据信息依次存放在数组BT[0..MaxN - 1]中（若元素值为0，
 * 表示该元素对应的结点在二叉树中不存在）。写出该二叉树的二叉链表结构的算法。
 * 
 */ 

#include <stdio.h>
#include <stdlib.h>

#define MaxN 15

typedef struct BTree
{
    int data;
    struct BTree *ltree, *rtree;
} BTree;

BTree *createBinaryTreeFromArray(int *BT);
void preOrderPrint(BTree *bt);

BTree *createBinaryTreeFromArray(int *BT)
{
    BTree *root, *p[MaxN];
    int i, j;

    p[0] = malloc(sizeof(BTree));
    p[0]->data = BT[0];
    p[0]->ltree = NULL;
    p[0]->rtree = NULL;
    root = p[0];
    for(i = 1; i < MaxN; i++)
    {
        if(BT[i] != 0){
            p[i] = malloc(sizeof(BTree));
            p[i]->data = BT[i];
            p[i]->ltree = NULL;
            p[i]->rtree = NULL;
            j = (i - 1) / 2;
            if(i - j * 2 - 1 == 0)
                p[j]->ltree = p[i];
            else
                p[j]->rtree = p[i];
        }
    }

    return root;
}

void preOrderPrint(BTree *bt)
{
    if (bt == NULL)
    {
        return;
    }

    printf("%d\t", bt->data);
    preOrderPrint(bt->ltree);
    preOrderPrint(bt->rtree);
}

int main(int argc, char const *argv[])
{
    int BT[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15};

    BTree *bt = createBinaryTreeFromArray(BT);
    preOrderPrint(bt);
    
    return 0;
}
