# Docker 命令

- 查看docker信息
```bash
docker info
```

- 运行ubuntu
```bash
docker run -i -t -p 127.0.0.1:8080:80 --name the_ubuntu_container ubuntu /bin/bash
```
Option|Description
------|----------
-i	|STDIN
-t	|tty
-h	|设置容器的主机名
-p	|绑定容器80端口到宿主机的8080端口，-P 公开所有的容器端口
-w	|指定工作目录
-e	|设置环境变量，  -e "WEB_PORT=8080"
-v	|将宿主机目录挂载到容器中，只读：-v `local_directory:container_directory:ro` 读写：-v `local_directory:container_directory:rw`
--name|容器命名
--privileged|启动docker的特权模式，允许以宿主机具有的能力来运行容器，包括内核特性和设备访问
--volumes-from|	将指定容器里面的所有的卷加入到新创建的容器里，即使指定的容器没有运行，但必须存在
--rm |	容器只用一次

- 重新启动一个容器
```bash
docker start the_ubuntu_container
docker restart  the_ubuntu_container
```

- 附着到容器上
```bash
docker attach the_ubuntu_container
```

- 创建守护式进程
docker如果前台没有程序执行时会自动停止容器
```bash
docker run -i -t --name the_ubuntu_container -d ubuntu /bin/bash -c "while true; do echo hello world; sleep 1; done"
```

- 获取后台容器日志
```bash
docker logs -f the_ubuntu_container
```

- 查看容器内的进程
```bash
docker top the_ubuntu_container
```

- 在容器内部运行进程[后台]
```bash
docker exec -d the_ubuntu_container touch /etc/new_config_file
```

- 在容器内部运行进程[交互]
```bash
docker exec -t -i the_ubuntu_container touch /bin/bash
```

- 停止守护式进程
```bash
docker stop the_ubuntu_container
```

- 自动重启容器
```bash
docker run --restart=always --name the_ubuntu_container -d ubuntu /bin/sh -c "while true; do echo hello world; sleep 1; done"
--restart=always		#无论退出代码时什么，都会自动重启 \
--restart=on-failure	#当容器退出代码为非0的值的时候重启 \
--restart=on-failure:5	#重启次数 
```

- 获取容器的更多信息
```bash
docker inspect the_ubuntu_container
```

- 删除容器
```bash
docker rm the_ubuntu_container
```

- 删除全部容器
```bash
docker rm `docker ps -a -q`
```

- 列出镜像
```bash
docker images
```

- 删除镜像
```bash
docker rmi test/ubuntu
```

- 拉取镜像
```bash
docker pull ubuntu
docker run -t -i --name new_container ub ubuntu /bin/bash  #如果本地不存在，自动拉取
```

- 查找镜像
```bash
docker search puppet
```

- 构建镜像
```bash
docker build -t="test/ubuntu" .
```

- 查看镜像历史
```bash
docker history the_ubuntu_container
```

- 将镜像推送到Docker Hub
```bash
docker login
docker push test/ubuntu
```

- 将容器保存（快照）
```bash
docker export 容器ID > container.tar
```

- 将容器快照保存成镜像：
```bash
cat container.tar |docker import -  image_name:image_tag
```

