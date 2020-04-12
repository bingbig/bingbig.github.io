(window.webpackJsonp=window.webpackJsonp||[]).push([[167],{337:function(s,t,n){"use strict";n.r(t);var a=n(0),e=Object(a.a)({},function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("div",{staticClass:"content"},[s._m(0),s._v(" "),s._m(1),s._v(" "),n("p",[s._v("才开始，我们先用最快的(不是最标准的)的方式来建立一个代码最少的扩展。在php源码文件夹的ext目录下创建一个新的文件夹，这里我取的名字叫做walu，它往往就是我们扩展的名字。其实这个文件夹可以放在任何一个位置，但是为了我们在后面介绍win32的编译与静态编译，我们还是把它放在php源码的ext目录下。\n现在，我们在这个目录下创建一个config.m4文件，并输入以下内容：")]),s._v(" "),s._m(2),s._m(3),s._v(" "),s._m(4),s._v(" "),s._m(5),s._v(" "),n("p",[s._v("最后重要的一点是，PHP_NEW_EXTENSION函数声明了这个扩展的名称、需要的源文件名、此扩展的编译形式。如果我们的扩展使用了多个文件，便可以将这多个文件名罗列在函数的参数里，如：")]),s._v(" "),s._m(6),n("p",[s._v("最后的$ext_shared参数用来声明这个扩展不是一个静态模块，而是在php运行时动态加载的。")]),s._v(" "),n("p",[s._v("下面，我们来编写实现扩展主逻辑的源文件walu.c:")]),s._v(" "),s._m(7),n("p",[s._v("这就是所有的代码了，不过鉴于我们平时的开发习惯，往往会把这一份代码分成两份，一个.h文件，一个.c文件。上面的代码只是生成了一基本的框架，而没有任何实际的用处。\n紧接着，创建一个zend_module_entry结构体，你肯定已经发现了，依据ZEND_MODULE_API_NO 是否大于等于 20010901，这个结构体需要不同的定义格式。20010901大约代表PHP4.2.0版本，所以我们现在的扩展几乎都要包含STANDARD_MODULE_HEADER这个元素了。")]),s._v(" "),n("p",[s._v("其余六个成员我们可以先赋值为NULL，其实看看它们各自后面的注释你就应该大体上了解它们各自是负责哪一方面的工作了。\n最后，最底下的代码用来标志我们的这个扩展是一个shared module。它是干么的呢？我也说不清楚，反正带上就对了，否则扩展会工作不正常。原文解释：This brief conditional simply adds a reference used by Zend when your extension is loaded dynamically. Don't worry about what it does or how it does it too much; just make sure that it's around or the next section won't work.")]),s._v(" "),s._m(8),s._v(" "),n("p",[s._v("根据我们平时的开发习惯，应该不会把所有代码都写在这一个文件里的，我们需要把上述代码放在两个文件里，一个头文件，一个c文件。")]),s._v(" "),s._m(9),n("p",[s._v("下面的是c文件")]),s._v(" "),s._m(10),s._m(11),s._v(" "),n("ul",[n("li",[s._v("5 "),n("router-link",{attrs:{to:"./5.html"}},[s._v("Your First Extension")])],1),s._v(" "),n("li",[s._v("5.2 "),n("router-link",{attrs:{to:"./5.2.html"}},[s._v("编译我们的扩展")])],1)])])},[function(){var s=this.$createElement,t=this._self._c||s;return t("h1",{attrs:{id:"_5-1-your-first-extension"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-1-your-first-extension","aria-hidden":"true"}},[this._v("#")]),this._v(" 5.1 Your First Extension")])},function(){var s=this.$createElement,t=this._self._c||s;return t("h3",{attrs:{id:"配置文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#配置文件","aria-hidden":"true"}},[this._v("#")]),this._v(" 配置文件")])},function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("div",{staticClass:"language-m4 line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('PHP_ARG_ENABLE(walu,\n    [Whether to enable the "walu" extension],\n    [  enable-walu        Enable "walu" extension support])\n\nif test $PHP_WALU != "no"; then\n    PHP_SUBST(WALU_SHARED_LIBADD)\n    PHP_NEW_EXTENSION(walu, walu.c, $ext_shared)\nfi\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[this._v("上面"),t("code",[this._v("PHP_ARG_ENABLE")]),this._v("函数有三个参数，第一个参数是我们的扩展名(注意不用加引号)，第二个参数是当我们运行"),t("code",[this._v("./configure")]),this._v("脚本时显示的内容，最后一个参数则是我们在调用"),t("code",[this._v("./configure --help")]),this._v("时显示的帮助信息。")])},function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("div",{staticClass:"tip custom-block"},[n("p",{staticClass:"custom-block-title"},[s._v("提示")]),s._v(" "),n("ul",[n("li",[s._v("也许有人会问，为什么有的扩展的开启方式是 "),n("code",[s._v("--enable-extname")]),s._v(" 的形式，有的则是 "),n("code",[s._v("--with-extname")]),s._v(" 的形式呢？其实两者并没有什么本质的不同，只不过enable多代表不依赖外部库便可以直接编译，而with大多需要依赖于第三方的lib。")]),s._v(" "),n("li",[s._v("现在，我们的扩展并不需要依赖其它的库文件，所以我们直接使用 "),n("code",[s._v("--enable-walu")]),s._v(" 便可以了。在第17章的时候我们将接触通过"),n("code",[s._v("CFLAGS")]),s._v("和"),n("code",[s._v("LDFLAGS")]),s._v("来配置自己的扩展，使其依赖第三方库文件才能被编译成php扩展。")])])])},function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("p",[s._v("如果我们显示运行"),n("code",[s._v("./configure --enable-walu")]),s._v("，那么终端环境便会自动将"),n("code",[s._v("$PHP_WALU")]),s._v("变量设置为"),n("code",[s._v("yes")]),s._v("，而"),n("code",[s._v("PHP_SUBST")]),s._v("函数只不过是php官方对autoconf里的AC_SUBST函数的一层封装。")])},function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("div",{staticClass:"language-c line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-c"}},[n("code",[n("span",{attrs:{class:"token function"}},[s._v("PHP_NEW_EXTENSION")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("sample"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" sample"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("c sample2"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("c sample3"),n("span",{attrs:{class:"token punctuation"}},[s._v(".")]),s._v("c"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" $ext_shared"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])])},function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("div",{staticClass:"language-c line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-c"}},[n("code",[n("span",{attrs:{class:"token comment"}},[s._v("//加载config.h，如果配置了的话")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("ifdef")]),s._v(" HAVE_CONFIG_H")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("include")]),s._v(" "),n("span",{attrs:{class:"token string"}},[s._v('"config.h"')])]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("endif")])]),s._v("\n\n"),n("span",{attrs:{class:"token comment"}},[s._v("//加载php头文件")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("include")]),s._v(" "),n("span",{attrs:{class:"token string"}},[s._v('"php.h"')])]),s._v("\n\n\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("define")]),s._v(" phpext_walu_ptr &walu_module_entry")]),s._v("\n\n"),n("span",{attrs:{class:"token comment"}},[s._v("//module entry")]),s._v("\nzend_module_entry walu_module_entry "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("if")]),s._v(" ZEND_MODULE_API_NO >= 20010901")]),s._v("\n     STANDARD_MODULE_HEADER"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("endif")])]),s._v("\n    "),n("span",{attrs:{class:"token string"}},[s._v('"walu"')]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("//这个地方是扩展名称，往往我们会在这个地方使用一个宏。")]),s._v("\n    "),n("span",{attrs:{class:"token constant"}},[s._v("NULL")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("/* Functions */")]),s._v("\n    "),n("span",{attrs:{class:"token constant"}},[s._v("NULL")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("/* MINIT */")]),s._v("\n    "),n("span",{attrs:{class:"token constant"}},[s._v("NULL")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("/* MSHUTDOWN */")]),s._v("\n    "),n("span",{attrs:{class:"token constant"}},[s._v("NULL")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("/* RINIT */")]),s._v("\n    "),n("span",{attrs:{class:"token constant"}},[s._v("NULL")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("/* RSHUTDOWN */")]),s._v("\n    "),n("span",{attrs:{class:"token constant"}},[s._v("NULL")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("/* MINFO */")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("if")]),s._v(" ZEND_MODULE_API_NO >= 20010901")]),s._v("\n    "),n("span",{attrs:{class:"token string"}},[s._v('"2.1"')]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("//这个地方是我们扩展的版本")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("endif")])]),s._v("\n    STANDARD_MODULE_PROPERTIES\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("ifdef")]),s._v(" COMPILE_DL_WALU")]),s._v("\n"),n("span",{attrs:{class:"token function"}},[s._v("ZEND_GET_MODULE")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("walu"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("endif")])]),s._v("\n\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br"),n("span",{staticClass:"line-number"},[s._v("33")]),n("br")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("h3",{attrs:{id:"标准一些"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#标准一些","aria-hidden":"true"}},[this._v("#")]),this._v(" 标准一些")])},function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("div",{staticClass:"language-c line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-c"}},[n("code",[n("span",{attrs:{class:"token comment"}},[s._v("//php_walu.h")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("ifndef")]),s._v(" WALU_H")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("define")]),s._v(" WALU_H")]),s._v("\n\n"),n("span",{attrs:{class:"token comment"}},[s._v("//加载config.h，如果配置了的话")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("ifdef")]),s._v(" HAVE_CONFIG_H")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("include")]),s._v(" "),n("span",{attrs:{class:"token string"}},[s._v('"config.h"')])]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("endif")])]),s._v("\n\n"),n("span",{attrs:{class:"token comment"}},[s._v("//加载php头文件")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("include")]),s._v(" "),n("span",{attrs:{class:"token string"}},[s._v('"php.h"')])]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("define")]),s._v(" phpext_walu_ptr &walu_module_entry")]),s._v("\n"),n("span",{attrs:{class:"token keyword"}},[s._v("extern")]),s._v(" zend_module_entry walu_module_entry"),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("endif")])]),s._v("\n\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br")])])},function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("div",{staticClass:"language-c line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-c"}},[n("code",[n("span",{attrs:{class:"token comment"}},[s._v("//walu.c")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("include")]),s._v(" "),n("span",{attrs:{class:"token string"}},[s._v('"php_walu.h"')])]),s._v("\n"),n("span",{attrs:{class:"token comment"}},[s._v("//module entry")]),s._v("\nzend_module_entry walu_module_entry "),n("span",{attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("if")]),s._v(" ZEND_MODULE_API_NO >= 20010901")]),s._v("\n     STANDARD_MODULE_HEADER"),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("endif")])]),s._v("\n    "),n("span",{attrs:{class:"token string"}},[s._v('"walu"')]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("//这个地方是扩展名称，往往我们会在这个地方使用一个宏。")]),s._v("\n    "),n("span",{attrs:{class:"token constant"}},[s._v("NULL")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("/* Functions */")]),s._v("\n    "),n("span",{attrs:{class:"token constant"}},[s._v("NULL")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("/* MINIT */")]),s._v("\n    "),n("span",{attrs:{class:"token constant"}},[s._v("NULL")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("/* MSHUTDOWN */")]),s._v("\n    "),n("span",{attrs:{class:"token constant"}},[s._v("NULL")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("/* RINIT */")]),s._v("\n    "),n("span",{attrs:{class:"token constant"}},[s._v("NULL")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("/* RSHUTDOWN */")]),s._v("\n    "),n("span",{attrs:{class:"token constant"}},[s._v("NULL")]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("/* MINFO */")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("if")]),s._v(" ZEND_MODULE_API_NO >= 20010901")]),s._v("\n    "),n("span",{attrs:{class:"token string"}},[s._v('"2.1"')]),n("span",{attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{attrs:{class:"token comment"}},[s._v("//这个地方是我们扩展的版本")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("endif")])]),s._v("\n    STANDARD_MODULE_PROPERTIES\n"),n("span",{attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("ifdef")]),s._v(" COMPILE_DL_WALU")]),s._v("\n"),n("span",{attrs:{class:"token function"}},[s._v("ZEND_GET_MODULE")]),n("span",{attrs:{class:"token punctuation"}},[s._v("(")]),s._v("walu"),n("span",{attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{attrs:{class:"token macro property"}},[s._v("#"),n("span",{attrs:{class:"token directive keyword"}},[s._v("endif")])]),s._v("\n\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("h2",{attrs:{id:"links"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#links","aria-hidden":"true"}},[this._v("#")]),this._v(" links")])}],!1,null,null,null);e.options.__file="5.1.md";t.default=e.exports}}]);