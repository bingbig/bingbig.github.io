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
    char *p = btree_string;
    BTree STACK[1024], *root;
    char d;
    while(*p)
    {
        d = *p;
        switch(d){
            case '(':
                break;
            case ')':
                break;
            case ',':
                break;
            case '@':
                break;
            default:
                
        }

        p++;
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