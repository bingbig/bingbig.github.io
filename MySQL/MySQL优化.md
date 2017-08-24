## MySQL及索引优化
1. 如何发现有问题的sql？

	使用mysql慢日志对sql进行监控 

	```sql
	show variables like 'slow_query_log';
	```

2. 查看是否开启慢查日志

	```sql
	set global slow_query_log=on;
	set global slow_query_log_file = 'path/to/sql_log/mysql-slow.log'
	set global log_queries_not_using_indexes=on;
	
	#开启记录
	set global long_query_time = 1 #大于1秒的查询记录到慢日志中，一般设置为0.01秒
	```

3. 慢查日志分析工具:	

	```
	1. mysqldump
	2. pt-query-digest
	```

4. 如何通过慢查日志发现有问题的sql？
	- 查询次数多且每次查询占用时间长的sql
	- 通常为pt-query-digest分析的前几个查询
	- IO大的sql
	- 注意pt-query-digest 分析中的rows examine项
	- 未命中索引的sql
	- 注意pt-query-digest分析中的rows examine和rows send的对比

5. 如何分析sql查询？

	```sql
	explain select customer_id, first_name, last_name from customer;
	```
	
	explain的extra尽量不要用到临时表或者filesorts，避免过多扫描

	- max()： 新建索引优化速度
	```sql
	select count(release_year = '2016' OR NULL ) as '2016', count(release_year='2017' or NULL) as '2017' from film;
	```
	
		**count(*) 包含null行**
		**count(id) 不包含id=NULL的结果**
	
		通常情况下，需要把子查询优化成join查询，但是在优化时要注意关连建是否有一对多的关系，需要注意重复数据。（distinct去重）
	
	- `group by`查询
	- 优化`limits`查询


6. 如何选择合适的列建立索引?
	- 在`where`从句，`group by`从句，`order by`从句，`on`从句中出现的列
	- 索引字段越小越好
	- 离散度大的索引放到联合索引的前面 `index(staff_id, custom_id)`,其中`staff_id`的离散度更大
	
		```sql
		select count(distinct customer_id), count(distinct staff_id) from payment;
		```
	返回`customer_id` 599, `staff_id` 2.
	所以，`customer_id`离散度更高

7. 索引的维护及优化
	增加索引可以增加select的速度，但是会减少`insert`和`delete`的速度。但是过度的索引，也会减少写入和查询的效率。

	重复索引：相同的列以相同的顺序建立的同类型的索引。如`id`是`primary key`，和`unique(id)`就是重复索引
	冗余索引：多个索引的前缀列相同，或是在联合索引中包含了主键的索引。

	使用`pt-duplicate-key-checker`工具检查重复及冗余索引

	```shell
	pt-duplicate-key-checker -uroot -p '' -h 127.0.0.1
	```
	mysql中目前只能通过慢查询日志配置`pt-index-usage`工具来进行索引使用情况分析。

8. 数据库结构优化
	选择合适的数据类型
	- 使用可以存下数据的最小的数据类型
	- 使用简单的数据类型
	- 尽可能的使用`not` `null`定义字段
	- 尽量少用`text`类型，非用不可时最好考虑分表
	-用`bigint`保存`IP`地址：利用`INET_ATON()`, `INET_NTOA()`函数来进行转化

9. 表的范式化和反范式化
	范式化是指数据库设计的规范，目前说得到的范式化一般是指第三设计范式，也就是要求数据表中不存在非关键字段对任何候选关键字段的传递函数依赖则符合第三范式。
	- 范式化：拆表，减少数据冗余
	- 反范式化：用空间减少表的拆分，提高优化查询效率

10. 表的垂直拆分：解决表的宽度问题
	- 把不常用的字段单独存放到一个表中
	- 把大字独立存放到一个表中
	- 把经常一起使用的字段放到一起
11. 表的水平拆分：解决表中数据量过大的问题
	方法：对id取模，根据模分配到不同的表中
	挑战：
		- 跨分区表进行数据查询
		- 统计及后台报表操作

## 数据库系统配置优化
1. 网络配置，修改`/etc/sysctl.conf`
	```shell
	#增加tcp支持的队列数
	net.ipv4.tcp_max_syn_backlog = 65535
	#减少断开连接时，资源回收
	net.ipv4.tcp_max_tw_buckets = 8000
	net.ipv4.tcp_tw_reuse = 1
	net.ipv4.tcp_tw_recycle = 1
	net.ipv4.tcp_fin_timeout = 10
	```
	
2. 打开文件数的限制，可以使用`ulimit -a`查看目录的限制，可以修改`/etc/security/limits.conf`
	```
	soft nofile 65535
	hard nofile 65535  
	```
	最好在MySQL服务器上关闭iptables，selinux等防火墙软件。

## MySQL配置
查找配置文件：`/use/sbin/mysqld --verbose --help | grep -A 1 'Default options'`
如果存在多个位置保存配置文件，则后面的会覆盖前面的。

`innodb_buffer_pool_size`： 如果数据库中只有`innodb`库，则推荐配置量为总内存的75%
`innodb_buffer_pool_instances`： 可以控制缓冲池的个数，默认情况下只有一个缓冲池
`innodb_log_buffer_size`: 由于日志最长每秒就会刷新所以就不用太大
`innodb_flush_log_at_trx_commit`： 关键参数，对`innodb`的IO效率影响很大。默认值为1，可以取值为0，1，2三个值，一般建议为2，如何数据安全性要求比较高则使用默认值1.
```
	1 最安全，保证不丢失数据
	2 最多丢失1秒中内的数值
```
`innodb_read_io_threads`,  `innodb_write_io_threads`	默认为4

`innodb_file_perl_table`: 关键参数，控制innodb每一个表使用的独立的表空间，默认为`off`，也就是所有的表都会建立在共享表空间中。

`innodb_stats_on_metadata`： 决定MySQL在什么情况下会刷新`innodb`表的统计信息。

## 第三方配置工具
Percon Congfiguration Wizard

## 服务器硬件优化
1. MySQL对CPU核数的支持并不是越多越快
2. Disk IO优化



## 补充
**MySQL索引的一些要点**
1. 表的主键、外键必须有索引；

2. 数据量超过300的表应该有索引；

3. 经常与其他表进行连接的表，在连接字段上应该建立索引；

4. 经常出现在Where子句中的字段，特别是大表的字段，应该建立索引；

5. 索引应该建在选择性高的字段上；

6. 索引应该建在小字段上，对于大的文本字段甚至超长字段，不要建索引；

7. 复合索引的建立需要进行仔细分析；尽量考虑用单字段索引代替：
	- 正确选择复合索引中的主列字段，一般是选择性较好的字段;
	- 复合索引的几个字段是否经常同时以AND方式出现在Where子句中？单字段查询是否极少甚至没有？如果是，则可以建立复合索引；否则考虑单字段索引；
	- 如果复合索引中包含的字段经常单独出现在Where子句中，则分解为多个单字段索引；
	- 如果复合索引所包含的字段超过3个，那么仔细考虑其必要性，考虑减少复合的字段；
	- 如果既有单字段索引，又有这几个字段上的复合索引，一般可以删除复合索引；

8. 频繁进行数据操作的表，不要建立太多的索引；

9. 删除无用的索引，避免对执行计划造成负面影响；


