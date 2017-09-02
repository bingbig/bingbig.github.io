# PHP基础知识

## 1. PHP是世界上最好的语言

`PHP`是`PHP Hypertext Preprocessor`的缩写

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

### 1.2 变量作用域

打印未定义的变量会发出警告。

函数*之外*声明的变量拥有 Global 作用域，只能在函数以外进行访问。

函数*内部*声明的变量拥有 LOCAL 作用域，只能在函数内部进行访问。

##### 1.2.1 PHP 全局变量 - 超全局变量

PHP 中的许多预定义变量都是“超全局的”，这意味着它们在一个脚本的全部作用域中都可用。在函数或方法中无需执行 global $variable; 就可以访问它们。

这些超全局变量是：

- $GLOBALS

- $_SERVER

- $_REQUEST

- $_POST

- $_GET

- $_FILES

- $_ENV

- $_COOKIE

- $_SESSION

  ​

### 1.3 函数

**PHP 的真正力量来自它的函数：它拥有超过 1000 个内建的函数。**



echo 和print都是是一个语言结构，有无括号均可使用：`echo` 或` echo()`，`print`和`print()`。

`echo` 和 `print` 之间的差异：

- echo - 能够输出一个以上的字符串
- print - 只能输出一个字符串，并始终返回 1 

**提示：echo 比 print 稍快，因为它不返回任何值。**



`htmlspecialchars()` 函数把特殊字符转换为 HTML 实体。这意味着 `<` 和` >` 之类的 HTML 字符会被替换为` &lt; ` 和 ` &lt; ` 。这样可防止攻击者通过在表单中注入 HTML 或 JavaScript 代码（跨站点脚本攻击）对代码进行利用。



`include` 和 `require` 语句是相同的，除了错误处理方面：

- require 会生成致命错误（`E_COMPILE_ERROR`）并停止脚本
- include 只生成警告（`E_WARNING`），并且脚本会继续



`setcookie()` 函数用于设置 cookie。

注释：setcookie() 函数必须位于 `<html>` 标签之前。

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

