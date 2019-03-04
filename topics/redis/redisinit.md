# Redis启动
阅读一个C项目，直接从`main`函数入是一个很不错的选择。在redis项目中可以找到`redis.c`文件，redis服务器端程序的`main`函数就在其中。

在main函数中，我们大致可以看到其启动过程中主要流程:
## `spt_init`

处理进程启动时的参数和环境变量，以便于后期修改进程名。为什么改个程序名要如此大费周折呢，那是因为agrv和environ是连续存储的。我找了些相关的资料可以查阅：[redis里的小秘密:设置进程名](https://www.jianshu.com/p/36c301ac87df)，[Linux修改进程名称(setproctitle())](https://blog.csdn.net/hengshan/article/details/7835981)。

处理了参数和环境变量后，redis陆续执行了一些系列的修改和定义：`setlocale`（设置地域），`zmalloc_set_oom_handler`(设置内存不足时的操作),`srand`(初始化随机种子), `gettimeofday`, `getRandomHexChars`,`dictSetHashFunctionSeed`等等。之后redis检查执行的可执行文件名是否是`redis-sentinel`或者参数中包含`--sentinel`，如果是的话redis将进入哨兵模式，进而转入哨兵模式的执行流程中。本文我们只讨论redis普通节点的启动过程。

## `initServerConfig( )`
这一步主要是在初始化全局的`server`对象中的各个数据成员。为下一步解析参数和配置文件做好准备。

## 初始化参数

在这一步中，redis检查传入的各项参数，读取并解析配置文件（`loadServerConfig`）。如果没有配置redis为`supervised`模式，并且设置了后台运行redis时，redis执行进入后台的方法：
```c
if (background) daemonize();
```
redis是如何将自己转变成为守护进程的呢？下面我们展开看看`daemonize()`：
```c
void daemonize(void) {
    int fd;

    if (fork() != 0) exit(0); /* parent exits */
    setsid(); /* create a new session */

    /* Every output goes to /dev/null. If Redis is daemonized but
     * the 'logfile' is set to 'stdout' in the configuration file
     * it will not log at all. */
    if ((fd = open("/dev/null", O_RDWR, 0)) != -1) {
        dup2(fd, STDIN_FILENO);
        dup2(fd, STDOUT_FILENO);
        dup2(fd, STDERR_FILENO);
        if (fd > STDERR_FILENO) close(fd);
    }
}
```
redis先fork出一个子进程，并退出父进程，以此断开和终端的交互。0，1和2文件句柄分别与标准输入，标准输出，标准错误输出相关联，所以用户应用程序调用`open`函数打开文件时,默认都是以3索引为开始句柄。将标准输入，标准输出，标准错误输出都定向（[dup2()](https://linux.die.net/man/2/dup2)）到`fd`对应的`/dev/null`中，然后关闭`fd`。执行完此操作后，后台模式运行的redis继续执行后面的流程。

## `initServer( )`
在这一步中，redis首先对信号做了一些处理：
```c
signal(SIGHUP, SIG_IGN);
signal(SIGPIPE, SIG_IGN);
setupSignalHandlers();
```
- `signal(SIGHUP, SIG_IGN)`  redis多作为守护进程运行，这时其不会有控制终端，首先忽略掉SIGHUP信号。
- `signal(SIGPIPE, SIG_IGN)` TCP是全双工的信道，可以看作两条单工信道， TCP连接两端的两个端点各负责一条。 当对端调用close时， 虽然本意是关闭整个两条信道， 但本端只是收到FIN包。按照TCP协议的语义，表示对端只是关闭了其所负责的那一条单工信道，仍然可以继续接收数据。也就是说，因为TCP协议的限制，一个端点无法获知对端的`socket`是调用了`close`还是`shutdown`。对一个已经收到FIN包的socket调用read方法，如果接收缓冲已空，则返回0，这就是常说的表示连接关闭。但第一次对其调用write方法时，如果发送缓冲没问题，会返回正确写入(发送)。但发送的报文会导致对端发送RST报文，因为对端的socket已经调用了close，完全关闭，既不发送，也不接收数据。所以第二次调用write方法(假设在收到RST之后)，会生成SIGPIPE信号，导致进程退出。**为了避免进程退出, 可以捕获SIGPIPE信号, 或者忽略它, 给它设置SIG_IGN信号处理函数**。

#### `createSharedObjects`
然后redis继续初始化全局的`server`对象，并在里面初始化了全局的`shared`对象（`createSharedObjects(void)`）。`createSharedObjects` 这个函数主要是创建一些共享的全局对象，我们平时在跟redis服务交互的时候，如果有遇到错误，会收到一些固定的错误信息或者字符串比如：`-ERR syntax error，-ERR no such key`，这些字符串对象都是在这个函数里面进行初始化的，此外，redis还初始化了`OBJ_SHARED_INTEGERS`（默认为10,000）个整数对象用于共享。

#### `adjustOpenFilesLimit`
该函数主要检查下系统的可允许打开文件句柄数，对于redis来说至少要32(`CONFIG_MIN_RESERVED_FDS`)个文件句柄，如果检测到环境不合适，会去修改环境变量，以适合redis的运行。

#### `aeCreateEventLoop`



## 参考资料
- [redis启动流程（一）](http://www.ituring.com.cn/article/265187)
- [redis启动流程（二）](http://www.ituring.com.cn/article/196415)
- [redis里的小秘密:设置进程名](https://www.jianshu.com/p/36c301ac87df)
- [Linux修改进程名称(setproctitle())](https://blog.csdn.net/hengshan/article/details/7835981)
- [dup2()](https://linux.die.net/man/2/dup2)


