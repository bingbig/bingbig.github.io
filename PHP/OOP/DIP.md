# 依赖倒置原则DIP

> 来源：[source](https://zhuanlan.zhihu.com/p/24175489)



## 一、原理介绍

### 1、官方定义

依赖倒置原则，英文缩写**DIP**，全称`Dependence Inversion Principle`。

原始定义：High level modules should not depend upon low level modules. Both should depend upon abstractions. Abstractions should not depend upon details. Details should depend upon abstractions。

官方翻译：高层模块不应该依赖低层模块，两者都应该依赖其抽象；抽象不应该依赖细节，细节应该依赖抽象。

### 2、自己理解

#### 2.1、原理解释

上面的定义不难理解，主要包含两次意思：

1）高层模块不应该直接依赖于底层模块的具体实现，而应该依赖于底层的抽象。换言之，模块间的依赖是通过抽象发生，实现类之间不发生直接的依赖关系，其依赖关系是通过接口或抽象类产生的。

2）接口和抽象类不应该依赖于实现类，而实现类依赖接口或抽象类。这一点其实不用多说，很好理解，“面向接口编程”思想正是这点的最好体现。

#### 2.2、被“倒置”的依赖

相比传统的软件设计架构，比如我们常说的经典的三层架构，UI层依赖于BLL层，BLL层依赖于DAL层。由于每一层都是依赖于下层的实现，这样当某一层的结构发生变化时，它的上层就不得不也要发生改变，比如我们DAL里面逻辑发生了变化，可能会导致BLL和UI层都随之发生变化，这种架构是非常荒谬的！好，这个时候如果我们换一种设计思路，**高层模块不直接依赖低层的实现，而是依赖于低层模块的抽象**，具体表现为我们增加一个IBLL层，里面定义业务逻辑的接口，UI层依赖于IBLL层，BLL层实现IBLL里面的接口，所以具体的业务逻辑则定义在BLL里面，这个时候如果我们BLL里面的逻辑发生变化，只要接口的行为不变，上层UI里面就不用发生任何变化。

**在经典的三层里面，高层模块直接依赖低层模块的实现，当我们将`高层模块依赖于底层模块的抽象`时，就好像依赖“倒置”了。这就是依赖倒置的由来。通过依赖倒置，可以使得架构更加稳定、更加灵活、更好应对需求变化。**

#### 2.3、依赖倒置的目的

上面说了，在三层架构里面增加一个接口层能实现依赖倒置，它的目的就是降低层与层之间的耦合，使得设计更加灵活。从这点上来说，依赖倒置原则也是“松耦合”设计的很好体现。

## 二、场景示例

文章最开始的时候说了，依赖倒置是设计模式的设计原则之一，那么在我们那么多的设计模式中，哪些设计模式遵循了依赖倒置的原则呢？这个就多了，比如我们常见的`工厂方法模式`。下面博主就结合一个使用场景来说说依赖倒置原则如何能够使得设计更加灵活。

代码示例：

抽象工厂：

```php
<?php
namespace DesignPatterns\Creational\AbstractFactory;
/**
 * In this case, the abstract factory is a contract for creating some components
 * for the web. There are two ways of rendering text: HTML and JSON
 */
abstract class AbstractFactory
{
    abstract public function createText(string $content): Text;
}
```

具体工厂

```php
<?php
namespace DesignPatterns\Creational\AbstractFactory;
class HtmlFactory extends AbstractFactory
{
    public function createText(string $content): Text
    {
        return new HtmlText($content);
    }
}
```



```php
<?php
namespace DesignPatterns\Creational\AbstractFactory;
class JsonFactory extends AbstractFactory
{
    public function createText(string $content): Text
    {
        return new JsonText($content);
    }
}
```

具体类(高层组件)

```php
<?php
namespace DesignPatterns\Creational\AbstractFactory;
class HtmlText extends Text
{
    // do something here
}
```

```php
<?php
namespace DesignPatterns\Creational\AbstractFactory;
class JsonText extends Text
{
    // do something here
}
```

具体细节（底层组件）

```php
<?php
namespace DesignPatterns\Creational\AbstractFactory;
abstract class Text
{
    /**
     * @var string
     */
    private $text;
    public function __construct(string $text)
    {
        $this->text = $text;
    }
}
```



## 三、实现依赖倒置

上面说了那么多，都是在讲依赖倒置的好处，那么在我们的项目中究竟如何具体实现和使用呢？

在介绍依赖倒置具体如何使用之前，我们需要引入IOC容器相关的概念，我们先来看看它们之间的关系。

**依赖倒置原则（DIP）：** 一种软件架构设计的原则（抽象概念）。

**控制反转（IoC, Inversion of Control）：** 一种反转流、依赖和接口的方式（DIP的具体实现方式）。这是一个有点不太好理解和解释的概念，通俗地说，就是应用程序本身不负责依赖对象的创建和维护，而是将它交给一个外部容器（比如Unity）来负责，这样控制权就由应用程序转移到了外部IoC 容器，即控制权实现了所谓的反转。例如在类型A中需要使用类型B的实例，而B 实例的创建并不由A 来负责，而是通过外部容器来创建。

**依赖注入（DI, Dependency Injection）：** IoC的一种实现方式，用来反转依赖（IoC的具体实现方式）。也有很多博文里面说IOC也叫DI，其实根据博主的理解，DI应该是IOC的具体实现方式，比如我们如何实现控制反转，答案就是通过依赖注入去实现。

**IoC容器：** 依赖注入的**框架** ，用来映射依赖，管理对象创建和生存周期（DI框架），自动创建、维护依赖对象。

关于`Ioc`容器，各个语言都有自己的成熟的解决方案，比如Java里面最伟大的框架之一`Spring`，`.net`里面轻量级的`Autofac`等。由于博主对`C#`语言相对来说比较熟悉，这里就结合C#里面的一款ioc容器来举例说明。.net里面常用的ioc容器：

- **http://Spring.NET**： [http://www.springframework.net/**](http://link.zhihu.com/?target=http%3A//www.springframework.net/)
- **Unity**： [http://unity.codeplex.com/**](http://link.zhihu.com/?target=http%3A//unity.codeplex.com/)
- **Autofac**: [http://code.google.com/p/autofac/**](http://link.zhihu.com/?target=http%3A//code.google.com/p/autofac/)
- **Ninject**: [http://www.ninject.org/**](http://link.zhihu.com/?target=http%3A//www.ninject.org/)