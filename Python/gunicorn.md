# gunicorn

> http://www.pythontip.com/blog/post/5155/
>
> https://www.zhihu.com/question/38528616/answer/76903036
>
> http://docs.gunicorn.org/en/stable/design.html



`gunicorn` “绿色独角兽”是一个被广泛使用的高性能的Python `WSGI` UNIX HTTP服务器，移植自Ruby的独角兽（`Unicorn `）项目,使用 `pre-fork worker `（在接收到请求之前fork出进程来）模式，具有使用非常简单，轻量级的资源消耗，以及高性能等特点。

Gunicorn基于`pre-fork woker`模型。一个中心的master进程管理一系列的woker进程。管理进程永远不知道客户端的任何事，所有的请求和相应都是由woker进程来处理。

主进程一个简单的循环，监听各种进程信号并作出相应的反应。通过监听信号（如TTIN, TTOU, and CHLD）来管理正在运行的wokers进程。TTIN和TTOU告诉主进程来增加或者减少运行的workers。CHLD意味着一个子进程被终止了。

Workers包括Sync Workers，Async Workers，Tornado Workers，AsyncIO Workers。

Gunicorn 服务器作为wsgi app的容器，能够与各种Web框架兼容（flask，django等）,得益于gevent等技术，使用Gunicorn能够在基本不改变wsgi app代码的前提下，大幅度提高wsgi app的性能。



那么，为什么会在gunicorn之前还会套一个nginx呢？有nginx的存在，为什么还需要gunicorn这个轮子呢？

在前面增加一层nginx的情况主要是：

1. 负载均衡，nginx占用80端口，gunicorn可以占用多个非80端口
2. 拦截静态请求
3. 伪静态化并缓存，减少动态请求数量
4. 依赖于nginx强大的功能和性能，可以做访问控制，限速，限连接数等等

Nginx 是专业的服务器，性能更好，更专业，并发更高，可以做负载均衡，可以做静态文件缓存，还可以限制 ip 访问的频率等等。

Gunicorn 一般用来多进程自动管理，有进程挂了Gunicorn可以把它拉起来，防止服务器长时间停止服务，还可以动态调整 worker 的数量，请求多的时候增加 worker 的数量，请求少的时候减少，这就是所谓的 `pre-fork 模型`。



> 官方表示

Gunicorn 是一个 WSGI HTTP 服务器. 最好在HTTP 代理服务器后使用它。 我们强烈推荐大家使用 [nginx](http://www.nginx.org/).

下面是个例子帮助大家开始使用nginx：

```nginx
  server {
    listen 80;
    server_name example.org;
    access_log  /var/log/nginx/example.log;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
  }
```

nginx被设置为一个反向代理服务器，代理监听localhost端口8000的Gunicorn服务。

Nginx is set up as reverse proxy server to a Gunicorn server running on localhost port 8000.