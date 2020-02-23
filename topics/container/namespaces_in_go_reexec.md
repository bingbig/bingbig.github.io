---
sidebar: auto
prev: /topics/container/namespaces_in_go_user.md
next: /topics/container/namespaces_in_go_mount.md
---

# 命名空间Go实现 - reexec

本文的目的是理解`reexec`包。`reexec` 是Docker 代码的一部分，提供了一个很方便的方法是的可执行文件“自我执行”。在了解详细内容之前，我们先看看`reexec`帮我们解决了什么问题。

举个例子来说明这个问题。考虑这样一个问题。我们想修改`ns-process`，使得它在新的UTS命名空间里有一个随机生成的主机名。为了安全的原因，在`/bin/sh`进程开始前，我们就得把主机名修改了。毕竟，我们不希望在`ns-process`的shell里可以获取到宿主机的主机名。

就我所知，Go原生不支持这些。`exec.Command`不但可以通过设置属性来创建命名空间，也可以指定我们想要执行的进程。举个例子：
```go
cmd := exec.Command("/bin/echo", "Process already running")
cmd.SysProcAttr = &syscall.SysProcAttr{
 Cloneflags: syscall.CLONE_NEWUTS,
}
cmd.Run()
```

`cmd.Run()`一旦被调用，那么命名空间就会被创建，进程也就直接开始运行了。其中没有钩子函数，也没有别方法可以帮助我们在命名空间被创建后和进程开始前执行代码。这就是`reexce`出现的原因。

## 自我毁灭前让自己重生
打开[`reexec`包](https://github.com/moby/moby/tree/master/pkg/reexec)，看看源码。

```go
var registeredInitializers = make(map[string]func())

// Register adds an initialization func under the specified name
func Register(name string, initializer func()) {
	if _, exists := registeredInitializers[name]; exists {
		panic(fmt.Sprintf("reexec func already registered under name %q", name))
	}

	registeredInitializers[name] = initializer
}
```

`Register` 函数支持通过名字注册任意方法到内存中。我们将会在`ns-process`开始后的以后注册一些用于初始化命名空间的方法。

```go
// Init is called as the first part of the exec process and returns true if an
// initialization function was called.
func Init() bool {
	initializer, exists := registeredInitializers[os.Args[0]]
	if exists {
		initializer()

		return true
	}
	return false
}
```

接着是`Init()`函数，该函数可以判断这个进程有没有被执行过（`reexec`ed），并且执行一个我们注册过的方法。它的实现机制是通过判断`os.Args[0]` 是不是之前注册的方法名之一，如果是则说明被执行过，便执行注册的方法。

```go
// Self returns the path to the current process's binary.
// Returns "/proc/self/exe".
func Self() string {
	return "/proc/self/exe"
}

// Command returns *exec.Cmd which has Path as current binary. Also it setting
// SysProcAttr.Pdeathsig to SIGTERM.
// This will use the in-memory version (/proc/self/exe) of the current binary,
// it is thus safe to delete or replace the on-disk binary (os.Args[0]).
func Command(args ...string) *exec.Cmd {
	return &exec.Cmd{
		Path: Self(),
		Args: args,
		SysProcAttr: &syscall.SysProcAttr{
			Pdeathsig: syscall.SIGTERM,
		},
	}
}
```
`reexec.Command` 方法把所有的都联系了在一起，通过创建一个`*exex.Cmd`结构体，设置其`Path`为`Self()`（在Linux系统中，其值为`/proc/self/exe`，表示的正在执行的可执行程序）。我们可以通过传入的`args[0]`来选择被某个注册函数被`reexec`调用。

现在我们理解了`reexec`的原理了，我们来动手实践一下。

## Let's Go
首先创建一个方法并且使用`reexec`来注册它。

```go
# Git repo: https://github.com/teddyking/ns-process
# Git tag: 3.0
# Filename: ns_process.go
# ...
func init() {
	reexec.Register("nsInitialisation", nsInitialisation)
	if reexec.Init() {
		os.Exit(0)
	}
}
# ...
```

这里有两个重要的点。一是我们用“nsInitialisation”注册了`nsInitialisation`方法。二是我们调用了`reexce.Init()`方法并且在返回`true`的时候结束进程(`os.Exit(0)`，这一步是非常重要的，如果不退出将陷入无限循环，程序会不停的`reexec`它自己。接着我们增加`nsInitialisation`方法。

```go
# Git repo: https://github.com/teddyking/ns-process
# Git tag: 3.0
# Filename: ns_process.go
# ...
func nsInitialisation() {
	fmt.Printf("\n>> namespace setup code goes here <<\n\n")
	nsRun()
}
func nsRun() {
	cmd := exec.Command("/bin/sh")

	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	cmd.Env = []string{"PS1=-[ns-process]- # "}

	if err := cmd.Run(); err != nil {
		fmt.Printf("Error running the /bin/sh command - %s\n", err)
		os.Exit(1)
	}
}
```
调用`nsInitialisation` 后会调用`nsRun()`, 而后者会执行`/bin/sh`进程。

最后我们需要做的就是修改`main()`方法，用`reexec` 和 `nsInitialisation` 来运行`/bin/sh`，而不是之前那样直接调用。

```go{2}
func main() {
	cmd := reexec.Command("nsInitialisation")

	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWNS |
			syscall.CLONE_NEWUTS |
			syscall.CLONE_NEWIPC |
			syscall.CLONE_NEWPID |
			syscall.CLONE_NEWNET |
			syscall.CLONE_NEWUSER,
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

	if err := cmd.Run(); err != nil {
		fmt.Printf("Error running the reexec.Command - %s\n", err)
		os.Exit(1)
	}
}
```

将`nsInitialisation` 作为第一个参数传递给`Command`，本质上是告诉`reexec`去执行 `/proc/self/exe`，并且将`os.Args[0]`参数的值设置为`nsInitialisation`。最终，一旦程序被重新执行，`Init`会检测到注册的函数并执行它。我们来实践一下，

```bash
$ go build
$ ./ns-process

>> namespace setup code goes here <<
-[ns-process]- #
```

成功了！我们现在有`nsInitialisation` 方法帮助我们初始化任意的命名空间了。

## 接下来
现在我们可以配置我们的命名空间了，还有什么需要配置的呢？






