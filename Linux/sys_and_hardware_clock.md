# 系统时间和硬件时间的问题

源代码安装 python，结果出现警告,
```
warning: Clock skew detected. Your build may be incomplete.
```

原因是nfs文件系统的时间比系统晚，所以编译的时候会出现问题。

___
[以下来自网络]

## 1. 简介
Linux中有硬件时钟与系统时钟两种时钟。硬件时钟是指主机板上的时钟设备，也就是通常可在BIOS画面设定的时钟。这个时间有主板上电池供电维持，如果主板电池电量耗尽，如果断电的话，恢复到出厂设置。系统时钟则是指kernel中的时钟。所有Linux相关指令与函数都是读取系统时钟的设定。因为存在两种不同的时钟，那么它们之间就会存在差异。当Linux启动时，系统时钟会去读取硬件时钟的设定，之后系统时钟即独立运作。 

对于系统时间，我们可以用 `date` 命令查看：

```shell
unicom@ubuntu:~$ date 
Wed Apr 15 15:52:23 CST 2015
```

硬件时间，用 `hwclock` 命令查看
```shell
unicom@ubuntu:~$ sudo hwclock –show //硬件时间需要root权限 
[sudo] password for unicom: 
Wed Apr 15 16:13:42 2015 -0.844670 seconds　　
```

## 2. 时间设置

用 `date` 命令设置的时间并不会修改系统的硬件时间，系统重启后仍会加载硬件时间，这也是常导致 `date` 设置时间失效的问题。 

正确地做法是设置好系统时间后，再执行一下将时间同步到硬件时钟，当然直接设置硬件时钟也是可以的。

`date` 设置系统时钟。 
```
	date --set “04/15/15 16:19" #（月/日/年 时：分：秒） 
```
将系统时间同步到硬件时钟：
```
sudo hwclock --systohc #或者  sudo hwclock -w
```
　直接设置硬件时间方法： 
　# sudo hwclock --set --date="04/15/15 16:19" （月/日/年 时：分：秒） 
　 
硬件时钟常用的命令参数

|命令参数	| 描述|
|:--------|:-----|
|-r, –show |	读取并打印硬件时钟（read hardware clock and print result）|
|-s, –hctosys	|将硬件时钟同步到系统时钟（set the system time from the hardware clock）|
|-w, –systohc|	将系统时钟同步到硬件时钟（set the hardware clock to the current system time）|

在各个节点上 `root` 执行 `hwclock -w`


