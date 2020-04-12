(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{232:function(t,s,a){t.exports=a.p+"assets/img/1_92KoE7150PT1rfC-AGO36w.c9877ffd.gif"},233:function(t,s,a){t.exports=a.p+"assets/img/1_lY9jQy-ZHnKF1fMEe0W9qQ.7457e2ce.jpeg"},245:function(t,s,a){"use strict";a.r(s);var n=[function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"content"},[n("h1",{attrs:{id:"命名空间go实现-user"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#命名空间go实现-user","aria-hidden":"true"}},[t._v("#")]),t._v(" 命名空间Go实现 - User")]),t._v(" "),n("p",[t._v("在前面的文章中我们知道了如何用Go实现在不同命名空间运行的程序了。")]),t._v(" "),n("p",[t._v("我们在"),n("code",[t._v("container")]),t._v("中加了User命名空间，这样我们就不再需要以root身份执行了。这个特性意味着"),n("code",[t._v("container")]),t._v("可以变得更加安全。关于User命名空间我们可以比较一下加了User命名空间前后"),n("code",[t._v("whoami")]),t._v("的输出。")]),t._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token comment"}},[t._v("# Git repo: https://github.com/bingbig/container")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("# Git tag: 1.0")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("# 加入 User namespace 前")]),t._v("\n$ go build\n$ ./container run /bin/sh\n-"),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("container"),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("- "),n("span",{attrs:{class:"token comment"}},[t._v("# whoami")]),t._v("\nroot\n-"),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("container"),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("- "),n("span",{attrs:{class:"token comment"}},[t._v("# id root")]),t._v("\nuid"),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("0"),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("root"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" gid"),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("0"),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("root"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" groups"),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("0"),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("root"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{attrs:{class:"token comment"}},[t._v("# Git tag: 1.1")]),t._v("\n$ go build\n$ ./container run /bin/sh\n-"),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("container"),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("- "),n("span",{attrs:{class:"token comment"}},[t._v("# whoami")]),t._v("\nnobody\n-"),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("container"),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("- "),n("span",{attrs:{class:"token comment"}},[t._v("# id nobody")]),t._v("\nuid"),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("65534"),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("nobody"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" gid"),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("65534"),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("nogroup"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" groups"),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("65534"),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("nogroup"),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br"),n("span",{staticClass:"line-number"},[t._v("7")]),n("br"),n("span",{staticClass:"line-number"},[t._v("8")]),n("br"),n("span",{staticClass:"line-number"},[t._v("9")]),n("br"),n("span",{staticClass:"line-number"},[t._v("10")]),n("br"),n("span",{staticClass:"line-number"},[t._v("11")]),n("br"),n("span",{staticClass:"line-number"},[t._v("12")]),n("br"),n("span",{staticClass:"line-number"},[t._v("13")]),n("br"),n("span",{staticClass:"line-number"},[t._v("14")]),n("br"),n("span",{staticClass:"line-number"},[t._v("15")]),n("br"),n("span",{staticClass:"line-number"},[t._v("16")]),n("br")])]),n("p",[t._v("虽然我们现在可以以非root用户身份执行"),n("code",[t._v("container")]),t._v("， 但是一定进如新的命名空间shell，我们会丢失root身份。")]),t._v(" "),n("p",[n("img",{attrs:{src:a(232),alt:"who am i"}})]),t._v(" "),n("p",[t._v("本文我们将解决这个问题。我们先了解更多关于User命名空间的知识。")]),t._v(" "),n("h2",{attrs:{id:"uid和gid映射"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#uid和gid映射","aria-hidden":"true"}},[t._v("#")]),t._v(" UID和GID映射")]),t._v(" "),n("p",[t._v("我们失去身份的原因是我们缺失了一下非常重要的配置。简单的加上"),n("code",[t._v("CLONE_NEWUSER")]),t._v(" flag是不足以去使用User命名空间的。在合理的设置命名空间之前，我们先得了解UID和GID映射。")]),t._v(" "),n("p",[t._v("ID映射和它和User命名空间的关系是一个复杂的话题。但是为了解决我们当前的问题，这里你需要知道的是：")]),t._v(" "),n("ul",[n("li",[t._v("User命名空间提供了UID和GID的隔离")]),t._v(" "),n("li",[t._v("在同一个主机上，在任意时间都可能会有多个不同的User命名空间在使用中")]),t._v(" "),n("li",[t._v("每个linux进程都运行在其中一个User命名空间中")]),t._v(" "),n("li",[t._v("User命名空间允许User命名空间1中的进程UID和User命名空间2中的进程UID一样")]),t._v(" "),n("li",[t._v("UID/GID 映射提供了两个不同User命名空间ID映射的机制")])]),t._v(" "),n("p",[t._v("举个图来说明这些：")]),t._v(" "),n("p",[n("img",{attrs:{src:a(233),alt:"IDS mapping"}})]),t._v(" "),n("p",[t._v("图中有两个User命名空间，1和2， 还有一个相应的UID和GID表。我们可以看到，进程C是以非root身份运行的，它可以克隆出进程D，进程D是以root身份运行的。图中的虚线就是两个User命名空间的映射。")]),t._v(" "),n("p",[t._v("进程D只有在User命名空间2中才会有root权限。从User命名空间1看来，进程D是以非root身份运行的，并没有全部的root权限。")]),t._v(" "),n("p",[n("code",[t._v("container")]),t._v("当前就是缺失这个映射，我们来解决这个问题。")]),t._v(" "),n("h2",{attrs:{id:"let-s-go"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#let-s-go","aria-hidden":"true"}},[t._v("#")]),t._v(" Let's Go")]),t._v(" "),n("p",[t._v("通过设置"),n("code",[t._v("cmd.SysProcAttr")]),t._v("的"),n("code",[t._v("UidMappings")]),t._v("和"),n("code",[t._v("GidMappings")]),t._v("字段可以来应用ID映射。这两个字段都是"),n("code",[t._v("syscall.SysProcIDMap")]),t._v("类型。")]),t._v(" "),n("div",{staticClass:"language-go line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-go"}},[n("code",[n("span",{attrs:{class:"token keyword"}},[t._v("type")]),t._v(" SysProcIDMap "),n("span",{attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        ContainerID "),n("span",{attrs:{class:"token builtin"}},[t._v("int")]),t._v(" "),n("span",{attrs:{class:"token comment"}},[t._v("// Container ID.")]),t._v("\n        HostID      "),n("span",{attrs:{class:"token builtin"}},[t._v("int")]),t._v(" "),n("span",{attrs:{class:"token comment"}},[t._v("// Host ID.")]),t._v("\n        Size        "),n("span",{attrs:{class:"token builtin"}},[t._v("int")]),t._v(" "),n("span",{attrs:{class:"token comment"}},[t._v("// Size.")]),t._v("\n"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br")])]),n("p",[t._v("顾名思义，"),n("code",[t._v("ContainerID")]),t._v(" 和 "),n("code",[t._v("HostID")]),t._v(" 就是容器ID和主机ID。"),n("code",[t._v("Size")]),t._v(" 定义了IDs映射的范围大小，我们可以一次映射多个ID。在我们程序中加入一些映射：")]),t._v(" "),n("div",{staticClass:"language-go line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-go"}},[n("code",[t._v("# Git repo"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" https"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),n("span",{attrs:{class:"token operator"}},[t._v("/")]),n("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v("github"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("com"),n("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v("bingbig"),n("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v("container\n# Git tag"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token number"}},[t._v("2.0")]),t._v("\n# Filename"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" container"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token keyword"}},[t._v("go")]),t._v("\n# "),n("span",{attrs:{class:"token operator"}},[t._v("...")]),t._v("\ncmd"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("SysProcAttr "),n("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{attrs:{class:"token operator"}},[t._v("&")]),t._v("syscall"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("SysProcAttr"),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tCloneflags"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" syscall"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("CLONE_NEWNS "),n("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("\n\t\t\tsyscall"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("CLONE_NEWUTS "),n("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("\n\t\t\tsyscall"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("CLONE_NEWIPC "),n("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("\n\t\t\tsyscall"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("CLONE_NEWPID "),n("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("\n\t\t\tsyscall"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("CLONE_NEWNET "),n("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("\n\t\t\tsyscall"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("CLONE_NEWUSER"),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\tUidMappings"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("syscall"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("SysProcIDMap"),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t"),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t\tContainerID"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token number"}},[t._v("0")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t\tHostID"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("      os"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("Getuid")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t\tSize"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("        "),n("span",{attrs:{class:"token number"}},[t._v("1")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\tGidMappings"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("syscall"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("SysProcIDMap"),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t"),n("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t\tContainerID"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{attrs:{class:"token number"}},[t._v("0")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t\tHostID"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("      os"),n("span",{attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{attrs:{class:"token function"}},[t._v("Getgid")]),n("span",{attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t\tSize"),n("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("        "),n("span",{attrs:{class:"token number"}},[t._v("1")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\t"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),n("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n# "),n("span",{attrs:{class:"token operator"}},[t._v("...")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br"),n("span",{staticClass:"line-number"},[t._v("7")]),n("br"),n("span",{staticClass:"line-number"},[t._v("8")]),n("br"),n("span",{staticClass:"line-number"},[t._v("9")]),n("br"),n("span",{staticClass:"line-number"},[t._v("10")]),n("br"),n("span",{staticClass:"line-number"},[t._v("11")]),n("br"),n("span",{staticClass:"line-number"},[t._v("12")]),n("br"),n("span",{staticClass:"line-number"},[t._v("13")]),n("br"),n("span",{staticClass:"line-number"},[t._v("14")]),n("br"),n("span",{staticClass:"line-number"},[t._v("15")]),n("br"),n("span",{staticClass:"line-number"},[t._v("16")]),n("br"),n("span",{staticClass:"line-number"},[t._v("17")]),n("br"),n("span",{staticClass:"line-number"},[t._v("18")]),n("br"),n("span",{staticClass:"line-number"},[t._v("19")]),n("br"),n("span",{staticClass:"line-number"},[t._v("20")]),n("br"),n("span",{staticClass:"line-number"},[t._v("21")]),n("br"),n("span",{staticClass:"line-number"},[t._v("22")]),n("br"),n("span",{staticClass:"line-number"},[t._v("23")]),n("br"),n("span",{staticClass:"line-number"},[t._v("24")]),n("br"),n("span",{staticClass:"line-number"},[t._v("25")]),n("br"),n("span",{staticClass:"line-number"},[t._v("26")]),n("br"),n("span",{staticClass:"line-number"},[t._v("27")]),n("br")])]),n("p",[t._v("上面我们加入了单个UID和GID映射。我们将容器ID设置为0，主机ID设置为当前用户的UID/GID。这样，我们执行"),n("code",[t._v("container")]),t._v("命名后，在新的User命名空间运行的用户ID就是0了。")]),t._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("$ go build\n$ ./container run /bin/sh\n-[container]- # whoami\nroot\n-[container]- # id\nuid=0(root) gid=0(root) groups=0(root)\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br")])]),n("p",[t._v("通过简单的配置我们又可以在新的命名空间shell内核里拥有root身份了，同时也保留了以非root用户运行的能力。")]),t._v(" "),n("h2",{attrs:{id:"接下来"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#接下来","aria-hidden":"true"}},[t._v("#")]),t._v(" 接下来")]),t._v(" "),n("p",[t._v("接下来我们讨论"),n("code",[t._v("reexec")]),t._v("。什么是"),n("code",[t._v("reexec")]),t._v("，它和命名空间的Go实现有什么关系呢？")])])}],e=a(0),r=Object(e.a)({},function(){this.$createElement;this._self._c;return this._m(0)},n,!1,null,null,null);r.options.__file="namespaces_in_go_user.md";s.default=r.exports}}]);