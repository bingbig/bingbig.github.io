/**
 * Kruskal 算法的C实现，用来找到一个无向连通带权图的最小生成树
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Edge
{
    int src, dest, weight;
};

struct Graph
{
    // V 顶点数，E是边数
    int V, E;
    // 使用edge数组来表示图。因为是无向图，所以src到dest的边和dest到src的边是同一条。
    // 在这里，我们只记一次
    struct Edge* edge;
};

struct Graph *createGraph(int V, int E)
{
    struct Graph *graph = (struct Graph *)malloc(sizeof(struct Graph));
    graph->V = V;
    graph->E = E;
    graph->edge = (struct Edge *)malloc(sizeof(struct Edge) * E);
    return graph;
}

void printGraph(struct Graph *graph)
{
    for (int e = 0; e < graph->E; e++)
        printf("%d -- %d: %d\n", graph->edge[e].src, graph->edge[e].dest, graph->edge[e].weight);
}

struct subset
{
    int parent;
    int rank;
};

int myComp(const void*a, const void *b)
{
    struct Edge *a1 = (struct Edge *)a;
    struct Edge *b1 = (struct Edge *)b;

    return a1->weight - b1->weight;
}

int find(struct subset *subsets, int i)
{
    if(subsets[i].parent != i)
        subsets[i].parent = find(subsets, subsets[i].parent);

    return subsets[i].parent;
}

void Union(struct subset *subsets, int x, int y)
{
    int xroot = find(subsets, x);
    int yroot = find(subsets, y);

    // 将rank小的树连接到root rank高的树后面
    if(subsets[xroot].rank < subsets[yroot].rank)
        subsets[xroot].parent = yroot;
    else if(subsets[xroot].rank > subsets[yroot].rank)
        subsets[yroot].parent = xroot;
    else {
        subsets[yroot].parent = xroot;
        subsets[xroot].rank++;
    }
}

void KruskalMST(struct Graph *graph)
{
    int V = graph->V;
    struct Edge result[V];
    int e = 0; // result的索引
    int i = 0; // sorted edges的索引

    // 第一步：按权值升序排列所有的边。
    qsort(graph->edge, graph->E, sizeof(graph->edge[0]), myComp);

    // 初始化subsets
    struct subset *subsets = (struct subset *)malloc(sizeof(struct subset) * V);
    // subsets的索引号和边的编号一致
    for(int v = 0; v < V; v++){
        subsets[v].parent = v;
        subsets[v].rank = 0;
    }

    // 要选的边的数目等于 V-1
    while(e < V - 1){
        // 第二步：选择权值最小的边
        struct Edge next_edge = graph->edge[i++];
        
        int x = find(subsets, next_edge.src);
        int y = find(subsets, next_edge.dest);

        // 如果这个边不会形成回路，则包含，否则不用该边
        if(x != y){
            result[e++] = next_edge;
            Union(subsets, x, y);
        }
    }
    printf("Following are the edges in the constructed MST\n");
    for (i = 0; i < e; ++i)
        printf("%d -- %d == %d\n", result[i].src, result[i].dest,
               result[i].weight);
}

void freeGraph(struct Graph *graph)
{
    free(graph->edge);
    free(graph);
}

int main()
{
    /* 创建如下带权图
             10 
        0--------1 
        |  \     | 
       6|   5\   |15 
        |      \ | 
        2--------3 
            4       */
    int V = 4;
    int E = 5;
    struct Graph *graph = createGraph(V, E);

    graph->edge[0].src = 0; graph->edge[0].dest = 1; graph->edge[0].weight = 10; // 0-1边
    graph->edge[1].src = 0; graph->edge[1].dest = 2; graph->edge[1].weight = 6;  // 0-2边
    graph->edge[2].src = 0; graph->edge[2].dest = 3; graph->edge[2].weight = 5;  // 0-3边
    graph->edge[3].src = 1; graph->edge[3].dest = 3; graph->edge[3].weight = 15; // 1-3边
    graph->edge[4].src = 2; graph->edge[4].dest = 3; graph->edge[4].weight = 4;  // 2-3边

    KruskalMST(graph);
    
    freeGraph(graph);
    return 0;
}