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

