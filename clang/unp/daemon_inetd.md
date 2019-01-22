# 守护进程和inetd超级服务器
守护进程（daemon）是在后台运行且不与任何终端关联的进程。守护进程通常没有控制终端，为了避免与作业控制，终端会话管理等发生不期望的任何交互，也为了避免非预期的输出到终端。

因为守护进程没有控制终端，因此需要专门的方法来输出守护进程产生的消息。`syslog`函数是输出这些消息的标准方法，它把这些消息发送给`syslogd`守护进程。

## syslogd守护进程
Unix系统中的syslog通常随着系统的初始化脚本而启动，而且在系统运行期间一直运行。源自Berkeley的syslogd实现在启动时通常会执行以下操作：
1. 读取配置文件（/etc/syslog.conf），指定本进程如何处理各种日志消息，如写到控制台或者转发到另一台主机上的syslogd进程。
2. 创建Unix域套接字，给它捆绑路径名/var/run/log(在某些系统上是/dev/log).
3. 创建UDP套接字，绑定514端口；
4. 打开路径名/dev/klog。来自内核的任何出错消息看着像是这个设备的输入。

此后syslogs守护进程在一个无限循环中运行：调用select等待2，3，4步描述符之一变得可读，读入日志消息，并按照配置文件进行处理。如果守护进程收到`SIGHUP`信号，那就重新读取配置文件。

## syslog 函数
```c
#include <syslog.h>
void syslog(int priority, const char *message, ...);
```

syslog是守护进程登记消息的常用技巧。

`priority`是`级别（level）`和`设施（facility）`两者的结合。级别默认为`LOG_NOTICE`。设施默认为`LOG_USER`。

#### 日志消息级别

![级别](./images/syslog_1.png)


#### 日志消息设施

![设施](./images/syslog_2.png)

`messsage`参数类似于`printf`的格式串，不过增设了`%m`规范，它将被替换成与当前`error`值对应的出错消息。message参数的末尾可以出现一个换行符，不过并非必须。

当syslog被首次调用时，它创建一个UNIX域套接字，然后调用connect函数连接到syslogd守护进程创建的域套接字的众所周知路径名（譬如/var/run/log）。这个套接字一直打开，直到进程终止为止。进程也可以通过`openlog`和`closelog`来代替。

```c
#include <syslog.h>
void openlog(const char *ident, int options, int family);
void closelog(void);
```
openlog可以在首次调用syslog前调用，closelog可以在应用进程不再发送日志消息时调用。`ident`通常是程序名，是syslog加在每条日志消息之前的字符串。`options`参数由下表所示的一个或多个常值的逻辑或构成。

|options|说明|
|:---|:---|
|LOG_CONS|若无法发送到syslogd守护进程则登记到控制台|
|LOG_NDELAY|不延迟打开，立即创建套接字。默认在首次调用syslog时创建|
|LOG_PERROR|既发送到syslogd，又登记到标准错误输出|
|LOG_PID|随着每个日志消息登记进程ID|

### 守护进程例子

#### daemon_int
<<<@/clang/src/inetd/daemon_init.c





