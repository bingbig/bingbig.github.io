# Static

### Static使用情况

> 1. 在函数执行完后，变量值仍然保存在函数体中

```php
<?php

function test_static() {
	static $a = 1;
	echo $a++;
	echo "\n";
}
test_static();	// 1
test_static();	// 2
test_static();	// 3
test_static();	// 4

echo $a;//PHP Notice:  Undefined variable: a ...
?>
```



> 2. 修饰属性或方法，可以通过类名访问。如果是修饰的是类的属性，保留值

```php
<?php
class Person {
	static $id = 0;

	function __construct() {
		self::$id++;
	}

	static function getId() {
		return self::$id;
	}
}
echo Person::$id; // 0
echo "\n";

$p1 = new Person();
$p2 = new Person();
$p3 = new Person();

echo Person::$id; // 3
echo "\n";

?>
```



> 3. 修饰类的方法里面的变量

```php
## 静态变量放在函数中
<?php
class Person {
    static function tellAge() {
        static $age = 0;
        $age++;
        echo "The age is: $age
";
    }
}
echo Person::tellAge(); //output 'The age is: 1'
echo Person::tellAge(); //output 'The age is: 2'
echo Person::tellAge(); //output 'The age is: 3'
echo Person::tellAge(); //output 'The age is: 4'
?>
```

```php
## 修饰类属性
<?php
class Person {
	static $age = 0;
	static function tellAge() {
		self::$age++;
		echo "The age is: " . self::$age . "\n";
	}
}

echo Person::tellAge(); // 'The age is: 1'
echo Person::tellAge(); // 'The age is: 2'
echo Person::tellAge(); // 'The age is: 3'
echo Person::tellAge(); // 'The age is: 4'
?>
```



> 4. 修饰全局作用域的变量，没有实际意义

### Static & self

1. self在子类中还是会调用父类的方法，static会调用子类中的方便

```php
<?php
class Car {
	public static function model() {
		self::getModel();
	}

	protected static function getModel() {
		echo "This is a car model";
	}
}

Car::model(); // This is a car model

Class Taxi extends Car {
	protected static function getModel() {
		echo "This is a Taxi model";
	}
}

Taxi::model(); // This is a car model
?>
```

```php
<?php
class Car {
	public static function model() {
		static::getModel();
	}

	protected static function getModel() {
		echo "This is a car model";
	}
}

Car::model();	// This is a car model

Class Taxi extends Car {
	protected static function getModel() {
		echo "This is a Taxi model";
	}
}

Taxi::model();	// This is a Taxi model

?>
```



2. 在静态方法中调用静态属性，如果静态属性被定义的话直接返回，如果没有则新建一个实例。新建实例的方法是 `new static`， 通过`new static`实例化返回的就是调用时的类的实例，`new self`返回的是方法所在的类的实例，区别如下：

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