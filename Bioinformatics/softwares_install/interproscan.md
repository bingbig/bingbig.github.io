## 安装interproscan

**SFLD errors： https://github.com/ebi-pf-team/interproscan/wiki/KnownIssues**

运行报错：
```shell
Command: bin/blast/ncbi-blast-2.3.0+/rpsbproc -i /home/pangel/interproscan-5.24-63.0/temp/dellcmb.bnu.edu.cn_20170619_150332200_361c//jobCDD/000000000001_000000000006.blast.raw.out -d data/cdd/3.14/data -m std 
Error output from binary:
bin/blast/ncbi-blast-2.3.0+/rpsbproc: symbol lookup error: bin/blast/ncbi-blast-2.3.0+/rpsbproc: undefined symbol: _ZZN4ncbi16CNcbiEmptyString3GetEvE9empty_str
```

```shell
echo _ZZN4ncbi16CNcbiEmptyString3GetEvE9empty_str|c++filt
```

原来是 `ncbi::CNcbiEmptyString::Get()::empty_str` 没有定义
解决办法：https://github.com/ebi-pf-team/interproscan/wiki/KnownIssues
For CDD/rpsblast errors, copy the files in ftp://ftp.ebi.ac.uk/pub/databases/interpro/iprscan/5/bin/rh6/rpsblast_binary.zip into bin/blast/ncbi-blast-2.3.0+/
遗憾的是还是报错。

源码编译：
```
The "rpsblast" binary can be obtained from ftp://ftp.ncbi.nih.gov/blast/executables/blast+/2.3.0/ and the "rpsbproc" from ftp://ftp.ncbi.nih.gov/pub/mmdb/cdd/rpsbproc
```
下载新的ncbi－blast和rpsbproc后还是报错：
```
bin/blast/ncbi-blast-2.3.0+/rpsbproc: /lib64/libc.so.6: version `GLIBC_2.14' not found (required by bin/blast/ncbi-blast-2.3.0+/rpsbproc)
```
只得源码安装了。
源码安装
Source: ncbi－blast＋：ftp://ftp.ncbi.nih.gov/pub/mmdb/cdd/rpsbproc/README
```
2. DOWNLOAD AND COMPILE APPLICATIONS FOR YOUR SYSTEM 
------------------------------------------------- 

The rpsbproc executable, as well as rpsblast and rpstblastn, are NCBI toolbox 
applications and therefore require NCBI toolbox to compile. It is recommended 
that you download the lastest blast+ package from:

	ftp://ftp.ncbi.nih.gov/blast/executables/LATEST/
	
Retrieve the source code package (xxxxx-src.tar.gz for unix family systems or 
xxxxx-src.zip for windows systems) and decompress. This package includes all 
necessary toolkit libraries, tools and scripts to build the applications. 
At the time of writing, the current version is 2.2.30, so the archive 
decompresses into a tree:

ncbi-blast-2.2.30+-src
                      |-c++
                           |-compilers...
                           |-include...
                           |-scripts...
                           |-src
                                |-app
                                |-...
                           

Next, download rpsbproc-src.zip or rpsbproc-src.tar.gz from:

	ftp://ftp.ncbi.nih.gov/pub/mmdb/cdd/rpsbproc/

Decompress it to ncbi-blast-2.2.30+-src/c++/src/app so that a directory 
"rpsbproc" appears under ncbi-blast-2.2.30+-src/c++/src/app, which contains 
four files:

	ncbi-blast-2.2.30+-src/c++/src/app/rpsbproc/rpsbproc.cpp
	ncbi-blast-2.2.30+-src/c++/src/app/rpsbproc/Makefile
	ncbi-blast-2.2.30+-src/c++/src/app/rpsbproc/Makefile.in
	ncbi-blast-2.2.30+-src/c++/src/app/rpsbproc/Makefile.RpsbProc.app
	
After adding the source file, edit 
ncbi-blast-2.2.30+-src/c++/src/app/Makefile.in and 
add "RpsbProc" (case sensitive) to the "SUB_PROJ" line. 
	
Now the toolkit and rpsblast application are ready to be built. Scripts are 
already created to build the toolkit on different OS platforms, please refer 
to the following document for detailed build instructions for your particular 
platform:
	http://www.ncbi.nlm.nih.gov/toolkit/doc/book/ch_config/
	
If the compilation is successful, binaries should be in 
ncbi-blast-2.2.30+-src/c++/<built-type>/bin/ or 
ncbi-blast-2.2.30+-src/c++/compilers/<compiler>/static/bin/<built-type>. 
Copy the rpsblast, rpstblastn and rpsbproc executables to your local blast 
directory, such as ~/localrpsb. The toolkit source codes are no longer needed 
and can be deleted.
cd /home/pangel/interproscan-5.24-63.0/bin/blast/ncbi-blast-2.3.0+-src/c++/src/app
```

修改MakeFile.in
```
    ...
SUB_PROJ = rpsbproc RpsbProc asn2asn asn2fasta asn2flat asnval asn_cleanup \
    ...
```

```shell
cd /home/pangel/interproscan-5.24-63.0/bin/blast/ncbi-blast-2.3.0+-src/c++/
./configure --prefix=/path/to/install
cd /home/pangel/interproscan-5.24-63.0/bin/blast/ncbi-blast-2.3.0+-src/c++/ReleaseMT/build && make all_r
```
OK!


