---
sidebar: auto
prev: /topics/container/linux_namespaces.md
next: /topics/container/namespaces_in_go_user.md
---

# 命名空间Go实现

在前面，我们通过`unshare`命名简单的了解了命名空间。用 `unshare`写一些命名空间的小脚本很好，但是不太适合更加全面和精确的空间，比如说多个容器。在这种情况下使用一个完全支持的编程语言会更加合适。

GO成为容器实现的编程语言很大程度上是因为Docker（仍然由Go开发）。Docker是非常成功的开源Go项目之一，它向世界展示了Go的强大。

Docker的开发者之前列举过选择Go来开发Docker的[几个理由](https://www.slideshare.net/jpetazzo/docker-and-go-why-did-we-decide-to-write-docker-in-go)，包括静态编译，原生的异步支持，底层接口，完整的开发环境和很强的跨交叉编译能力。


对于我个人来说，GO主要是因为简单，容器很复杂！通过使用‘简单’的语言可以更简单的解释容器的复杂原理。Rob Pike在他讨论简洁是Go语言设计的一部分工作时说过一句很有名的话[“Simplicity is Complicated”](https://www.youtube.com/watch?v=rFejpH_tAHM)。 如果你感兴趣的话，这个视频很值得一看。

## Let's Go

这一系列的文章主要是为了帮助理解如何用Go来使用Linux命名空间。为了达成这个目的，我们将编写一个简单的应用`container`。

`container`一开始会很简单，在一系列命名空间中创建`/bin/sh`进程，最终我们会创建一个 `unprivileged` 的容器。先不要担心 `unprivileged` 的含义，我们之后将会慢慢解释。

`container`的代码可以在[GitHub](https://github.com/bingbig/container)上找到。

```go
# Git repo: https://github.com/bingbig/container
# Git tag: 1.0
# Filename: container.go
# Run: go build && ./container run /bin/sh
package main

import (
	"fmt"
	"os"
	"os/exec"
	"syscall"
)

func main() {
	switch os.Args[1] {
	case "run":
		run()
	default:
		panic("pass me an argument please")
	}
}
func run() {
	fmt.Printf("Running %v\n", os.Args[2:])
	cmd := exec.Command(os.Args[2], os.Args[3:]...)

	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	cmd.Env = []string{"PS1=-[container]- # "}

	cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWUTS,
	}

	if err := cmd.Run(); err != nil {
		fmt.Printf("Error running the %s command - %s\n", os.Args[1], err)
		os.Exit(1)
	}
}
```

我们可以看到，这个程序没有什么特别复杂的地方。就是简单的创建一个`exec.Command`，通过管道联通被调用的进程的stdin/out/err，并且给新的进程设置`PS1`环境变量（主要是为了在执行程序时区分命名空间）。

关键的部分是`cmd.SysProcAttr`，在理解这个之前我们先进一步看看实现命名空间API的系统调用。

## The namespaces API

[namespaces(7)](http://man7.org/linux/man-pages/man7/namespaces.7.html)的使用文档中写到一共有3个系统调用组成命名空间API：

1. [clone(2)](http://man7.org/linux/man-pages/man2/clone.2.html) - 创建新的进程
2. [setns(2)](http://man7.org/linux/man-pages/man2/setns.2.html) - 允许调用进程加入一个新的存在的命名空间
3. [unshare(2)](http://man7.org/linux/man-pages/man2/unshare.2.html) - 将调用进程移到新的命名空间

`unshare` 看起来很前面的文章里写的很相似。在执行`unshare`命令时会触发这个系统调用。我们这次关注的系统调用是`clone()`， Go语言中的`exec.Run()` 会执行`clone()`这个系统调用。

调用`clone()`的时候可以传入一个或者多个`CLONE_*` flag。每个命名空间都有一个相应的 CLONE flag： `CLONE_NEWNS`, `CLONE_NEWUTS`, `CLONE_NEWIPC`, `CLONE_NEWPID`, `CLONE_NEWNET`, `CLONE_NEWUSER` and `CLONE_NEWCGROUP`。新的进程的执行上下文环境就是由这些传入的flag定义的。

> Mount Namespace是第一个实现的Namespace，当初实现时并不是为了实现linux容器，因为也就没有预料到会有新的Namespace出现，所以用了`CLONE_NEWNS`而不是`CLONE_NEWMNT`之类的名字。



在Go语言中，`SysProcAttr`可以设置`exec.Command`的属性。通过执行`Cloneflags`属性，Go会传入相应的`CLONE_*` flag给系统调用`clone()`。这样，我们就可以控制我们的进程在什么样的命名空间里执行了。

编译和执行这个程序，你会进入一个在新的UTS命名空间运行的 `/bin/sh` 。**执行这个程序必须有管理员权限！**

```bash
root@HiBing➜container git:(v1.0) go build
root@HiBing➜container git:(v1.0) ./container run /bin/sh
-[container]- #
```

进入这个在新的UTS命名空间运行的的shell之后我们来确认一件事情。

```bash
Running [/bin/bash]
-[container]- # readlink /proc/self/ns/uts
uts:[4026532156]
-[container]- # exit
exit
root@HiBing➜container readlink /proc/self/ns/uts
uts:[4026531838]
```

`/proc/self/ns/uts`的内容包括了命名空间的类型（UTS）和命名空间的inode号。事实上我们可以看到`container`shell里面的命名空间inode号和外面的是不一样的。

然而这还不够，这一步我们仅仅是为这个进程创建了一个命名空间。我们在加点其他的flags，如下:

```go
# Git repo: https://github.com/bingbig/container
# Git tag: 1.1
# Filename: container.go
...
cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWNS |
			syscall.CLONE_NEWUTS |
			syscall.CLONE_NEWIPC |
			syscall.CLONE_NEWPID |
			syscall.CLONE_NEWNET |
			syscall.CLONE_NEWUSER,
	}
...
```

再次编译和执行这个进程，这次，我们的`/bin/sh`进程会在一个新的Mount、UTS、IPC、PID、Network和User命名空间运行。

**运行出现问题？**
我是在CentOS 7.7上运行的这个程序，会出现无效参数的报错。一个个参数尝试发现是`CLONE_NEWUSER`不支持。通过 `strace`追踪原因：
```bash
$ strace -o logf -f unshare -U sh
unshare: unshare failed: Invalid argument
$ grep 'Invalid argument' logf
31728 unshare(CLONE_NEWUSER)            = -1 EINVAL (Invalid argument)
31728 write(2, "Invalid argument\n", 17) = 17
```

报错的原因是`unshare(2)`失败了，查阅文档：
```bash
[liub@HiBing container]$ man 2 unshare | col -b | grep CLONE_NEWUSER
在第 2 节中没有关于 unshare 的手册页条目。
```
再看看系统是不是打开了User命名空间支持[is it safe to enable user namespaces ](https://superuser.com/questions/1294215/is-it-safe-to-enable-user-namespaces-in-centos-7-4-and-how-to-do-it/1294246#1294246)
```bash
# cat /proc/sys/user/max_user_namespaces
0
# echo 640 > /proc/sys/user/max_user_namespaces
# unshare -U sh
sh-4.2$ 
```
成功！[更多阅读](https://rhelblog.redhat.com/2015/07/07/whats-next-for-containers-user-namespaces/)。



> 当我们创建各种命名空间的时候如果包含了User命名空间，那么User命名空间会被最先创建。User命名空间可以不需要root权限来创建，这就意味着我们可以作为普通用户来执行我们的程序。

但是我们的程序还有问题，因为我们缺少了很多初始化和命名空间配置的工作，比如说：

- 新的Mount命名空间（`CLONE_NEWNS`）还是挂载这宿主机的挂载点和rootfs
- 新的PID命名空间(`CLONE_NEWPID`)没有挂载新的`/proc`文件系统
- 新的Netwrok命名空间（`CLONE_NEWNET`）没有设置命名空间内部的网络接口
- 新的User命名无法提供UID/GID映射

这意味着我们还有很多要做的改进。

## 接下来

现在我们知道了如何用GO写一个能在一系列新的命名空间运行的进程了。接下来我么将一步步配置和初始化命名空间。
