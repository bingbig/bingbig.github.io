# Centos 关闭CPU主频控制
Centos7关闭cpu主频控制：
```bash
for CPUFREQ in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor；
do
	[ -f $CPUFREQ ]|| continue;
	echo  -n  performance >$CPUFREQ;
done
```
Centos6
```bash
/etc/init.d/ cpuspeed stop 
```

