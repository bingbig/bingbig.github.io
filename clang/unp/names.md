# 名字与地址的转换

域名系统（Domain Name System， DNS）主要用于主机名字与IP地址之间的映射。主机名既可以是一个简单的名字，如bingbig，也可以是一个全限定名（Fully Qualified Domain Name， FQDN），如www.weibo.com。严格的来说FQDN必须一个点号结尾。

DNS中的条目称为资源记录（Resource Record，RR），我们感兴趣的RR类型只有几个，如下：
- **A** 

A记录把主机名映射成一个32位的IPv4地址，如 `bingbig  12.111.23.23`。

- **AAAA**

称为“四A”（quad A）记录的AAAA记录把一个主机名映射成一个128位的IPv6地址。是32位地址的4倍。

- **PTR**

称为“指针记录”（pointer record）的PTR记录把IP地址映射成主机名。对于IPv4地址，32位地址的4个字节反转顺序，每个字节都转换成各自的十进制ASCII值（0~255）后，再添上`in-addr.arpa`，结果字符串用于PTR查询。相应的IPv6地址，反转后每个四位组都被转换成十六进制的ASCII值（0~9，a~f），再添上`ip6.arpa`。

- **MX**

MX记录把一个主机指定作为给定主机的“邮件交换器“（mail exchanger）。

- **CNAME**

CNAME代表“canonical name”（规范名字），它的常见用法是为常用的服务（例如ftp，www）指派CNAME记录。如果人们使用这些服务名而不是真实的主机名，那么相应得服务挪到另一个主机时他们也不知道。

每个支机构往往运行着一个或多个`名字服务器（name server）`，我们通过调用称为`解析器（resolve）`的函数库中的函数结束DNS服务器。解析器通过读取其系统相关配置文件确定本组织机构的名字服务器们的所在位置，文件`/etc/resolve.conf`通过包含本地名字服务器主机的IP地址。

不适用DNS也能获取名字和地址信息，常用的替代方法有静态机主文件（通常是`/etc/hosts`）、网络信息系统（Network Information System， NIS）以及轻权目录访问权限（Lightweight Directory Access Protocol， LDAP）。对于应用程序开发人员来说这些通常是透明的，我们只需要调用诸如`gethostbyname`和`gethostbyaddr`这样的解析器函数。

## gethostbyname函数
:::tip 注意
从POSIX规范中撤销该函数意在声明新的程序不再使用它，我们鼓励在新的程序中改用`getaddrinfo`函数。
:::

```c
#include <netdb.h>

struct hostent *gethostname(const char *hostname); /** 返回： 若成功则为非空指针，若出错则为NULL且设置h_errno **/
```
本函数返回的非空指针指向如下的hostent结构。
```c
struct hostent {
    char *h_name;       /** CNAME **/
    char **h_aliases;   /** 指向别名指针数组的指针 **/
    int h_addrtype;     /** 主机地址类型：AF_INET **/
    int h_length;       /** 地址长度： 4 **/
    char **h_addr_list; /** 指向IPv4地址指针的指针 **/
}
```

gethostbyname发生错误时，它不设置errno变量，而是将全局整数变量h_errno设置为定义在<netdb.h>中的下列常值：`HOST_NOT_FOUND`, `TRY_AGAIN`, `NO_RECOVERY`, `NO_DATA`（等同于`NO_ADDRESS`）。

### 例子
<<<@/clang/src/names/unp.c
<<<@/clang/src/names/hostent.c

