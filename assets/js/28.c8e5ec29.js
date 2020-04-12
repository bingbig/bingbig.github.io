(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{342:function(s,a,t){"use strict";t.r(a);var n=t(0),r=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("div",{staticClass:"content"},[t("h1",{attrs:{id:"mysql架构和历史"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mysql架构和历史","aria-hidden":"true"}},[s._v("#")]),s._v(" MySQL架构和历史")]),s._v(" "),t("h2",{attrs:{id:"_1-2-并发控制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-并发控制","aria-hidden":"true"}},[s._v("#")]),s._v(" 1.2 并发控制")]),s._v(" "),t("p",[s._v("只要有多个查询需要在同一个时刻修改数据，都会产生并发控制的问题。")]),s._v(" "),t("h3",{attrs:{id:"_1-2-1-读写锁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-1-读写锁","aria-hidden":"true"}},[s._v("#")]),s._v(" 1.2.1 读写锁")]),s._v(" "),t("p",[s._v("在处理并发读或写时，可以通过两种锁解决问题，这两种锁通常被称为 "),t("strong",[s._v("共享锁(shared lock)")]),s._v(" 和 "),t("strong",[s._v("排他锁(exclusive lock)")]),s._v(", 也叫 读锁(read lock) 和 写锁(write lock)。")]),s._v(" "),t("h3",{attrs:{id:"_1-2-2-锁的力度"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-2-锁的力度","aria-hidden":"true"}},[s._v("#")]),s._v(" 1.2.2 锁的力度")]),s._v(" "),t("p",[s._v("所谓锁的策略，就是在锁的开销和数据的安全性之间的寻求平衡，这种平衡也会影响到性能。每种MySQL引擎都实现了自己的锁策略和锁粒度。最重要的两种锁策略：")]),s._v(" "),t("p",[t("strong",[s._v("表锁(table lock)")])]),s._v(" "),t("p",[s._v("MySQL最基本的锁策略，也是开销最小的策略。一个用户在对表进行写操作时，需要先获得写锁，这会阻塞其他用户对该表的所有读写操作！只有没有写锁时，其他读取的用户才能获得读锁，读锁之间是不互相阻塞的。")]),s._v(" "),t("p",[s._v("尽管存储引擎可以管理自己的锁，MySQL本身还是会使用各种有效的表锁来实现不同的目的，如服务器会为诸如"),t("code",[s._v("ALTER TABLE")]),s._v("之类的语句使用表锁，而忽略引擎的锁机制。")]),s._v(" "),t("p",[t("strong",[s._v("行级锁(row lock)")]),s._v("\n行级锁可以最大程度的支持并发处理，但同时也带来了最大的锁开销问题。在InnoDB和XtraDB实现了行级锁。行级锁只在存储引擎层实现，而在MySQL服务器层没有实现。")]),s._v(" "),t("h2",{attrs:{id:"_1-3-事务"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-事务","aria-hidden":"true"}},[s._v("#")]),s._v(" 1.3 事务")]),s._v(" "),t("p",[s._v("一个运行良好的事务处理系统，必须具有ACID这些标准特征：")]),s._v(" "),t("ul",[t("li",[t("code",[s._v("原子性(atomicity)")]),s._v(" 一个事务必须被视为一个不可分割的最小工作单元，整个事务中的所有操作，要么全部提交成功，要么全部回滚失败。对于一个事务来说，不可以执行其中的一部分操作，这就是事务的原子性。")]),s._v(" "),t("li",[t("code",[s._v("一致性(consistency)")]),s._v("   数据库总是从一个一致性状态转换到另一个一致性的状态。没有提交的事务所做的修改不会写到数据库中。")]),s._v(" "),t("li",[t("code",[s._v("隔离性(isolation)")]),s._v("   一个事务在提交之前，对其他事务是不可见的。")]),s._v(" "),t("li",[t("code",[s._v("持久性(durability)")]),s._v("  一旦事务被提交，则其所做的所有修改就会永久保存在数据库中。")])]),s._v(" "),t("h3",{attrs:{id:"_1-3-1-隔离级别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-1-隔离级别","aria-hidden":"true"}},[s._v("#")]),s._v(" 1.3.1 隔离级别")]),s._v(" "),t("h4",{attrs:{id:"read-uncommitted-未提交读"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#read-uncommitted-未提交读","aria-hidden":"true"}},[s._v("#")]),s._v(" READ UNCOMMITTED 未提交读")]),s._v(" "),t("p",[s._v("事务中的修改，即使没有提交，对其他事务也都是可见的。事务可以读取到未提交的数据，也被称为脏读（Dirty Read）。")]),s._v(" "),t("h4",{attrs:{id:"read-committed-提交读"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#read-committed-提交读","aria-hidden":"true"}},[s._v("#")]),s._v(" READ COMMITTED 提交读")]),s._v(" "),t("p",[s._v("除MySQL以外，大多数数据库系统的默认隔离级别都是READ COMMITED。一个事务从开始直到提交前，所做的任何修改对其他事务都是不可见的。这个级别有时候也叫不可重复读(nonrepeatable read)，因为两次执行同样的查询，可能会得到不同的结果。")]),s._v(" "),t("h4",{attrs:{id:"repeatable-read-可重复读"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#repeatable-read-可重复读","aria-hidden":"true"}},[s._v("#")]),s._v(" REPEATABLE READ 可重复读")]),s._v(" "),t("p",[s._v("REPEATABLE READ解决了脏读的问题。但是可重复读还是不能解决幻读(Phantom Read)的问题。所谓幻读，指的是当某个事务在读取某个范围内的记录时，会产生幻行(Phantom Row)。InnoDB和XtraDB存储引擎通过多版本并发控制(MVCC, Multiversion Concurrency Control)解决了幻读的问题。")]),s._v(" "),t("p",[s._v("可重复读是MySQL的默认隔离级别。")]),s._v(" "),t("h4",{attrs:{id:"serializable-可串行化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#serializable-可串行化","aria-hidden":"true"}},[s._v("#")]),s._v(" SERIALIZABLE 可串行化")]),s._v(" "),t("p",[s._v("SERIALIZABLE是隔离的最高级别。它通过强制事务串行执行，避免前面说的幻读的问题。可串行读会导致大量的超时和锁争用的问题。实际应用中也很少用到这个隔离级别。")]),s._v(" "),t("table",[t("thead",[t("tr",[t("th",[s._v("隔离级别")]),s._v(" "),t("th",[s._v("脏读可能性")]),s._v(" "),t("th",[s._v("不可重复读可能性")]),s._v(" "),t("th",[s._v("幻读可能性")]),s._v(" "),t("th",[s._v("加锁读")])])]),s._v(" "),t("tbody",[t("tr",[t("td",[s._v("未提交读")]),s._v(" "),t("td",[s._v("Yes")]),s._v(" "),t("td",[s._v("Yes")]),s._v(" "),t("td",[s._v("Yes")]),s._v(" "),t("td",[s._v("No")])]),s._v(" "),t("tr",[t("td",[s._v("提交读")]),s._v(" "),t("td",[s._v("No")]),s._v(" "),t("td",[s._v("Yes")]),s._v(" "),t("td",[s._v("Yes")]),s._v(" "),t("td",[s._v("No")])]),s._v(" "),t("tr",[t("td",[s._v("可重复读")]),s._v(" "),t("td",[s._v("No")]),s._v(" "),t("td",[s._v("No")]),s._v(" "),t("td",[s._v("Yes")]),s._v(" "),t("td",[s._v("No")])]),s._v(" "),t("tr",[t("td",[s._v("可串行读")]),s._v(" "),t("td",[s._v("No")]),s._v(" "),t("td",[s._v("No")]),s._v(" "),t("td",[s._v("No")]),s._v(" "),t("td",[s._v("Yes")])])])]),s._v(" "),t("h3",{attrs:{id:"_1-3-2-死锁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-2-死锁","aria-hidden":"true"}},[s._v("#")]),s._v(" 1.3.2 死锁")]),s._v(" "),t("p",[s._v("死锁是指两个或者多个事务在同一资源上互相占用并请求锁定对方占用的资源，从而导致恶性循环的现象。当多个事务试图以不同的顺序锁定资源时，就可能会产生死锁。多个事务同事锁定同一个资源时也会产生死锁。")]),s._v(" "),t("h3",{attrs:{id:"_1-3-4-mysql中的事务"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-4-mysql中的事务","aria-hidden":"true"}},[s._v("#")]),s._v(" 1.3.4 MySQL中的事务")]),s._v(" "),t("p",[s._v("MySQL提供了两种事务型的存储引擎，InnoDB和NDB Cluster。")]),s._v(" "),t("p",[t("strong",[s._v("自动提交")])]),s._v(" "),t("p",[s._v("MySQL默认采用的就是自动提交（AUTOCOMMIT）模式。")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[s._v("mysql"),t("span",{attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("SHOW")]),s._v(" VARIABLES "),t("span",{attrs:{class:"token operator"}},[s._v("LIKE")]),s._v(" "),t("span",{attrs:{class:"token string"}},[s._v("'AUTOCOMMIT'")]),t("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{attrs:{class:"token operator"}},[s._v("+")]),t("span",{attrs:{class:"token comment"}},[s._v("---------------+-------+")]),s._v("\n"),t("span",{attrs:{class:"token operator"}},[s._v("|")]),s._v(" Variable_name "),t("span",{attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("Value")]),s._v(" "),t("span",{attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),t("span",{attrs:{class:"token operator"}},[s._v("+")]),t("span",{attrs:{class:"token comment"}},[s._v("---------------+-------+")]),s._v("\n"),t("span",{attrs:{class:"token operator"}},[s._v("|")]),s._v(" autocommit    "),t("span",{attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("ON")]),s._v("    "),t("span",{attrs:{class:"token operator"}},[s._v("|")]),s._v("\n"),t("span",{attrs:{class:"token operator"}},[s._v("+")]),t("span",{attrs:{class:"token comment"}},[s._v("---------------+-------+")]),s._v("\n"),t("span",{attrs:{class:"token number"}},[s._v("1")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("row")]),s._v(" "),t("span",{attrs:{class:"token operator"}},[s._v("in")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("set")]),s._v(" "),t("span",{attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{attrs:{class:"token number"}},[s._v("0.01")]),s._v(" sec"),t("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\nmysql"),t("span",{attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("SET")]),s._v(" AUTOCOMMIT"),t("span",{attrs:{class:"token operator"}},[s._v("=")]),t("span",{attrs:{class:"token number"}},[s._v("1")]),t("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nQuery OK"),t("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{attrs:{class:"token number"}},[s._v("0")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("rows")]),s._v(" affected "),t("span",{attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{attrs:{class:"token number"}},[s._v("0.00")]),s._v(" sec"),t("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br")])]),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{attrs:{class:"token keyword"}},[s._v("SET")]),s._v(" AUTOCOMMIT"),t("span",{attrs:{class:"token operator"}},[s._v("=")]),t("span",{attrs:{class:"token number"}},[s._v("1")]),t("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{attrs:{class:"token comment"}},[s._v("# 开启")]),s._v("\n"),t("span",{attrs:{class:"token keyword"}},[s._v("SET")]),s._v(" AUTOCOMMIT"),t("span",{attrs:{class:"token operator"}},[s._v("=")]),t("span",{attrs:{class:"token number"}},[s._v("0")]),t("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{attrs:{class:"token comment"}},[s._v("# 关闭")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("可以通过配置文件设置整个数据库的隔离级别，也可以改变当前会话的隔离级别：")]),s._v(" "),t("div",{staticClass:"language-SQL line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[s._v("mysql"),t("span",{attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("SET")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("SESSION")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("TRANSACTION")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("ISOLATION")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("LEVEL")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("READ")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("COMMITTED")]),t("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nQuery OK"),t("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{attrs:{class:"token number"}},[s._v("0")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("rows")]),s._v(" affected "),t("span",{attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{attrs:{class:"token number"}},[s._v("0.00")]),s._v(" sec"),t("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[t("strong",[s._v("在事务中混合使用存储引擎")])]),s._v(" "),t("p",[s._v("MySQL服务器层不管理事务，事务是由下层的存储引擎实现的。所以在同一事务中使用多种存储引擎是不可靠的。")]),s._v(" "),t("p",[t("strong",[s._v("隐式和显式锁定")]),s._v("\n隐式锁定：在事务执行过程中，随时都可以执行锁定，锁只有在执行COMMIT或者ROLLBACK的时候才会释放，并且所有的锁是在同一时刻被释放。InnoDB会根据隔离级别在需要的时候自动加锁。")]),s._v(" "),t("p",[s._v("显式锁定：")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{attrs:{class:"token keyword"}},[s._v("SELECT")]),s._v(" "),t("span",{attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("LOCK")]),s._v(" "),t("span",{attrs:{class:"token operator"}},[s._v("IN")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("SHARE")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("MODE")]),t("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{attrs:{class:"token keyword"}},[s._v("SELECT")]),s._v(" "),t("span",{attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("FOR")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("UPDATE")]),t("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h2",{attrs:{id:"_1-5-mysql的存储引擎"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-mysql的存储引擎","aria-hidden":"true"}},[s._v("#")]),s._v(" 1.5 MySQL的存储引擎")]),s._v(" "),t("p",[s._v("显示表的相关信息：")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[s._v("mysql"),t("span",{attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("use")]),s._v(" mysql"),t("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nReading "),t("span",{attrs:{class:"token keyword"}},[s._v("table")]),s._v(" information "),t("span",{attrs:{class:"token keyword"}},[s._v("for")]),s._v(" completion "),t("span",{attrs:{class:"token keyword"}},[s._v("of")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("table")]),s._v(" "),t("span",{attrs:{class:"token operator"}},[s._v("and")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("column")]),s._v(" names\nYou can turn "),t("span",{attrs:{class:"token keyword"}},[s._v("off")]),s._v(" this feature "),t("span",{attrs:{class:"token keyword"}},[s._v("to")]),s._v(" get a quicker startup "),t("span",{attrs:{class:"token keyword"}},[s._v("with")]),s._v(" "),t("span",{attrs:{class:"token operator"}},[s._v("-")]),s._v("A\n\n"),t("span",{attrs:{class:"token keyword"}},[s._v("Database")]),s._v(" changed\nmysql"),t("span",{attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("SHOW")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("TABLE")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("STATUS")]),s._v(" "),t("span",{attrs:{class:"token operator"}},[s._v("LIKE")]),s._v(" "),t("span",{attrs:{class:"token string"}},[s._v("'user'")]),s._v("\\G\n"),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{attrs:{class:"token number"}},[s._v("1.")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("row")]),s._v(" "),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),t("span",{attrs:{class:"token operator"}},[s._v("*")]),s._v("\n           Name: "),t("span",{attrs:{class:"token keyword"}},[s._v("user")]),s._v("\n         "),t("span",{attrs:{class:"token keyword"}},[s._v("Engine")]),s._v(": MyISAM\n        Version: "),t("span",{attrs:{class:"token number"}},[s._v("10")]),s._v("\n     Row_format: Dynamic\n           "),t("span",{attrs:{class:"token keyword"}},[s._v("Rows")]),s._v(": "),t("span",{attrs:{class:"token number"}},[s._v("10")]),s._v("\n Avg_row_length: "),t("span",{attrs:{class:"token number"}},[s._v("121")]),s._v("\n    Data_length: "),t("span",{attrs:{class:"token number"}},[s._v("1216")]),s._v("\nMax_data_length: "),t("span",{attrs:{class:"token number"}},[s._v("281474976710655")]),s._v("\n   Index_length: "),t("span",{attrs:{class:"token number"}},[s._v("4096")]),s._v("\n      Data_free: "),t("span",{attrs:{class:"token number"}},[s._v("0")]),s._v("\n "),t("span",{attrs:{class:"token keyword"}},[s._v("Auto_increment")]),s._v(": "),t("span",{attrs:{class:"token boolean"}},[s._v("NULL")]),s._v("\n    Create_time: "),t("span",{attrs:{class:"token number"}},[s._v("2016")]),t("span",{attrs:{class:"token operator"}},[s._v("-")]),t("span",{attrs:{class:"token number"}},[s._v("11")]),t("span",{attrs:{class:"token operator"}},[s._v("-")]),t("span",{attrs:{class:"token number"}},[s._v("02")]),s._v(" "),t("span",{attrs:{class:"token number"}},[s._v("19")]),s._v(":"),t("span",{attrs:{class:"token number"}},[s._v("18")]),s._v(":"),t("span",{attrs:{class:"token number"}},[s._v("32")]),s._v("\n    Update_time: "),t("span",{attrs:{class:"token number"}},[s._v("2018")]),t("span",{attrs:{class:"token operator"}},[s._v("-")]),t("span",{attrs:{class:"token number"}},[s._v("11")]),t("span",{attrs:{class:"token operator"}},[s._v("-")]),t("span",{attrs:{class:"token number"}},[s._v("29")]),s._v(" "),t("span",{attrs:{class:"token number"}},[s._v("22")]),s._v(":"),t("span",{attrs:{class:"token number"}},[s._v("20")]),s._v(":"),t("span",{attrs:{class:"token number"}},[s._v("49")]),s._v("\n     Check_time: "),t("span",{attrs:{class:"token boolean"}},[s._v("NULL")]),s._v("\n      Collation: utf8_bin\n       Checksum: "),t("span",{attrs:{class:"token boolean"}},[s._v("NULL")]),s._v("\n Create_options:\n        "),t("span",{attrs:{class:"token keyword"}},[s._v("Comment")]),s._v(": Users "),t("span",{attrs:{class:"token operator"}},[s._v("and")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("global")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("privileges")]),s._v("\n"),t("span",{attrs:{class:"token number"}},[s._v("1")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("row")]),s._v(" "),t("span",{attrs:{class:"token operator"}},[s._v("in")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("set")]),s._v(" "),t("span",{attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{attrs:{class:"token number"}},[s._v("0.00")]),s._v(" sec"),t("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br")])]),t("h3",{attrs:{id:"_1-5-1-innodb存储引擎"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-1-innodb存储引擎","aria-hidden":"true"}},[s._v("#")]),s._v(" 1.5.1 InnoDB存储引擎")]),s._v(" "),t("p",[s._v("InnoDB是MySQL的默认事务型引擎，它被设置用来处理大量的短期事务，短期事务大部分情况是正常提交的，很少会被回滚。")]),s._v(" "),t("h4",{attrs:{id:"innodb概览"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#innodb概览","aria-hidden":"true"}},[s._v("#")]),s._v(" InnoDB概览")]),s._v(" "),t("p",[s._v("InnoDB采用MVCC来支持高并发，并且实现了四个标准的隔离级别。通过间隙锁策略防止幻读的出现。")]),s._v(" "),t("h3",{attrs:{id:"_1-5-2-myisam存储引擎"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-2-myisam存储引擎","aria-hidden":"true"}},[s._v("#")]),s._v(" 1.5.2 MyISAM存储引擎")]),s._v(" "),t("p",[s._v("提供了大量的特性，包括全文索引、压缩、空间函数等，大那是不支持事务和行级锁，缺陷就是崩溃后无法安全恢复。")]),s._v(" "),t("p",[s._v("对于只读的数据，或者表比较小，可以忍受修复操作，则依然可以继续使用MyISAM。"),t("strong",[s._v("请不要默认使用MyISAM，而应当默认使用InnoDB")]),s._v("。")]),s._v(" "),t("p",[s._v("MyISAM会将表存储在两个文件中：数据文件（.MYD）和索引文件（.MYI）。MyISAM对整张表加锁，而不是针对行（读取时会对需要读到的所有表加共享锁，写入时则对表加排他锁。可以通过"),t("code",[s._v("CHECK TABLE table_name")]),s._v("检查表的错误，如果有错误，可以通过"),t("code",[s._v("REPAIR TABLE table_name")]),s._v("进行修复（非常慢）。如果MySQL服务器已经关闭，可以通过"),t("code",[s._v("myisamchk")]),s._v("命令行工具进行检查和修复操作。")]),s._v(" "),t("p",[s._v("对于MyISAM表，即使是"),t("code",[s._v("BLOB")]),s._v("和"),t("code",[s._v("TEXT")]),s._v("等长字段，也可以基于前500个字符创建索引。MyISAM基于分词创建索引来支持全文索引。")]),s._v(" "),t("h3",{attrs:{id:"_1-5-3-mysql内建的其他存储引擎"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-3-mysql内建的其他存储引擎","aria-hidden":"true"}},[s._v("#")]),s._v(" 1.5.3 MySQL内建的其他存储引擎")]),s._v(" "),t("ul",[t("li",[s._v("Archieve引擎：非事务型引擎，支持"),t("code",[s._v("INSERT")]),s._v("和"),t("code",[s._v("SELECT")]),s._v("操作。")]),s._v(" "),t("li",[s._v("Blackhole引擎：没有实现任何存储机制，会记录Blackhole表的日志，用于复制数据到备库，或者只是简单地记录到日志。")]),s._v(" "),t("li",[s._v("CSV引擎：可以将普通的CSV文件作为MySQL的表来处理，但是不支持索引。")]),s._v(" "),t("li",[s._v("Memory引擎：如果需要快速访问数据，并且这些数据不会被修改，重启重启以后丢失也没有关系，那么使用Memory表示非常有用的。表级锁，并发写入性能较低。每行的长度是固定的。")])]),s._v(" "),t("h3",{attrs:{id:"_1-5-6-转换表的引擎"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-6-转换表的引擎","aria-hidden":"true"}},[s._v("#")]),s._v(" 1.5.6 转换表的引擎")]),s._v(" "),t("h4",{attrs:{id:"_1-alert-table"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-alert-table","aria-hidden":"true"}},[s._v("#")]),s._v(" 1. ALERT TABLE")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[s._v("mysql"),t("span",{attrs:{class:"token operator"}},[s._v(">")]),s._v(" ALERT "),t("span",{attrs:{class:"token keyword"}},[s._v("TABLE")]),s._v(" mytable ENGIN "),t("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("InnoDB")]),t("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("问题：执行时间长。MySQL会按行将数据从原来的表复制到一张新的表中，在复制期间可能会消耗系统所有I/O能力，同时会在原表上加上读锁。")]),s._v(" "),t("h4",{attrs:{id:"导出与导入"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#导出与导入","aria-hidden":"true"}},[s._v("#")]),s._v(" 导出与导入")]),s._v(" "),t("p",[s._v("可以使用"),t("code",[s._v("mysqldump")]),s._v("工具将数据导出到文件，修改文件中"),t("code",[s._v("CREATE TABLE")]),s._v("语句，同时修改表名。"),t("strong",[s._v("mysqldump默认会自动在CREATE TABLE语句前加上 DROP TABLE语句。")])]),s._v(" "),t("h4",{attrs:{id:"创建与查询"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#创建与查询","aria-hidden":"true"}},[s._v("#")]),s._v(" 创建与查询")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[s._v("mysql"),t("span",{attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("CREATE")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("TABLE")]),s._v(" innodb_table "),t("span",{attrs:{class:"token operator"}},[s._v("LIKE")]),s._v(" myisam_table"),t("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nmysql"),t("span",{attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("ALTER")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("TABLE")]),s._v(" innodb_table ENGIN"),t("span",{attrs:{class:"token operator"}},[s._v("=")]),t("span",{attrs:{class:"token keyword"}},[s._v("InnoDB")]),t("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nmysql"),t("span",{attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("INSERT")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("INTO")]),s._v(" innodb_table "),t("span",{attrs:{class:"token keyword"}},[s._v("SELECT")]),s._v(" "),t("span",{attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{attrs:{class:"token keyword"}},[s._v("FROM")]),s._v(" myisam_table"),t("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("数据量不大时可以很好地工作，数据大时，可以考虑分批处理。\nPercona Toolkit提供了一个pt-online-shema-change的工具，可以比较简单、方便的执行上述过程。")])])}],!1,null,null,null);r.options.__file="01.md";a.default=r.exports}}]);