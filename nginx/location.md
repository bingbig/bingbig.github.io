# nginx 配置

### 1. location

```nginx
location  = / {
  # 只匹配"/"
  [ configuration A ] 
}
location  / {
  # 匹配任何请求，因为所有请求都是以"/"开始
  # 但是更长字符匹配或者正则表达式匹配会优先匹配
  [ configuration B ] 
}
location ^~ /images/ {
  # 匹配任何以 /images/ 开始的请求，并停止匹配 其它location
  [ configuration C ] 
}
location ~* .(gif|jpg|jpeg)$ {
  # 匹配以 gif, jpg, or jpeg结尾的请求. 
  # 但是所有 /images/ 目录的请求将由 [Configuration C]处理.   
  [ configuration D ] 
}
```



#### 1.1 匹配命令

| 匹配命令 | 描述                                       |
| ---- | ---------------------------------------- |
| `~`  | 表示执行一个正则匹配，区分大小写                         |
| `^~` | 表示普通字符匹配，如果该选项匹配，只匹配该选项，不匹配别的选项，一般用来匹配目录 |
| `~*` | 表示执行一个正则匹配，不区分大小写                        |
| `=`  | 表示普通字符精确匹配                               |
| `@`  | 定义一个命令的location，使用在内部定向时，例如errr_page, try_files |



#### 1.2 优先级

**与location在配置文件中的顺序无关**

1. Directives with the `=` prefix that match the query exactly. If found, searching stops.
2. All remaining directives with conventional strings, `longest match first`. If this match used the `^~` prefix, searching stops.
3. Regular expressions, `in order of definition` in the configuration file.
4. If `#3` yielded a match, that result is used. Else the match from `#2` is used.