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

    // 有向图
    new = newAdjListNode(src, weight);
    new->next = g->array[dest].head;
    g->array[dest].head = new;
}

void setVertex(Graph *g, int idx, char *vertex)
{
    // TODO
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

int main(int argc, char const *argv[])
{
    Graph *g = createGraph(5);
    setVertex(g, 0, "A");
    setVertex(g, 1, "B");
    setVertex(g, 2, "C");
    setVertex(g, 3, "D");
    setVertex(g, 4, "E");

    addEdge(g, 0, 1, 100);
    addEdge(g, 0, 4, 100);
    addEdge(g, 1, 2, 100);
    addEdge(g, 1, 3, 100);
    addEdge(g, 1, 4, 100);
    addEdge(g, 2, 1, 100);
    addEdge(g, 2, 3, 100);
    addEdge(g, 3, 4, 100);

    printGraph(g);
    return 0;
}
