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

