(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{478:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),t._v(" "),a("blockquote",[a("p",[t._v("来源："),a("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/24175489",target:"_blank",rel:"noopener noreferrer"}},[t._v("source"),a("OutboundLink")],1)])]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),a("p",[t._v("原始定义：High level modules should not depend upon low level modules. Both should depend upon abstractions. Abstractions should not depend upon details. Details should depend upon abstractions。")]),t._v(" "),a("p",[t._v("官方翻译：高层模块不应该依赖低层模块，两者都应该依赖其抽象；抽象不应该依赖细节，细节应该依赖抽象。")]),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),a("p",[t._v("上面的定义不难理解，主要包含两次意思：")]),t._v(" "),a("p",[t._v("1）高层模块不应该直接依赖于底层模块的具体实现，而应该依赖于底层的抽象。换言之，模块间的依赖是通过抽象发生，实现类之间不发生直接的依赖关系，其依赖关系是通过接口或抽象类产生的。")]),t._v(" "),a("p",[t._v("2）接口和抽象类不应该依赖于实现类，而实现类依赖接口或抽象类。这一点其实不用多说，很好理解，“面向接口编程”思想正是这点的最好体现。")]),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),t._v(" "),t._m(9),t._v(" "),a("p",[t._v("上面说了，在三层架构里面增加一个接口层能实现依赖倒置，它的目的就是降低层与层之间的耦合，使得设计更加灵活。从这点上来说，依赖倒置原则也是“松耦合”设计的很好体现。")]),t._v(" "),t._m(10),t._v(" "),t._m(11),t._v(" "),a("p",[t._v("代码示例：")]),t._v(" "),a("p",[t._v("抽象工厂：")]),t._v(" "),t._m(12),a("p",[t._v("具体工厂")]),t._v(" "),t._m(13),t._m(14),a("p",[t._v("具体类(高层组件)")]),t._v(" "),t._m(15),t._m(16),a("p",[t._v("具体细节（底层组件）")]),t._v(" "),t._m(17),t._m(18),t._v(" "),a("p",[t._v("上面说了那么多，都是在讲依赖倒置的好处，那么在我们的项目中究竟如何具体实现和使用呢？")]),t._v(" "),a("p",[t._v("在介绍依赖倒置具体如何使用之前，我们需要引入IOC容器相关的概念，我们先来看看它们之间的关系。")]),t._v(" "),t._m(19),t._v(" "),t._m(20),t._v(" "),t._m(21),t._v(" "),t._m(22),t._v(" "),t._m(23),t._v(" "),a("ul",[a("li",[a("strong",[t._v("http://Spring.NET")]),t._v("： "),a("a",{attrs:{href:"http://link.zhihu.com/?target=http%3A//www.springframework.net/",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://www.springframework.net/**"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("strong",[t._v("Unity")]),t._v("： "),a("a",{attrs:{href:"http://link.zhihu.com/?target=http%3A//unity.codeplex.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://unity.codeplex.com/**"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("strong",[t._v("Autofac")]),t._v(": "),a("a",{attrs:{href:"http://link.zhihu.com/?target=http%3A//code.google.com/p/autofac/",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://code.google.com/p/autofac/**"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("strong",[t._v("Ninject")]),t._v(": "),a("a",{attrs:{href:"http://link.zhihu.com/?target=http%3A//www.ninject.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://www.ninject.org/**"),a("OutboundLink")],1)])])])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"依赖倒置原则dip"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#依赖倒置原则dip","aria-hidden":"true"}},[this._v("#")]),this._v(" 依赖倒置原则DIP")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"一、原理介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、原理介绍","aria-hidden":"true"}},[this._v("#")]),this._v(" 一、原理介绍")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_1、官方定义"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1、官方定义","aria-hidden":"true"}},[this._v("#")]),this._v(" 1、官方定义")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("依赖倒置原则，英文缩写"),s("strong",[this._v("DIP")]),this._v("，全称"),s("code",[this._v("Dependence Inversion Principle")]),this._v("。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_2、自己理解"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2、自己理解","aria-hidden":"true"}},[this._v("#")]),this._v(" 2、自己理解")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h4",{attrs:{id:"_2-1、原理解释"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-1、原理解释","aria-hidden":"true"}},[this._v("#")]),this._v(" 2.1、原理解释")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h4",{attrs:{id:"_2-2、被“倒置”的依赖"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-2、被“倒置”的依赖","aria-hidden":"true"}},[this._v("#")]),this._v(" 2.2、被“倒置”的依赖")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("相比传统的软件设计架构，比如我们常说的经典的三层架构，UI层依赖于BLL层，BLL层依赖于DAL层。由于每一层都是依赖于下层的实现，这样当某一层的结构发生变化时，它的上层就不得不也要发生改变，比如我们DAL里面逻辑发生了变化，可能会导致BLL和UI层都随之发生变化，这种架构是非常荒谬的！好，这个时候如果我们换一种设计思路，"),s("strong",[this._v("高层模块不直接依赖低层的实现，而是依赖于低层模块的抽象")]),this._v("，具体表现为我们增加一个IBLL层，里面定义业务逻辑的接口，UI层依赖于IBLL层，BLL层实现IBLL里面的接口，所以具体的业务逻辑则定义在BLL里面，这个时候如果我们BLL里面的逻辑发生变化，只要接口的行为不变，上层UI里面就不用发生任何变化。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("在经典的三层里面，高层模块直接依赖低层模块的实现，当我们将"),s("code",[this._v("高层模块依赖于底层模块的抽象")]),this._v("时，就好像依赖“倒置”了。这就是依赖倒置的由来。通过依赖倒置，可以使得架构更加稳定、更加灵活、更好应对需求变化。")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h4",{attrs:{id:"_2-3、依赖倒置的目的"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-3、依赖倒置的目的","aria-hidden":"true"}},[this._v("#")]),this._v(" 2.3、依赖倒置的目的")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"二、场景示例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、场景示例","aria-hidden":"true"}},[this._v("#")]),this._v(" 二、场景示例")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("文章最开始的时候说了，依赖倒置是设计模式的设计原则之一，那么在我们那么多的设计模式中，哪些设计模式遵循了依赖倒置的原则呢？这个就多了，比如我们常见的"),s("code",[this._v("工厂方法模式")]),this._v("。下面博主就结合一个使用场景来说说依赖倒置原则如何能够使得设计更加灵活。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-php line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{attrs:{class:"token php language-php"}},[a("span",{attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("namespace")]),t._v(" "),a("span",{attrs:{class:"token package"}},[t._v("DesignPatterns"),a("span",{attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Creational"),a("span",{attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("AbstractFactory")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("/**\n * In this case, the abstract factory is a contract for creating some components\n * for the web. There are two ways of rendering text: HTML and JSON\n */")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("abstract")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("AbstractFactory")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("abstract")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("createText")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("string "),a("span",{attrs:{class:"token variable"}},[t._v("$content")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Text"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-php line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{attrs:{class:"token php language-php"}},[a("span",{attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("namespace")]),t._v(" "),a("span",{attrs:{class:"token package"}},[t._v("DesignPatterns"),a("span",{attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Creational"),a("span",{attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("AbstractFactory")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("HtmlFactory")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("AbstractFactory")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("createText")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("string "),a("span",{attrs:{class:"token variable"}},[t._v("$content")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Text\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("HtmlText")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token variable"}},[t._v("$content")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-php line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{attrs:{class:"token php language-php"}},[a("span",{attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("namespace")]),t._v(" "),a("span",{attrs:{class:"token package"}},[t._v("DesignPatterns"),a("span",{attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Creational"),a("span",{attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("AbstractFactory")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("JsonFactory")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("AbstractFactory")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("createText")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("string "),a("span",{attrs:{class:"token variable"}},[t._v("$content")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Text\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("JsonText")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token variable"}},[t._v("$content")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-php line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{attrs:{class:"token php language-php"}},[a("span",{attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("namespace")]),t._v(" "),a("span",{attrs:{class:"token package"}},[t._v("DesignPatterns"),a("span",{attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Creational"),a("span",{attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("AbstractFactory")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("HtmlText")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("Text")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("// do something here")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-php line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{attrs:{class:"token php language-php"}},[a("span",{attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("namespace")]),t._v(" "),a("span",{attrs:{class:"token package"}},[t._v("DesignPatterns"),a("span",{attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Creational"),a("span",{attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("AbstractFactory")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("JsonText")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("Text")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("// do something here")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-php line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-php"}},[a("code",[a("span",{attrs:{class:"token php language-php"}},[a("span",{attrs:{class:"token delimiter important"}},[t._v("<?php")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("namespace")]),t._v(" "),a("span",{attrs:{class:"token package"}},[t._v("DesignPatterns"),a("span",{attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("Creational"),a("span",{attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("AbstractFactory")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("abstract")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("Text")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token comment"}},[t._v("/**\n     * @var string\n     */")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),a("span",{attrs:{class:"token variable"}},[t._v("$text")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("__construct")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("string "),a("span",{attrs:{class:"token variable"}},[t._v("$text")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{attrs:{class:"token variable"}},[t._v("$this")]),a("span",{attrs:{class:"token operator"}},[t._v("-")]),a("span",{attrs:{class:"token operator"}},[t._v(">")]),a("span",{attrs:{class:"token property"}},[t._v("text")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token variable"}},[t._v("$text")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"三、实现依赖倒置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三、实现依赖倒置","aria-hidden":"true"}},[this._v("#")]),this._v(" 三、实现依赖倒置")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("依赖倒置原则（DIP）：")]),this._v(" 一种软件架构设计的原则（抽象概念）。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("控制反转（IoC, Inversion of Control）：")]),this._v(" 一种反转流、依赖和接口的方式（DIP的具体实现方式）。这是一个有点不太好理解和解释的概念，通俗地说，就是应用程序本身不负责依赖对象的创建和维护，而是将它交给一个外部容器（比如Unity）来负责，这样控制权就由应用程序转移到了外部IoC 容器，即控制权实现了所谓的反转。例如在类型A中需要使用类型B的实例，而B 实例的创建并不由A 来负责，而是通过外部容器来创建。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("依赖注入（DI, Dependency Injection）：")]),this._v(" IoC的一种实现方式，用来反转依赖（IoC的具体实现方式）。也有很多博文里面说IOC也叫DI，其实根据博主的理解，DI应该是IOC的具体实现方式，比如我们如何实现控制反转，答案就是通过依赖注入去实现。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("strong",[this._v("IoC容器：")]),this._v(" 依赖注入的"),s("strong",[this._v("框架")]),this._v(" ，用来映射依赖，管理对象创建和生存周期（DI框架），自动创建、维护依赖对象。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("关于"),a("code",[t._v("Ioc")]),t._v("容器，各个语言都有自己的成熟的解决方案，比如Java里面最伟大的框架之一"),a("code",[t._v("Spring")]),t._v("，"),a("code",[t._v(".net")]),t._v("里面轻量级的"),a("code",[t._v("Autofac")]),t._v("等。由于博主对"),a("code",[t._v("C#")]),t._v("语言相对来说比较熟悉，这里就结合C#里面的一款ioc容器来举例说明。.net里面常用的ioc容器：")])}],!1,null,null,null);e.options.__file="DIP.md";s.default=e.exports}}]);