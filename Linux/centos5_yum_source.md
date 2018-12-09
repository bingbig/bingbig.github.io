# Centos5 yum 源
## centos5不再支持更新，原先的yum源已经不可以再用了，修改如下：
```
# CentOS-Base.repo
#
# The mirror system uses the connecting IP address of the client and the
# update status of each mirror to pick mirrors that are updated to and
# geographically close to the client. You should use this for CentOS updates
# unless you are manually picking other mirrors.
#
# If the mirrorlist= does not work for you, as a fall back you can try the 
# remarked out baseurl= line instead.
#
#

[base]
name=CentOS-5 - Base - vault.centos.org
baseurl=http://vault.centos.org/5.4/os/$basearch/
#mirrorlist=http://mirrorlist.centos.org/?release=5&arch=$basearch&repo=os
gpgcheck=1
gpgkey=http://mirror.centos.org/centos/RPM-GPG-KEY-CentOS-5

#released updates 
[updates]
name=CentOS-5 - Updates - vault.centos.org
baseurl=http://vault.centos.org/5.4/updates/$basearch/
#mirrorlist=http://mirrorlist.centos.org/?release=5&arch=$basearch&repo=updates
gpgcheck=1
gpgkey=http://mirror.centos.org/centos/RPM-GPG-KEY-CentOS-5

#packages used/produced in the build but not released
[addons]
name=CentOS-5 - Addons - vault.centos.org
baseurl=http://vault.centos.org/5.4/addons/$basearch/
#mirrorlist=http://mirrorlist.centos.org/?release=5&arch=$basearch&repo=addons
gpgcheck=1
gpgkey=http://mirror.centos.org/centos/RPM-GPG-KEY-CentOS-5

#additional packages that may be useful
[extras]
name=CentOS-5 - Extras - vault.centos.org
baseurl=http://vault.centos.org/5.4/extras/$basearch/
#mirrorlist=http://mirrorlist.centos.org/?release=5&arch=$basearch&repo=extras
gpgcheck=1
gpgkey=http://mirror.centos.org/centos/RPM-GPG-KEY-CentOS-5

#additional packages that extend functionality of existing packages
[centosplus]
name=CentOS-5 - Plus - vault.centos.org
baseurl=http://vault.centos.org/5.4/centosplus/$basearch/
#mirrorlist=http://mirrorlist.centos.org/?release=5&arch=$basearch&repo=centosplus
gpgcheck=1
enabled=0
gpgkey=http://mirror.centos.org/centos/RPM-GPG-KEY-CentOS-5

#contrib - packages by Centos Users
[contrib]
name=CentOS-5 - Contrib - vault.centos.org
baseurl=http://vault.centos.org/5.4/contrib/$basearch/
#mirrorlist=http://mirrorlist.centos.org/?release=5&arch=$basearch&repo=contrib
gpgcheck=1
enabled=0
gpgkey=http://mirror.centos.org/centos/RPM-GPG-KEY-CentOS-5
```

