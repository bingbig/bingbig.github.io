## ssh登陆提示LC_CTYPE错误

```shell
-bash: warning: setlocale: LC_CTYPE: cannot change locale (UTF-8): No such file or directory
```

### 解决方法：

1. 打开或者新建文件

```
/etc/environment
```

加入下面两行：

```shell
LANG=en_US.UTF-8
LC_ALL=en_US.UTF-8
```

