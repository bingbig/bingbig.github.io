# Composer

## 1. 介绍

Composer是一个PHP以来管理工具。它允许你声明你的项目依赖的库，并且帮助你管理（安装/升级）它们。

## 2. 依赖管理

Composer==不是==你所认为的`Yum`或者`Apt`那样的包管理器。是的，它可以处理“包”或者库，但是它是基于单个项目的基础，将它们安装在你的项目中的一个目录下（比如：`vendor`）。默认它不会全局安装。所以，它是一个依赖管理器，尽管它支持全局安装。



这个想法并不新，Composer深受node的npm和ruby的bundler思想的启发。



## 3. Composer要点

### 3.1 `composer.json` v.s. `composer.lock`

如果你从来没有执行过`composer install`的话，是不会有 `composer.lock` 文件的存在的，`Composer` 解决composer.json文件中所列的依赖子后，下载它们的对应版到你的项目的 `vendor` 目录下。

当Composer完成了安装，它会将所有包的准确的版本记录到`composer.lock`文件中，将项目锁定到切确的版本。你应该将composer.lock文件commit到项目中。

`composer update`会根据composer.json来下载满足要求的最新版并且更新composer.lock。



### 3.2 Autoloading

Composer会生成`vendor/autoload.php`文件，你只需要简单的将这个文件`include`到你的项目中，你就可以使用这些库中的类了。

```php
require __DIR__ . '/vendor/autoload.php';

$log = new Monolog\Logger('name');
$log->pushHandler(new Monolog\Handler\StreamHandler('app.log', Monolog\Logger::WARNING));
$log->addWarning('Foo');
```

你甚至可以在`composer.json`中的 `autoload`字段里加上你自己的代码使之能被自动加载。

```json
{
    "autoload": {
        "psr-4": {"Acme\\": "src/"}
    }
}
```

Composer将会为`Acme`  注册一个`PSR-4`的自动加载器。上面定义了一个命名空间到目录的mapping。`src`目录将会是你的项目的根目录，和`vendor`是一个等级。src目录下的Foo.php包含一个Acme\Foo类。



### 3.3 JSON schema

`type`

默认是`library`。 包的类型指定了安装逻辑。Composer原生支持以下四种类型：

- library: 默认值，简单的复制文件到`vendor`
- project: 这意味着是一个项目而不是一个库。
- metapackage:一个空的包，里面包含了依赖，会引发它们的安装，但是不包含任何文件，也不会写入任何文件。
- composer-plugin：提供其他包的安装器



