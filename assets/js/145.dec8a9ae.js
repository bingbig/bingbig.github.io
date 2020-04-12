(window.webpackJsonp=window.webpackJsonp||[]).push([[145],{370:function(t,s,n){"use strict";n.r(s);var a=n(0),e=Object(a.a)({},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),t._v(" "),n("ul",[n("li",[n("router-link",{attrs:{to:"./preface.html"}},[t._v("目录")])],1),t._v(" "),n("li",[t._v("2.4 "),n("router-link",{attrs:{to:"./2.4.html"}},[t._v("变量的存储方式")])],1),t._v(" "),n("li",[t._v("2.6 "),n("router-link",{attrs:{to:"./2.6.html"}},[t._v("类型转换")])],1)])])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"_2-5-变量的检索"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-5-变量的检索","aria-hidden":"true"}},[this._v("#")]),this._v(" 2.5 变量的检索")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("用户在PHP语言里定义的变量，我们能否在内核中获取到呢？\n答案当然是肯定的，下面我们就看如何通过"),s("code",[this._v("zend_hash_find()")]),this._v("函数来找到当前某个作用域下用户已经定义好的变量。\n"),s("code",[this._v("zend_hash_find()")]),this._v("函数是内核提供的操作HashTable的API之一，如果你没有接触过，可以先记住怎么使用就可以了。")])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"language-c line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-c"}},[n("code",[n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    zval "),n("span",{attrs:{class:"token operator"}},[t._v("*")]),n("span",{attrs:{class:"token operator"}},[t._v("*")]),t._v("fooval"),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token function"}},[t._v("zend_hash_find")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    \t\t"),n("span",{attrs:{class:"token function"}},[t._v("EG")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("active_symbol_table"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token comment"}},[t._v("//这个参数是地址，如果我们操作全局作用域，则需要&EG(symbol_table)")]),t._v("\n    \t\t"),n("span",{attrs:{class:"token string"}},[t._v('"foo"')]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    \t\t"),n("span",{attrs:{class:"token keyword"}},[t._v("sizeof")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token string"}},[t._v('"foo"')]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    \t\t"),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token keyword"}},[t._v("void")]),n("span",{attrs:{class:"token operator"}},[t._v("*")]),n("span",{attrs:{class:"token operator"}},[t._v("*")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token operator"}},[t._v("&")]),t._v("fooval\n    \t"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("==")]),t._v(" SUCCESS\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{attrs:{class:"token function"}},[t._v("php_printf")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token string"}},[t._v('"成功发现$foo!"')]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{attrs:{class:"token keyword"}},[t._v("else")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),n("span",{attrs:{class:"token function"}},[t._v("php_printf")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token string"}},[t._v('"当前作用域下无法发现$foo."')]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\t\t\n\t\t\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br"),n("span",{staticClass:"line-number"},[t._v("7")]),n("br"),n("span",{staticClass:"line-number"},[t._v("8")]),n("br"),n("span",{staticClass:"line-number"},[t._v("9")]),n("br"),n("span",{staticClass:"line-number"},[t._v("10")]),n("br"),n("span",{staticClass:"line-number"},[t._v("11")]),n("br"),n("span",{staticClass:"line-number"},[t._v("12")]),n("br"),n("span",{staticClass:"line-number"},[t._v("13")]),n("br"),n("span",{staticClass:"line-number"},[t._v("14")]),n("br"),n("span",{staticClass:"line-number"},[t._v("15")]),n("br"),n("span",{staticClass:"line-number"},[t._v("16")]),n("br"),n("span",{staticClass:"line-number"},[t._v("17")]),n("br"),n("span",{staticClass:"line-number"},[t._v("18")]),n("br"),n("span",{staticClass:"line-number"},[t._v("19")]),n("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("首先我们定义了一个指向指针的指针，然后通过zend_hash_find去EG(active_symbol_table)作用域下寻找名称为foo($foo)的变量，\n如果成功找到，此函数将返回SUCCESS。看完代码，你肯定有很多疑问。\n为什么还要进行"),s("code",[this._v('sizeof("foo")')]),this._v("运算，fooval明明是"),s("code",[this._v("zval**")]),this._v("型的，为什么转成"),s("code",[this._v("void**")]),this._v("的？\n而且为什么还要进行&fooval运算，fooval本身不就已经是指向指针的指针了吗？😃，\n该回答的问题确实很多，不要过于担心，让我们带着这些问题继续往下走。")])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("p",[t._v("首先要说明的是，内核定义HashTable这个结构，并不是单单用来储存PHP语言里的变量的，\n其它很多地方都在应用HashTable "),n("strong",[t._v("(这就是个神器)")]),t._v("。\n一个HashTable有很多元素，在内核里叫做bucket。然而每个bucket的大小是固定的，\n所以如果我们想在bucket里存储任意数据时，最好的办法便是申请一块内存保存数据，\n然后在bucket里保存它的指针。以"),n("code",[t._v("zval *foo")]),t._v("为例，\n内核会先申请一块足够保存指针内存来保存foo，比如这块内存的地址是p，也就是p=&foo，\n并在bucket里保存p，这时我们便明白了，p其实就是"),n("code",[t._v("zval**")]),t._v("类型的。\n至于bucket为什么保存"),n("code",[t._v("zval**")]),t._v("类型的指针，而不是直接保存"),n("code",[t._v("zval*")]),t._v("类型的指针，我们到下一章在详细叙述。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("所以当我们去HashTable里寻找变量的时候，得到的值其实是一个zval的指针。\nIn order to populate that pointer into a calling function's local storage,\nthe calling function will naturally dereference the local pointer,\nresulting in a variable of indeterminate type with two levels of indirection (such as "),s("code",[this._v("void**")]),this._v(').\nKnowing that your "indeterminate type" in this case is '),s("code",[this._v("zval*")]),this._v(",\nyou can see where the type being passed into "),s("code",[this._v("zend_hash_find()")]),this._v(" will look different to the compiler,\nhaving three levels of indirection rather than two.\nThis is done on purpose here so a simple typecast is added to the function call to silence compiler warnings.")])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("p",[t._v("如果"),n("code",[t._v("zend_hash_find()")]),t._v("函数找到了我们需要的数据，它将返回"),n("code",[t._v("SUCCESS")]),t._v("常量，\n并把它的地址赋给我们在调用"),n("code",[t._v("zend_hash_find()")]),t._v("函数传递的"),n("code",[t._v("fooval")]),t._v("参数，\n也就是说此时"),n("code",[t._v("fooval")]),t._v("就指向了我们要找的数据。如果没有找到，那它不会对我们"),n("code",[t._v("fooval")]),t._v("参数做任何修改，并返回"),n("code",[t._v("FAILURE")]),t._v("常量。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("就去符号表里找变量而言，"),s("code",[this._v("SUCCESS")]),this._v("和"),s("code",[this._v("FAILURE")]),this._v("仅代表这个变量是否存在而已。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"links"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#links","aria-hidden":"true"}},[this._v("#")]),this._v(" links")])}],!1,null,null,null);e.options.__file="2.5.md";s.default=e.exports}}]);