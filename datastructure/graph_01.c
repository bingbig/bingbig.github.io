/**
 * C 程序示例用来实现【邻接表存储方法】来表示无向图
 */

#include <stdio.h>
#include <stdlib.h>

// 邻接列表结点
typedef struct AdjListNode
{
    int dest;
    int weight;
    struct AdjListNode *next;
} AdjListNode;

// 邻接列表表头
typedef struct AdjList 
{
    char *vertex;
    AdjListNode *head;
} AdjList;

typedef struct Graph
{
    int size;
    struct AdjList *array;
} Graph;

AdjListNode *newAdjListNode(int dest, int weight)
{
    AdjListNode *aln = (AdjListNode *)malloc(sizeof(AdjListNode));
    aln->dest = dest;
    aln->weight = weight;
    aln->next = NULL;
    return aln;
}

Graph *createGraph(int size)
{
    int i;
    Graph *g = (Graph *)malloc(sizeof(Graph));
    g->size = size;
    g->array = (AdjList *)malloc(size * sizeof(AdjList));
    for(i = 0; i < size; i++){
        g->array[i].vertex = NULL;
        g->array[i].head = NULL;
    }
    return g;
}

/**
 * 添加边
 * ！！！没有考虑边已经添加过了的情况！！！
 */ 
void addEdge(Graph *g, int src, int dest, int weight)
{
    AdjListNode *new = newAdjListNode(dest, weight);
    new->next = g->array[src].head;
    g->array[src].head = new;

    // 无向图
    new = newAdjListNode(src, weight);
    new->next = g->array[dest].head;
    g->array[dest].head = new;
}

void setVertex(Graph *g, int idx, char *vertex)
{
    g->array[idx].vertex = vertex;
}

void printGraph(Graph *g)
{
    int size;
    for(size = 0; size < g->size; size++)
    {
        AdjListNode *node = g->array[size].head;
        printf("%s->", g->array[size].vertex);
        while(node){
            printf("%s(%d)->", g->array[node->dest].vertex, node->weight);
            node = node->next;
        }
        printf("\n");
    }
}
