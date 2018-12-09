## Linux 挂载Panasas盘阵

重启系统之后没有自动挂载紫光的共享存储/panfs 

### 1. 同步时间 

 ```bash
/etc/init.d/ntpd status 

 /etc/init.d/ntpd stop 

 ntpdate 192.168.3.158 	# 时间服务器IP

 /etc/init.d/ntpd start 
 ```



### 2. 挂载 

 运行 `/etc/rc.local` 下的最后两行（其实最后一行就行） 

```bash
# 第一行是加入驱动到内核
# 第二行是挂载，如下
mount.panfs panfs://13.1.1.1/panfs /panfs 
```



## 3. 设置自动运行时间同步

 在/etc/crontab下面添加一行（和上面的时间服务器统一）： 

```bash 
0 0 1 * * root ntpdate 192.168.3.158 
```

 

## 4. 设置开机自动对时 

 在`/etc/rc.d/rc.local`下挂载命令前添加(和上面的时间服务器统一)： 

```bash
/usr/sbin/ntpdate 192.168.3.158 && /sbin/hwclock --systohc > /dev/null 2>&1 
```

