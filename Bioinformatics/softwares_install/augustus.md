# augustus 安装

> 下载：http://bioinf.uni-greifswald.de/augustus/binaries/augustus-3.3.tar.gz



```shell
tar vzvf augustus-3.3.tar.gz
cd augustus
vim common.mk
// 去掉COMPGENEPRED = true和SQLITE = true的注释，是之能够比较基因查找

//  查看安装，主要是看依赖
less -S README.TXT

// 发现依赖很多
export PATH=$PATH:/panfs/sugon/pub/software/bamtools-2.4.1/bin
export LIBRARY_PATH=$LIBRARY_PATH:/panfs/sugon/pub/software/boost_1_60_0/lib
export PATH=$PATH:/panfs/sugon/pub/software/boost_1_60_0/include
export CPLUS_INCLUDE_PATH=$CPLUS_INCLUDE_PATH:/panfs/sugon/pub/software/boost_1_60_0/include
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/panfs/sugon/pub/software/boost_1_60_0/lib

// 如何查看依赖包是否安装？不同的系统包的名字不一样，最好查找一下centos下相应的包叫什么名字
// 以lpsolve为例
rpm -qa lpsolve
// 打印
// lpsolve-5.5.0.15-2.el6.x86_64
// 说明已经安装成功。但是呢
make
alignment.cc:23:20: error: lp_lib.h: No such file or directory

// 还是报错了。说明要求里面的integer linear program solver lpsolve的头文件还是不可用
// 最简单的办法是让管理员安装lpsolve-devel.x86_64

yum install lpsolve-devel.x86_64

// 返回普通用户
make clean
make

// 发现还是报错，
/usr/bin/ld: cannot find -lcolamd
// 缺少libcolamd.so

// 再次管理员安装
yum search libcolamd
yum install suitesparse suitesparse-devel
// suitesparse-devel 在ubuntu下libsuitesparse-dev
// 返回普通用户make

make
g++ -Wall -O2    -c bam2hints.cc -o bam2hints.o -I/usr/include/bamtools 
bam2hints.cc:16:27: error: api/BamReader.h: No such file or directory
bam2hints.cc:17:27: error: api/BamWriter.h: No such file or directory
bam2hints.cc:18:30: error: api/BamAlignment.h: No such file or directory
bam2hints.cc:19:24: error: api/BamAux.h: No such file or directory
bam2hints.cc:23: error: ‘BamTools’ is not a namespace-name

// -I/usr/include/bamtools ？？？为何从/usr/include/bamtools，
make -h
// 没有看到指定路径的参数，可能此处hard code了。需要将bamtools的头文件复制到/usr/include中。
// 管理员
ln -s /panfs/sugon/pub/software/bamtools-2.4.1/include bamtools

// 再次make
make
/usr/bin/ld: cannot find -lbamtools

// 这次找不到bamtools.so，需要管理员
cp /panfs/sugon/pub/software/bamtools-2.4.1/lib/* /usr/lib64

// 
make

// ok
// 其他节点的机器也需要将头文件和lib文件复制到相应的位置
cp /panfs/sugon/pub/software/bamtools-2.4.1/lib/* /usr/lib64
cd /usr/include
ln -s /panfs/sugon/pub/software/bamtools-2.4.1/include bamtools

yum install -y lpsolve-devel.x86_64 suitesparse suitesparse-devel
```



