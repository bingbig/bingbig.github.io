/**
 * 哈弗曼编码实现
 * 给点一个字符数组和它们相应的频率，输出所有的给点字符的哈夫曼编码。
 * 如果有两个元素的频率相同，则第一个出现的字符占据左子树，后者占据右子树
 * 
 * [限制]
 * 1 <= 频率 <= 100，1 <= 字符串长度 <= 26
 * 
 * [输入]
 * abcdef
 * 5 9 12 13 16 45
 * [编码]
 * f: 0
 * c: 100
 * d: 101
 * a: 1100
 * b: 1101
 * e: 111
 * [输出]
 * 0 100 101 1100 1101 111 
 */

#include <stdio.h>
#include <stdlib.h>

#define MAX_TREE_HT 100

// 一个哈夫曼树节点，最小堆结点
typedef struct MinHeapNode {
    char data;
    unsigned freq;
    struct MinHeapNode *left, *right;
} MinHeapNode;

// 最小堆
typedef struct MinHeap {
    unsigned size;
    unsigned capacity;
    MinHeapNode **array;
} MinHeap;

// 新分配一个最小堆结点
MinHeapNode *newNode(char data, unsigned freq)
{
    MinHeapNode *tmp = (MinHeapNode *)malloc(sizeof(MinHeapNode));
    tmp->data = data;
    tmp->freq = freq;
    tmp->left = tmp->right = NULL;
    return tmp;
}

// 初始化最小堆
MinHeap *createMinHeap(unsigned capacity)
{
    MinHeap * mp = (MinHeap *) malloc(sizeof(MinHeap));
    mp->capacity = capacity;
    mp->size = 0;
    mp->array = (MinHeapNode **)malloc(mp->capacity * sizeof(MinHeapNode));
}

// 交换最小堆的两个结点
void swapMinHeapNode(MinHeapNode **a, MinHeapNode **b)
{
    MinHeapNode *t = a;
    *a = *b;
    *b = t;
}

// Heapify
void minHeapify(MinHeap *mp, int idx)
{
    int smallest = idx;
    int left = 2 * idx + 1;
    int right = 2 *idx + 2;

    if(left < mp->size && mp->array[left]->freq < mp->array[smallest]->freq)
        smallest = left;
    if(right < mp->size && mp->array[right]->freq < mp->array[smallest]->freq)
        smallest = right;
        
    if(smallest != idx){
        swapMinHeapNode(&mp->array[smallest], &mp->array[idx]);
        minHeapify(mp, smallest);
    }
}

// 最小堆的大小是否为 1
int isSizeOne(MinHeap *mp)
{
    return (mp->size == 1);
}

// 是否为叶结点
int isLeaf(MinHeapNode *mhn)
{
    return !(mhn->left) && !(mhn->right);
}

// 取出频率最小的结点
MinHeapNode *extractMin(MinHeap *mp)
{
    MinHeapNode *tmp = mp->array[0];
    mp->array[0] = mp->array[--mp->size];
    minHeapify(mp, 0);

    return tmp;
}

// 插入一个结点
void insertMinHeap(MinHeap *mp, MinHeapNode *mhn)
{
    int i = mp->size;
    ++mp->size;

    while(i && mhn->freq < mp->array[(i - 1) / 2]->freq)
    {
        mp->array[i] = mp->array[(i - 1) / 2];
        i = (i - 1) / 2;
    }
    mp->array[i] = mhn;
}

// 堆排序
void buildMinHeap(MinHeap *mp)
{
    int n = mp->size - 1;
    int i;
    for(i = (n - 1)/2; i >= 0; i--)
        minHeapify(mp, i);
}

// 从数组创建最小堆
MinHeap *createAndBuildMinHeap(char data[], int freq[], int size)
{
    MinHeap *mp = createMinHeap(size);
    for(int i=0; i < size; i++)
        mp->array[i] = newNode(data[i], freq[i]);
    
    mp->size = size;
    buildMinHeap(mp);

    return mp;
}

MinHeapNode *buildHuffmanTree(char data[], int freq[], int size)
{
    MinHeapNode *left, *right, *top;
    MinHeap *mp = createAndBuildMinHeap(data, freq, size);
    while(!isSizeOne(mp)){
        left = extractMin(mp);
        right = extractMin(mp);
        top = newNode('$', left->freq + right->freq);
        top->left = left;
        top->right = right;

        insertMinHeap(mp, top);
    }

    // 最后剩余的一个结点是根节点，树结构已经完整
    return  extractMin(mp);
}

void HuffmanCodes(char data[], int freq[], int size)
{
    MinHeapNode *root = buildHuffmanTree(data, freq, size);
    int arr[MAX_TREE_HT], top = 0;
    printCodes(root, arr, top);
}
    
int main()
{
    char arr[] = {'a', 'b', 'c', 'd', 'e', 'f'};
    int freq[] = {5, 9, 12, 13, 16, 45};

    int size = sizeof(arr) / sizeof(arr[0]);

    HuffmanCodes(arr, freq, size);

    return 0;
}