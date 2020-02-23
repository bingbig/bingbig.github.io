---
sidebar: auto
prev: /topics/container/namespaces_in_go_network.md
next: /topics/container/content.md
---

# 命名空间Go实现 - UTS
在上篇文章我们配置了Network命名空间并且为`ns-process`提供了一个可以访问的IP地址。现在`ns-process`可以加入网络了，如果能设置一个主机名就更好了。在本文，我们将配置UTS命名空间。

我们先看看当前的行为。

```bash
# Git repo: https://github.com/teddyking/ns-process
# Git tag: 5.0
$ hostname
ubuntu-xenial
$ go build
$ ./ns-process
-[ns-process]- # hostname
ubuntu-xenial
```

我们可以看到新的命名空间里面的主机名和宿主机的相同。幸运的是这个很好解决。

## Let‘s Go
在Go中，主机名可以i通过`syscall.SetHostName`来设置。

```go{17-20}
# Git repo: https://github.com/teddyking/ns-process
# Git tag: 6.0
# Filename: ns_process.go
func nsInitialisation() {
	newrootPath := os.Args[1]

	if err := mountProc(newrootPath); err != nil {
		fmt.Printf("Error mounting /proc - %s\n", err)
		os.Exit(1)
	}

	if err := pivotRoot(newrootPath); err != nil {
		fmt.Printf("Error running pivot_root - %s\n", err)
		os.Exit(1)
	}

	if err := syscall.Sethostname([]byte("ns-process")); err != nil {
		fmt.Printf("Error setting hostname - %s\n", err)
		os.Exit(1)
	}

	if err := waitForNetwork(); err != nil {
		fmt.Printf("Error waiting for network - %s\n", err)
		os.Exit(1)
	}

	nsRun()
}
```
主机名已经写死在代码里了。大多数的容器实现都是把主机名设置成ID或者容器名，默认情况下通常是随机UUID值。

就这些了！我们来确认以下我们的实现是不是如我们期望的。

```bash
# Git repo: https://github.com/teddyking/ns-process
# Git tag: 6.0
$ hostname
ubuntu-xenial
$ go build
$ ./ns-process
-[ns-process]- # hostname
ns-process
```

完美！



