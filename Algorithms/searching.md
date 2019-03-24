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
