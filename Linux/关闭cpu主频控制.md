# Centos 关闭CPU主频控制
Centos7关闭cpu主频控制：
```shell
for CPUFREQ in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor；
do
	[ -f $CPUFREQ ]|| continue;
	echo  -n  performance >$CPUFREQ;
done
```
Centos6
```shell
/etc/init.d/ cpuspeed stop 
```

