---
sidebar: auto
---

# 搜索和排序

## 搜索
### 线性搜索
**Problem**： Given an array arr[] of n elements, write a function to search a given element x in arr[].

**Examples**：
```
Input : arr[] = {10, 20, 80, 30, 60, 50, 
                     110, 100, 130, 170}
          x = 110;
Output : 6
Element x is present at index 6

Input : arr[] = {10, 20, 80, 30, 60, 50, 
                     110, 100, 130, 170}
           x = 175;
Output : -1
Element x is not present in arr[].
```

**Implementation**

<<<@/algorithms/src/linear_search.c

时间复杂度是O(n)。

### 二分搜索
**Problem**：同上

**Implementation**

<<<@/algorithms/src/recursive_binary_search.c

<<<@/algorithms/src/iterative_binary_search.c

### 跳跃搜索
和二分法搜索一样，跳跃搜索算法适用于已排序的数组。基础的想法就是通过跳过一些元素来比线性搜索少作一些比较。举例来说，假设我们有一个数组arr[]，大小为n，跳跃的步长为m，跳跃搜索先比较arr[0]， arr[m]， arr[2m]，..， arr[km]。如果找到了中间值(arr[km] < x < arr[km + m])，然后再进行线性搜索找到元素x。

那么最佳的步长是多少呢？在最坏的情况下，我们需要跳跃n/m次，然后检查这个值是不是大于我们要查找的元素，然后再进行m-1次的线性比较，总共的比较次数为 n/m + m - 1。当m = √n时这个值最小，因此最佳的步长为m = √n。

**Implementation**

<<<@/algorithms/src/dump_search.cpp

### 插值搜索
线性搜索时间复杂度是O(n)， 跳跃搜索为O(√n)，而二分法为O(Log n)。插值搜索(Interpolation Search)是二分法的一种改进算法，数组的元素值得是均匀分布的。二分搜索法总是从中间的元素开始搜索，而插值搜索法根据被查询的值可能会从不同的地方开始搜索。比如说如果键更靠近最后的元素，插值搜索就从后面开始查找。

通常使用下面的公式来确定查找的位置：
```
// 这个公式的主要思想是：当要查找的元素靠近更大的值arr[hi]时返回更大的索引值，
// 靠近更小的arr[lo]时返回小的索引值
// The idea of formula is to return higher value of pos
// when element to be searched is closer to arr[hi]. And
// smaller value when closer to arr[lo]

pos = lo + [ (x-arr[lo])*(hi-lo) / (arr[hi]-arr[Lo]) ]

arr[] ==> 待查找的数组
x     ==> 待查找的值
lo    ==> 开始查找的索引值
hi    ==> 结束查找的索引值
```

**Implementation**

<<<@/algorithms/src/interpolation_search.c

## 排序
### 选择排序
选择排序通过重复的从未排序数组中寻找最小的元素并将其放到最开始，维护着两个数组。流程如下：
```
arr[] = 64 25 12 22 11

// 在数组 arr[0...4] 中找到最小的元素 11，放到数组的最前面
11 25 12 22 64

// 在数组 arr[1...4] 中找到最小的元素 12，放到数组 arr[1...4] 的最前面 
11 12 25 22 64

// 在数组 arr[2...4] 中找到最小的元素 22，放到数组 arr[2...4] 的最前面 
11 12 22 25 64

// 在数组  arr[3...4]
// 中找到最小的元素 25，放到数组 arr[3...4] 的最前面 
11 12 22 25 64 
```

**Implementation**

<<<@/algorithms/src/selection_sort.c

### 冒泡排序
冒泡排序是最近的排序算法：重复的将临近的两个错误排序的元素交换。

**Implementation**

<<<@/algorithms/src/bubble_sort.c

### 插入排序
原理如下：

![插入排序](./images/insertionsort.png)

**Implementation**

<<<@/algorithms/src/insertion_sort.c


### 归并排序
和快速排序一样，归并排序是一种分而治之的算法。它将数组分成两半，再对这两半进行归并排序，最后合并这两半。

![归并排序](./images/Merge-Sort.png)

**Implementation**

<<<@/algorithms/src/merge_sort.c

### 堆排序
堆排序是基于二叉堆数据结构实现的排序技术。它和选择排序类似先选择最大的元素，把最大的元素放在最后，然后对剩下的元素做重复的过程。
**什么是二叉堆(Binary Heap)呢？**
二叉堆是一种二叉树，它具有以下特性：
1. 它是一棵完全树（所有层都是满的，除了最后一层，并且最后一层的结点至少都有左孩子）。这个属性使得二叉堆可以用数组来存储。
2. 二叉堆既不是最小堆也不是最大对。在最小二叉堆中，根节点的值必须是二叉堆中最小的，这个属性对所有结点都是一样的。最大二叉堆和最小二叉堆类似。

最小的的例子：
```
            10                      10
         /      \               /       \  
       20        100          15         30  
      /                      /  \        /  \
    30                     40    50    100   40
```

**堆排序算法升序排序**
1. 用输入数据建立最大堆，
2. 此时，最大的元素在堆的根节点。将根节点和堆的最后一个元素交换，同时堆的大小减一。对堆进行调整。
3. 当堆的大小大于1时重复1-2步骤。
   
**Implementation**

<<<@/algorithms/src/heap_sort.c

### 快速排序
和归并排序一样，快速排序也是一种分而治之的算法。它先选择一个元素作为支点(pivot)，以该支点将给定的数组分隔开。不同版本的快速排序方法在选择支点的方法上有所不同：

1. 总是选择第一个元素作为支点
2. 总是选择最后一个元素作为支点
3. 随机选择一个元素作为支点
4. 选择中间的元素作为支点

快速排序的核心过程是分区(`partition()`)。分割的目标是：指定数组和元素x最为数组的支点，把所有比x小的元素放到x的左侧，比它大的元素放到其右侧。在线性的时间内完成这个过程。

选择最后一个元素作为支点，快速排序的示意图如下：

![QUICK SORT](./images/QuickSort2.png)

**Implementation**

<<<@/algorithms/src/quick_sort.c

**算法分析**

快速排序的时间计算公式 

`T(n) = T(k) + T(n-k-1) + O(n)`

前两两项是递归调用的时间，最后一项是分区过程的时间。k是小于支点的元素的个数。快速排序的时间复杂度取决于输入数组和分区策略，有以下三种情况：

- **最差情况** 最差的情况出现在总是选择了最大的或者最小的元素作为支点。假设我们选择最后一个元素作为支点，最坏的情况就是这个数组已经是排好序的了。时间复杂度计算为：O(n<sup>2</sup>)。

- **最佳情况** 最佳情况出现在每次都选择了中间大小的元素作为支点。时间复杂度为O(nLogn)。
- **平均情况** 在平均分析时，我们需要考虑所有的数组组合并计算它们的时间复杂度。其解也为O(nLogn)。

尽管快速排序的最差情况下时间复杂度为O(n<sup>2</sup>)， 甚至比归并排序和堆排序还要慢，但是在实际应用中，快速排序会更快，因为它的内部循环可以在大多数架构上，对大多数的实际数据，高效排序，

快速排序可以通过改变选择支点的策略来实现不同的方案，因此最坏的情况很少出现。但是，当数据量很大，并且保存在外部存储中时，归并排序一般会认为更快。

**快速排序稳定吗？**
默认的实现不稳定，但是任何的排序算法都可以通过考虑对索引进行比较来稳定算法。

**什么是3-way快速排序？**
在简单的快速排序算法，我们选择一个元素作为支点，围绕支点将数组分为左半部分和右半部分并递归地进行快速排序。

当考虑到数组有许多重复的元素时，比如：{1, 4, 2, 4, 2, 4, 1, 2, 4, 1, 2, 2, 2, 2, 4, 1, 4, 4, 4}。如果我们选择4作为支点，用简单的快速排序算法排序时，我们只固定了一个4，然后对剩余的元素递归排序，在3-way快速排序中，数组被分为3部分，小于支点的，等于支点的，大于支点的。实现可以参考[这里](https://www.geeksforgeeks.org/3-way-quicksort-dutch-national-flag/)。

**如何在链表中实现快速排序**
- [在单链表中实现快排](https://www.geeksforgeeks.org/quicksort-on-singly-linked-list/)
- [在双链表中实现快排](https://www.geeksforgeeks.org/quicksort-for-linked-list/)
  
**如何实现迭代快排？**
```c
/* arr[] --> Array to be sorted,  
   l  --> Starting index,  
   h  --> Ending index */
void quickSortIterative (int arr[], int l, int h) 
{ 
    // Create an auxiliary stack 
    int stack[ h - l + 1 ]; 
  
    // initialize top of stack 
    int top = -1; 
  
    // push initial values of l and h to stack 
    stack[ ++top ] = l; 
    stack[ ++top ] = h; 
  
    // Keep popping from stack while is not empty 
    while ( top >= 0 ) 
    { 
        // Pop h and l 
        h = stack[ top-- ]; 
        l = stack[ top-- ]; 
  
        // Set pivot element at its correct position 
        // in sorted array 
        int p = partition( arr, l, h ); 
  
        // If there are elements on left side of pivot, 
        // then push left side to stack 
        if ( p-1 > l ) 
        { 
            stack[ ++top ] = l; 
            stack[ ++top ] = p - 1; 
        } 
  
        // If there are elements on right side of pivot, 
        // then push right side to stack 
        if ( p+1 < h ) 
        { 
            stack[ ++top ] = p + 1; 
            stack[ ++top ] = h; 
        } 
    } 
}
```
参考：[迭代快排](https://www.geeksforgeeks.org/iterative-quick-sort/)

**快排在数组排序上为何比归并排序好？**
通常的快速排序是一个在位排序（不需要额外的存储空间），而归并排序需要O(N)的空间，N表示数组的大小。内存的分配和释放增加了归并排序的运行时间，比较平均复杂度我们可以发现两种类型的排序都有O(NlogN)的平均复杂度，但是实际中不同，归并排序输在了这而外的存储空间上。

大多数的实际快发的快排实现中使用了随机的版本。随机版本的期望时间复杂度是O(nLogN)。

当对数组排序时，快速排序是一种缓存友好型的排序算法。快排也是尾递归，如何优化尾递归呢？[看这里](https://www.geeksforgeeks.org/quicksort-tail-call-optimization-reducing-worst-case-space-log-n/)。

**归并排序在链表排序上为何比快排好？**
链表和数组的不同主要是在于内存的分配上。和数组不同，链表结点可能不会记录在相邻的内存上。在链表中插入一个元素的时间复杂度是O(1)，空间复杂度也是O(1)。因此归并排序的合并操作对于链表来说不需要额外的空间。

### 基数排序
基于比较的排序算法的下限是O(NlogN)，它们不可能优于NlogN。计数排序是一种线性排序算法，元素的分布居于1-k，时间复杂度为O(n+k).

假如元素的分布区间是1到n<sup>2</sup>呢？我们就不能再使用计数排序了，因为时间复杂度已经成了O(n<sup>2</sup>)了。那我们还怎么在线性时间内对这样的数组排序呢？

答案就是基数排序了！基数排序的思想就是通过一位一位的比较，从低位到高位比较。基数排序算法例子如下：

**例子**:
原始的没有排序的数组：

`170, 45, 75, 90, 802, 24, 2, 66`

按低位排序（即个位）: [*注意到 802 在 2的前面, 因为在原始数组中 802 出现在 2 的前面]

`170, 90, 802, 2, 24, 45, 75, 66`

按下一位排序（即十位）:

`802, 2, 24, 45, 66, 170, 75, 90`

按最高位排序 (千位) :

`2, 24, 45, 66, 75, 90, 170, 802`

**时间复杂度**
基数排序时间复杂度为 O(d*(n+b)) ，d是数组元素的个数，b是数组的进制，如十进制，如果k是元素中的最大值，那么d =  O(logb(k))。

**Implementation**
```c
// C++ implementation of Radix Sort 
#include<iostream> 
using namespace std; 

// A utility function to get maximum value in arr[] 
int getMax(int arr[], int n) 
{ 
	int mx = arr[0]; 
	for (int i = 1; i < n; i++) 
		if (arr[i] > mx) 
			mx = arr[i]; 
	return mx; 
} 

// A function to do counting sort of arr[] according to 
// the digit represented by exp. 
void countSort(int arr[], int n, int exp) 
{ 
	int output[n]; // output array 
	int i, count[10] = {0}; 

	// Store count of occurrences in count[] 
	for (i = 0; i < n; i++) 
		count[ (arr[i]/exp)%10 ]++; 

	// Change count[i] so that count[i] now contains actual 
	// position of this digit in output[] 
	for (i = 1; i < 10; i++) 
		count[i] += count[i - 1]; 

	// Build the output array 
	for (i = n - 1; i >= 0; i--) 
	{ 
		output[count[ (arr[i]/exp)%10 ] - 1] = arr[i]; 
		count[ (arr[i]/exp)%10 ]--; 
	} 

	// Copy the output array to arr[], so that arr[] now 
	// contains sorted numbers according to current digit 
	for (i = 0; i < n; i++) 
		arr[i] = output[i]; 
} 

// The main function to that sorts arr[] of size n using 
// Radix Sort 
void radixsort(int arr[], int n) 
{ 
	// Find the maximum number to know number of digits 
	int m = getMax(arr, n); 

	// Do counting sort for every digit. Note that instead 
	// of passing digit number, exp is passed. exp is 10^i 
	// where i is current digit number 
	for (int exp = 1; m/exp > 0; exp *= 10) 
		countSort(arr, n, exp); 
} 

// A utility function to print an array 
void print(int arr[], int n) 
{ 
	for (int i = 0; i < n; i++) 
		cout << arr[i] << " "; 
} 

// Driver program to test above functions 
int main() 
{ 
	int arr[] = {170, 45, 75, 90, 802, 24, 2, 66}; 
	int n = sizeof(arr)/sizeof(arr[0]); 
	radixsort(arr, n); 
	print(arr, n); 
	return 0; 
} 
```

### 计数排序
计数排序原理是利用了值分布在一定的范围内。

**Implementation**
```c
// C++ Program for counting sort 
#include<bits/stdc++.h> 
#include<string.h> 
using namespace std; 
#define RANGE 255 

// The main function that sort 
// the given string arr[] in 
// alphabatical order 
void countSort(char arr[]) 
{ 
	// The output character array 
	// that will have sorted arr 
	char output[strlen(arr)]; 

	// Create a count array to store count of inidividul 
	// characters and initialize count array as 0 
	int count[RANGE + 1], i; 
	memset(count, 0, sizeof(count)); 

	// Store count of each character 
	for(i = 0; arr[i]; ++i) 
		++count[arr[i]]; 

	// Change count[i] so that count[i] now contains actual 
	// position of this character in output array 
	for (i = 1; i <= RANGE; ++i) 
		count[i] += count[i-1]; 

	// Build the output character array 
	for (i = 0; arr[i]; ++i) 
	{ 
		output[count[arr[i]]-1] = arr[i]; 
		--count[arr[i]]; 
	} 

	/* 
	For Stable algorithm 
	for (i = sizeof(arr)-1; i>=0; --i) 
	{ 
		output[count[arr[i]]-1] = arr[i]; 
		--count[arr[i]]; 
	} 
	
	For Logic : See implementation 
	*/

	// Copy the output array to arr, so that arr now 
	// contains sorted characters 
	for (i = 0; arr[i]; ++i) 
		arr[i] = output[i]; 
} 

// Driver code 
int main() 
{ 
	char arr[] = "geeksforgeeks"; 

	countSort(arr); 

	cout<< "Sorted character array is " << arr; 
	return 0; 
} 

// This code is contributed by rathbhupendra 

```
参考：[这里](https://www.geeksforgeeks.org/counting-sort/)


