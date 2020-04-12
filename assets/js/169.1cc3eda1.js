(window.webpackJsonp=window.webpackJsonp||[]).push([[169],{334:function(t,e,i){"use strict";i.r(e);var n=i(0),s=Object(n.a)({},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),i("div",{staticClass:"tip-common"},[t._v("If you're using a production release of PHP to do development against, you'll find that ./buildconf by itself doesn't actually work. In this case you'll need to issue: ./buildconf force to bypass some minor protection built into the ./configure command.")]),t._v("\n现在当我们再执行./configure --help的时候，便会发现walu扩展的信息已经出现了。现在我们只需要重新走一遍PHP的编译过程，便可以把我们的扩展以静态编译的方式加入到PHP主程序中了。哦，千万不要忘记使用--enable-walu参数开启我们的扩展。\n当然，对于我们学习如何开发PHP扩展来讲，静态编译可不是一个好主意，因为如果采用静态编译的方式，只要我们的扩展做了改动，便需要重新编译整个PHP才行，这个过程太痛苦了。还是用前一节的方式吧。但是这种方式有利于提高性能，所以如果我们是在部署生产环境，则可以考虑！\n"),t._m(5),t._v(" "),i("p",[t._v("Regenerating the configure.js script for Windows follows the same pattern as regenerating the ./configure script for *nix. Navigate to the root of the PHP source tree and reissue buildconf.bat as you did in Chapter 4.\nThe PHP build system will scan for config.w32 files, including the one you just made for ext/sample, and generate a new configure.js script with which to build a static php binary.")]),t._v(" "),t._m(6),t._v(" "),i("ul",[i("li",[t._v("5.2 "),i("router-link",{attrs:{to:"./5.2.html"}},[t._v("编译我们的扩展")])],1),t._v(" "),i("li",[t._v("5.4 "),i("router-link",{attrs:{to:"./5.4.html"}},[t._v("编写函数")])],1)])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"_5-3-静态编译"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-3-静态编译","aria-hidden":"true"}},[this._v("#")]),this._v(" 5.3 静态编译")])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("p",[t._v("我们检查一下PHP语言中"),i("code",[t._v("get_loaded_extensions()")]),t._v("函数的输出，会发现有一些扩展并没有php.ini文件中调用，而它们确实也已经加载到PHP里去了，可以让我们在PHP语言中使用，如"),i("code",[t._v("standard")]),t._v("、"),i("code",[t._v("Reflection")]),t._v("、"),i("code",[t._v("Core")]),t._v("等。它们便是静态编译的，它们没有被编译成so或者dll文件供PHP动态调用，而是直接和PHP主程序编译到一起。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"在-nix上执行静态编译"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#在-nix上执行静态编译","aria-hidden":"true"}},[this._v("#")]),this._v(" 在*nix上执行静态编译")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("现在，先让我们执行一下PHP源码根目录下的"),e("code",[this._v("./configure --help")]),this._v("命令。会发现输出信息并没有包含我们的扩展，这是因为这个configure脚本生成的时候，我们的扩展还没有编写呢。(这个configure是PHP官方分发的。)，所以首先我们需要使用buildconf命令生成新的configure脚本。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[this._v("$ ./buildconf --force\n")])]),this._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[this._v("1")]),e("br")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"building-statically-under-windows"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#building-statically-under-windows","aria-hidden":"true"}},[this._v("#")]),this._v(" Building Statically Under Windows")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"links"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#links","aria-hidden":"true"}},[this._v("#")]),this._v(" links")])}],!1,null,null,null);s.options.__file="5.3.md";e.default=s.exports}}]);