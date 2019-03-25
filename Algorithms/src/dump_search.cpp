/**
 * 跳跃搜索
 * 
 * gcc -lstdc++ -o d dump_search.cpp
 */

#include <cmath>
#include <iostream>

using namespace std;

int jumpSearch(int arr[], int x, int n)
{
    int step = sqrt(n);
    int index = 0;
    int max = 0;
    while(index < n)
    {
        if(arr[index] == x)
            return index;
        else if(arr[index] < x)
            index += step;
        else
            break;
    }

    max = index;
    index -= step;
    while(index < max)
    {
        if (arr[index] == x)
            return index;
        else
            index++;
    }
    return -1;
}

int main(int argc, char *argv[])
{
    int arr[] = {0, 1, 1, 2, 3, 5, 8, 13, 21,
                 34, 55, 89, 144, 233, 377, 610};
    int x = 0;
    if(argc == 2)
    {
        x = atoi(argv[1]);
    }

    int n = sizeof(arr) / sizeof(arr[0]);

    // 使用跳跃搜索查找x的索引
    int index = jumpSearch(arr, x, n);

    // 打印x的索引值
    cout << "\nNumber " << x << " is at index " << index;
    return 0;
}