/**
 * Input: {2, 3, 1, 0, 2, 5, 3}, Output: 2 or 3
 * 
 */

#include <stdio.h>
int findDuplicate(int arr[], int len, int *dup)
{
    if(arr == NULL || len <= 0)
        return 0;

    int tmp;
    for(int i = 0; i < len; i++)
    {
        while(arr[i] != i){
            if(arr[i] == arr[arr[i]]) {
                *dup = arr[i];
                return 1;
            }
            tmp = arr[arr[i]];
            arr[arr[i]] = arr[i];
            arr[i] = tmp;
        }
    }
    return 0;
}

int main(int argc, char const *argv[])
{
    int arr[] = {2, 3, 1, 0, 2, 5, 3};
    int duplication;
    if(findDuplicate(arr, sizeof(arr)/ sizeof(int), &duplication)){
        printf("duplication is %d\n", duplication);
    } else {
        printf("no duplication found\n");
    }
    return 0;
}
