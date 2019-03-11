#include <stdio.h>
#include <stdlib.h>

typedef struct AdjListNode
{
    int dest;
    struct AdjListNode *next;
} AdjListNode;

typedef struct AdjList
{
    AdjListNode *head;
} AdjList;

typedef struct Graph
{
    int size;
    struct AdjList *array;
} Graph;

AdjListNode *newAdjListNode(int dest)
{
    AdjListNode *aln = (AdjListNode *)malloc(sizeof(AdjListNode));
    aln->dest = dest;
    aln->next = NULL;
    return aln;
}

Graph *createGraph(int size)
{
    int i;
    Graph *g = (Graph *)malloc(sizeof(Graph));
    g->size = size;
    g->array = (AdjList *)malloc(size * sizeof(AdjList));
    for (i = 0; i < size; i++)
    {
        g->array[i].head = NULL;
    }
    return g;
}

void addEdge(Graph *g, int src, int dest)
{
    AdjListNode *new = newAdjListNode(dest);
    AdjListNode *tail = g->array[src].head;
    if(!tail){
        g->array[src].head = new;
        return;
    }
    while(tail->next)
        tail = tail->next;
    tail->next = new;
}

void arraySetToZero(int arr[], int size)
{
    for (int i = 0; i < size; i++)
        arr[i] = 0;
}

// 深度优先搜索
void dfs(Graph *g, int idx, int visited[])
{
    AdjListNode *node = g->array[idx].head;
    printf("%d", idx);
    visited[idx] = 1;
    while (node)
    {
        if(!visited[node->dest])
            dfs(g, node->dest, visited);
        
        node = node->next;
    }
}


// 广度优先
void bfs(Graph *g, int idx, int visited[])
{
    if(!visited[idx]){
        printf("%d", idx);
        visited[idx] = 1;
    }

    int i, j, *queue;
    queue = (int *)malloc(sizeof(int) * g->size);
    for(i=0;i<g->size;i++)
        queue[i] = 0;

    i = 0;
    AdjListNode *node = g->array[idx].head;
    while(node){
        if(!visited[node->dest]){
            queue[i++] = node->dest;
            printf("%d", node->dest);
            visited[node->dest] = 1;
        }
        node = node->next;
    }
}



int main()
{
    Graph *g = createGraph(4);
    addEdge(g, 0, 1);
    addEdge(g, 0, 2);
    addEdge(g, 1, 2);
    addEdge(g, 2, 0);
    addEdge(g, 2, 3);
    addEdge(g, 3, 3);

    int i, visited[4];
    arraySetToZero(visited, 4);
    printf("dfs: ");
    dfs(g, 2, visited);
    for(i = 0; i < 4; i++){
        if(!visited[i])
            dfs(g, i, visited);
    }
    
    printf("\nbfs: ");
    arraySetToZero(visited, 4);
    bfs(g, 2, visited);
    for (i = 0; i < 4; i++)
    {
        if (!visited[i])
            bfs(g, i, visited);
    }
    printf("\n");
}