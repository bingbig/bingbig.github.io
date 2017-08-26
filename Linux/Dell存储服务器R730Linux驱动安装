# Dell存储服务器powerEdge R730 CentOS 6.6 驱动安装
**磁盘管理软件和驱动都是基于redhat 6.6安装，因此千万不要升级系统内核，后果未知！！！**

## 1. 安装驱动

	驱动下载地址：
http://downloads.dell.com/FOLDER03144852M/1/QLogic_LAN_9.0.0_Linux_Binary_9.0.0.07.tar.gz 
	解压到服务器后，`rpm -Uvh ****.rpm`  安装default目录下的64位rpm包即可。

	查看hba卡信息：
	```shell
	lspci -nn | grep "Fibre Channel"
	05:00.0 Fibre Channel [0c04]: QLogic Corp. ISP8324-based 16Gb Fibre Channel to PCI Express Adapter [1077:2031] (rev 02)
	```

	检查hba卡驱动是否被加载到系统内核：
	```shell
	[root@sky ~]# lsmod | grep qla2xxx
	qla2xxx               551467  3 
	scsi_transport_fc      55075  4 bnx2fc,fcoe,libfc,qla2xxx
	```
	如果没有加载，手动加载 `modprobe -v qla2xxx`
	
	查看hba卡挂载目录
	```shell
	[root@sky ~]# ll /sys/class/fc_host/
	total 0
	lrwxrwxrwx. 1 root root 0 Jun 25 09:26 host1 -> ../../devices/pci0000:00/0000:00:03.2/0000:05:00.0/host1/fc_host/host1
	```
	
## 2. 安装MDSM磁盘管理软件
	下载地址：http://www.dell.com/support/home/cn/zh/cnbsd1/Drivers/DriversDetails?driverId=R9G1X
	直接在服务器上 wget -cb http://www.dell.com/support/home/cn/zh/cnbsd1/Drivers/DriversDetails?driverId=R9G1X
	
	下载后是iso文件，需要挂载：
	```shell
	mount -o loop DELL_MDSS_Consolidated_RDVD_6_5_0_1.iso /media
	cd  media
	```
	里面有安装教程，必须在大图形界面下操作，不要运行 `autorun` 安装，按照教程先运行其他两个脚本，完了自动启动图形安装界面，参照下面的文档安装和配置即可。安装后需要重启。
	
	配置完盘阵后，添加驱动 `dm-multipath`。启动守护进程，加入开机自启。之后重启系统即可用 `multipath -ll` 扫描到盘阵。格式化操作不要参照文档，请参考以下。

## 3. 创建文件系统和格式化盘阵
1. 文件系统GPT
	因为我们的盘阵大小为16TB（20块2T的硬盘，1块用于热备，其余9块做RAID5，因此一块用于灾备，剩余8块可用，16T），所以不能用上述文档中的 `fdisk` 进行分区，得用 `parted`。
	
	```shell
	cd /dev/mapper/
	parted mpathb
	 #进入parted后，m可查看菜单，输入：
	 #创建GPT文件系统
	mklabel gpt
	Yes
	 #创建一个主分区，使用全部盘阵
	mkpart primary 0% 100%
		#查看分区情况
	print
		#无误后退出
	quit
	```
2. 格式化ext4
	```shell
	mkfs.ext4 /dev/mapper/mpathbp1
	```
	格式化需要一定的时间
	
3. 查看分区情况
	```shell
	fdisk -l
	```
	
	重启系统之后会发现盘阵挂载到/dev/sdb下了。
	```shell
	[root@sky ~]# mount /dev/mapper/mpathbp1    /storage/	
	[root@sky ~]# df -h
	Filesystem            Size  Used Avail Use% Mounted on
	/dev/mapper/vg_sky-lv_root   50G  8.9G   38G  20% /
	tmpfs                 7.7G   72K  7.7G   1% /dev/shm
	/dev/sda2             477M   53M  399M  12% /boot
	/dev/sda1             200M  272K  200M   1% /boot/efi
	/dev/mapper/vg_sky-lv_home 217G  590M  206G   1% /home
	/dev/mapper/mpathbp1   15T  9.4M   14T   1% /storage
	```

4. 规划目录
	需要将本地磁盘上的home目录转移到新挂载的storage上。
首先自动挂载新盘阵，将之前的home目录挂载到local_disk作为本地盘使用。

	```shell
	vim /etc/fstab
	/dev/mapper/vg_sky-lv_home /local_disk                   ext4    defaults        1 2
	/dev/mapper/mpathbp1    /storage                   ext4    defaults        1 2
	
	mount -a
	umount /home
	cd /
	rmdir /home
	ln -s storage/home .
		
	fdisk -l
	```
	
5. 禁止升级系统内核
	```shell
	vim /etc/yum.conf
	```
	在最后面添加：`exclude=kernel*`
	```shell
	yum clean all
	```
	修改root `vim ~/.bashrc`
	添加： `alias yum="yum -x 'kernel*'"`
	```shell
	source ~/.bashrc
	```
	
	*用其他机器测试还是会从6.6升级到6.9！！！*
	

## 4. 其他
1. 查看已有内存信息
	```shell
	dmidecode |grep -A16 "Memory Device"
	
	Memory Device
		Array Handle: 0x1000
		Error Information Handle: Not Provided
		Total Width: 72 bits
		Data Width: 64 bits
		Size: 16384 MB
		Form Factor: DIMM
		Set: 1
		Locator: A1
		Bank Locator: Not Specified
		Type: <OUT OF SPEC>
		Type Detail: Synchronous Registered (Buffered)
		Speed: 2400 MHz
		Manufacturer: 00AD063200AD
		Serial Number: 321383C1
		Asset Tag: 001651C0
		Part Number: HMA82GR7MFR8N-UH  
	--
	```

2. 安装php7
```shell
rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-6.noarch.rpm
rpm -Uvh https://mirror.webtatic.com/yum/el6/latest.rpm
yum install php70w-common php70w-pdo php70w-gd php70w-fpm php70w-xml php70w-mbstring php70w-pdo_dblib php70w-mysqlnd php70w-mcrypt 
chkconfig php-fpm on
/etc/init.d/php-fpm restart
```

3. 安装nginx
nginx配置文档： https://www.nginx.com/resources/wiki/start/#pre-canned-configurations
创建`/etc/yum.repos.d/nginx.repo`，写入：
```
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/6/$basearch/
gpgcheck=0
enabled=1
```
```shell
yum install nginx
```
修改`/etc/nginx/nginx.conf`中用户名和用户组为`web user  web web;`

4. 配置`iptables`和`selinux`
修改`/etc/sysconfig/iptables`，在 `-A INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT` 下面添加以下行：
```shell
-A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 1571 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 1572 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 1573 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 1574 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 19999 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 8787 -j ACCEPT
```
重启 `iptables`
`Nginx` 遇到如下报错：
```
Starting nginx: nginx: [emerg] bind() to 
0.0.0.0:8088 failed (13: Permission denied)
```
应该是 `selinux` 的问题。
安装selinux管理包：
 ```shell
 yum install policycoreutils-python.x86_64
 ```
添加端口
```shell
semanage port -l | grep http_port_t
semanage port -a -t http_port_t  -p tcp 1361
semanage port -a -t http_port_t  -p tcp 1362
semanage port -a -t http_port_t  -p tcp 1363
```
设置完后需要
```shell
 /etc/init.d/nginx restart
```
5. 安装 `MySQL` 和 `Redis`
```shell
yum install redis mysql
```
交互式配置：`/usr/bin/mysql_secure_installation`


