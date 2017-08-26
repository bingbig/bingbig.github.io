# Linux跟踪错误进程
**问题：在centos机器上 `ps aux` 或者 `top －c` 机器会卡死**

通过跟踪ps进程：
```shell
strace -tt -T -v -o /root/strace-ps.log -s 1024 ps -aux
```

打开strace-ps.log，查看最后，发现应该是6374的子进程有问题，因为**无法读取进程信息**。
```shell
/proc/6374/cmdline
```
也无法打开，判断应该就是这个进程有问题。
```shell
strace  ls /proc/6374
```
`kill -9` 此进程，一切恢复正常。



