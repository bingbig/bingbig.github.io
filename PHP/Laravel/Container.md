# Laravel 源码阅读 －容器

在学习过`Larave`的基本使用之后，会用只是简单的第一步，了解其背后的机制更为重要。Laravel 的核心就是一个 `IoC 容器`，框架应用程序的实例就是一个超大的容器。这个容器是一个什么样的原理呢？下面就去读一读文档～

::: tip
源码版本: `const VERSION = '5.4.12';`
:::

Laravel的入口文件是`public/index.php`，第一步先注册auto loader， 这样我们就可以在composer的帮助下非常简单的调用这种类了，比如说：

```php
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
```

就可以加载`NotFoundHttpException`这个类了，而不需要`require`等加载文件的方式加载类，非常便于管理，而且IDE友好。



## 1. Laravel 容器实例化

入口文件的第二步就是实例化我们的容器：

```php
/*
|--------------------------------------------------------------------------
| Turn On The Lights
|--------------------------------------------------------------------------
|
| We need to illuminate PHP development, so let us turn on the lights.
| This bootstraps the framework and gets it ready for use, then it
| will load up this application so that we can run it and send
| the responses back to the browser and delight our users.
|
*/

$app = require_once __DIR__.'/../bootstrap/app.php';
```

注释写的非常好，”Turn On The Lights“。

`bootstrap/app.php`中实例化一个`Application`，然后在这个实例上绑定一些重要的接口（HTTP，Console和Exception），最后返回这个实例（`$app`）到入口文件。Application实例化如下：

```php
/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new Laravel application instance
| which serves as the "glue" for all the components of Laravel, and is
| the IoC container for the system binding all of the various parts.
|
 */

$app = new Illuminate\Foundation\Application(
	realpath(__DIR__ . '/../')
);
```

这个`Application`类继承自`Container`：

```php
class Application extends Container implements ApplicationContract, HttpKernelInterface
{
    /**
     * The Laravel framework version.
     *
     * @var string
     */
    const VERSION = '5.4.12';
```

本次的主角出场了，`Container`。laravel提供了很多服务，包括认证，数据库，缓存，消息队列等等，`$app`作为一个容器管理工具，负责几乎所有服务组件的实例化以及实例的生命周期管理。这种方式能够很好地对代码进行解耦，使得应用程序的业务代码不必操心服务组件的对象从何而来，当需要一个服务类来完成某个功能的时候，仅需要通过容器解析出该类型的一个实例即可。从最终的使用方式来看，laravel容器对服务实例的管理主要包括以下几个方面：

- 服务的绑定与解析
- 服务提供者的管理
- 别名的作用
- 依赖注入

> source: http://www.cnblogs.com/lyzg/p/6181055.html

作为实例的管理容器，那么容器应该有一个数组用来存储这些容器，下面就来找出这个实例数组。

### 1.1 定义一个静态属性

```php
<?php

namespace Illuminate\Container;
// ...

class Container implements ArrayAccess, ContainerContract
{
    /**
     * The current globally available container (if any).
     *
     * @var static
     */
    protected static $instance;
 
```

### 1.2 静态方法创建实例

```php
	/**
     * Set the globally available instance of the container.
     *
     * @return static
     */
    public static function getInstance()
    {
        if (is_null(static::$instance)) {
            static::$instance = new static;
        }

        return static::$instance;
    }
```

在静态方法中调用静态属性，如果静态属性被定义的话直接返回，如果没有则新建一个实例。新建实例的方法是 `new static`， 通过`new static`实例化返回的就是调用时的类的实例，`new self`返回的是方法所在的类的实例，区别如下：

```php
// self refers to the same class whose method the new operation takes place in.
// static in PHP 5.3's late static bindings refers to whatever class in the hierarchy which you call the method on.

class A {
	public static function get_self() {
		return new self;
	}

	public static function get_static() {
		return new static;
	}
}

class B extends A {}

echo get_class(B::get_self()); // A
echo get_class(B::get_static()); // B
echo get_class(A::get_static()); // A
```

`new self`后面的可以加`()`,也可以省略。



### 1.3 构造函数

到上一步单例模式远远没有完成，因为外部还是可以直接`new`出一个新的实例来，而不是通过`getInstance()`方法。Laravel是如何设置`Application`的构造函数的呢？

```php
 /**
     * Create a new Illuminate application instance.
     *
     * @param  string|null  $basePath
     * @return void
     */
    public function __construct($basePath = null)
    {
        if ($basePath) {
            $this->setBasePath($basePath);
        }

        $this->registerBaseBindings();

        $this->registerBaseServiceProviders();

        $this->registerCoreContainerAliases();
    }
```

查看`Application`的构造函数，竟然是`public`的方法？！不应该是`private`吗？好，接着往下看。

#### 1.3.1 ` setBasePath()`

```php
   /**
     * Set the base path for the application.
     *
     * @param  string  $basePath
     * @return $this
     */
    public function setBasePath($basePath)
    {
        $this->basePath = rtrim($basePath, '\/');

        $this->bindPathsInContainer();

        return $this;
    }
```



看看`bindPathsInContainer`做了些什么：

```php
/**
 * Bind all of the application paths in the container.
 *
 * @return void
 */
protected function bindPathsInContainer()
{
    $this->instance('path', $this->path());
    $this->instance('path.base', $this->basePath());
    $this->instance('path.lang', $this->langPath());
    $this->instance('path.config', $this->configPath());
    $this->instance('path.public', $this->publicPath());
    $this->instance('path.storage', $this->storagePath());
    $this->instance('path.database', $this->databasePath());
    $this->instance('path.resources', $this->resourcePath());
    $this->instance('path.bootstrap', $this->bootstrapPath());
}
```



`instance()`方法呢？`instance()`方法继承自`Illuminate\Container\Container`，在这里对instance进行注册，上面的每一个应用的的路径都绑定到容器里了。

```php
//  Illuminate\Container\Container
/**
* Register an existing instance as shared in the container.
*
* @param  string  $abstract
* @param  mixed   $instance
* @return void
*/
public function instance($abstract, $instance)
{
	$this->removeAbstractAlias($abstract);

	unset($this->aliases[$abstract]);

	// We'll check to determine if this type has been bound before, and if it has
	// we will fire the rebound callbacks registered with the container and it
	// can be updated with consuming classes that have gotten resolved here.
	$this->instances[$abstract] = $instance;

	if ($this->bound($abstract)) {
		$this->rebound($abstract);
	}
}
```



貌似找到了，这里的`instances`也是个私有变量，而且是个数组类型：

```php
/**
 * The container's shared instances.
 *
 * @var array
 */
protected $instances = [];
```

总结来说呢，`Container`不愧叫容器，里面存储着很多的单例示例，在`Container`中存在着大量的对instances中的instance的操作







## 参考

> laravel 学习笔记 —— 神奇的服务容器: https://www.insp.top/learn-laravel-container
>
> Laravel核心——Ioc服务容器: https://segmentfault.com/a/1190000009369477#articleHeader25