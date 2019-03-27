---
sidebar: auto
---

# 数据结构和对象

## 简单动态字符串
Redis没有直接使用C里面的字符串，而是构建了一种名为简单动态字符串(Simple dynamic strings, SDS)的抽象类型，并且作为Redis的默认字符串表示。
> 相关源码： [sds.c](https://github.com/antirez/redis/blob/5.0/src/sds.c), [sds.h](https://github.com/antirez/redis/blob/5.0/src/sds.h), [sdsalloc.h](https://github.com/antirez/redis/blob/5.0/src/sdsalloc.h), [zmalloc.c](https://github.com/antirez/redis/blob/5.0/src/zmalloc.c), [zmalloc.h](https://github.com/antirez/redis/blob/5.0/src/zmalloc.h)

`sdsalloc.h`很简单，只是引入了SDS的内存管理模块而已（源码如下）。而真正的内存管理是在`zmalloc.h`和`zmalloc.c`中定义和实现的，具体实现请看[这里](./zmalloc.md)。
```c
#include "zmalloc.h"
#define s_malloc zmalloc
#define s_realloc zrealloc
#define s_free zfree
```
简单动态字符串的具体是在`sds.c`和`sds.h`中实现的。

