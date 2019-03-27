/**
 * 堆排序
 */

#include <stdio.h>

void swap(int *a, int *b)
{
    int t = *a;
    *a = *b;
    *b = t;
}

/**
 * 对堆从上到下进行调整
 */ 
void heapify(int arr[], int n, int i)
{
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;

    if(l < n && arr[l] > arr[largest])
        largest = l;
    if(r < n && arr[r] > arr[largest])
        largest = r;
    if(largest != i)
    {
        swap(&arr[i], &arr[largest]);

        heapify(arr, n, largest);
    }
}

/**
 * 堆排序函数
 */
void heapSort(int arr[], int n)
{
    for(int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i); // 从最后一个元素开始到第一个元素调整堆

    for(int i = n - 1; i >= 0; i--)
    {
        swap(&arr[0], &arr[i]); // 交换最后一个元素和根节点元素
        heapify(arr, i, 0);     // 堆的大小减一，并重新对堆进行调整
    }
}

void printArray(int arr[], int n) 
{ 
    for (int i=0; i<n; ++i) 
        printf("%d\t", arr[i]);
    printf("\n");
}

int main()
{
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);

    heapSort(arr, n);

    printf("Sorted array is \n");
    printArray(arr, n);
}