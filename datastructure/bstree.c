/**
 * 二叉排序树
 */ 

#include <stdio.h>
#include <stdlib.h>

typedef struct BSTree
{
    int data;
    struct BSTree *ltree, *rtree;
} BSTree;

/**
 * 插入结点
 */ 
void insert(BSTree **ptr, int item)
{
    BSTree *bst;
    if (*ptr == NULL){
        bst = (BSTree *)malloc(sizeof(BSTree));
        bst->data = item;
        bst->ltree = NULL;
        bst->rtree = NULL;
        *ptr = bst;
    }
    else {
        bst = *ptr;
        if (bst->data > item)
            insert(&bst->ltree, item);
        else
            insert(&bst->rtree, item);
    }
    
}

/**
 * 中序遍历
 */ 
void inOrderPrint(BSTree *bst)
{
    if (bst == NULL)
        return;
    inOrderPrint(bst->ltree);
    printf("%d\t", bst->data);
    inOrderPrint(bst->rtree);
}

int main(int argc, char const *argv[])
{
    BSTree *bst;
    insert(&bst, 2);
    insert(&bst, 5);
    insert(&bst, 5);
    insert(&bst, 10);
    insert(&bst, 12);
    insert(&bst, 17);
    insert(&bst, 19);
    insert(&bst, 20);
    inOrderPrint(bst);
    return 0;
}
