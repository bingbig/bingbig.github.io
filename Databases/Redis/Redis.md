# Redis

参考：《Redis实战》 Josiah L. Carlson著

## 初试Redis

`Redis`是一个远程内存数据库，性能强劲，具有复制特性以及未解决问题而生的独一无二的数据类型。Redis属于人们常说的`NoSQL数据库`或者`非关系型数据库`。和`memcached`相比，Redis能够自动以两种不同的方式将数据写入硬盘，并且Redis除了能存储普通的字符串键以外，还可以存储其他4种数据结构，而memcached只能存储字符串键。

### 特性

1. Redis拥有两种不同的形式的持久化方式：

   - 时间点转储（`Point-in-time dump`）
     -  “在指定时间段内有指定数量的写操作执行“，条件满足时执行
     - 执行转出到硬盘命令(dump-to-disk)


    - 更改只追加写入设置

2. 故障转移（failover）

3. 主从复制特性

### 数据结构

| 结构类型       | 结构存储的值                        | 结构的读写能力                                  |
| ---------- | ----------------------------- | ---------------------------------------- |
| STRING     | 可以是字符串、整数或者浮点数                | 对整个字符串或者字符串的一部分操作；对整数或者浮点数自增或者自减操作       |
| LIST       | 链表                            | 从链表的两端推入或者弹出元素；根据偏移量对链表进行修剪；读取单个或者多个元素；根据值查找或者获取元素 |
| SET        | 无序收集器，每个字符串都是独一无二无序的          | 添加、获取、移除单个元素；检查元素是否存在；计算交集、并集、差集；从集合只随机获取元素 |
| HASH       | 包含键值对的无序散列表                   | 添加、获取、移除单个键值对；获取所有的键值对                   |
| ZSET（有序结合） | 字符串成员（member）和浮点数分值（score）的集合 | 添加、获取、删除单个元素；根据分值的范围或者成员来获取元素            |

命令列表： https://redis.io/commands

#### 字符串

GET	获取给定键中的值

```
127.0.0.1:6379> GET a
"1"
```

SET 设置存储在给定键中的值

```
127.0.0.1:6379> SET A 1
OK
```

DEL 删除存储在给定键中的值

```
127.0.0.1:6379> DEL A
(integer) 1
```

#### 列表

```
127.0.0.1:6379> rpush listkey item			# 向链表后推入一个值
(integer) 1
127.0.0.1:6379> rpush listkey item2
(integer) 2
127.0.0.1:6379> rpush listkey item
(integer) 3
127.0.0.1:6379> lrange listkey 0 -1   # lrange list_name start_index end_index
1) "item"
2) "item2"
3) "item"
127.0.0.1:6379> lindex listkey 1 # lindex list_name  index
"item2"
127.0.0.1:6379> lpop listkey #从链表弹出一个元素
"item"
127.0.0.1:6379> lrange listkey 0 -1 
1) "item2"
2) "item"
```

#### 集合

```
127.0.0.1:6379> sadd setkey item  # 增加一个元素
(integer) 1
127.0.0.1:6379> sadd setkey item2
(integer) 1
127.0.0.1:6379> sadd setkey item3
(integer) 1
127.0.0.1:6379> sadd setkey item4
(integer) 1
127.0.0.1:6379> smembers setkey  # 查看所有的元素
1) "item4"
2) "item3"
3) "item2"
4) "item"
127.0.0.1:6379> sismember setkey item4 # 判断是否是其中的元素
(integer) 1
127.0.0.1:6379> sismember setkey item5
(integer) 0
127.0.0.1:6379> srem setkey item2 # 删除一个元素
(integer) 1
127.0.0.1:6379> smembers setkey
1) "item4"
2) "item3"
3) "item"
```

#### 散列

