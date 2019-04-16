---
sidebar: auto
---

# 贪婪算法
贪婪是一种算法的范畴，通过每一步都选择最佳最直接的方案，一步一步解决问题的算法。贪婪算法主要是用来优化问题，如果问题具有如下特点，就可以使用贪婪算法：在每一部，我们都可以做出看似最佳的选择，那么我们就可以找到这个问题的最佳解决方法了。

如果贪婪算法可以解决一个问题，那么它通常就是这个问题的最佳算法了，因为贪婪算法一般会比其他的方法如动态规划要高效的多。

贪婪算法有以下几种标准的算法：
1. [可如斯卡尔算法](/datastructure/content.html#最小生成树)： 在该算法中，我们通过一条条的选择边来创建最小生成树（MST）。其中贪婪的选择是挑选最小的权重的边，并且不会和有的MST生成环。
2. [普力马最小生成树](/datastructure/content.html#最小生成树)：在该算法中，我们也是通过一条条选边来创建MST。我们维护两个集合，一个是MST的顶点，一个是MST外的顶点。其中贪婪的选择是选择其中最小权值的边来连接两个集合。
3. Dijkstra最短路径(Dijkstra’s Shortest Path)：该算法和Prim算法很类似。我们维护两个集合，一个是已经包含在树里面的顶点集合，一个是没有包含在里面的顶点集合。贪婪算法选择连接两个集合的边，并且是从包含的顶点集合到没有包含的顶点集合的权值最小的边。
4. [哈弗曼编码](/datastructure/content.html#哈夫曼树-huffman)：该算法是一个无损的压缩技术。它给不同的字符分配变长的编码。

## 活动选择问题
给定n个活动和它们的开始结束时间。假设一个人在一个时间内只能参加一个活动，一个人如何才可以参加的最大数目的活动呢。

贪婪的算法总是选择下一个活动的结束时间是最小的，开始时间是大于且最近接当前结束时间的。一个简化的算法如下：
1. 按活动的结束时间顺序排序
2. 从排序的数组中选择第一个活动
3. 不停的从剩下的活动中选择
   1. 如果开始时间大于或等于上一个活动的结束时间，选择该活动

```c
// C++ program for activity selection problem. 
// The following implementation assumes that the activities 
// are already sorted according to their finish time 
#include<stdio.h> 

// Prints a maximum set of activities that can be done by a single 
// person, one at a time. 
// n --> Total number of activities 
// s[] --> An array that contains start time of all activities 
// f[] --> An array that contains finish time of all activities 
void printMaxActivities(int s[], int f[], int n) 
{ 
	int i, j; 

	printf ("Following activities are selected n"); 

	// The first activity always gets selected 
	i = 0; 
	printf("%d ", i); 

	// Consider rest of the activities 
	for (j = 1; j < n; j++) 
	{ 
	// If this activity has start time greater than or 
	// equal to the finish time of previously selected 
	// activity, then select it 
	if (s[j] >= f[i]) 
	{ 
		printf ("%d ", j); 
		i = j; 
	} 
	} 
} 

// driver program to test above function 
int main() 
{ 
	int s[] = {1, 3, 0, 5, 8, 5}; 
	int f[] = {2, 4, 6, 7, 9, 9}; 
	int n = sizeof(s)/sizeof(s[0]); 
	printMaxActivities(s, f, n); 
	return 0; 
} 
```

