---
sidebar: auto
next: /topics/container/namespaces_in_go.md
---

# Linux 命名空间

`Linux Namespace` 是Linux提供的一种内核级别环境隔离的方法，当前非常流行的容器就是基于此实现的。Linux 命名空间可以在不同的独立进程之间隔离系统资源。比如说，PID命名空间隔离了进程ID号区间。这就意味着，在同一个宿主机上，可以有两个拥有相同进程ID的进程。

什么是容器呢？一个Linux容器是一个或者多个进程的集合，这个集合和系统的其他部分相隔离。

显然命名空间水平的隔离对于容器来说是非常有用的。没有命名空间，A容器中的进程可以卸载B容器中非常重要的文件系统，或者修改C容器中的hostanme。通过命名空间对些系统资源的进行隔离，A容器中的进程就无法知道B、C容器中的进程的存在了。

我们直接用一个命名空间的例子来实战一下。

> 我们在一台 `centOS 7.7`的机器上测试



```bash
root@HiBing➜~ unshare -h

用法：
 unshare [options] <program> [<argument>...]

Run a program with some namespaces unshared from the parent.

选项：
 -m, --mount               unshare mounts namespace
 -u, --uts                 unshare UTS namespace (hostname etc)
 -i, --ipc                 unshare System V IPC namespace
 -n, --net                 unshare network namespace
 -p, --pid                 unshare pid namespace
 -U, --user                unshare user namespace
 -f, --fork                fork before launching <program>
     --mount-proc[=<dir>]  mount proc filesystem first (implies --mount)
 -r, --map-root-user       map current user to root (implies --user)
     --propagation <slave|shared|private|unchanged>
                           modify mount propagation in mount namespace
 -s, --setgroups allow|deny  control the setgroups syscall in user namespaces

 -h, --help     显示此帮助并退出
 -V, --version  输出版本信息并退出

更多信息请参阅 unshare(1)。

```

`unshare` 命令可以在不同于父进程进程空间中执行新的程序。也就是说，`unshare` 会在不同的命名空间集合中执行你传入的任何程序。

我们先试试`UTS(UNIX Time Sharing)命名空间`（UTS命名空间主要是隔离主机名）。我们可以在不同的UTS命名空间进程中执行`hostname my-new-hostname`来修改主机名，验证会不会影响外面的进程。

```
# 切换成root身份
root@HiBing➜~ hostname                 # 查看当前主机名
HiBing
root@HiBing➜~ unshare -u /bin/sh       # 在新的UTS命名空间中创建一个shell
sh-4.2# hostname my-new-hostname       # 设置新的主机名
sh-4.2# hostname                       # 确认新的主机名
my-new-hostname
sh-4.2# exit                           # 退出新的UTS命名空间
exit
root@HiBing➜~ hostname                 # 确认原来的主机名没有变化
HiBing
```

一步步分析，一开始我们就切换成为root用户。大多数命名空间都需要root权限（除了用户命名空间）。接着我们执行`hostname`来确认当前的主机名。

关键的一步来了。 `unshare -u /bin/sh` 命名使得进程陷入的一个新的，隔离的UTS命名空间。 之后执行 `hostname my-new-hostname`来设置新的UTS空间中的主机名，并通过 `hostname`确认修改成功。

最后我们`exit` 这个命名空间中的shell，然后执行`hostname`再确认一次。我们可以看到主机名没有变化，尽管我们执行了 `hostname my-new-hostname`。这是因为这只在新的 UTS 命名空间中才会生效。

**命名空间和CGroups**

LXC（Linux Container）所实现的隔离性主要是来自kernel的namespace, 其中pid, net, ipc, mnt, uts 等namespace将container的进程, 网络, 消息, 文件系统和hostname 隔离开。

1. Mount 隔离系统文件挂载点
2. UTS 隔离主机名和域名
3. IPC 隔离进程间通讯(IPC)资源
4. PID 隔离PID号区间
5. Network 隔离网络接口
6. User 隔离UID/GID号空间

Cgroup（Control Groups）属于Linux内核提供的一个特性，用于限制和隔离一组进程对系统资源的使用，也就是左资源QoS，这些资源主要是包括CPU，内存，block I/O和网络带宽。

大多数的容器实现都用到了上面所提的命名空间来提供高层次的容器间进程的隔离并使用了cgroup的限额功能。

## 接下来

`unshare` 命名很赞，但是我们如何才能更好的控制进程的命名空间呢？这个问题的答案还在后面。




