# Dockerfile

### FROM
传递基础镜像
`FROM ubuntu:14.04`

### MAINTAINER
维护者信息
`MAINTAINER James Turnbull "james@docker.com"`

### RUN
默认使用 `/bin/sh -c` 来执行，镜像被构建时运行的命令

`RUN apt-get install -y nginx`

如果不支持在shell平台上运行或者不希望在shell中运行（如避免shell字符串篡改），可以使用exec格式的RUN指令

`RUN	["apt-get", "install", "-y", "nginx"]`

### EXPOSE
向外部公开端口
`EXPOSE 80`

### CMD
用于指定一个容器启动时要运行的命令，类似于`docker run` 后面指定运行的命令
`CMD	["bin/true"]`

`CMD	["bin/bash", "-l"]`

### ENTRYPOINT
`docker run` 命令行中指定的任何参数都会被当作参数再次传递给ENTRYPOINT指定的命令

`ENTRYPOINT	["/usr/sbin/nginx", "-g", "daemon off;"]`

### WORKDIR
用来从镜像创建一个新容器时，在容器内部设置一个工作目录，`ENTRYPOINT` 和 `/` 或 `CMD` 指定的程序会在这个目录下执行
WORKDIR	/opt/webapp/db

### ENV
用于在镜像构建过程中设置环境变量
`ENV		RVM_PATH	/home/rvm   `

### USER

指定镜像以什么用户去运行
`USER	nginx`

### VOLUME

用来向基于镜像创建的容器添加卷，一个卷是可以存在于一个或者多个容器内的特定的目录，这个目录可以绕过联合文件系统。
`VOLUME		["/opt/project", "/data"]`

### ADD

用来将构建环境下的文件盒目录复制到镜像中。源文件可以是URL，压缩包会被自动解压。

`ADD	software.lic	/opt/application/software.lic`

ADD指令会使得构建缓存变得无效。如果通过ADD指令向镜像添加一个文件或者目录，那么这将是的Dockerfile中的后续指令都不能继续使用之前的构建缓存。

### COPY

只负责复制

### ONBUILD

能为镜像添加触发器。当一个镜像被用作其他镜像的基础镜像时（比如你的镜像需要从某未准备好的位置添加源代码，或者你需要执行特定于构建镜像的环境的脚本），该镜像中的触发器将会被执行。可以通过 `docker inspect` 查看镜像中的ONBUILD指令。
```
ONBUILD	ADD 	.	/app/src
ONBUILD 	RUN	cd /app/src && make
```


