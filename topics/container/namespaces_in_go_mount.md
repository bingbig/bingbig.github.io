---
sidebar: auto
prev: /topics/container/namespaces_in_go_reexec.md
next: /topics/container/namespaces_in_go_network.md
---

# 命名空间Go实现 - Mount
现今容器的实现其重要的特性之一就是可以在同一个宿主机上运行不同linux发行版本。

本文我们将了解是什么使之成为可能 - 即 Mount命名空间和`pivot_root`系统调用的合作。我们先回顾之前的`container`的实现，并且运行它看看挂载的文件系统。

```bash
# Git repo: https://github.com/bingbig/container
# Git tag: 3.0
# Filename: container.go
# ...
$ go build
$ ./container
>> namespace setup code goes here <<
-[container]- # cat /proc/mounts
/dev/sda1 / ext4 rw,relatime,data=ordered 0 0
tmpfs /dev/shm tmpfs rw,nosuid,nodev 0 0
proc /proc proc rw,nosuid,nodev,noexec,relatime 0 0
# ...
```

在 `/proc/mounts` 文件下可以看到有几个挂载。这看起来有些奇怪，因为我们请求了新的Mount命名空间并且我们没有做任何Mount命名空间的初始化工作。

这看起来非常不容器。我们的命名空间程序应该对宿主机的信息知道的越少越好，并且肯定不能看到宿主机的所有的挂载列表。然而为什么可以呢？在[` mount_namespaces(7)`页](http://man7.org/linux/man-pages/man7/mount_namespaces.7.html)我们可以看到解释。

> “When a process creates a new mount namespace using clone(2) or unshare(2) with the CLONE_NEWNS flag, the mount point list for the new namespace is a copy of the caller’s mount point list.”

看来这是一个特性，挂载点列表即使调用者的列表的拷贝。我们怎么解决这个问题呢？我们需要一些方法来清除新的命名空间里的宿主机的挂载清单来保证这些信息的安全，我们需要`pivot_root`。

![pivot_root](./images/1__C9oQxRBlIMuIoX8FOQ6XQ.jpeg)

## pivot_root
`pivot_root` 运训你为调用的进程设置新的root文件系统，比如说它可以让你修改 `/`目录。它是通过把当前的root文件系统挂载到别的地方，同时把新的root文件系统挂载到`/`上。一旦之前的root被替换了，那么它就可以被卸载了。因此我们需要一个机制来从新的Mount命名空间清理主机的挂载——避开和卸载它们。

这就是为什么我们可以在Ubuntu的主机上面运行一个CentOS的容器了。只要Ubuntu主机有CentOS的文件系统备份，我们就可以创建一个新的Mount命名空间，调用`pivot_root`执行这个CentOS文件系统然后在这个新的命名空间里面执行任何进程。这些进程会相信它们一直在CentOS上运行。

正好我们前面讨论过的 `reexec` 起到了作用。 `pivot_root` 必须在新的Mount命名空间里面被调用。我们想要的就是在新命名空间中的shell开始前，需要的root文件系统就能够使用。

### pivot_root 实现
**这个方法比较复杂，可以直接跳到下面的chroot实现**

在Go语言中， `pivot_root` 是通过 `syscall.PivotRoot` 方法实现的。

```go
func PivotRoot(newroot string, putold string) (err error)
```

`newroot` 是我们期望的新文件系统的路径， `putold` 是我们想要把当前的root移动到的路径。在底层 `pivot_root` 系统调用的时候一些对于`newroot` 和 `putold` 的强制性限制我们必须知道：

1. 它们两个必须都是目录
2. 它们不能和当前root在同一个文件系统
3. `putold`必须在`newroot`下面
4. 没有其他的文件系统挂载在`putold`

准备 `newroot` 文件系统的过程可以说比较细节和复杂。比如说Docker的分层文件系统，许多的文件系统层连在一起组成一个完整的root。我们这里会简单的假设一个合适的root文件系统已经准备好了。

```go
# Git repo: https://github.com/teddyking/ns-process
# Git tag: 4.0
$ mkdir -p /tmp/ns-process/rootfs
$ tar -C /tmp/ns-process/rootfs -xf assets/busybox.tar
```

现在，`ns-process` 会期望在这个目录下会有一个root文件系统并且在没有找到的时候报错。注意，尽管这里我们使用的是BusyBox作为这次的特例，你可以简答的使用其他的发行版本。我们有了我们的`newroot`，接下来看看如何使用。

```go
# Git repo: https://github.com/teddyking/ns-process
# Git tag: 4.0
# Filename: rootfs.go
func pivotRoot(newroot string) error {
	putold := filepath.Join(newroot, "/.pivot_root")

	// bind mount newroot to itself - this is a slight hack
	// needed to work around a pivot_root requirement
	if err := syscall.Mount(
		newroot,
		newroot,
		"",
		syscall.MS_BIND|syscall.MS_REC,
		"",
	); err != nil {
		return err
	}

	// create putold directory
	if err := os.MkdirAll(putold, 0700); err != nil {
		return err
	}

	// call pivot_root
	if err := syscall.PivotRoot(newroot, putold); err != nil {
		return err
	}

	// ensure current working directory is set to new root
	if err := os.Chdir("/"); err != nil {
		return err
	}

	// umount putold, which now lives at /.pivot_root
	putold = "/.pivot_root"
	if err := syscall.Unmount(
		putold,
		syscall.MNT_DETACH,
	); err != nil {
		return err
	}

	// remove putold
	if err := os.RemoveAll(putold); err != nil {
		return err
	}

	return nil
}
```

`pivotRoot`写好后我们在 `nsInitialisation` 使用它。

```go
# Git repo: https://github.com/teddyking/ns-process
# Git tag: 4.0
# Filename: ns_process.go
func nsInitialisation() {
	newrootPath := os.Args[1]

	if err := pivotRoot(newrootPath); err != nil {
		fmt.Printf("Error running pivot_root - %s\n", err)
		os.Exit(1)
	}

	nsRun()
}

func main() {
	var rootfsPath string
	// ...
	cmd := reexec.Command("nsInitialisation", rootfsPath)
}
```

我们可以看到，`rootfsPath`是传递给了`nsInitialisation`。 一旦 `reexec`执行了，这个参数可以从 `os.Args[1]` 获取到。同时`pivotRoot`也是在`nsRun`之前被调用。通过这些我嗯可以确保新的root文件系统在`/bin/sh`进程启动前已经被`pivoted`了。

完成了这些我们再更新我们的Go程序，然后看看当前有哪些挂载可见。

```bash
# Git repo: https://github.com/teddyking/ns-process
# Git tag: 4.0
$ go build
$ ./ns-process
-[ns-process]- # cat /proc/mounts
cat: can't open '/proc/mounts': No such file or directory
```

现在我们有个新的 `/`， 所以我们不再需要 `/proc/`！这实际上是一个好的事情，因为我们绝对看不到主机的挂载了，这也是我们一开始做这些工作的主要理由。我们再添加一个 `/proc` 到我们的新的root中。

```go
# Git repo: https://github.com/teddyking/ns-process
# Git tag: 4.1
# Filename: rootfs.go
func mountProc(newroot string) error {
	source := "proc"
	target := filepath.Join(newroot, "/proc")
	fstype := "proc"
	flags := 0
	data := ""

	os.MkdirAll(target, 0755)
	if err := syscall.Mount(
		source,
		target,
		fstype,
		uintptr(flags),
		data,
	); err != nil {
		return err
	}

	return nil
}
```

和 `pivotRoot`一样， `mountProc` 也需要从 `nsInitialisation` 中调用。

```go
# Git repo: https://github.com/teddyking/ns-process
# Git tag: 4.1
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

	nsRun()
}
```

现在应该都好了，我们再试试。

```bash
# Git repo: https://github.com/teddyking/ns-process
# Git tag: 4.1
$ go build
$ ./ns-process
-[ns-process]- # cat /proc/mounts
/dev/sda1 / ext4 rw,relatime,data=ordered 0 0
proc /proc proc rw,nodev,relatime 0 0
```

看起来好多，宿主机的挂载点现在已经看不到了，我们有一个新的 `/proc`挂着上了可供使用。


## chroot
因为`/pro`目录下面包含了宿主机所有的进程运行信息，我们当然不希望容器可以看到这些。 `ps`命令会查看`/proc`目录所以我们的容器需要有自己`/proc`目录。Linux还有一个`chroot`命令，这个命令可以为进程修改root。

### chroot 实现版本
首先我们献给我们的容器准备系统镜像，我们选择的是alphine。
```bash
liub@HiBing➜container git:(master) ✗ docker pull alpine:latest
latest: Pulling from library/alpine
c9b1b535fdd9: Pull complete
Digest: sha256:ab00606a42621fb68f2ed6ad3c88be54397f981a7b70a79db3d1172b11c4367d
Status: Downloaded newer image for alpine:latest
docker.io/library/alpine:latest
liub@HiBing➜container git:(master) ✗ docker image inspect alpine:latest -f ‘{{.GraphDriver.Data.UpperDir}}’
‘/var/lib/docker/overlay2/9d94cca2b565e428870aa3225be2f1e42f4ee65a834805f93dde1a44176e709b/diff’
liub@HiBing➜container git:(master) ✗ cp -r /var/lib/docker/overlay2/9d94cca2b565e428870aa3225be2f1e42f4ee65a834805f93dde1a44176e709b/diff /root/containerFS
liub@HiBing➜container git:(master) ✗ mkdir /root/containerFS/helloContainer && ls /root/containerFS/
bin  dev  etc  helloContainer  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

然后我们把我们的container的root切换到/root/containerFS/。

```go
# Git repo: https://github.com/bingbig/container
# Git tag: 4.0
# Filename: container.go
# ...
func nsInitialisation() {
	fmt.Printf("\n>> namespace setup code goes here <<\n\n")

	setMount("/root/containerFS")

	nsRun()
}

func setMount(root string) error {
	if err := syscall.Chroot(root); err != nil {
		return err
	}
	// 设置容器里面的当前工作目录
	if err := syscall.Chdir("/"); err != nil {
		return err
	}

	return nil
}
```

接着执行代码看看效果！
```bash
liub@HiBing➜container git:(master) ✗ go run container.go run /bin/bash

>> namespace setup code goes here <<

Error running the /bin/bash command - fork/exec /bin/bash: no such file or directory
Error running the reexec.Command - exit status 1
exit status 1
```
失败了！！！为什么呢？这是因为我们把root切到了alphine，这个镜像里面没有`bash`，我们试试`sh`。

```bash
liub@HiBing➜container git:(master) ✗ go run container.go run /bin/sh

>> namespace setup code goes here <<

-[container]- # ls
bin             etc             home            media           opt             root            sbin            sys             usr
dev             helloContainer  lib             mnt             proc            run             srv             tmp             var
```
我们已经成功的替换了我们的容器的文件系统了，我们再里面试试`ps`。

```bash
-[container]- # ps
PID   USER     TIME  COMMAND
-[container]- # ls /proc
-[container]- #
```

都是空的。因为`/proc`是一个假的文件系统，用来在用户空间和内核空间交换数据。我们应该把主机的`/proc`挂载上。容器退出时再卸载`/proc`。

```go{14-16,35}
# Git repo: https://github.com/bingbig/container
# Git tag: 4.0
# Filename: container.go
# ...
func setMount(root string) error {
	if err := syscall.Chroot(root); err != nil {
		return err
	}
	// 设置容器里面的当前工作目录
	if err := syscall.Chdir("/"); err != nil {
		return err
	}

	if err := syscall.Mount("proc", "proc", "proc", 0, ""); err != nil {
		return err
	}

	return nil
}

func nsRun() {
	cmd := exec.Command(os.Args[1], os.Args[2:]...)

	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	cmd.Env = []string{"PS1=-[container]- # "}

	if err := cmd.Run(); err != nil {
		fmt.Printf("Error running the %s command - %s\n", os.Args[1], err)
		os.Exit(1)
	}

	syscall.Unmount("/proc", 0)
}
```

再试试！
```bash
-[container]- # ps -a
PID   USER     TIME  COMMAND
    1 root      0:00 {exe} nsInitialisation /bin/sh
    4 root      0:00 /bin/sh
    5 root      0:00 ps -a
```
成功了！再看看挂载情况:
```bash
-[container]- # mount | grep /proc
proc on /proc type proc (rw,nosuid,nodev,noexec,relatime)
systemd-1 on /proc/sys/fs/binfmt_misc type autofs (rw,relatime,fd=22,pgrp=0,timeout=0,minproto=5,maxproto=5,direct,pipe_ino=10516)
proc on /proc type proc (rw,relatime)
-[container]- # df -h
Filesystem                Size      Used Available Use% Mounted on
/dev/vda1                39.2G      7.0G     30.4G  19% /
devtmpfs                 39.2G      7.0G     30.4G  19% /dev
df: /dev/shm: No such file or directory
df: /dev/pts: No such file or directory
df: /dev/hugepages: No such file or directory
df: /dev/mqueue: No such file or directory
sysfs                    39.2G      7.0G     30.4G  19% /sys
...
tmpfs                    39.2G      7.0G     30.4G  19% /run
df: /run/user/0: No such file or directory
df: /run/user/1003: No such file or directory
df: /run/user/1005: No such file or directory
```
我们还可以看到主机的挂载，我们还应该`unshare`。
```go{12}
# Git repo: https://github.com/bingbig/container
# Git tag: 4.0
# Filename: container.go
# ...
cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWNS |
			syscall.CLONE_NEWUTS |
			syscall.CLONE_NEWIPC |
			syscall.CLONE_NEWPID |
			syscall.CLONE_NEWNET |
			syscall.CLONE_NEWUSER,
		Unshareflags: syscall.CLONE_NEWNS,
		UidMappings: []syscall.SysProcIDMap{
			{
				ContainerID: 0,
				HostID:      os.Getuid(),
				Size:        1,
			},
		},
		GidMappings: []syscall.SysProcIDMap{
			{
				ContainerID: 0,
				HostID:      os.Getgid(),
				Size:        1,
			},
		},
	}
```

## PID 命名空间
上面的实现对PID命名空间的初始化也有无意的影响。在挂载新的`/proc`之前，在新的命名空间执行`ps`命令会把主机的所有进程列出来，这是因为 `ps` 命令依赖于 `/proc` 来检测正在运行的进程。但是现在我们有自己的`/proc`（并且我们传入了`CLONE_NEWPID` flag 请求新的PID 命名空间）， 执行 `ps` 只会展示和我们相关的进程。

```bash
# Git repo: https://github.com/bingbig/container
# Git tag: 4.0
# Filename: container.go
# ...
$ go build
$ ./container
-[container]- # ps
PID   USER     TIME   COMMAND
    1 root       0:00 {exe} nsInitialisation /tmp/container/rootfs
    5 root       0:00 /bin/sh
    8 root       0:00 ps
```

## 接下来
如何让我们的新命名空间里的shell和网络交互呢？




