# 更改Perl包的安装目录
```bash
cd /usr/share/perl5/CPAN/
```
修改`Config.pm`
```
'make_install_make_command' => q[/usr/bin/make],
'makepl_arg' => q[PREFIX=/panfs/dell/pub/perl_lib],
'mbuild_arg' => q[],
'mbuild_install_arg' => q[],
'mbuild_install_build_command' => q[./Build],
'mbuildpl_arg' => q[--prefix /panfs/dell/pub/perl_lib],
```

修改环境变量：
```bash
export PERL5LIB=/panfs/dell/pub/perl_lib/lib/perl5:/panfs/dell/pub/perl_lib/lib/perl5/site_perl/5.10.1:/panfs/dell/pub/perl_lib/lib/perl5/sit
e_perl/5.10.1/x86_64-linux-thread-multi/
```


