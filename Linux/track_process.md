# Linux跟踪错误进程
**问题：在centos机器上 `ps aux` 或者 `top －c` 机器会卡死**

通过跟踪ps进程：
```bash
strace -tt -T -v -o /root/strace-ps.log -s 1024 ps -aux
```

打开strace-ps.log，查看最后，发现应该是6374的子进程有问题，因为**无法读取进程信息**。
```bash
/proc/6374/cmdline
```
也无法打开，判断应该就是这个进程有问题。
```bash
strace  ls /proc/6374
```
`kill -9` 此进程，一切恢复正常。

## 补充
strace可以跟踪到一个进程产生的系统调用，包含参数、返回值、执行消耗的时间。
 strace的常用的选项以及选项对应的含义如下：

 选项 | 含义 
|------|---------|
| -c |  统计每一系统调用的所执行的时间,次数和出错的次数等 |
| -f | 跟踪由fork调用所产生的子进程 |
|-t| 在输出中的每一行前加上时间信息|
|-tt |在输出中的每一行前加上时间信息（微妙级） |
|-T| 显示每一调用所耗的时间|
|-e trace=set |只跟踪指定的系统调用。例如:-e |trace=open,close,read,write表示只跟踪这四个系统调用。默认的为set=all |
|-e trace=file |只跟踪有关文件操作的系统调用|
|-e trace=process |只跟踪有关进程控制的系统调用|
|-e trace=network |跟踪与网络有关的所有系统调用|
|-e strace=signal |跟踪所有与系统信号有关的 系统调用|
|-e trace=ipc |跟踪所有与进程通讯有关的系统调用|
|-o filename |将strace的输出写入文件filename -p pid 跟踪指定的进程pid|


