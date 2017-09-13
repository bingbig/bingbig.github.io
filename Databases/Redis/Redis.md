# Redis

参考：《Redis实战》 Josiah L. Carlson著

## 1. 初试Redis

`Redis`是一个远程内存数据库，性能强劲，具有复制特性以及未解决问题而生的独一无二的数据类型。Redis属于人们常说的`NoSQL数据库`或者`非关系型数据库`。和`memcached`相比，Redis能够自动以两种不同的方式将数据写入硬盘，并且Redis除了能存储普通的字符串键以外，还可以存储其他4种数据结构，而memcached只能存储字符串键。

### 1.1 特性

1. Redis拥有两种不同的形式的持久化方式：

   - 时间点转储（`Point-in-time dump`）
     -  “在指定时间段内有指定数量的写操作执行“，条件满足时执行
     -  执行转出到硬盘命令(dump-to-disk)
   - 更改只追加写入设置

2. 故障转移（failover）

3. 主从复制特性

### 1.2 数据结构

| 结构存储的值                        | 结构类型       | 结构的读写能力                                  |
| ----------------------------- | ---------- | ---------------------------------------- |
| 可以是字符串、整数或者浮点数                | STRING     | 对整个字符串或者字符串的一部分操作；对整数或者浮点数自增或者自减操作       |
| 链表                            | LIST       | 从链表的两端推入或者弹出元素；根据偏移量对链表进行修剪；读取单个或者多个元素；根据值查找或者获取元素 |
| 无序收集器，每个字符串都是独一无二无序的          | SET        | 添加、获取、移除单个元素；检查元素是否存在；计算交集、并集、差集；从集合只随机获取元素 |
| 包含键值对的无序散列表                   | HASH       | 添加、获取、移除单个键值对；获取所有的键值对                   |
| 字符串成员（member）和浮点数分值（score）的集合 | ZSET（有序结合） | 添加、获取、删除单个元素；根据分值的范围或者成员来获取元素            |



#### 1.2.1 字符串

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

#### 1.2.2 列表

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

#### 1.2.3 集合

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

#### 1.2.4 散列

```
127.0.0.1:6379> HSET hashkey field1 value1
(integer) 1
127.0.0.1:6379> HSET hashkey field2 value2
(integer) 1
127.0.0.1:6379> HSET hashkey field1 value3
(integer) 0
127.0.0.1:6379> hgetall hashkey
1) "field1"
2) "value3"
3) "field2"
4) "value2"
127.0.0.1:6379> hdel hashkey field1
(integer) 1
127.0.0.1:6379> hgetall hashkey
1) "field2"
2) "value2"
```

#### 1.2.5 有序集合

```
127.0.0.1:6379> zadd zsetkey 777 member1
(integer) 1
127.0.0.1:6379> zadd zsetkey 789 member2
(integer) 1
127.0.0.1:6379> zadd zsetkey 889 member3
(integer) 1
127.0.0.1:6379> zrange zsetkey 0 -1 withscores
1) "member1"
2) "777"
3) "member2"
4) "789"
5) "member3"
6) "889"
127.0.0.1:6379> zrangebyscore zsetkey 0 800 withscores
1) "member1"
2) "777"
3) "member2"
4) "789"
127.0.0.1:6379> 
127.0.0.1:6379> zrem zsetkey memeber1
(integer) 0
127.0.0.1:6379> zrange zsetkey 0 -1 withscores
1) "member1"
2) "777"
3) "member2"
4) "789"
5) "member3"
6) "889"
```



#### 1.3 实例

##### 1.3.1 对文章进行投票

| article:92858 | hash                               |
| ------------- | ---------------------------------- |
| titile        | Go to statement considered harmful |
| link          | http://www.example.com             |
| poster        | user:98765                         |
| time          | 12345678987654.33                  |
| votes         | 532                                |

可以使用冒号`:`、斜线`/`、甚至管道符`|`作为名字的分隔符，保证统一即可。

### 1.3 Redis命令

Redis的所有命令都可以在这里找到： https://redis.io/commands。

除了上面提到的对各种数据操作的命令以外，Redis还有其他许多非常丰富的命令工具。

#### 1.3.1 发布与订阅

| 命令           | 描述                                       |
| ------------ | ---------------------------------------- |
| SUBSCRIBE    | `SUBSCRIBE channel [channel…] `  订阅给定的一个或者多个频道 |
| PSUBSCRIBE   | `PSUBSCRIBE pattern [pattern…]` 订阅给定模式相匹配的所有频道 |
| UNSUBSCRIBE  | `UNSUBSCRIBE channel [channel...]` 取消订阅  |
| PUNSUBSCRIBE | `PUNSUBSCRIBE channel [channel]`  取消订阅给定模式相匹配的所有频道 |
| PUBLISH      | `PUBLISH  channel message` 向给定的频道发送消息    |

#### 1.3.2 排序

| 命令   | 描述                                       |
| ---- | ---------------------------------------- |
| SORT | `SORT source-key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA] [STORE dest-key]` |

### 事务

`WATCH`，`MULTI`， `EXEC`，`UNWATCH`和`DISCARD`

### 1.3.3 键的过期时间

| 命令        | 描述                                       |
| --------- | ---------------------------------------- |
| PERSIST   | `PERSIST keyname` 移除键的过期时间               |
| TTL       | `TTL keyname` 查看给定键的距离过期还有多少秒            |
| EXPIRE    | `EXPIRE keyname seconds` 让给定的过期的秒数之后过期   |
| PTTL      | `PTTL kename` 查看给定键的距离过期还有多少毫秒           |
| PEXPIRE   | `PEXPIRE keyname milliseconds` 给指定的过期的秒数之后过期 |
| PEXPIREAT | `PEXPIREAT keyname timestamp_milliseconds` 将一个毫秒级精度的UNIX时间戳设置为给定键的过期时间 |

## 2. 数据安全与性能保障

### 2.1 持久化

#### 2.1.1 快照持久化（Snapshotting）

Redis可以通过创建快找来获得存储在内存中的数据在某个时间节点上的副本。根据配置，快照将被写入`dbfilename` 配置选项指定的文件里面。

创建快照的办法有以下几种：

1. 客户端发送`BGSAVE`命令。Redis会fork一个子进程来保存快照。子进程和父进程共享内存。
2. 客户端发送`SAVE`命令。接到命令的Redis服务器在快照创建完毕之前将不再响应任何其他命令。此命令并不常用，通常只会在没有足够的内存去执行`BGSAVE`的时候才会使用这个命令。
3. 设置配置`save`，比如`save 60 10000`，即“60秒之内有10 000次写入”这个条件被满足时Redis自动触发BGSAVE命令。可以设置多个命令，当任意一个满足时执行GBSAVE
4. Redis通过`SHUTDOWN`命令接收到命令关闭服务器的请求时，或者接受到标准TERM信号时，会一行一个SAVE命令，阻塞所有的客户端。
5. 当一个Redis服务器连接另一个Redis服务器，并向对方发送`SYNC`命令来开始一次复制操作时，如果主服务没有在执行BGSAVE或者主服务器并非刚刚执行完BGSAVE操作时。

优点：自动化、可以按时间点多重备份

缺点：造成系统卡顿，消耗内存；没有保存到快照的最新数据可能会丢失

#### 2.1.2 AOF持久化（Append Only File）

AOF持久化会将被执行的命令写到AOF文件的末尾，以此来记录数据发生的变化。数据恢复时需要Redis重新执行一边所有的命令。通过设置`appendonly yes` 来打开，`appendfsync`选项对系统的影响如下：

| 选项       | 同步频率                                |     备注      |
| -------- | ----------------------------------- | :---------: |
| always   | 每个Redis写命令都要同步写入硬盘，这样做会严重降低Redis的速度 |   严重影响速度    |
| everysec | 美妙执行一次同步，显示的将多个写命令同步到硬盘             | 最多造成1s数据的丢失 |
| no       | 让操作系统来决定应该何时进行同步                    |   不定时长的丢失   |

缺点：随着Redis的运行，AOF文件的体积会不断的增加，甚至超过数据本身。可以通过向Redis发送`BGREWRITEAOF`命令来重写AOF文件，移除AOF中冗余的命令，原理和BGSAVE类似都会fork一个子进程来完成。可以通过配置设置AOF持久化的规则。

### 2.2 复制

Redis采用了和关系型数据库同样的方法来向多个从服务器发送更新，并使用从服务器来处理所有读请求。

==从服务器在进行同步时会清空自身的所有的数据==

Redis不支持主主复制。

#### 2.2.1 主从链

Redis服务器的主服务器和从服务器并没有特别的地方，因此从服务器也可以是主服务器。

## 3. 使用Redis构建应用程序组件

### 3.1 分布式锁

Redis使用`WATCH`命令来代替对数据进行加锁，因为WATCH只会在数据被其他客户端抢先修改了的情况下通知执行了这个命令的客户端，而不会阻止其他客户端对数据进行修改，所以这个命令被称为乐观锁（Optimistic locking）。

```
悲观锁(Pessimistic Lock), 顾名思义，就是很悲观，每次去拿数据的时候都认为别人会修改，所以每次在拿数据的时候都会上锁，这样别人想拿这个数据就会block直到它拿到锁。传统的关系型数据库里边就用到了很多这种锁机制，比如行锁，表锁等，读锁，写锁等，都是在做操作之前先上锁。

乐观锁(Optimistic Lock), 顾名思义，就是很乐观，每次去拿数据的时候都认为别人不会修改，所以不会上锁，但是在更新的时候会判断一下在此期间别人有没有去更新这个数据，可以使用版本号等机制。乐观锁适用于多读的应用类型，这样可以提高吞吐量，像数据库如果提供类似于write_condition机制的其实都是提供的乐观锁。
```



### 3.2 技术信号量

#### 3.2.1 公平信号量

#### 3.2.2 刷新信号量

### 3.3 任务队列

