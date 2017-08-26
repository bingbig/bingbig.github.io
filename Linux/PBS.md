## PBS服务开启操作流程
- 在主节点上打开PBS服务
```shell
/etc/init.d/pbs_server start
```
- 在主节点和其他节点打开PBS客户端。主节点虽是服务端，但也可参加计算，因而要打开客服。依次执行如下：
```shell
/etc/init.d/pbs_mom   start
```

- 在主节点上打开调度器
```shell
/etc/init.d/maui.d     start
```

- 对于这些PBS的功能开启有几个相同的参量：
	status             查看状态
	restart            重启
	stop               终止
	start               开启

- 接下来是检查是否可以提交作业
```shell
pbsnodes -a
```

## qsub
- `qstat -a` : 查看当前系统的作业运行情况，系统显示当前队列中所有作业的详细信息。
- `qstat -f`  作业序号：查看对应的正在运行作业的详细信息
- `qhold` 作业序号： 阻塞制定作业
- `qrls` 作业序号：释放指定作业
- `checkjob` 作业序号：查看作业的详细信息

