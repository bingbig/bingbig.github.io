---
sidebar: auto
---

# php-rdkafka

## 背景知识
- [中文介绍什么是kafka？](https://www.jianshu.com/p/d3e963ff8b70)
- [官网](https://kafka.apache.org/)
- [什么是php-rdkafka？](https://github.com/arnaud-lb/php-rdkafka)
- [php-rdkafka文档](https://arnaud-lb.github.io/php-rdkafka/phpdoc/book.rdkafka.html)

## 单机部署kafka集群
### 依赖
[docker-compose](https://docs.docker.com/compose/install/)

### 部署
1. 下载kafka-docker
```bash
git clone https://github.com/wurstmeister/kafka-docker.git
cd kafka-docker
```

2. 修改 docker-compose.yml
	- 修改KAFKA_ADVERTISED_HOST_NAME的值为你的主机IP，如果你想跑多个brokers就不要设置为127.0.0.1了
	- 如果想增加`message.max.bytes`参数，设置环境变量`KAFKA_MESSAGE_MAX_BYTES: 2000000`；`KAFKA_AUTO_CREATE_TOPICS_ENABLE: 'false'`关闭自动增加topic。

3. 增加php环境

```yml
version: '2'
services:
  zookeeper:
    image: wurstmeister/zookeeper
    ports:
      - "2181:2181"
  kafka:
    build: .
    ports:
      - "9092"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: 192.168.0.103
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
  php7:
    image: php:latest
    volumes:
      - /path/to/php/dir:/var/php
    tty: true
```
`tty: true`目的是为了php7环境不会在创建后就自动退出了。记得修改`/path/to/php/dir`为你的本地目录。

4. 启动

- 启动kafka和zk集群(单个broker)：
```bash
docker-compose up -d
```
- 3个broker
```bash
docker-compose up --scale kafka=3 -d
````
- 停止集群
```bash
docker-compose stop
```

- 查看集群信息
```bash
docker-compose ps
````

- 查看集群日志
```bash
docker-compose logs
```

5. 安装php-rdkafka拓展

- `docker-compose ps`查看php7容器信息：
```
          Name                        Command               State                         Ports
----------------------------------------------------------------------------------------------------------------------
kafka-docker_kafka_1       start-kafka.sh                   Up      0.0.0.0:32780->9092/tcp
kafka-docker_kafka_2       start-kafka.sh                   Up      0.0.0.0:32779->9092/tcp
kafka-docker_php7_1        docker-php-entrypoint php -a     Up
kafka-docker_zookeeper_1   /bin/sh -c /usr/sbin/sshd  ...   Up      0.0.0.0:2181->2181/tcp, 22/tcp, 2888/tcp, 3888/tcp
```

- 进入`kafka-docker_php7_1`容器：
```bash
docker exec -it kafka-docker_php7_1 bash
```

- 安装php-rdkafka
```bash
# 安装必要工具和php-rdkafka依赖
apt-get update
apt install librdkafka-dev git vim procps -y

# 安装拓展
git clone https://github.com/arnaud-lb/php-rdkafka.git
cd php-rdkafka
phpize
./configure
make all -j 5
make install

# 修改php配置文件
cp /usr/local/etc/php/php.ini-development /usr/local/etc/php/php.ini
echo 'extension=rdkafka.so' >> /usr/local/etc/php/php.ini

# 查看是否生效
php --ri rdkafka
```

## php实现生产者和消费者
你可以在本地/path/to/php/dir中用IDE编写php脚本，也可以直接在`kafka-docker_php7_1`容器用vim编写。

### 生产者
```php
<?php
$conf = new RdKafka\Conf();
$conf->setDrMsgCb(function ($kafka, $message) {
    if ($message->err) {
        echo "error: ".$message->payload . "\n";
    } else {
        echo "success: " . $message->payload . "\n";
    }
});

$rk = new RdKafka\Producer($conf);
$rk->setLogLevel(LOG_DEBUG);
$rk->addBrokers("kafka-docker_kafka_1:9092,kafka-docker_kafka_2:9092");
$topic = $rk->newTopic("test");

// var_dump($rk->getMetadata(true, null, 60e2));exit;

for ($i = 0; $i < 1000; $i++) {
    $payload = time(). "\tMessage $i";
    $topic->produce(RD_KAFKA_PARTITION_UA, 0, $payload);
    $rk->poll(0);
}

while ($len = $rk->getOutQLen() > 0) {
    echo "out queue len is {$len}, still sending...\n";
    $rk->poll(10);
}

?>
```

### 低级消费者
```php
<?php

$conf = new RdKafka\Conf();

// Set the group id. This is required when storing offsets on the broker
$conf->set('group.id', 'myConsumerGroup');

$rk = new RdKafka\Consumer($conf);
$rk->addBrokers("kafka-docker_kafka_1:9092,kafka-docker_kafka_2:9092");

$topicConf = new RdKafka\TopicConf();
$topicConf->set('auto.commit.interval.ms', 100);

// Set the offset store method to 'file'
$topicConf->set('offset.store.method', 'broker');
$topicConf->set('offset.store.path', sys_get_temp_dir());

// Alternatively, set the offset store method to 'broker'
// $topicConf->set('offset.store.method', 'broker');

// Set where to start consuming messages when there is no initial offset in
// offset store or the desired offset is out of range.
// 'smallest': start from the beginning
$topicConf->set('auto.offset.reset', 'smallest');

$topic = $rk->newTopic("test", $topicConf);

// Start consuming partition 0
$topic->consumeStart(0, RD_KAFKA_OFFSET_STORED);

while (true) {
    // public RdKafka\Message RdKafka\ConsumerTopic::consume ( integer $partition , integer $timeout_ms )
    // Consume a single message from a partition
    $message = $topic->consume(0, 120 * 1000);
    switch ($message->err) {
        case RD_KAFKA_RESP_ERR_NO_ERROR:
            var_dump($message);
            break;
        case RD_KAFKA_RESP_ERR__PARTITION_EOF:
            echo "No more messages; will wait for more\n";
            break;
        case RD_KAFKA_RESP_ERR__TIMED_OUT:
            echo "Timed out\n";
            break;
        default:
            throw new \Exception($message->errstr(), $message->err);
            break;
    }
}
```

### 高级消费者
```php
<?php

$conf = new RdKafka\Conf();

// Set a rebalance callback to log partition assignments (optional)
$conf->setRebalanceCb(function (RdKafka\KafkaConsumer $kafka, $err, array $partitions = null) {
    switch ($err) {
        case RD_KAFKA_RESP_ERR__ASSIGN_PARTITIONS:
            echo "Assign: ";
            var_dump($partitions);
            // Update the assignment set.
            // The assignment set is the set of partitions actually being consumed by the KafkaConsumer.
            $kafka->assign($partitions);
            break;

         case RD_KAFKA_RESP_ERR__REVOKE_PARTITIONS:
             echo "Revoke: ";
             var_dump($partitions);
             $kafka->assign(NULL);
             break;

         default:
            throw new \Exception($err);
    }
});

// Configure the group.id. All consumer with the same group.id will consume
// different partitions.
$conf->set('group.id', 'myConsumerGroup');

// Initial list of Kafka brokers
$conf->set('metadata.broker.list', 'kafka-docker_kafka_1:9092,kafka-docker_kafka_2:9092');

$topicConf = new RdKafka\TopicConf();

// Set where to start consuming messages when there is no initial offset in
// offset store or the desired offset is out of range.
// 'smallest': start from the beginning
$topicConf->set('auto.offset.reset', 'smallest');

// Set the configuration to use for subscribed/assigned topics
$conf->setDefaultTopicConf($topicConf);

$consumer = new RdKafka\KafkaConsumer($conf);

// Subscribe to topic 'test'
$consumer->subscribe(['test']);

echo "Waiting for partition assignment... (make take some time when\n";
echo "quickly re-joining the group after leaving it.)\n";

while (true) {
    $message = $consumer->consume(120*1000);
    switch ($message->err) {
        case RD_KAFKA_RESP_ERR_NO_ERROR:
            var_dump($message);
            break;
        case RD_KAFKA_RESP_ERR__PARTITION_EOF:
            echo "No more messages; will wait for more\n";
            break;
        case RD_KAFKA_RESP_ERR__TIMED_OUT:
            echo "Timed out\n";
            break;
        default:
            throw new \Exception($message->errstr(), $message->err);
            break;
    }
}

```

