# DNS 原理入门
[source: http://www.ruanyifeng.com/blog/2016/06/dns.html]

DNS 是互联网核心协议之一。不管是上网浏览，还是编程开发，都需要了解一点它的知识。

本文详细介绍DNS的原理，以及如何运用工具软件观察它的运作。我的目标是，读完此文后，你就能完全理解DNS。

## 1. DNS 是什么？
`DNS （Domain Name System 的缩写）`的作用非常简单，就是根据域名查出IP地址。你可以把它想象成一本巨大的电话本。

举例来说，如果你要访问域名math.stackexchange.com，首先要通过DNS查出它的IP地址是151.101.129.69。

如果你不清楚为什么一定要查出IP地址，才能进行网络通信，建议先阅读我写的[《互联网协议入门》](./OSI.md)。

## 2. 查询过程
虽然只需要返回一个IP地址，但是DNS的查询过程非常复杂，分成多个步骤。
工具软件dig可以显示整个查询过程。
```shell
$ dig math.stackexchange.com
```

```shell
[liub@MacBookPro OSI]$ dig math.stackexchange.com

; <<>> DiG 9.8.3-P1 <<>> math.stackexchange.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12998
;; flags: qr rd ra; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;math.stackexchange.com.		IN	A

;; ANSWER SECTION:
math.stackexchange.com.	300	IN	A	151.101.193.69
math.stackexchange.com.	300	IN	A	151.101.65.69
math.stackexchange.com.	300	IN	A	151.101.129.69
math.stackexchange.com.	300	IN	A	151.101.1.69

;; Query time: 193 msec
;; SERVER: 202.112.80.168#53(202.112.80.168)
;; WHEN: Sun Aug 27 16:19:43 2017
;; MSG SIZE  rcvd: 104
```

上面的命令会输出四段信息。

第一段是查询参数和统计。
```shell
; <<>> DiG 9.8.3-P1 <<>> math.stackexchange.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12998
;; flags: qr rd ra; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 0
```

第二段是查询内容。
```shell
;; QUESTION SECTION:
;math.stackexchange.com.		IN	A
```

第三段是DNS服务器的答复。
```shell
;; ANSWER SECTION:
math.stackexchange.com.	300	IN	A	151.101.193.69
math.stackexchange.com.	300	IN	A	151.101.65.69
math.stackexchange.com.	300	IN	A	151.101.129.69
math.stackexchange.com.	300	IN	A	151.101.1.69
```

上面结果显示，math.stackexchange.com有四个A记录，即四个IP地址。300是`TTL值（Time to live 的缩写）`，表示缓存时间，即300秒之内不用重新查询。

第四段是DNS服务器的一些传输信息。
```shell
;; Query time: 193 msec
;; SERVER: 202.112.80.168#53(202.112.80.168)
;; WHEN: Sun Aug 27 16:19:43 2017
;; MSG SIZE  rcvd: 104
```

上面结果显示，本机的DNS服务器是192.168.1.253，查询端口是53（DNS服务器的默认端口），以及回应长度是305字节。

如果不想看到这么多内容，可以使用+short参数。

## 3. DNS服务器
下面我们根据前面这个例子，一步步还原，本机到底怎么得到域名math.stackexchange.com的IP地址。

首先，本机一定要知道DNS服务器的IP地址，否则上不了网。通过DNS服务器，才能知道某个域名的IP地址到底是什么。

DNS服务器的IP地址，有可能是动态的，每次上网时由网关分配，这叫做`DHCP机制`；也有可能是事先指定的固定地址。Linux系统里面，DNS服务器的IP地址保存在`/etc/resolv.conf`文件。

上例的DNS服务器是192.168.1.253，这是一个内网地址。有一些公网的DNS服务器，也可以使用，其中最有名的就是Google的8.8.8.8和Level 3的4.2.2.2。

本机只向自己的DNS服务器查询，dig命令有一个@参数，显示向其他DNS服务器查询的结果。

```shell
$ dig @4.2.2.2 math.stackexchange.com
```
上面命令指定向DNS服务器`4.2.2.2`查询。

## 4. 域名的层级
DNS服务器怎么会知道每个域名的IP地址呢？答案是分级查询。
请仔细看前面的例子，每个域名的尾部都多了一个点。

比如，域名`math.stackexchange.com`显示为`math.stackexchange.com.`。这不是疏忽，而是所有域名的尾部，实际上都有一个`根域名`。

举例来说，`www.example.com`真正的域名是`www.example.com.root`，简写为`www.example.com.`。因为，根域名.root对于所有域名都是一样的，所以平时是省略的。

根域名的下一级，叫做`"顶级域名"（top-level domain，缩写为TLD）`，比如.com、.net；再下一级叫做`"次级域名"（second-level domain，缩写为SLD）`，比如www.example.com里面的.example，这一级域名是用户可以注册的；再下一级是`主机名（host）`，比如www.example.com里面的www，又称为`"三级域名"`，这是用户在自己的域里面为服务器分配的名称，是用户可以任意分配的。

总结一下，域名的层级结构如下。

主机名.次级域名.顶级域名.根域名

```
host.sld.tld.root
```

## 5. 根域名服务器
DNS服务器根据域名的层级，进行分级查询。

需要明确的是，每一级域名都有自己的NS记录，NS记录指向该级域名的域名服务器。这些服务器知道下一级域名的各种记录。
所谓"分级查询"，就是从根域名开始，依次查询每一级域名的`NS记录（Name Server的缩写）`，直到查到最终的IP地址，过程大致如下。

1. 从"根域名服务器"查到"顶级域名服务器"的NS记录和A记录（IP地址）
2. 从"顶级域名服务器"查到"次级域名服务器"的NS记录和A记录（IP地址）
3. 从"次级域名服务器"查出"主机名"的IP地址

仔细看上面的过程，你可能发现了，没有提到DNS服务器怎么知道"根域名服务器"的IP地址。回答是"根域名服务器"的NS记录和IP地址一般是不会变化的，所以内置在DNS服务器里面。

下面是内置的根域名服务器IP地址的一个例子。

![DNS root server](./img/dns_1.png)

上面列表中，列出了根域名（.root）的三条NS记录`A.ROOT-SERVERS.NET`、`B.ROOT-SERVERS.NET`和`C.ROOT-SERVERS.NET`，以及它们的IP地址（即A记录）`198.41.0.4`、`192.228.79.201`、`192.33.4.12`。
另外，可以看到所有记录的TTL值是3600000秒，相当于1000小时。也就是说，每1000小时才查询一次根域名服务器的列表。

目前，世界上一共有十三组根域名服务器，从`A.ROOT-SERVERS.NET`一直到`M.ROOT-SERVERS.NET`。

## 6. 分级查询的实例
dig命令的+trace参数可以显示DNS的整个分级查询过程。

```shell
$ dig +trace math.stackexchange.com
```

上面命令的第一段列出根域名`.`的所有NS记录，即`所有根域名服务器`。

```shell
[liub@MacBookPro OSI]$  dig +trace math.stackexchange.com

; <<>> DiG 9.8.3-P1 <<>> +trace math.stackexchange.com
;; global options: +cmd
.			326194	IN	NS	c.root-servers.net.
.			326194	IN	NS	e.root-servers.net.
.			326194	IN	NS	a.root-servers.net.
.			326194	IN	NS	h.root-servers.net.
.			326194	IN	NS	b.root-servers.net.
.			326194	IN	NS	m.root-servers.net.
.			326194	IN	NS	d.root-servers.net.
.			326194	IN	NS	k.root-servers.net.
.			326194	IN	NS	g.root-servers.net.
.			326194	IN	NS	f.root-servers.net.
.			326194	IN	NS	i.root-servers.net.
.			326194	IN	NS	j.root-servers.net.
.			326194	IN	NS	l.root-servers.net.
;; Received 228 bytes from 202.112.80.168#53(202.112.80.168) in 4224 ms

com.			172800	IN	NS	l.gtld-servers.net.
com.			172800	IN	NS	k.gtld-servers.net.
com.			172800	IN	NS	d.gtld-servers.net.
com.			172800	IN	NS	e.gtld-servers.net.
com.			172800	IN	NS	j.gtld-servers.net.
com.			172800	IN	NS	c.gtld-servers.net.
com.			172800	IN	NS	m.gtld-servers.net.
com.			172800	IN	NS	h.gtld-servers.net.
com.			172800	IN	NS	i.gtld-servers.net.
com.			172800	IN	NS	a.gtld-servers.net.
com.			172800	IN	NS	g.gtld-servers.net.
com.			172800	IN	NS	b.gtld-servers.net.
com.			172800	IN	NS	f.gtld-servers.net.
;; Received 500 bytes from 192.228.79.201#53(192.228.79.201) in 1098 ms

stackexchange.com.	172800	IN	NS	ns-925.awsdns-51.net.
stackexchange.com.	172800	IN	NS	ns-1029.awsdns-00.org.
stackexchange.com.	172800	IN	NS	ns-cloud-d1.googledomains.com.
stackexchange.com.	172800	IN	NS	ns-cloud-d2.googledomains.com.
;; Received 279 bytes from 192.52.178.30#53(192.52.178.30) in 89 ms

math.stackexchange.com.	300	IN	A	151.101.193.69
math.stackexchange.com.	300	IN	A	151.101.65.69
math.stackexchange.com.	300	IN	A	151.101.1.69
math.stackexchange.com.	300	IN	A	151.101.129.69
stackexchange.com.	172800	IN	NS	ns-1029.awsdns-00.org.
stackexchange.com.	172800	IN	NS	ns-925.awsdns-51.net.
stackexchange.com.	172800	IN	NS	ns-cloud-d1.googledomains.com.
stackexchange.com.	172800	IN	NS	ns-cloud-d2.googledomains.com.
;; Received 239 bytes from 205.251.196.5#53(205.251.196.5) in 103 ms

```

根据内置的根域名服务器IP地址，DNS服务器向所有这些IP地址发出查询请求，询问math.stackexchange.com的顶级域名服务器com.的NS记录。最先回复的根域名服务器将被缓存，以后只向这台服务器发请求。
接着是第二段。

显示.com域名的13条NS记录，同时返回的还有每一条记录对应的IP地址。

然后，DNS服务器向这些顶级域名服务器发出查询请求，询问math.stackexchange.com的次级域名stackexchange.com的NS记录。

上面结果显示stackexchange.com有四条NS记录，同时返回的还有每一条NS记录对应的IP地址。

然后，DNS服务器向上面这四台NS服务器查询`math.stackexchange.com`的主机名。

上面结果显示，math.stackexchange.com有4条A记录，即这四个IP地址都可以访问到网站。并且还显示，最先返回结果的NS服务器是ns-463.awsdns-57.com，IP地址为205.251.193.207。

## 7. NS 记录的查询
dig命令可以单独查看每一级域名的NS记录。
```shell
$ dig ns com
$ dig ns stackexchange.com
```
+short参数可以显示简化的结果。
```shell
$ dig +short ns com
$ dig +short ns stackexchange.com
```

## 8. DNS的记录类型
域名与IP之间的对应关系，称为"记录"（record）。根据使用场景，"记录"可以分成不同的类型（type），前面已经看到了有A记录和NS记录。
常见的DNS记录类型如下。

```
1. A：地址记录（Address），返回域名指向的IP地址。
2. NS：域名服务器记录（Name Server），返回保存下一级域名信息的服务器地址。该记录只能设置为域名，不能设置为IP地址。
3. MX：邮件记录（Mail eXchange），返回接收电子邮件的服务器地址。
4. CNAME：规范名称记录（Canonical Name），返回另一个域名，即当前查询的域名是另一个域名的跳转，详见下文。
5. PTR：逆向查询记录（Pointer Record），只用于从IP地址查询域名，详见下文。
```

一般来说，为了服务的安全可靠，至少应该有两条NS记录，而A记录和MX记录也可以有多条，这样就提供了服务的冗余性，防止出现单点失败。

CNAME记录主要用于域名的内部跳转，为服务器配置提供灵活性，用户感知不到。举例来说，facebook.github.io这个域名就是一个CNAME记录。

一般来说，为了服务的安全可靠，至少应该有两条NS记录，而A记录和MX记录也可以有多条，这样就提供了服务的冗余性，防止出现单点失败。

CNAME记录主要用于域名的内部跳转，为服务器配置提供灵活性，用户感知不到。举例来说，facebook.github.io这个域名就是一个CNAME记录。

## 9. 其他DNS工具
除了dig，还有一些其他小工具也可以使用。

1. host 命令
host命令可以看作dig命令的简化版本，返回当前请求域名的各种记录。

	```shell
	$ host github.com
	
	github.com has address 192.30.252.121
	github.com mail is handled by 5 ALT2.ASPMX.L.GOOGLE.COM.
	github.com mail is handled by 10 ALT4.ASPMX.L.GOOGLE.COM.
	github.com mail is handled by 10 ALT3.ASPMX.L.GOOGLE.COM.
	github.com mail is handled by 5 ALT1.ASPMX.L.GOOGLE.COM.
	github.com mail is handled by 1 ASPMX.L.GOOGLE.COM.
	
	$ host facebook.github.com
	
	facebook.github.com is an alias for github.map.fastly.net.
	github.map.fastly.net has address 103.245.222.133
	```

	host命令也可以用于逆向查询，即从IP地址查询域名，等同于dig -x <ip>。

	```shell
	$ host 192.30.252.153
	
	153.252.30.192.in-addr.arpa domain name pointer pages.github.com.
	```

2. nslookup 命令
	nslookup命令用于互动式地查询域名记录。
	```shell
	$ nslookup
	
	> facebook.github.io
	Server:     192.168.1.253
	Address:    192.168.1.253#53
	
	Non-authoritative answer:
	facebook.github.io  canonical name = github.map.fastly.net.
	Name:   github.map.fastly.net
	Address: 103.245.222.133
	
	> 
	```
3. whois 命令
	whois命令用来查看域名的注册情况。
	```shell
	$ whois github.com
	```

## 10. 参考链接
1. [DNS: The Good Parts, by Pete Keen](https://www.petekeen.net/dns-the-good-parts)
2. [ DNS 101, by Mark McDonnell](http://www.integralist.co.uk/posts/dnsbasics.html)

