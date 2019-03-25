/**
 * 选择排序
 */

#include <stdio.h>

void swap(int *a, int *b)
{
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

void selectionSort(int arr[], int n)
{
    int i, j, m;
    for(i = 0; i < n - 1; i++){
        m = i;
        for(j = i + 1; j < n; j++)
            if(arr[j] < arr[m])
                m = j;
        swap(&arr[m], &arr[i]);
    }
}

void printArray(int arr[], int n)
{
    int i = 0;
    while(i<n){
        printf("%d\t", arr[i]);
        i++;
    }
    printf("\n");
}

int main()
{
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    printArray(arr, n);
    selectionSort(arr, n);
    printf("Sorted array: ");
    printArray(arr, n);
    return 0;
}