(window.webpackJsonp=window.webpackJsonp||[]).push([[168],{335:function(t,s,n){"use strict";n.r(s);var e=n(0),a=Object(e.a)({},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"content"},[t._m(0),t._v(" "),n("p",[t._v("我们已经在上一节准备好了需要编译的源文件，接下来需要的便是把它们编译成目标文件了。因为在*nix平台和win平台下的编译步骤有些差异，所以这个地方需要分成两块介绍，很不幸，win部分还没有整理，请随时关注本项目。")]),t._v(" "),t._m(1),t._v(" "),n("p",[t._v("第一步：我们需要根据config.m4文件生成一个configure脚本、Makefile等文件，这一步有phpize来帮我们做：")]),t._v(" "),t._m(2),n("p",[t._v("The extra 2 at the start of Zend Extension Api No isn't a typo; it corresponds to the Zend Engine 2 version and is meant to keep this API number greater than its ZE1 counterpart.")]),t._v(" "),n("p",[t._v("现在查看一下我们扩展所在的目录，会发现多了许多文件。phpize程序根据config.m4里的信息生成了许多编译php扩展必须的文件，比如生成makefiles等，这为我们省了很多的麻烦。 接下来我们运行./configure脚本，这里我们并不需要再注明enable-maintainer-zts、enable-debug等参数，phpize程序会自动的去已经编译完成的php核心里获取这几个参数的值。 接下来就像我们安装其它程序一样执行make; make test;即可，如果没有错误，那么在module文件夹下面便会生成我们的目标文件 —— walu.so。")]),t._v(" "),t._m(3),t._v(" "),n("p",[t._v("The config.m4 file you created earlier was actually specific to the *nix build. In order to make your extension compile under Windows, you'll need to create a separatebut similarconfiguration file for it.\nAdd config.w32 with the following contents to your ext/sample directory:")]),t._v(" "),t._m(4),n("p",[t._v("As you can see, this file bears a resemblance on a high level to config.m4. The option is declared, tested, and conditionally used to enable the build of your extension.\nNow you'll repeat a few of the steps you performed in Chapter 4, \"Setting Up a Build Environment,\" when you built the PHP core. Start by opening up a build window from the Start menu by selecting All Programs, Microsoft Platform SDK for Windows Server 2003 SP1, Open Build Environment Window, Windows 2000 Build Environment, Set Windows 2000 Build Environment (Debug), and running the C:\\Program Files\\Microsoft Visual Studio 8\\VC\\bin\\vcvars32.bat batch file.\nRemember, your installation might require you to select a different build target or run a slightly different batch file. Refer to the notes in the corresponding section of Chapter 4 to refresh your memory.\nAgain, you'll want to go to the root of your build directory and rebuild the configure script.")]),t._v(" "),t._m(5),n("p",[t._v("This time, you'll run the configure script with an abridged set of options. Because you'll be focusing on just your extension and not the whole of PHP, you can leave out options pertaining to other extensions; however, unlike the Unix build, you do need to include the enable-debug switch explicitly even though the core build already has it.\nThe only crucial switch you'll need hereapart from debug of courseis enable-sample=shared. The shared option is required here because configure.js doesn't know that you're planning to build sample as a loadable extension. Your configure line should therefore look something like this:")]),t._v(" "),t._m(6),n("p",[t._v("Recall that enable-maintainer-zts is not required here as all Win32 builds assume that ZTS must be enabled. Options relating to SAPIssuch as embedare also not required here as the SAPI layer is independent from the extension layer.")]),t._v(" "),n("p",[t._v("Lastly, you're ready to build the extension. Because this build is based from the coreunlike the Unix extension build, which was based from the extensionyou'll need to specify the target name in your build line.")]),t._v(" "),t._m(7),n("p",[t._v("Once compilation is complete, you should have a working php_sample.dll binary ready to be used in the next step. Remember, because this book focuses on *nix development, the extension will be referred to as sample.so rather than php_sample.dll in all following text.\nLoading an Extension Built as a Shared Module")]),t._v(" "),t._m(8),t._v(" "),n("p",[t._v("为了使PHP能够找到需要的扩展文件，我们需要把编译好的so文件或者dll文件复制到PHP的扩展目录下，它的地址我们可以通过phpinfo()输出的信息找到，也可以在php.ini文件里进行配置找到并配置，名称为：extension_dir的值。默认情况下，php.ini文件位于/usr/local/lib/php.ini或者C:\\windows\\php.ini(现在由于fastcgi模式居多，在win平台上php.ini越来越多的直接存在于php-cgi.exe程序所在目录下)。如果找不到，我们可以通过php -i 命令或者<?php phpinfo();来查看当前加载的php.ini文件位置。\n一旦我们设置了extension_dir，便可以在我们的web文件中引用我们的扩展了，我们可以通过dl命令来将我们的扩展加载到内存中来。")]),t._v(" "),t._m(9),n("p",[t._v("如果在输出中我们没有找到walu.so，那肯定是哪里出问题了。这时候我们需要根据程序的输出信息去查找错误。\n上面这样每次使用扩展都需要先dl一下真是太麻烦了，其实我们有更好的办法让php运行时自动加载我们的扩展。那就是在php.ini里这样配置：")]),t._v(" "),t._m(10),n("p",[t._v("这样只要我们把walu.so这个文件放置在extension_dir配置的目录下，php就会在每次启动的时候自动加载了。这样我们就可以像我们平时使用curl、Mysql扩展一样直接使用，而不用麻烦的调用dl函数了。\n备注： 以下的章节我们都默认使用上面的这种方式来加载我们的扩展，而不是调用dl函数。")]),t._v(" "),t._m(11),t._v(" "),n("ul",[n("li",[t._v("5.1 "),n("router-link",{attrs:{to:"./5.1.html"}},[t._v("一个扩展的基本结构")])],1),t._v(" "),n("li",[t._v("5.3 "),n("router-link",{attrs:{to:"./5.3.html"}},[t._v("静态编译")])],1)])])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"_5-2-编译我们的扩展"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-2-编译我们的扩展","aria-hidden":"true"}},[this._v("#")]),this._v(" 5.2 编译我们的扩展")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"在-nix下编译"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#在-nix下编译","aria-hidden":"true"}},[this._v("#")]),this._v(" 在*nix下编译")])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"language-c line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-c"}},[n("code",[t._v("$ phpize\nPHP Api Version"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token number"}},[t._v("20041225")]),t._v("\nZend Module Api No"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token number"}},[t._v("20050617")]),t._v("\nZend Extension Api No"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token number"}},[t._v("220050617")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"在windows平台下编译"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#在windows平台下编译","aria-hidden":"true"}},[this._v("#")]),this._v(" 在windows平台下编译")])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"language-c line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-c"}},[n("code",[n("span",{attrs:{class:"token function"}},[t._v("ARG_ENABLE")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token string"}},[t._v('"sample"')]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v('"enable sample extension"')]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v('"no"')]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("PHP_SAMPLE "),n("span",{attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v('"no"')]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{attrs:{class:"token function"}},[t._v("EXTENSION")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token string"}},[t._v('"sample"')]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{attrs:{class:"token string"}},[t._v('"sample.c"')]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br")])])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"language-c line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-c"}},[n("code",[t._v("C"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\\Program Files\\Microsoft Platform SDK"),n("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v(" cd \\PHPDEV\\php"),n("span",{attrs:{class:"token operator"}},[t._v("-")]),n("span",{attrs:{class:"token number"}},[t._v("5.1")]),n("span",{attrs:{class:"token number"}},[t._v(".0")]),t._v("\nC"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\\PHPDEV\\php"),n("span",{attrs:{class:"token operator"}},[t._v("-")]),n("span",{attrs:{class:"token number"}},[t._v("5.1")]),n("span",{attrs:{class:"token number"}},[t._v(".0")]),n("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v(" buildconf"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("bat\nRebuilding configure"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("js\nNow run "),n("span",{attrs:{class:"token string"}},[t._v("'cscript /nologo configure.js help'")]),t._v("\n\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br")])])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"language-c line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-c"}},[n("code",[t._v("C"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\\PHPDEV\\php"),n("span",{attrs:{class:"token operator"}},[t._v("-")]),n("span",{attrs:{class:"token number"}},[t._v("5.1")]),n("span",{attrs:{class:"token number"}},[t._v(".0")]),n("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v(" cscript "),n("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v("nologo configure"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("js \\\nenable"),n("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v("debug enable"),n("span",{attrs:{class:"token operator"}},[t._v("-")]),t._v("sample"),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("shared\n\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br")])])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"language-c line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-c"}},[n("code",[t._v("C"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\\PHPDEV\\php"),n("span",{attrs:{class:"token operator"}},[t._v("-")]),n("span",{attrs:{class:"token number"}},[t._v("5.1")]),n("span",{attrs:{class:"token number"}},[t._v(".0")]),n("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v(" nmake php_sample"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("dll\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"加载扩展"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#加载扩展","aria-hidden":"true"}},[this._v("#")]),this._v(" 加载扩展")])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"language-php line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-php"}},[n("code",[n("span",{attrs:{class:"token php language-php"}},[n("span",{attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v("\n    "),n("span",{attrs:{class:"token function"}},[t._v("dl")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token single-quoted-string string"}},[t._v("'sample.so'")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{attrs:{class:"token function"}},[t._v("var_dump")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token function"}},[t._v("get_loaded_extensions")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{attrs:{class:"token delimiter important"}},[t._v("?>")])]),t._v("\n\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br")])])},function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"language-c line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-c"}},[n("code",[t._v("extension_dir"),n("span",{attrs:{class:"token operator"}},[t._v("=")]),n("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v("usr"),n("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v("local"),n("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v("lib"),n("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v("php"),n("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v("modules"),n("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v("\nextension"),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("walu"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("so\n\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"links"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#links","aria-hidden":"true"}},[this._v("#")]),this._v(" links")])}],!1,null,null,null);a.options.__file="5.2.md";s.default=a.exports}}]);