# yum: “Segmentation fault”
我们的一些机器是很多年前的，系统还是centos5.5，最近想更新一些软件，结果碰到了段错误的问题。 

yum使用报错：
```
“This system is not registered with RHN.” 和“Segmentation fault”。
```

第一个错误通过重装yum相关软件修复。操作如下：
```shell
wget http://vault.centos.org/5.5/os/x86_64/CentOS/yum-3.2.22-26.el5.centos.noarch.rpm
wget http://vault.centos.org/5.5/os/x86_64/CentOS/yum-security-1.1.16-14.el5.centos.1.noarch. rpm
wget http://vault.centos.org/5.5/os/x86_64/CentOS/yum-metadata-parser-1.1.2-3.el5.centos.x86_ 64.rpm
wget http://vault.centos.org/5.5/os/x86_64/CentOS/yum-fastestmirror-1.1.16-14.el5.centos.1.no arch.rpm
	
rpm -qa|grep yum
	
rpm -qa|grep yum|xargs rpm -e —nodeps ＃＃uninstall yum
	
rpm -ivh yum-*   ＃＃reinstall
	
yum clean all
	
yum update
```
但是又有新的报错：
```shell
Error: Cannot retrieve repository metadata (repomd.xml) for repository: addons. Please verify its path and try again
```

解决办法如下：
```shell
rpm -import http://mirrors.163.com/centos/RPM-GPG-KEY-CentOS-5
cd /etc/yum.repos.d/ Segmentation fault
wget http://mirrors.163.com/.help/CentOS5-Base-163.repo
```

修改文件（把所有 `$releasever` 替换成 `5`，保存）
```shell
yum -y update
```
但是仍然出现段错误
`Segmentation fault`

解决办法：
	一般是 `libz.so.1.2.3` 的各种链接出现了问题。将其他机器上方的 `libz.so.1.2.3` 复制到 `/lib64`，然后修复各个目录下的链接。

`/sbin/ldconfig -v|grep libz` 发现有两个 `libz-1.2.3` 和 `libz.1.2.7`。先将 `libz.1.2.7` 重命名成 `libz.1.2.7.bak`,然后执行 `yum update`，最后改回来就行。一般 `yum clean all` 之后会用到这个库。`locate` 可以用找库的位置。

还有一种解决办法就是从别的同类型的机器上把对方的 `/etc/cache/yum` 下的文件复制此台机器的相同位置


