# 简易安装

## Geneid

```bash
tar xzvf geneid_v1.4.4.Jan_13_2011.tar.gz
cd geneid_v1.4.4 && make
```



## genemark_hmm_euk_linux_64

```bash
tar xzvf genemark_hmm_euk_linux_64.tar.gz
cd genemark_hmm_euk_linux_64
cp gm_key ~/.gm_key
```



## GlimmerHMM

```bash
tar xzvf tar xzvf GlimmerHMM-3.0.4.tar.gz 
cd GlimmerHMM

chmod a-x glimmerhmm_linux
./glimmerhmm_linux_x86_64 或者 glimmhmm.pl
```



## Snap

```bash
wget http://korflab.ucdavis.edu/Software/snap-2013-11-29.tar.gz
tar xzvf snap-2013-11-29.tar.gz
cd snap
make
```



## Genewise

```bash
wget http://www.ebi.ac.uk/~birney/wise2/wise2.4.1.tar.gz

tar xzvf wise2.4.1.tar.gz 
cd wise2.4.1

less -S INSTALL
cd src
export PATH=/panfs/sugon/pub/software/compiler/gnu/gcc-4.9.4/bin:$PATH
export LIBRARY_PATH=/panfs/sugon/pub/software/compiler/gnu/gcc-4.9.4/lib:/panfs/sugon/pub/software/compiler/gnu/gcc-4.9.4/lib64:$LIBRARY_PATH



make all
// 报错
/bin/sh: glib-config: command not found
...
sqio.c:232: error: conflicting types for ‘getline’
/usr/include/stdio.h:673: note: previous declaration of ‘getline’ was here
make[1]: *** [sqio.o] Error 1
make[1]: Leaving directory `/panfs2/homes/ga/sourcecode/wise2.4.1/src/HMMer2'
make: *** [realall] Error 2

make clean
su
yum install glib-devel -y
exit

make all
// 还是报错
sqio.c:232: error: conflicting types for ‘getline’
/usr/include/stdio.h:673: note: previous declaration of ‘getline’ was here
make[1]: *** [sqio.o] Error 1
make[1]: Leaving directory `/panfs2/homes/ga/sourcecode/wise2.4.1/src/HMMer2'
make: *** [realall] Error 2
```



## spaln

```bash
wget http://www.genome.ist.i.kyoto-u.ac.jp/~aln_user/archive/spaln2.3.1.tar.gz
tar xzvf spaln2.3.1.tar.gz
cd spaln2.3.1
su
cd src
mkdir /panfs/sugon/pub/software/spaln2.3.1
# Install guide: http://www.genome.ist.i.kyoto-u.ac.jp/~aln_user/spaln/
./configure --exec_prefix=/panfs/sugon/home/ga/software/spaln2.3.1/bin --table_dir=/panfs/sugon/home/ga/software/spaln2.3.1/tabale --alndbs_dir=/panfs/sugon/home/ga/software/spaln2.3.1/alndbs

make && make install
```



## PASA



## EVM

