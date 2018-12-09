# natstat
`netstat`命令用来打印Linux中网络系统的状态信息，可让你得知整个Linux系统的网络情况。

netstat的常用的选项如下：

选项 | 含义
|:------|:-----|
| -a (all)  |  显示所有选项 |
|-t (tcp) | 仅显示tcp相关选项|
|-u (udp) | 仅显示udp相关选项|
|-l (listen) | 仅列出有在Listen(监听)的服务状态|
|-p (program) | 显示建立相关链接的程序名 |
|-r (route) | 显示路由信息，路由表|
| -e  (extend)  |  显示扩展信息 |
| -c  | 每隔一个固定时间，执行该netstat命令。 |

#### netstat的常用方法
1. `netstat -p | grep 19626`：得到进程号19626的进程所打开的所有端口
2. `netstat -tpl`：查看当前tcp监听端口, 需要显示监听的程序名。
3.  `netstat -c 2`：隔两秒执行一次netstat，持续输出


## 补充
TCP三次握手和四次挥手的过程和netstat中tcp的各种状态。
 
#### 1. TCP三次握手的过程
1. 主动连接端发送一个SYN包给被动连接端；
2. 被动连接端收到SYN包后，发送一个带ACK的SYN包给主动连接端。
3. 主动连接端发送一个带ACK标志的包给被动连接端，握手动作完成。

#### 2. TCP的四次挥手过程
1. 主动关闭端发送一个FIN包给被动关闭端。
2. 被动关闭端收到FIN包后，发送一个ACK包给主动关闭端。
3. 被动关闭端发送了ACK包后，再发送一个FIN包给主动关闭端。
4. 主动关闭端收到FIN包后，发送一个ACK包。当被动关闭端收到ACK后，四次挥手动作完成，连接断开。

#### 3. netstat中tcp连接对应的各种状态
1. `LISTEN`：侦听状态，等待远程机器的连接请求。
2. `SYN_SEND`：在TCP三次握手期间，主动连接端发送了SYN包后，进入SYN_SEND状态，等待对方的ACK包。
3. `SYN_RECV`：在TCP三次握手期间，主动接收端收到SYN包后，进入SYN_RECV状态。
4. `ESTABLISHED`：完成TCP三次握手后，主动连接端进入`ESTABLISHED`状态。此时，TCP连接已经建立，可以进行通信。
5. `FIN_WAIT_1`：在TCP四次挥手时，主动关闭端发送FIN包后，进入`FIN_WAIT_1`状态。
6. `FIN_WAIT_2`：在TCP四次挥手时，主动关闭端收到ACK包后，进入`FIN_WAIT_2`状态。
7. `TIME_WAIT`：在TCP四次挥手时，主动关闭端发送了ACK包之后，进入`TIME_WAIT`状态，等待最多2MSL时间，让被动关闭端收到ACK包。
8. `CLOSING`：在TCP四次挥手期间，主动关闭端发送了FIN包后，没有收到对应的ACK包，却收到了对方的FIN包，此时进入`CLOSING`状态。
9. `CLOSE_WAIT`：在TCP四次挥手期间，被动关闭端收到FIN包后，进入`CLOSE_WAIT`状态。
10. `LAST_ACK`：在TCP四次挥手时，被动关闭端发送FIN包后，进入`LAST_ACK`状态，等待对方的ACK包。


