---
sidebar: auto
prev: /topics/container/namespaces_in_go_uts.md
next: /topics/container/content.md
---

# 命名空间Go实现 - CGROUPS

> 本文参考： [https://medium.com/@ssttehrani/containers-from-scratch-with-golang-5276576f9909](https://medium.com/@ssttehrani/containers-from-scratch-with-golang-5276576f9909)

`Cgroups`是另外一种假的文件系统接口，它们看上去目录和文件，但是可以用来在用户空间和内核空间交换属性。简单的来说，cgroups可以限制一个容器使用的的资源。

我们来探索以下：

```bash
root@HiBing➜~ ls /sys/fs/cgroup/
blkio  cpu  cpuacct  cpu,cpuacct  cpuset  devices  freezer  hugetlb  memory  net_cls  net_cls,net_prio  net_prio  perf_event  pids  systemd
```

我们可以看到，不同的目录表示不同的cgroups类型。可以在`memory`目录下看看`memory.limit_in_bytes`。

```bash
root@HiBing➜~ cat /sys/fs/cgroup/memory/memory.limit_in_bytes
9223372036854771712
```

这个数字意味着没有对这个主机进程没有内存限制。

在 `/sys/fs/cgroup/memory/` 目录下有一个 `docker`目录，里面包含了Docker容器的内存类型的cgroups。

我们先看看没有cgroup限制的场景：

```bash
## Run a Docker container
root@host:~# docker run —name alpine —rm -it alpine:latest /bin/sh
## Retreving container ID
root@host:~# docker container inspect alpine -f {{.ID}}
797257f234a5df64518bd470bd937a0d19f7b49cf3ad84c86ac0bb03fe34ebea
## Check for cgroups limitation
root@host:~# cat \
/sys/fs/cgroup/memory/docker/797257f234a5df64518bd470bd937a0d19f7b49cf3ad84c86ac0bb03fe34ebea/memory.limit_in_bytes
9223372036854771712
## There is no limitation on this container processes
```

再看看有cgroup限制的例子：

```bash
root@host:~# docker run —name alpine —rm -it —memory 50M alpine:latest /bin/sh
## Retreving container ID
root@host:~# docker container inspect alpine -f {{.ID}}
bd8f7b86aca0ddcca61a562b43349a067e8c7eb5ec62fd854cd1b2e009006037
## Check for cgroups limitation
root@host:~# cat \
/sys/fs/cgroup/memory/docker/bd8f7b86aca0ddcca61a562b43349a067e8c7eb5ec62fd854cd1b2e009006037/memory.limit_in_bytes
52428800
## There is 50M memory limitation on this container processes
```

因此我们知道了如何限制容器的资源，开始撸码！

```go
# Git repo: https://github.com/bingbig/container
# Git tag: 6.0
# Filename: container.go
func set_cgroups() {
	cgroups := "/sys/fs/cgroup/"
	pids := filepath.Join(cgroups, "pids")
	os.Mkdir(filepath.Join(pids, "ourContainer"), 0755)
	ioutil.WriteFile(filepath.Join(pids, "ourContainer/pids.max"), []byte("10"), 0700)
	//up here we limit the number of child processes to 10

	ioutil.WriteFile(filepath.Join(pids, "ourContainer/notify_on_release"), []byte("1"), 0700)

	ioutil.WriteFile(filepath.Join(pids, "ourContainer/cgroup.procs"), []byte(strconv.Itoa(os.Getpid())), 0700)
	// up here we write container PIDs to cgroup.procs
}
```

在初始化中调用`set_cgroups`。
```go{19}
# Git repo: https://github.com/bingbig/container
# Git tag: 6.0
# Filename: container.go
func nsInitialisation() {
	fmt.Printf("\n>> namespace setup code goes here <<\n\n")

	setMount("/root/containerFS")

	if err := waitForNetwork(); err != nil {
		fmt.Printf("Error waiting for network - %s\n", err)
		os.Exit(1)
	}

	if err := syscall.Sethostname([]byte("container")); err != nil {
		fmt.Printf("Error setting hostname - %s\n", err)
		os.Exit(1)
	}

	set_cgroups()

	nsRun()
}
```

执行！

```bash
# Git repo: https://github.com/bingbig/container
# Git tag: 6.0
# Filename: container.go
liub@HiBing➜container git:(master) ✗ go build
liub@HiBing➜container git:(master) ✗ ./container run /bin/sh

>> namespace setup code goes here <<

-[container]- #
```

我们还可以看到程序创建的PID类型的cgroup文件：
```bash
root@host:~# cat /sys/fs/cgroup/pids/ourContainer/pids.max
10
root@host:~# cat /sys/fs/cgroup/pids/ourContainer/cgroup.procs
11222
11225
root@host:~# ps -aux | grep “/proc/self/exe ns /bin/bash”
root 11222 /proc/self/exe ns /bin/sh
```

