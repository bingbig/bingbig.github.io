(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{458:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),t._v(" "),a("p",[t._v("在PHP初期，是作为单进程的CGI来运行的，所以并没有考虑线程安全问题。\n我们可以随意的在全局作用域中设置变量并在程序中对他进行修改、访问，内核申请的资源如果没有正确的释放，\n也会在CGI进程结束后自动地被清理干净。")]),t._v(" "),a("p",[t._v("后来，php被作为apache多进程模式下的一个模块运行，但是这仍然把php局限在一个进程里，\n我们设置的全局变量，只要在每个请求之前将其正确的初始化，并在每个请求之后正确的清理干净，\n便不会带来什么麻烦。由于对于一个进程来说，同一个时间只能处理一个请求，\n所以这是内核中加入了针对每个请求的内存管理功能，来防止服务器资源利用出现错误。")]),t._v(" "),a("p",[t._v("随着使用在多线程模式的软件系统越来越多，php内核中亟需一种新的资源管理方式，\n并最终在php内核中形成了一个新的抽象层：TSRM(Thread Safe Resource Management)。")]),t._v(" "),t._m(1),t._v(" "),a("p",[t._v("在一个没有线程的程序中，我们往往倾向于把全局变量声明在源文件的顶部，\n编译器会自动的为它分配资源供我们在声明语句之下的程序逻辑中使用。")]),t._v(" "),t._m(2),t._v(" "),a("p",[t._v("但是在一个多线程的程序中，如果我们需要每个线程都拥有自己独立的资源的话，\n便需要为每个线程独立开辟出一个区域来存放它们各自的资源，\n在使用资源的时候，每个线程便会只在自己的那一亩三分地里找，而不会拔了别人的庄稼。")]),t._v(" "),t._m(3),t._v(" "),a("p",[t._v("在扩展的Module Init里，扩展可以调用ts_allocate_id()来告诉TRSM自己需要多少资源。\nTRSM接收后更新系统使用的资源，并得到一个指向刚分配的那份资源的id。")]),t._v(" "),t._m(4),a("p",[t._v("当一个请求需要访问数据段的时候，扩展从TSRM层请求当前线程的资源池，\n以ts_allocate_id()返回的资源ID来获取偏移量。\n换句话说，在代码流中，你可能会在前面所说的MINIT语句中碰到SAMPLE_G(sampleint) = 5;\n这样的语句。在线程安全的构建下，这个语句通过一些宏扩展如下：")]),t._v(" "),t._m(5),a("p",[t._v("如果你看不懂上面的转换也不用沮丧，它已经很好的封装在PHP API中了，以至于许多开发者都不需要知道它怎样工作的。")]),t._v(" "),t._m(6),t._v(" "),a("p",[t._v("因为在PHP的线程安全构建中访问全局资源涉及到在线程数据池查找对应的偏移量，这是一些额外的负载，结果就是它比对应的非线程方式（直接从编译期已经计算好的真实的全局变量地址中取出数据）慢一些。\n考虑上面的例子，这一次在非线程构建下：")]),t._v(" "),t._m(7),t._m(8),t._v(" "),a("p",[t._v("非线程构建还有进程隔离的优势，这样给定的请求碰到完全出乎意料的情况时，它也不会影响其他进程，即便是产生段错误也不会导致整个webserver瘫痪。实际上，Apache的MaxRequestsPerChild指令就是设计用来提升这个特性的，它经常性的有目的性的kill掉子进程并产生新的子进程，来避免某些可能由于进程长时间运行“累积”而来的问题（比如内存泄露）。")]),t._v(" "),t._m(9),t._v(" "),t._m(10),t._v(" "),a("p",[t._v("就像你前面看到的，只有在PHP以线程安全方式编译时，才会存在线程安全池，只有线程安全池存在时，才会真的在线程安全池中分配空间。这就是为什么前面的例子包裹在ZTS检查中的原因，非线程方式供非线程构建使用。")]),t._v(" "),t._m(11),t._v(" "),t._m(12),t._v(" "),t._m(13),t._v(" "),t._m(14),t._v(" "),t._m(15),t._v(" "),t._m(16),t._m(17),t._v(" "),t._m(18),t._m(19),t._v(" "),t._m(20),t._m(21),t._v(" "),t._m(22),t._v(" "),a("p",[t._v("有时，我们需要在一个函数中使用tsrm_ls指针，但却不能传递它。通常这是因为你的扩展作为某个使用回调的库的接口，它并没有提供返回抽象指针的地方。考虑下面的代码片段：")]),t._v(" "),t._m(23),a("p",[t._v("虽然你可能不完全理解这段代码，但你应该注意到了回调函数中使用了EXT_G()宏函数，我们知道在线程安全构建下它需要tsrm_ls指针。修改函数原型并不好也不应该这样做，因为外部的库并不知道php的线程安全模型。那这种情况下怎样让tsrm_ls可用呢？\n解决方案是前面提到的名为TSRMLS_FETCH()的Zend宏函数。将它放到代码片段的顶部，这个宏将执行给予当前线程上下文的查找，并定义本地的tsrm_ls指针拷贝。\n这个宏可以在任何地方使用并且不用通过函数调用传递tsrm_ls，尽管这看起来很诱人，但是，要注意到这一点：TSRMLS_FETCH调用需要一定的处理时间。这在单次迭代中并不明显，但是随着你的线程数增多，随着你调用TSRMLS_FETCH()的点的增多，你的扩展就会显现出这个瓶颈。因此，请谨慎的使用它。\n注意：为了和c++编译器兼容，请确保将TSRMLS_FETCH()和所有变量定义放在给定块作用域的顶部（任何其他语句之前）。因为TSRMLS_FETCH()宏自身有多种不同的解析方式，因此最好将它作为变量定义的最后一行。")]),t._v(" "),t._m(24),t._v(" "),a("ul",[a("li",[a("router-link",{attrs:{to:"./preface.html"}},[t._v("目录")])],1),t._v(" "),a("li",[t._v("上一节: "),a("router-link",{attrs:{to:"./1.3.html"}},[t._v("PHP的生命周期")])],1),t._v(" "),a("li",[t._v("下一节: "),a("router-link",{attrs:{to:"./1.5.html"}},[t._v("小结")])],1)])])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"_1-4-线程安全"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-线程安全","aria-hidden":"true"}},[this._v("#")]),this._v(" 1.4 线程安全")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"线程安全与非线程安全"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#线程安全与非线程安全","aria-hidden":"true"}},[this._v("#")]),this._v(" 线程安全与非线程安全")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("（即使通过fork()出一个子进程，它也会重新申请一段内存，父子进程中的变量从此没有了任何联系）")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"thread-safe-data-pools-线程安全的资源池？"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#thread-safe-data-pools-线程安全的资源池？","aria-hidden":"true"}},[this._v("#")]),this._v(" Thread-Safe Data Pools(线程安全的资源池？)")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("typedef")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{attrs:{class:"token keyword"}},[t._v("int")]),t._v(" sampleint"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{attrs:{class:"token keyword"}},[t._v("char")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("*")]),t._v("samplestring"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" php_sample_globals"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("int")]),t._v(" sample_globals_id"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{attrs:{class:"token function"}},[t._v("PHP_MINIT_FUNCTION")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sample"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token function"}},[t._v("ts_allocate_id")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token operator"}},[t._v("&")]),t._v("sample_globals_id"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{attrs:{class:"token keyword"}},[t._v("sizeof")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("php_sample_globals"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ts_allocate_ctor"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" php_sample_globals_ctor"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ts_allocate_dtor"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" php_sample_globals_dtor"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" SUCCESS"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("php_sample_globals"),a("span",{attrs:{class:"token operator"}},[t._v("*")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token operator"}},[t._v("*")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("*")]),a("span",{attrs:{class:"token operator"}},[t._v("*")]),a("span",{attrs:{class:"token operator"}},[t._v("*")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("tsrm_ls"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("sample_globals_id"),a("span",{attrs:{class:"token operator"}},[t._v("-")]),a("span",{attrs:{class:"token number"}},[t._v("1")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token operator"}},[t._v("->")]),t._v("sampleint "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("5")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"当不在线程环境时"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#当不在线程环境时","aria-hidden":"true"}},[this._v("#")]),this._v(" 当不在线程环境时")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("typedef")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("int")]),t._v(" sampleint"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("char")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("*")]),t._v("samplestring"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" php_sample_globals"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nphp_sample_globals sample_globals"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{attrs:{class:"token function"}},[t._v("PHP_MINIT_FUNCTION")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sample"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token function"}},[t._v("php_sample_globals_ctor")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token operator"}},[t._v("&")]),t._v("sample_globals TSRMLS_CC"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" SUCCESS"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("首先注意到的是这里并没有定义一个int型的标识去引用全局的结构定义，只是简单的在进程的全局空间定义了一个结构体。也就是说"),s("code",[this._v("SAMPLE_G(sampleint) = 5;")]),this._v("展开后就是"),s("code",[this._v("sample_globals.sampleint = 5;")]),this._v(" 简单，快速，高效。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"访问全局变量"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#访问全局变量","aria-hidden":"true"}},[this._v("#")]),this._v(" 访问全局变量")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("在创建一个扩展时，你并不知道它最终的运行环境是否是线程安全的。幸运的是，你要使用的标准包含文件集合中已经包含了条件定义的ZTS预处理标记。当PHP因为SAPI需要或通过      "),s("code",[this._v("enable-maintainer-zts")]),this._v("选项安装等原因以线程安全方式构建时，这个值会被自动的定义，并可以用一组"),s("code",[this._v("#ifdef ZTS")]),this._v("这样的指令集去测试它的值。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("在本章前面"),a("code",[t._v("PHP_MINIT_FUNCTION(myextension)")]),t._v("的例子中，你可以看到"),a("code",[t._v("#ifdef ZTS")]),t._v("被用作条件调用正确的全局初始代码。对于ZTS模式它使用"),a("code",[t._v("ts_allocate_id()")]),t._v("弹出"),a("code",[t._v("myextension_globals_id")]),t._v("变量，而非ZTS模式只是直接调用"),a("code",[t._v("myextension_globals")]),t._v("的初始化方法。这两个变量已经在你的扩展源文件中使用Zend宏："),a("code",[t._v("DECLARE_MODULE_GLOBALS(myextension)")]),t._v("声明，它将自动的处理对ZTS的测试并依赖构建的ZTS模式选择正确的方式声明。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("在访问这些全局变量的时候，你需要使用前面给出的自定义宏"),s("code",[this._v("SAMPLE_G()")]),this._v("。在第12章，你将学习到怎样设计这个宏以使它可以依赖ZTS模式自动展开。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"即便你不需要线程也要考虑线程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#即便你不需要线程也要考虑线程","aria-hidden":"true"}},[this._v("#")]),this._v(" 即便你不需要线程也要考虑线程")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("正常的PHP构建默认是关闭线程安全的，只有在被构建的sapi明确需要线程安全或线程安全在"),s("code",[this._v("./configure")]),this._v("阶段显式的打开时，才会以线程安全方式构建。\n给出了全局查找的速度问题和进程隔离的缺点后，你可能会疑惑为什么明明不需要还有人故意打开它呢？这是因为，多数情况下，扩展和SAPI的开发者认为你是线程安全开关的操作者，这样做可以很大程度上确保新代码可以在所有环境中正常运行。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("当线程安全启用时，一个名为"),s("code",[this._v("tsrm_ls")]),this._v("的特殊指针被增加到了很多的内部函数原型中。这个指针允许PHP区分不同线程的数据。回想一下本章前面ZTS模式下的"),s("code",[this._v("SAMPLE_G()")]),this._v("宏函数中就使用了它。没有它，正在执行的函数就不知道查找和设置哪个线程的符号表；不知道应该执行哪个脚本，引擎也完全无法跟踪它的内部寄存器。这个指针保留了线程处理的所有页面请求。\n这个可选的指针参数通过下面一组定义包含到原型中。当ZTS禁用时，这些定义都被展开为空；当ZTS开启时，它们展开如下：")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{attrs:{class:"token macro property"}},[t._v("#"),a("span",{attrs:{class:"token directive keyword"}},[t._v("define")]),t._v(" TSRMLS_D     void ***tsrm_ls")]),t._v("\n"),a("span",{attrs:{class:"token macro property"}},[t._v("#"),a("span",{attrs:{class:"token directive keyword"}},[t._v("define")]),t._v(" TSRMLS_DC     , void ***tsrm_ls")]),t._v("\n"),a("span",{attrs:{class:"token macro property"}},[t._v("#"),a("span",{attrs:{class:"token directive keyword"}},[t._v("define")]),t._v(" TSRMLS_C     tsrm_ls")]),t._v("\n"),a("span",{attrs:{class:"token macro property"}},[t._v("#"),a("span",{attrs:{class:"token directive keyword"}},[t._v("define")]),t._v(" TSRMLS_CC     , tsrm_ls")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("非ZTS构建对下面的代码看到的是两个参数："),a("code",[t._v("int")]),t._v(", "),a("code",[t._v("char *")]),t._v("。在ZTS构建下，原型则包含三个参数："),a("code",[t._v("int")]),t._v(", "),a("code",[t._v("char *")]),t._v(", "),a("code",[t._v("void ***")]),t._v("。当你的程序调用这个函数时，只有在ZTS启用时才需要传递第三个参数。下面代码的第二行展示了宏的展开：")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("php_myext_action")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token keyword"}},[t._v("int")]),t._v(" action_id"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("char")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("*")]),t._v("message TSRMLS_DC"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("php_myext_action")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token number"}},[t._v("42")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"The meaning of life"')]),t._v(" TSRMLS_CC"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("通过在函数调用中包含这个特殊的变量，"),a("code",[t._v("php_myext_action")]),t._v("就可以使用"),a("code",[t._v("tsrm_ls")]),t._v("的值和"),a("code",[t._v("MYEXT_G()")]),t._v("宏函数一起访问它的线程特有全局数据。在非ZTS构建上，"),a("code",[t._v("tsrm_ls")]),t._v("将不可用，但是这是ok的，因为此时"),a("code",[t._v("MYEXT_G()")]),t._v("宏函数以及其他类似的宏都不会使用它。\n现在考虑，你在一个新的扩展上工作，并且有下面的函数，它可以在你本地使用CLI SAPI的构建上正常工作，并且即便使用apache 1的apxs SAPI编译也可以正常工作：")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("php_myext_isset")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token keyword"}},[t._v("char")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("*")]),t._v("varname"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("int")]),t._v(" varname_len"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    zval "),a("span",{attrs:{class:"token operator"}},[t._v("*")]),a("span",{attrs:{class:"token operator"}},[t._v("*")]),t._v("dummy"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token function"}},[t._v("zend_hash_find")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token function"}},[t._v("EG")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("active_symbol_table"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        varname"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" varname_len "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("1")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token keyword"}},[t._v("void")]),a("span",{attrs:{class:"token operator"}},[t._v("*")]),a("span",{attrs:{class:"token operator"}},[t._v("*")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token operator"}},[t._v("&")]),t._v("dummy"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("==")]),t._v(" SUCCESS"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{attrs:{class:"token comment"}},[t._v("/* Variable exists */")]),t._v("\n        "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("1")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{attrs:{class:"token comment"}},[t._v("/* Undefined variable */")]),t._v("\n        "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("0")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("所有的一切看起来都工作正常，你打包这个扩展发送给他人构建并运行在生产服务器上。让你气馁的是，对方报告扩展编译失败。\n事实上它们使用了Apache 2.0的线程模式，因此它们的php构建启用了ZTS。当编译期碰到你使用的"),a("code",[t._v("EG()")]),t._v("宏函数时，它尝试在本地空间查找"),a("code",[t._v("tsrm_ls")]),t._v("没有找到，因为你并没有定义它并且没有在你的函数中传递。\n修复这个问题非常简单；只需要在"),a("code",[t._v("php_myext_isset()")]),t._v("的定义上增加"),a("code",[t._v("TSRMLS_DC")]),t._v("，并在每行调用它的地方增加"),a("code",[t._v("TSRMLS_CC")]),t._v("。不幸的是，现在对方已经有点不信任你的扩展质量了，这样就会推迟你的演示周期。这种问题越早解决越好。\n现在有了"),a("code",[t._v("enable-maintainer-zts")]),t._v("指令。通过在"),a("code",[t._v("./configure")]),t._v("时增加该指令来构建php，你的构建将自动的包含ZTS，哪怕你当前的SAPI（比如CLI）不需要它。打开这个开关，你可以避免这些常见的不应该出现的错误。\n注意：在PHP4中，enable-maintainer-zts标记等价的名字是enable-experimental-zts；请确认使用你的php版本对应的正确标记。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"寻回丢失的tsrm-ls"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#寻回丢失的tsrm-ls","aria-hidden":"true"}},[this._v("#")]),this._v(" 寻回丢失的tsrm_ls")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-c line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("php_myext_event_callback")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token keyword"}},[t._v("int")]),t._v(" eventtype"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("char")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("*")]),t._v("message"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    zval "),a("span",{attrs:{class:"token operator"}},[t._v("*")]),t._v("event"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\n    "),a("span",{attrs:{class:"token comment"}},[t._v("/* $event = array('event'=>$eventtype,\n                    'message'=>$message) */")]),t._v("\n    "),a("span",{attrs:{class:"token function"}},[t._v("MAKE_STD_ZVAL")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token function"}},[t._v("array_init")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token function"}},[t._v("add_assoc_long")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"type"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" eventtype"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token function"}},[t._v("add_assoc_string")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"message"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" message"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("1")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\n    "),a("span",{attrs:{class:"token comment"}},[t._v("/* $eventlog[] = $event; */")]),t._v("\n    "),a("span",{attrs:{class:"token function"}},[t._v("add_next_index_zval")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token function"}},[t._v("EXT_G")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("eventlog"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" event"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("PHP_FUNCTION")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("myext_startloop"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("/* The eventlib_loopme() function,\n     * exported by an external library,\n     * waits for an event to happen,\n     * then dispatches it to the\n     * callback handler specified.\n     */")]),t._v("\n    "),a("span",{attrs:{class:"token function"}},[t._v("eventlib_loopme")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("php_myext_event_callback"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br"),a("span",{staticClass:"line-number"},[t._v("24")]),a("br"),a("span",{staticClass:"line-number"},[t._v("25")]),a("br"),a("span",{staticClass:"line-number"},[t._v("26")]),a("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"links"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#links","aria-hidden":"true"}},[this._v("#")]),this._v(" links")])}],!1,null,null,null);e.options.__file="1.4.md";s.default=e.exports}}]);