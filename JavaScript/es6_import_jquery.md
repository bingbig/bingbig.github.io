# ES6 import jquery

es6可以非常方便的通过import来导入js，那么如果调用jquery呢？

```javascript
import jQuery from 'jquery';
import $ from 'jquery';
import * as $ from 'jquery';
import * as jQuery from 'jquery';
```



上面四种，有什么区别呢？

经过测试，简直是坑啊。

测试环境`Mac`，`Chrome Version 61.0.3163.79 (Official Build) (64-bit)`

```json
"devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-plugin-transform-class-properties": "^6.24.1",
    "babel-plugin-transform-decorators-legacy": "^1.3.4",
    "babel-plugin-transform-es2015-modules-umd": "^6.24.1",
    "babel-preset-es2015": "^6.24.1",
    "css-loader": "^0.28.7",
    "file-loader": "^0.11.2",
    "font-awesome": "^4.7.0",
    "font-awesome-webpack": "^0.0.5-beta.2",
    "less": "^2.7.2",
    "less-loader": "^4.0.5",
    "style-loader": "^0.18.2",
    "webpack": "^3.6.0",
    "webpack-dev-server": "^2.8.2"
  },
```



入口文件是`index.js`，在入口文件中import了'igv.js'。

两个文件都采用第3种方法导入jquery，结果，index中的`$()`是函数，而igv.js中的却不是，却是jquery内部函数变量构成的一个对象。igv.js只能采用第一种方法获取jquery包中的全部变量`jQuery`，但是还不够，有时候我们会用`$`来表示`jQuery`，那怎么办呢？`const $ = jQuery;`

所以，引用jquery最好用:

```javascript
import jQuery from 'jquery';
const $ = jQuery;
```



如何import jquery-ui呢？

```javascript
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/themes/base/draggable.css';
```



如何在webpack环境下import font-awesome 呢？

```javascript
import 'font-awesome-webpack';
```



`import`在导入文件时，会先执行文件，这个时候需要注意一些问题，比如说函数提升的问题，在过去定一个函数有时候会这么写：

```javascript
foo();
foo = function() {
  console.log(foo);
}
```

在浏览器环境下，是不会报错的，但是，在import的时候第1行会出现`foo`没有定义，可能是因为import的函数提升机制没有像浏览器那么强大，可能仅仅只检查变量和函数便于按需导入而已。按照下面的写法就没有问题了：

```javascript
foo();
function foo () {
  console.log(foo);
}
```

