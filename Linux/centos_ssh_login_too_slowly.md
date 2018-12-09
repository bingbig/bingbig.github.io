# CentOS ssh 登录等待时间长

最为常见的原因是因为server的`sshd`会去`DNS`查找访问client IP的`hostname`，如果DNS不可用或者没有相关记录，就会耗费大量时间。一般情况下，设备无法连接DNS服务时会出现这种情况。

1. 在server上/etc/hosts文件中把你本机的ip和hostname加入
2. 在server上/etc/ssh/sshd_config文件中修改或加入UseDNS=no
3. 注释掉server上/etc/resolv.conf中所有行
4. 修改server上/etc/nsswitch.conf中hosts为hosts: files  #这一步会导致无法连外网
5. reboot server使配置生效

另外在`authentication gssapi-with-mic` 也有可能出现问题，在server上`/etc/ssh/sshd_config`文件中修改`GSSAPIAuthentication no`
`/etc/init.d/sshd restart`重启sshd进程使配置生效.

　　如果以上两招还不能解决问题，善于使用DEBUG MODE  `ssh -v`来查看log，找到停滞时间最长的步骤，然后针对性的修改配置解决。


