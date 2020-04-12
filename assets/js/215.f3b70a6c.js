(window.webpackJsonp=window.webpackJsonp||[]).push([[215],{271:function(t,s,a){"use strict";a.r(s);var n=a(0),o=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"容器进程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#容器进程","aria-hidden":"true"}},[t._v("#")]),t._v(" 容器进程")]),t._v(" "),a("p",[t._v("今天用 "),a("code",[t._v("ps")]),t._v(" 命令查看进程，发现一些本应该在docker容器而不应该在宿主上的进程，好奇，网上一查。")]),t._v(" "),a("h2",{attrs:{id:"容器的pid-namespace（名空间）"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#容器的pid-namespace（名空间）","aria-hidden":"true"}},[t._v("#")]),t._v(" 容器的PID namespace（名空间）")]),t._v(" "),a("blockquote",[a("p",[t._v("本节信息来源：http://www.cnblogs.com/ilinuxer/p/6188303.html")])]),t._v(" "),a("p",[t._v("在Docker中，进程管理的基础就是Linux内核中的PID名空间技术。在不同PID名空间中，进程ID是独立的；即在两个不同名空间下的进程可以有相同的PID。")]),t._v(" "),a("p",[t._v("Linux内核为所有的PID名空间维护了一个树状结构：最顶层的是系统初始化时创建的root namespace（根名空间），再创建的新PID namespace就称之为child namespace（子名空间），而原先的PID名空间就是新创建的PID名空间的parent namespace（父名空间）。通过这种方式，系统中的PID名空间会形成一个层级体系。"),a("em",[t._v("父节点可以看到子节点中的进程，并可以通过信号等方式对子节点中的进程产生影响。反过来，子节点不能看到父节点名空间中的任何内容，也不可能通过kill或ptrace影响父节点或其他名空间中的进程。")])]),t._v(" "),a("p",[t._v("**在Docker中，每个Container都是Docker Daemon的子进程，每个Container进程缺省都具有不同的PID名空间。**通过名空间技术，Docker实现容器间的进程隔离。另外Docker Daemon也会利用PID名空间的树状结构，实现了对容器中的进程交互、监控和回收。注：Docker还利用了其他名空间（UTS，IPC，USER）等实现了各种系统资源的隔离，由于这些内容和进程管理关联不多，本文不会涉及。")]),t._v(" "),a("p",[t._v("当创建一个Docker容器的时候，就会新建一个PID名空间。容器启动进程在该名空间内PID为1。当PID1进程结束之后，Docker会销毁对应的PID名空间，并向容器内所有其它的子进程发送SIGKILL。")]),t._v(" "),a("h2",{attrs:{id:"了解容器进程父子关系"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#了解容器进程父子关系","aria-hidden":"true"}},[t._v("#")]),t._v(" 了解容器进程父子关系")]),t._v(" "),a("h3",{attrs:{id:"方法1"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法1","aria-hidden":"true"}},[t._v("#")]),t._v(" 方法1")]),t._v(" "),a("p",[t._v("通过"),a("code",[t._v("ps")]),t._v("命令找到"),a("code",[t._v("dockerd")]),t._v("守护进程的"),a("code",[t._v("pid")]),t._v("：")]),t._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("$ "),a("span",{attrs:{class:"token function"}},[t._v("ps")]),t._v(" aux "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),a("span",{attrs:{class:"token function"}},[t._v("grep")]),t._v(" dockerd\ngd        7483  0.0  0.0  11720  1840 pts/10   S+   17:40   0:00 "),a("span",{attrs:{class:"token function"}},[t._v("grep")]),t._v(" --color"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("auto dockerd\nroot      9317  0.1  0.2 1680284 41848 ?       Ssl  Aug16  51:19 /usr/bin/dockerd --raw-logs\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("p",[t._v("然后通过"),a("code",[t._v("pstree")]),t._v(" 查看进程的父子关系：")]),t._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("$ pstree -p 9317\ndockerd"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("9317"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("-+-docker-containe"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("9343"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("-+-docker-containe"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1043"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("-+-sh"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1065"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("-+-cron"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1078"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("          "),a("span",{attrs:{class:"token variable"}},[a("span",{attrs:{class:"token variable"}},[t._v("`")]),t._v("-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1079"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("-+-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1096"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("-+-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("15535"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                "),a("span",{attrs:{class:"token variable"}},[t._v("`")])]),t._v("-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("18052"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1098"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("---"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("14210"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1100"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("-+-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("26180"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                "),a("span",{attrs:{class:"token variable"}},[a("span",{attrs:{class:"token variable"}},[t._v("`")]),t._v("-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("31642"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1101"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("---"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("19256"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1102"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("---"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("30791"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1103"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("---"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("30796"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1105"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("---"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("22143"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1106"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("---"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("22763"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1107"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("---"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("31237"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1108"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("---"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("21987"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1109"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("---"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("21982"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1112"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("---"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("21984"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1113"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("---"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("28246"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1114"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("-+-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("29599"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                "),a("span",{attrs:{class:"token variable"}},[t._v("`")])]),t._v("-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("22011"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1115"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("---"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("22116"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1116"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("---"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("29281"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("15646"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("---"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("20589"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1090"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                           "),a("span",{attrs:{class:"token variable"}},[a("span",{attrs:{class:"token variable"}},[t._v("`")]),t._v("-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1091"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("docker-containe"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1044"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("docker-containe"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1045"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("docker-containe"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1046"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("docker-containe"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1048"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("docker-containe"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1049"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("docker-containe"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1052"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("docker-containe"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1054"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("docker-containe"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1055"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token variable"}},[t._v("`")])]),t._v("-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("docker-containe"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1071"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("-docker-containe"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1846"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("-+-sh"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1864"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("-+-cron"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1877"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n              "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("                       "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("          `-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1878"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("-+-gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1888"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("-+-"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("gunicorn"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1897"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("## ...")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br"),a("span",{staticClass:"line-number"},[t._v("24")]),a("br"),a("span",{staticClass:"line-number"},[t._v("25")]),a("br"),a("span",{staticClass:"line-number"},[t._v("26")]),a("br"),a("span",{staticClass:"line-number"},[t._v("27")]),a("br"),a("span",{staticClass:"line-number"},[t._v("28")]),a("br"),a("span",{staticClass:"line-number"},[t._v("29")]),a("br"),a("span",{staticClass:"line-number"},[t._v("30")]),a("br"),a("span",{staticClass:"line-number"},[t._v("31")]),a("br"),a("span",{staticClass:"line-number"},[t._v("32")]),a("br"),a("span",{staticClass:"line-number"},[t._v("33")]),a("br"),a("span",{staticClass:"line-number"},[t._v("34")]),a("br"),a("span",{staticClass:"line-number"},[t._v("35")]),a("br"),a("span",{staticClass:"line-number"},[t._v("36")]),a("br"),a("span",{staticClass:"line-number"},[t._v("37")]),a("br")])]),a("h3",{attrs:{id:"方法2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法2","aria-hidden":"true"}},[t._v("#")]),t._v(" 方法2")]),t._v(" "),a("p",[a("code",[t._v("docker inspect")]),t._v("查看容器信息")]),t._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("$ docker inspect dockercontainer\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{attrs:{class:"token string"}},[t._v('"Id"')]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"3a7e160fac940e16089c3540c2317e2e18b564500ff7fb1e4669659559765a24"')]),t._v(",\n        "),a("span",{attrs:{class:"token string"}},[t._v('"Created"')]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"2017-09-07T06:34:36.729426519Z"')]),t._v(",\n        "),a("span",{attrs:{class:"token string"}},[t._v('"Path"')]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"/bin/sh"')]),t._v(",\n        "),a("span",{attrs:{class:"token string"}},[t._v('"Args"')]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n            "),a("span",{attrs:{class:"token string"}},[t._v('"-c"')]),t._v(",\n            "),a("span",{attrs:{class:"token string"}},[t._v('"gunicorn -c gun_conf.py service:app"')]),t._v("\n        "),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v(",\n        "),a("span",{attrs:{class:"token string"}},[t._v('"State"')]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{attrs:{class:"token string"}},[t._v('"Status"')]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"running"')]),t._v(",\n            "),a("span",{attrs:{class:"token string"}},[t._v('"Running"')]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" true,\n            "),a("span",{attrs:{class:"token string"}},[t._v('"Paused"')]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" false,\n            "),a("span",{attrs:{class:"token string"}},[t._v('"Restarting"')]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" false,\n            "),a("span",{attrs:{class:"token string"}},[t._v('"OOMKilled"')]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" false,\n            "),a("span",{attrs:{class:"token string"}},[t._v('"Dead"')]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" false,\n            "),a("span",{attrs:{class:"token string"}},[t._v('"Pid"')]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" 11334,\n            "),a("span",{attrs:{class:"token string"}},[t._v('"ExitCode"')]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" 0,\n            "),a("span",{attrs:{class:"token string"}},[t._v('"Error"')]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('""')]),t._v(",\n            "),a("span",{attrs:{class:"token string"}},[t._v('"StartedAt"')]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"2017-09-11T05:34:30.680050899Z"')]),t._v(",\n            "),a("span",{attrs:{class:"token string"}},[t._v('"FinishedAt"')]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"2017-09-11T05:34:30.090059921Z"')]),t._v("\n        "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(",\n        "),a("span",{attrs:{class:"token comment"}},[t._v("# ...")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br"),a("span",{staticClass:"line-number"},[t._v("24")]),a("br")])]),a("p",[t._v("然后“"),a("code",[t._v("State.Pid")]),t._v("”就可以知道 "),a("code",[t._v("Pid")]),t._v(" 了。之后同样可以查看此进程所在空间下其他进程的父子关系。")])])}],!1,null,null,null);o.options.__file="container_process.md";s.default=o.exports}}]);