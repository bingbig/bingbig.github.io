## 安装augustu-3.2.2

### make的时候找不到bamtools的头文件。

1. 安装bamtools

   - 下载：<https://github.com/pezmaster31/bamtools/>  2.4.1

   - 解压后进入目录

     ```she
     mkdir build
     cmake ..
     make
     make install
     ```

     ​

     需要root权限，生成的文件在/usr/local/bin   /usr/local/lib   /usr/local/include下面

   - 运行`ld -lbamtools`还是找不到`bamtools`库，即使`export LD_LIBRARY_PATH `和`LIBRARY_PATH`

   - ld  -lbamtools --verbos查看查找路径

     修改ld配置文件：

     ```shell
     vim /etc/ld.so.conf
     # 加入一行： /usr/local/lib/bamtools
     ```

   - ln -s /usr/local/lib/bamtools /usr/lib/

   ​

   运行bamtools，正常。

### 有一次成功了，之后又找不到，，，，，无语了。只能这样了：

```shell
cd /usr/lib
ln -s /usr/local/lib/bamtools/libbamtools.so .
ln -s /usr/local/lib/bamtools/libbamtools.a .
```

报错：

```
bam2hints.cc:16:27: fatal error: api/BamReader.h: No such file or directory
```



安装augustu时，编译器查找bamtools的head文件的路径是/usr/include

```shell
cd /usr/include
ln -s /usr/local/include/bamtools
```



此时，augustu能找到lib文件和include文件。