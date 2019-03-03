/**
 *              A 
 *            /   \
 *          B      c
 *        /   \   /
 *       D     E F
 *            /   \
 *           G     H
 * 
 *  对于上面这棵树，可以表示成: A(B(D,E),C(F(,H)))@
 *  “@”表示结束。如何由上述的广义表形式建立相应的二叉链表结构呢？
 */

#include <stdio.h>
#include <stdlib.h>

typedef struct BTree
{
    char data;
    struct BTree *ltree, *rtree;
} BTree;

BTree *createBinaryTreeFromString(char *btree_string);
void preOrderPrint(BTree *bt);
int countLeaf(BTree *bt);
int treeDepth(BTree *bt);

BTree *createBinaryTreeFromString(char *btree_string)
{
    char *c = btree_string;
    BTree *STACK[1024], *root, *node, *p;
    int flag = 0, top = -1;

    while (*c)
    {
        switch (*c)
        {
        case '(':
            flag = 1; // left tree
            STACK[++top] = p;
            break;
        case ')':
            --top;
            break;
        case ',':
            flag = 2; // right tree
            break;
        case '@':
            return root;
            break;
        default:
            p = (BTree *)malloc(sizeof(BTree));
            p->data = *c;
            p->ltree = NULL;
            p->rtree = NULL;
            if (flag == 0)
                root = p;
            else if (flag == 1)
                STACK[top]->ltree = p;
            else if (flag == 2)
                STACK[top]->rtree = p;
        }

        c++;
    }

    return root;
}

/**
 * 计算叶结点的数目
 */
int countLeaf(BTree *bt)
{
    if (bt == NULL)
        return 0;

    if (bt->ltree == NULL && bt->rtree == NULL)
        return 1;

    return (countLeaf(bt->rtree) + countLeaf(bt->ltree));
}

/**
 * 计算树的深度
 */
int treeDepth(BTree *bt)
{
    int leftdep, rightdep;
    if (bt == NULL)
        return 0;
    leftdep = treeDepth(bt->ltree);
    rightdep = treeDepth(bt->rtree);
    return leftdep > rightdep ? (leftdep + 1) : (rightdep + 1);
}

/**
 * 前序遍历：
 *  1. 访问根节点
 *  2. 以前序遍历的方式访问根节点的左子树
 *  3. 以前序遍历的方式访问根节点的右子树
 */ 
void preOrderPrint(BTree *bt)
{
    if (bt == NULL)
        return;

    printf("%c\t", bt->data);
    preOrderPrint(bt->ltree);
    preOrderPrint(bt->rtree);
}

/**
 * 中序遍历：
 *  1. 以中序遍历的方式访问根节点的左子树
 *  2. 访问根节点
 *  3. 以中序遍历的方式访问根节点的右子树
 */ 
void inOrderPrint(BTree *bt)
{
    if(bt == NULL)
        return;
    inOrderPrint(bt->ltree);
    printf("%c\t", bt->data);
    inOrderPrint(bt->rtree);
}

/**
 * 后序遍历
 *  1. 以后序遍历的方式访问根结点的左子树
 *  2. 以后学遍历的方式访问根基结点的右子树
 *  3. 访问根节点
 */ 
void postOrderPrint(BTree *bt)
{
    if(bt == NULL)
        return;
    postOrderPrint(bt->ltree);
    postOrderPrint(bt->rtree);
    printf("%c\t", bt->data);
}

/**
 * 按层次遍历
 *  使用队列遍历树
 */ 
void layerOrderPrint(BTree *bt)
{
    BTree *QUEUE[50], *p;
    int front, rear;
    if(bt == NULL)
        return;
    QUEUE[0] = bt;
    front = -1;
    rear = 0;
    while(front < rear)
    {
        p = QUEUE[++front];
        printf("%c\t", p->data);
        if(p->ltree != NULL)
            QUEUE[++rear] = p->ltree;
        if(p->rtree != NULL)
            QUEUE[++rear] = p->rtree;
    }
}

int main()
{
    char *p = "A(B(D,E(G)),C(F(,H)))@";
    BTree *bt = createBinaryTreeFromString(p);
    preOrderPrint(bt);
    printf("\n");
    inOrderPrint(bt);
    printf("\n");
    postOrderPrint(bt);
    printf("\n");
    layerOrderPrint(bt);
    printf("\nleaf number: %d\n", countLeaf(bt));
    printf("tree depth: %d\n", treeDepth(bt));
    return 1;
}