---
sidebar: auto
prev: /topics/container/linux_namespaces.md
next: /topics/container/namespaces_in_go.md
---

# 命名空间 - Go

在前面，我们通过`unshare`命名简单的了解了下命名空间。用 `unshare`写一些命名空间的小脚本很好，但是不太适合更加全面和精确的空间，比如说多个容器。在这种情况下使用一个完全支持的编程语言会更加合适。

GO成为容器实现的编程语言很大程度上是因为Docker（仍然由Go开发）。Docker是非常成功的开源Go项目之一，它向世界展示了God的强大。

Docker的开发者之前列举过选择Go来开发Docker的[几个理由](https://www.slideshare.net/jpetazzo/docker-and-go-why-did-we-decide-to-write-docker-in-go)，包括静态编译，原生的异步支持，底层接口，完整的开发环境和很强的跨交叉编译能力。


对于我个人来说，GO主要是因为简单，容器很复杂！通过使用‘简单’的语言可以更简单的解释容器的复杂原理。Rob Pike在他讨论简洁是Go语言设计的一部分工作时说过一句很有名的话[“Simplicity is Complicated”](https://www.youtube.com/watch?v=rFejpH_tAHM)。 如果你感兴趣的话，这个视频很值得一看。

## Let's Go

这一系列的文章主要是为了帮助理解如何用Go来使用Linux命名空间。为了达成这个目的，我们将编写一个简单的应用`ns-process`。

`ns-process`一开始会很简单，在一系列命名空间中创建`/bin/sh`进程，最终我们会创建一个 `unprivileged` 的容器。先不要担心 `unprivileged` 的含义，我们之后将会慢慢解释。

`ns-process`的代码可以在[GitHub](https://github.com/teddyking/ns-process)上找到。

```go
# Git repo: https://github.com/teddyking/ns-process
# Git tag: 1.0
# Filename: ns_process.go
package main

import (
	"fmt"
	"os"
	"os/exec"
	"syscall"
)

func main() {
	cmd := exec.Command("/bin/sh")

	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	cmd.Env = []string{"PS1=-[ns-process]- # "}

	cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWUTS,
	}

	if err := cmd.Run(); err != nil {
		fmt.Printf("Error running the /bin/sh command - %s\n", err)
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
