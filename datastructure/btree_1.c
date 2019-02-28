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
void printBinaryTree(BTree *bt);

BTree *createBinaryTreeFromString(char *btree_string)
{
    char *c = btree_string;
    BTree *STACK[1024], *root, *node, *p;
    int flag = 0, top = -1;

    while(*c)
    {
        switch(*c){
            case '(':
                flag = 1;   // left tree
                STACK[++top] = p;
                break;
            case ')':
                --top;
                break;
            case ',':
                flag = 2;   // right tree
                break;
            case '@':
                return root;
                break;
            default:
                p = (BTree *)malloc(sizeof(BTree));
                p->data = *c;
                p->ltree = NULL;
                p->rtree = NULL;
                if(flag == 0)
                    root = p;
                else if(flag == 1)
                    STACK[top]->ltree = p;
                else if(flag == 2)
                    STACK[top]->rtree = p;
        }

        c++;
    }

    return root;
}

void printBinaryTree(BTree *bt)
{
    
}



int main()
{

    char *p = "A(B(D,E),C(F(,H)))@";
    BTree *bt = createBinaryTreeFromString(p);
    printBinaryTree(bt);

    return 1;
}