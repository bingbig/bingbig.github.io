#include <stdio.h>
#include <stdlib.h>

typedef struct node
{
    int data;
    struct node *link;
} node, *linklist;

linklist create(int data);
int length(linklist list);
int isEmpty(linklist list);
linklist find(linklist list, int data);
void prependNode(linklist *list, int data);
void appendNode(linklist list, int data);
void insertAfterNode(linklist list, node *pos, int data);
int insertAfterIndex(linklist list, int pos, int data);
void deleteNode(linklist *list, int data);
void deleteLinkList(linklist list);
void reverse(linklist *list);
void join(linklist lista, linklist listb);
void printLinkList(linklist list);


// 具体实现
linklist create(int data)
{
    linklist list;
    list = (linklist)malloc(sizeof(node));
    list->data = data;
    list->link = NULL;
    return list;
}

int length(linklist list)
{
    int len = 0;
    linklist p = list;
    while(p != NULL){
        len ++;
        p = p->link;
    }
    return len;
}

int isEmpty(linklist list)
{
    return list == NULL;
}

linklist find(linklist list, int data)
{
    linklist p;
    p = list;
    while(p!=NULL && p->data != data)
        p = list->link;

    return p;
}

void prependNode(linklist *list, int data)
{
    linklist p;
    p = (linklist)malloc(sizeof(node));
    p->data = data;
    p->link = *list;
    *list = p;
}

void appendNode(linklist list, int data)
{
    linklist p, new;
    new = (linklist) malloc (sizeof(node));
    new->data = data;
    new->link = NULL;
    p = list;
    while (p->link != NULL)
        p = p->link;
    
    p->link = new;
}

void printLinkList(linklist list)
{
    linklist p;
    if(list == NULL){
        printf("NULL\n");
        return;
    }
        
    p = list;
    while (p != NULL)
    {
        printf("%d->", p->data);
        p = p->link;
    }
    printf("NULL\n");
}

void insertAfterNode(linklist list, node *pos, int data)
{
    linklist p = (linklist) malloc(sizeof(node));
    if(list == NULL){
        list = p;
        list->link = NULL;
    } else {
        p->link = pos->link;
        pos->link = p;
    }
}

int insertAfterIndex(linklist list, int pos, int data)
{
    linklist p = list, new;
    int j = 0;
    while(j < pos && p != NULL)
    {
        p = p->link;
        j++;
    }

    if(j != pos || p == NULL)
    {
        printf("can not find the %dth node\n", pos);
        return 0;
    }
    
    new = (linklist) malloc(sizeof(node));
    new->link = p->link;
    new->data = data;
    p->link = new;

    return 1;
}

void deleteNode(linklist *list, int data)
{
    linklist p = *list, tmp, d;
    if(p->data == data){
        *list = p->link;
        free(p);
    }
    p = *list;
    tmp = p;

    while(tmp != NULL && tmp->link != NULL)
    {
        if(tmp->link->data == data){
            d = tmp->link;
            tmp->link = d->link;
            free(d);
        }
        tmp = tmp->link;
    }
}

void deleteLinkList(linklist list)
{
    linklist p, tmp;
    p = list;
    while(p != NULL){
        tmp = p->link;
        printf(">>>>p->data: %d\n", p->data);
        free(p);
        p = NULL;
        p = tmp;
    }
    list = NULL;
}

void reverse(linklist *list)
{
    linklist p = *list;
    linklist prev = NULL;
    linklist tmp;

    while(p != NULL){
        tmp = prev;
        prev = p;
        p = p->link;
        prev->link = tmp;
    }
    *list = prev;
}

void join(linklist lista, linklist listb)
{
    linklist tail = lista;
    while(tail->link != NULL){
        tail = tail->link;
    }
    tail->link = listb;
}
