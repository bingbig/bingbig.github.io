# 容器进程

今天用 `ps` 命令查看进程，发现一些本应该在docker容器而不应该在宿主上的进程，好奇，网上一查。

## 容器的PID namespace（名空间）

> 本节信息来源：http://www.cnblogs.com/ilinuxer/p/6188303.html

在Docker中，进程管理的基础就是Linux内核中的PID名空间技术。在不同PID名空间中，进程ID是独立的；即在两个不同名空间下的进程可以有相同的PID。

Linux内核为所有的PID名空间维护了一个树状结构：最顶层的是系统初始化时创建的root namespace（根名空间），再创建的新PID namespace就称之为child namespace（子名空间），而原先的PID名空间就是新创建的PID名空间的parent namespace（父名空间）。通过这种方式，系统中的PID名空间会形成一个层级体系。*父节点可以看到子节点中的进程，并可以通过信号等方式对子节点中的进程产生影响。反过来，子节点不能看到父节点名空间中的任何内容，也不可能通过kill或ptrace影响父节点或其他名空间中的进程。*

**在Docker中，每个Container都是Docker Daemon的子进程，每个Container进程缺省都具有不同的PID名空间。**通过名空间技术，Docker实现容器间的进程隔离。另外Docker Daemon也会利用PID名空间的树状结构，实现了对容器中的进程交互、监控和回收。注：Docker还利用了其他名空间（UTS，IPC，USER）等实现了各种系统资源的隔离，由于这些内容和进程管理关联不多，本文不会涉及。

当创建一个Docker容器的时候，就会新建一个PID名空间。容器启动进程在该名空间内PID为1。当PID1进程结束之后，Docker会销毁对应的PID名空间，并向容器内所有其它的子进程发送SIGKILL。

## 了解容器进程父子关系

### 方法1

通过`ps`命令找到`dockerd`守护进程的`pid`：

```shell
$ ps aux |grep dockerd
gd        7483  0.0  0.0  11720  1840 pts/10   S+   17:40   0:00 grep --color=auto dockerd
root      9317  0.1  0.2 1680284 41848 ?       Ssl  Aug16  51:19 /usr/bin/dockerd --raw-logs
```

然后通过`pstree` 查看进程的父子关系：

```shell
$ pstree -p 9317
dockerd(9317)-+-docker-containe(9343)-+-docker-containe(1043)-+-sh(1065)-+-cron(1078)
              |                       |                       |          `-gunicorn(1079)-+-gunicorn(1096)-+-{gunicorn}(15535)
              |                       |                       |                           |                `-{gunicorn}(18052)
              |                       |                       |                           |-gunicorn(1098)---{gunicorn}(14210)
              |                       |                       |                           |-gunicorn(1100)-+-{gunicorn}(26180)
              |                       |                       |                           |                `-{gunicorn}(31642)
              |                       |                       |                           |-gunicorn(1101)---{gunicorn}(19256)
              |                       |                       |                           |-gunicorn(1102)---{gunicorn}(30791)
              |                       |                       |                           |-gunicorn(1103)---{gunicorn}(30796)
              |                       |                       |                           |-gunicorn(1105)---{gunicorn}(22143)
              |                       |                       |                           |-gunicorn(1106)---{gunicorn}(22763)
              |                       |                       |                           |-gunicorn(1107)---{gunicorn}(31237)
              |                       |                       |                           |-gunicorn(1108)---{gunicorn}(21987)
              |                       |                       |                           |-gunicorn(1109)---{gunicorn}(21982)
              |                       |                       |                           |-gunicorn(1112)---{gunicorn}(21984)
              |                       |                       |                           |-gunicorn(1113)---{gunicorn}(28246)
              |                       |                       |                           |-gunicorn(1114)-+-{gunicorn}(29599)
              |                       |                       |                           |                `-{gunicorn}(22011)
              |                       |                       |                           |-gunicorn(1115)---{gunicorn}(22116)
              |                       |                       |                           |-gunicorn(1116)---{gunicorn}(29281)
              |                       |                       |                           |-gunicorn(15646)---{gunicorn}(20589)
              |                       |                       |                           |-{gunicorn}(1090)
              |                       |                       |                           `-{gunicorn}(1091)
              |                       |                       |-{docker-containe}(1044)
              |                       |                       |-{docker-containe}(1045)
              |                       |                       |-{docker-containe}(1046)
              |                       |                       |-{docker-containe}(1048)
              |                       |                       |-{docker-containe}(1049)
              |                       |                       |-{docker-containe}(1052)
              |                       |                       |-{docker-containe}(1054)
              |                       |                       |-{docker-containe}(1055)
              |                       |                       `-{docker-containe}(1071)
              |                       |-docker-containe(1846)-+-sh(1864)-+-cron(1877)
              |                       |                       |          `-gunicorn(1878)-+-gunicorn(1888)-+-{gunicorn}(1897)

## ...
```



### 方法2

`docker inspect`查看容器信息

```shell
$ docker inspect dockercontainer
[
    {
        "Id": "3a7e160fac940e16089c3540c2317e2e18b564500ff7fb1e4669659559765a24",
        "Created": "2017-09-07T06:34:36.729426519Z",
        "Path": "/bin/sh",
        "Args": [
            "-c",
            "gunicorn -c gun_conf.py service:app"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 11334,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2017-09-11T05:34:30.680050899Z",
            "FinishedAt": "2017-09-11T05:34:30.090059921Z"
        },
        # ...
```

然后“`State.Pid`”就可以知道 `Pid` 了。之后同样可以查看此进程所在空间下其他进程的父子关系。