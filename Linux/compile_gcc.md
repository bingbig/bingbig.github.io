# 编译安装GCC
过程是一条血路，结局竟是如此简单！
**不要按照我的记录安装GCC，直接看后面**

#### 背景：安装bedtools2， 结果运行的时候：
```
./bedtools: /usr/lib64/libstdc++.so.6: version `GLIBCXX_3.4.11' not found (required by ./bedtools)
./bedtools: /usr/lib64/libstdc++.so.6: version `GLIBCXX_3.4.9' not found (required by ./bedtools)
./bedtools: /usr/lib64/libstdc++.so.6: version `GLIBCXX_3.4.15' not found (required by ./bedtools)
```

1. 安装glibc-2.24
	- 自带gcc版本太低，更新版本：`export PATH=/pub/CMBdell/gcc-4.7.2/bin:$PATH`
	- 自带 运行时报错说 `checking LD_LIBRARY_PATH variable... contains current directory`， 原因是`LD_LIBRARY_PATH` 包含空目录，比如说出现两个冒号`::`
	
		```
		configure: error: GNU libc requires kernel header files from Linux 3.2.0 or later to be installed before configuring. The kernel header files are found usually in /usr/include/asm and /usr/include/linux; make sure these directories use files from Linux 3.2.0 or later. This check uses <linux/version.h>, so make sure that file was built correctly when installing the kernel header files. To use kernel headers not from /usr/include/linux, use the configure option --with-headers.
		```
	- 放弃。。。

#### 安装gcc-4.8.5

	```bash
	wget http://gcc.parentingamerica.com/releases/gcc-4.8.5/gcc-4.8.5.tar.gz
	```
**报错，要求安装gmp，mpfr，mpc，**
    
1.1 下载安装gmp
  
```bash
	../configure --prefix=/pub/CMBdell/gmp-5.0.0
```
	
1.2 安装mpfr

```bash
./configure --prefix=/pub/CMBdell/mpfr-3.1.5 --with-gmp=/pub/CMBdell/gmp-5.0.0/
```
	
1.3 安装mpc

```bash
./configure --prefix=/pub/CMBdell/mpc-1.0.2 --with-gmp=/pub/CMBdell/gmp-5.0.0 --with-mpfr=/pub/CMBdell/mpfr-3.1.5/
```
1.4 安装gcc
```bash
./configure --prefix=/pub/CMBdell/gcc-4.8.5 --enable-threads=posix --disable-checking --enable--long-long --enable-languages=c,c++,java --with-gmp=/pub/CMBdell/gmp-5.0.0 --with-mpfr=/pub/CMBdell/mpfr-3.1.5 --with-mpc=/pub/CMBdell/mpc-1.0.2/

make && make install
```
报错：
```
checking for suffix of object files... configure: error: in `/pub/CMBdell/gcc-4.8.5.src/x86_64-unknown-linux-gnu/libgcc':
configure: error: cannot compute suffix of object files: cannot compile
```

加上变量：
```bash
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/pub/CMBdell/gmp-5.0.0/lib:/pub/CMBdell/mpfr-3.1.5/lib:/pub/CMBdell/mpc-1.0.2/lib
```

```bash
 ./configure --prefix=/pub/CMBdell/gcc-4.8.5 --enable-threads=posix --disable-checking --enable--long-long --enable-languages=c,c++,java --with-gmp=/pub/CMBdell/gmp-5.0.0 --with-mpfr=/pub/CMBdell/mpfr-3.1.5 --with-mpc=/pub/CMBdell/mpc-1.0.2/
make && make install
```
```bash
yum install libmpc-devel mpfr-devel gmp-devel


cd ~/Downloads

curl ftp://ftp.mirrorservice.org/sites/sourceware.org/pub/gcc/releases/gcc-4.9.2/

gcc-4.9.2.tar.bz2 -O

tar xvfj gcc-4.9.2.tar.bz2

cd gcc-4.9.2
make build && cd build
../configure --prefix=/pub/CMBdell/gcc-4.9.4 --with-gmp=/pub/CMBdell/gmp-5.0.0 --with-mpfr=/pub/CMBdell/mpfr-3.1.5 --with-mpc=/pub/CMBdell/mpc-1.0.2 
make -j 8
make install
```

**失败了！！！**


####安装gcc-4.9.4
 
configure的时候没有加上：`--enable-multiarch=no`，后续报错：`error while loading shared libraries: libc.so.6: ELF file OS ABI invalid`

```bash
make -j10

checking for x86_64-unknown-linux-gnu-gcc... /pub/CMBdell/gcc-4.9.4.src/build/./gcc/xgcc -B/pub/CMBdell/gcc-4.9.4.src/build/./gcc/ -B/pub/CMBdell/gcc-4.9.4/x86_64-unknown-linux-gnu/bin/ -B/pub/CMBdell/gcc-4.9.4/x86_64-unknown-linux-gnu/lib/ -isystem /pub/CMBdell/gcc-4.9.4/x86_64-unknown-linux-gnu/include -isystem /pub/CMBdell/gcc-4.9.4/x86_64-unknown-linux-gnu/sys-include   
checking for suffix of object files... configure: error: in `/pub/CMBdell/gcc-4.9.4.src/build/x86_64-unknown-linux-gnu/libgcc':
configure: error: cannot compute suffix of object files: cannot compile
See `config.log' for more details.
make[2]: *** [configure-stage1-target-libgcc] Error 1
make[2]: Leaving directory `/pub/CMBdell/gcc-4.9.4.src/build'
make[1]: *** [stage1-bubble] Error 2
make[1]: Leaving directory `/pub/CMBdell/gcc-4.9.4.src/build'
make: *** [all] Error 2

```

查看
```bash
vim /pub/CMBdell/gcc-4.9.4.src/build/x86_64-unknown-linux-gnu/libgcc/config.log
/pub/CMBdell/gcc-4.9.4.src/build/./gcc/cc1: error while loading shared libraries: libmpc.so.3: cannot open shared object file: No such file or directory
```
```bash
export LD_LIBRARY_PATH=/pub/CMBdell/mpc-1.0.2/lib:/pub/CMBdell/gmp-5.0.0/lib:/pub/CMBdell/mpfr-3.1.5/lib/:$LD_LIBRARY_PATH
rm -rf x86_64-unknown-linux-gnu/libgcc/config.cache
```

```bash
libtool: link: ranlib .libs/libgfortran.a
libtool: link: ( cd ".libs" && rm -f "libgfortran.la" && ln -s "../libgfortran.la" "libgfortran.la" )
make[6]: Leaving directory `/pub/CMBdell/gcc-4.9.4.src/build/x86_64-unknown-linux-gnu/32/libgfortran'
make[5]: Leaving directory `/pub/CMBdell/gcc-4.9.4.src/build/x86_64-unknown-linux-gnu/32/libgfortran'
make[4]: Leaving directory `/pub/CMBdell/gcc-4.9.4.src/build/x86_64-unknown-linux-gnu/libgfortran'
make[3]: Leaving directory `/pub/CMBdell/gcc-4.9.4.src/build/x86_64-unknown-linux-gnu/libgfortran'
make[2]: Leaving directory `/pub/CMBdell/gcc-4.9.4.src/build/x86_64-unknown-linux-gnu/libgfortran'
make[1]: Leaving directory `/pub/CMBdell/gcc-4.9.4.src/build'
make: *** [all] Error 2
You have mail in /var/spool/mail/root
```

**omg!!!**

无奈，重新编译。。
-----
解压源文件
`mv gcc-4.9.4  gcc_src`
0. 依赖
在gcc_src下执行：`./contrib/download_prerequisites`下载依赖包
```bash
cd gmp
mkdir /pub/CMBdell/gcc-4.9.4/gmp-4.3.2
./configure --prefix=/pub/CMBdell/gcc-4.9.4/gmp-4.3.2
make check
make install
export LD_LIBRARY_PATH=/pub/CMBdell/gcc-4.9.4/gmp-4.3.2/lib:$LD_LIBRARY_PATH

cd ../mpfr
mkdir /pub/CMBdell/gcc-4.9.4/mpfr-2.4.2
./configure --prefix=/pub/CMBdell/gcc-4.9.4/mpfr-2.4.2 --with-gmp=/pub/CMBdell/gcc-4.9.4/gmp-4.3.2/
make
make check
make install
export LD_LIBRARY_PATH=/pub/CMBdell/gcc-4.9.4/mpfr-2.4.2/lib:$LD_LIBRARY_PATH

cd ../mpc
mkdir /pub/CMBdell/gcc-4.9.4/mpc-0.8.1
./configure --prefix=/pub/CMBdell/gcc-4.9.4/mpc-0.8.1/ --with-mpfr=/pub/CMBdell/gcc-4.9.4/mpfr-2.4.2/ --with-gmp=/pub/CMBdell/gcc-4.9.4/gmp-4.3.2/
make
make check 
make install
export LD_LIBRARY_PATH=/pub/CMBdell/gcc-4.9.4/mpc-0.8.1/lib:$LD_LIBRARY_PATH

cd ..
mkdir build && cd build
 ../configure --prefix=/pub/CMBdell/gcc-4.9.4 --enable-lto --with-gmp=/pub/CMBdell/gcc-4.9.4/gmp-4.3.2 --with-mpfr=/pub/CMBdell/gcc-4.9.4/mpfr-2.4.2 --with-mpc=/pub/CMBdell/gcc-4.9.4/mpc-0.8.1/
```
**成功！！！**

晕！原来安装4.9.4的时候只需要`./contrib/download_prerequisites`下载三个依赖包并解压即可，在`config gcc`的时候会自动 `config` 并编译这些包

**注：需要非常长的时间（2h以上）**

## Linux无法挂载ntfs移动硬盘
1. 尝试添加163的yum源，没有作用。
2. 发现没有安装gcc等，yum安装： 

```bash
yum -y install gcc automake autoconf libtool make
rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
yum -y install ntfs-3g
```

## 登陆时语言配置不对
```
-bash: warning: setlocale: LC_CTYPE: cannot change locale (UTF-8): No such file or directory
```

please open the file `/etc/environment` abnd add the 
lines below:
```
LANG=en_US.UTF-8
LC_ALL=en_US.UTF-8
```

## 直接复制MySQL原数据备份和恢复数据库
修改mysql的数据存储路径，从 `/var/lib/mysql` 迁移到 `/data/mysql` 下。复制过去后修改拥有者为 `mysql:mysql`，但是mysql无法start。网上查和selinux有关系。
1. `chcon -R -t mysqld_db_t      mysql`
2. `setenforce 0     ：mysql`可以重启，但是 `setenforce 1` 后还是无法重启。


先启动mysql服务，之后 `setenforce 1`

`mysqldump --opt -d BindingR -u mysql -p >BindingR.sql`

导出表结构，不导出数据。
之后scp复制数据库数据。重启mysql。但是，仍然需要 `setenforce 0` 之后才能正常读取数据。

尝试1:
```bash
semanage fcontext -a -t mysqld_db_t "/data/mysql(/.*)?"
grep -i mysql /etc/selinux/targeted/contexts/files/file_contexts.local

restorecon -R -v /data/mysql
```
try2:

On CentOS 6.0 with the 5.x installation of MySQL, the semanage context needs to be mysqld_safe_t, not mysqld_db_t.
So:
“semanage fcontext -a -t mysqld_safe_t “/data/mysql(/.*)?”
Instead of:     semanage fcontext -a -t mysqld_db_t “/data/mysql(/.*)?”


还可以：
```bash
semanage fcontext -a -e /var/lib/mysql /srv/mysql
restorecon -R -v /src/mysql
```
成功解决！

经验：简单的问题可以直接百度，遇到难的，更专业的还是Google的结果好啊！

如果php或者perl不能访问mysql，将其中的host的值从 `localhsot` 改为 `127.0.0.1`，或者 `localhost:/data/mysql/mysql.sock`

