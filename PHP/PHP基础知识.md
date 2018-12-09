# PHP基础知识

## 1. PHP是世界上最好的语言

`PHP` 是 `PHP Hypertext Preprocessor `的缩写

### 1.1 基本数据类型

| 类型检查函数          | 类型   | 描述                      |
| --------------- | ---- | ----------------------- |
| `is_bool()`     | 布尔型  |                         |
| `is_integer()`  | 整数型  | 整数                      |
| `is_double`     | 浮点型  |                         |
| `is_string`     | 字符串  |                         |
| `is_object()`   | 对象   |                         |
| `is_array()`    | 数组   |                         |
| `is_resource()` | 资源   | 用于识别和处理外部资源（如数据库或文件）的句柄 |
| `is_null()`     | NULL | 为分配的值                   |



PHP要慎用 `==` ：

1. 如果比较一个`整数`和`字符串`，则**字符串会被转换为整数**；
2. 如果比较`两个数字字符串`，则作为**整数比较**；
3. 此规则也适用于 switch 语句。

```php
var_dump('123fg456'==123);
var_dump('some string' == 0);
var_dump(123.0 == '123d456');
var_dump(0 == "a");
var_dump("1" == "01");
var_dump("1" == "1e0");

var_dump([
    0 == "",
    0 == "0",
    "" == "0"
]);
```

输出：
```shell
bool(true)
bool(true)
bool(true)
bool(true)
bool(true)
bool(true)
array(3) {
    [0]=>
        bool(true)
    [1]=>
        bool(true)
    [2]=>
        bool(false)
}
```



### 1.2 变量作用域

打印未定义的变量会发出警告。

函数*之外*声明的变量拥有 Global 作用域，只能在函数以外进行访问。

函数*内部*声明的变量拥有 LOCAL 作用域，只能在函数内部进行访问。

##### 1.2.1 PHP 全局变量 - 超全局变量

PHP 中的许多预定义变量都是“超全局的”，这意味着它们在一个脚本的全部作用域中都可用。在函数或方法中无需执行 global $variable; 就可以访问它们。

这些超全局变量是：

- `$GLOBALS`

- `$_SERVER`

- `$_REQUEST`

- `$_POST`

- `$_GET`

- `$_FILES`

- `$_ENV`

- `$_COOKIE`

- `$_SESSION`

  ​

### 1.3 函数

**PHP 的真正力量来自它的函数：它拥有超过 1000 个内建的函数。**

`echo` 和 `print` 都是是一个语言结构，有无括号均可使用：`echo` 或` echo()`，`print`和`print()`。

`echo` 和 `print` 之间的差异：

- echo - 能够输出一个以上的字符串
- print - 只能输出一个字符串，并始终返回 1 

**提示：echo 比 print 稍快，因为它不返回任何值。**

`htmlspecialchars()` 函数把特殊字符转换为 HTML 实体。这意味着 `<` 和` >` 之类的 HTML 字符会被替换为` &lt; ` 和 ` &lt; ` 。这样可防止攻击者通过在表单中注入 HTML 或 JavaScript 代码（跨站点脚本攻击）对代码进行利用。

`include` 和 `require` 语句是相同的，除了错误处理方面：

- require 会生成致命错误（`E_COMPILE_ERROR`）并停止脚本
- include 只生成警告（`E_WARNING`），并且脚本会继续


`setcookie()` 函数用于设置 cookie。

::: tip
setcookie() 函数必须位于 `<html>` 标签之前。
:::

### 语法

```php
setcookie(name, value, expire, path, domain);
```

在您把用户信息存储到 PHP session 中之前，首先必须启动会话。

注释：session_start() 函数必须位于 `<html>` 标签之前：

```php
<?php session_start(); ?>

<html>
	<body>
	</body>
</html>
```

您也可以通过 session_destroy() 函数彻底终结 session：

```php
<?php
	session_destroy();
?>
```

`substr()`第二个参数是`start`，第三个参数是`length`可省略。start若为负则从末端开始计，最后一个字符位置是`-1`，向前依次减小。length若为正数表示从start开始的长度，若为负数表示从末端略去的字符长度，例如`-2`表示从末尾开始略去两个字符。

```php
<?php
    $rest = substr("abcdef", -1);		// f
    $rest = substr("abcdef", 0, -1);	// abcde
?>
```

`Function name must be a string`，因此，可以用string来执行函数

```php
<?php
function display_result() {
	echo "successfully\n";
}

'display_result'();		// successfully
display_result();		// successfully
?>
```

`global` 

函数内部使用global后，会在函数作用域范围内新建一个和全局变量同名的引用，因此修改这个同名引用会修改外部的变量的值。取地址之后`&`， 变量不再是全局变量的同名引用了，只是函数的局部变量。`global`慎用啊！

```php
<?php
$var1 = 1;
$var2 = 2;
function test() {
	global $var1, $var2;
	$var1 = 3;
	echo $var1;		// 3
	$var1 = &$var2;
	echo $var1;		// 2
}
test();
echo $var1;			// 3
?>
```

## 2. PHP面向对象

[抽象类](./OOP/abstract_class.md)

PHP 5 新增了一个 `final` 关键字。

1. 如果父类中的`方法`被声明为 final，则子类无法覆盖该方法。
2. 如果一个`类`被声明为 final，则不能被继承。


静态属性只能通过类来访问（但静态方法可以）。

```php
class A {
	static $value = 100;

	static public function show() {
		echo "static method show\n";
	}
}
$a = new A();
echo A::$value, "\n";
A::show();

$a->show();
//** output **
// 100
// static method show
// static method show
```

## 3. PHP运行机制

PHP的所有应用程序都是通过`WEB服务器(如IIS或Apache)`和`php引擎程序（如smarty）`解释执行完成的，

工作过程：

1. 当用户在浏览器地址中输入要访问的PHP页面文件名，然后回车就会触发这个PHP请求，并将请求传送化支持PHP的WEB服务器。
2. WEB服务器接受这个请求，并根据其后缀进行判断如果是一个PHP请求，WEB服务器从硬盘或内存中取出用户要访问的PHP应用程序，并将其发送给 PHP引擎程序。
3. PHP引擎程序将会对WEB服务器传送过来的文件从头到尾进行扫描并根据命令从后台读取，处理数据，并动态地生成相应的HTML页面。
4. PHP引擎将生成HTML页面返回给WEB服务器。WEB服务器再将HTML页面返回给客户端浏览器。


虚拟主机通常用fast-cgi或者php-cgi方式，因为可以把php程序和apache隔离开，防止虚拟主机的拥有者执行恶意程序。

apache handler（模块方式）的方式效率最高，但是php和apache运行在一个进程里面，所以php做什么事情都会影响apache。

运行方式：

### 3.1 配置Apache将PHP解释器作为CGI脚本

比较原始的方法。性能上，CGI模式每一次接到请求会调用php.exe，解析php.ini，加载DLL等，速度自然慢。

### 3.2 作为Apache本身的一个模块(mod_php)

**Apache默认运行方式**，Web程序启动时就作为启动，等待请求

### 3.3 FastCGI模式PHP-FPM(php-FastCGI Process Manager)

Web程序启动时就作为启动，等待请求。实现了类似连接池的技术特性，保持了对后台的连接，请求到来即可使用，结束即断开准备与下一个请求连接。一般认为，FastCGI是适用于高并发使用场景下的，同时使用FastCGI可以使得程序在Web Server产品与代码两端都具有更好的选择自由度。

FastCGI的工作原理是：

1. Web Server 启动时载入FastCGI进程管理器【PHP的FastCGI进程管理器是PHP-FPM ( php-FastCGI Process Manager )】（IIS ISAPI或Apache Module);
2. FastCGI进程管理器自身初始化，启动多个CGI解释器进程 (在任务管理器中可见多个php-cgi.exe)并等待来自Web Server的连接。
3. 当客户端请求到达Web Server时，FastCGI进程管理器选择并连接到一个CGI解释器。Web server将CGI环境变量和标准输入发送到FastCGI子进程php-cgi.exe。 
4. FastCGI子进程完成处理后将标准输出和错误信息从同一连接返回Web Server。当FastCGI子进程关闭连接时，请求便告处理完成。FastCGI子进程接着等待并处理来自FastCGI进程管理器（运行在 WebServer中）的下一个连接。 在正常的CGI模式中，php-cgi.exe在此便退出了。

在上述情况中，你可以想象 CGI通常有多慢。每一个Web请求PHP都必须重新解析php.ini、重新载入全部dll扩展并重初始化全部[数据结构](http://lib.csdn.net/base/datastructure)。使用FastCGI，所有这些都只在进程启动时发生一次。一个额外的好处是，持续数据库连接(Persistent database connection)可以工作。

**Nginx默认不支持CGI模式，它是以FastCGI方式运行的。所以使用Nginx+PHP就是直接配置为FastCGI模式。**


