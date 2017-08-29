# 查看Linux系统设备的硬件信息

## CPU

```shell
dmidecode |grep -A16 "Memory Device"	# 可以看到CPU的个数
cat /proc/cpuinfo						# 查看计算核心数
```



## 内存条

```shell
dmidecode |grep -A16 "Memory Device"	# 内存条硬件信息
free -g									# 内存使用情况
```

输出：

```shell
Memory Device
	Array Handle: 0x1000
	Error Information Handle: Not Provided
	Total Width: 72 bits
	Data Width: 64 bits
	Size: No Module Installed
	Form Factor: DIMM
	Set: 16
	Locator: DIMM D8
	Bank Locator: Not Specified
	Type: DDR3
	Type Detail: Synchronous
	Speed: Unknown
	Manufacturer:             
	Serial Number:         
	Asset Tag:         
	Part Number:    
...
```



## 主板

```shell
dmidecode -t 2
```

输出:

```shell
# dmidecode 2.12
SMBIOS 2.6 present.

Handle 0x0200, DMI type 2, 9 bytes
Base Board Information
	Manufacturer: Dell Inc.
	Product Name: 0753X6
	Version: A06
	Serial Number: ..CN7475121H0080.
	Asset Tag: Not Specified
```

## 硬盘

```shell
cat /proc/scsi/scsi		# 查看硬件信息， df -h 查看使用状态
```

输出：

```shell
Attached devices:
Host: scsi0 Channel: 02 Id: 00 Lun: 00
  Vendor: DELL     Model: PERC H700        Rev: 2.10
  Type:   Direct-Access                    ANSI  SCSI revision: 05
Host: scsi1 Channel: 00 Id: 00 Lun: 00
  Vendor: TSSTcorp Model: DVD-ROM SN-108BB Rev: D150
  Type:   CD-ROM                           ANSI  SCSI revision: 05
Host: scsi3 Channel: 00 Id: 00 Lun: 00
  Vendor: WD       Model: My Passport 0748 Rev: 1019
  Type:   Direct-Access                    ANSI  SCSI revision: 06
Host: scsi3 Channel: 00 Id: 00 Lun: 01
  Vendor: WD       Model: SES Device       Rev: 1019
  Type:   Enclosure                        ANSI  SCSI revision: 06
```

