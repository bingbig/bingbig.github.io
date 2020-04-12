(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{441:function(t,e,s){"use strict";s.r(e);var a=s(0),n=Object(a.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"系统时间和硬件时间的问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#系统时间和硬件时间的问题","aria-hidden":"true"}},[t._v("#")]),t._v(" 系统时间和硬件时间的问题")]),t._v(" "),s("p",[t._v("源代码安装 python，结果出现警告,")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("warning: Clock skew detected. Your build may be incomplete.\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[t._v("原因是nfs文件系统的时间比系统晚，所以编译的时候会出现问题。")]),t._v(" "),s("hr"),t._v(" "),s("p",[t._v("[以下来自网络]")]),t._v(" "),s("h2",{attrs:{id:"_1-简介"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-简介","aria-hidden":"true"}},[t._v("#")]),t._v(" 1. 简介")]),t._v(" "),s("p",[t._v("Linux中有硬件时钟与系统时钟两种时钟。硬件时钟是指主机板上的时钟设备，也就是通常可在BIOS画面设定的时钟。这个时间有主板上电池供电维持，如果主板电池电量耗尽，如果断电的话，恢复到出厂设置。系统时钟则是指kernel中的时钟。所有Linux相关指令与函数都是读取系统时钟的设定。因为存在两种不同的时钟，那么它们之间就会存在差异。当Linux启动时，系统时钟会去读取硬件时钟的设定，之后系统时钟即独立运作。")]),t._v(" "),s("p",[t._v("对于系统时间，我们可以用 "),s("code",[t._v("date")]),t._v(" 命令查看：")]),t._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("unicom@ubuntu:~$ "),s("span",{attrs:{class:"token function"}},[t._v("date")]),t._v(" \nWed Apr 15 15:52:23 CST 2015\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br")])]),s("p",[t._v("硬件时间，用 "),s("code",[t._v("hwclock")]),t._v(" 命令查看")]),t._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("unicom@ubuntu:~$ "),s("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" hwclock –show //硬件时间需要root权限 \n"),s("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("sudo"),s("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" password "),s("span",{attrs:{class:"token keyword"}},[t._v("for")]),t._v(" unicom: \nWed Apr 15 16:13:42 2015 -0.844670 seconds　　\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("h2",{attrs:{id:"_2-时间设置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-时间设置","aria-hidden":"true"}},[t._v("#")]),t._v(" 2. 时间设置")]),t._v(" "),s("p",[t._v("用 "),s("code",[t._v("date")]),t._v(" 命令设置的时间并不会修改系统的硬件时间，系统重启后仍会加载硬件时间，这也是常导致 "),s("code",[t._v("date")]),t._v(" 设置时间失效的问题。")]),t._v(" "),s("p",[t._v("正确地做法是设置好系统时间后，再执行一下将时间同步到硬件时钟，当然直接设置硬件时钟也是可以的。")]),t._v(" "),s("p",[s("code",[t._v("date")]),t._v(" 设置系统时钟。")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('\tdate --set “04/15/15 16:19" #（月/日/年 时：分：秒） \n')])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[t._v("将系统时间同步到硬件时钟：")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("sudo hwclock --systohc #或者  sudo hwclock -w\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("p",[t._v('直接设置硬件时间方法： \n　# sudo hwclock --set --date="04/15/15 16:19" （月/日/年 时：分：秒） \n　 \n硬件时钟常用的命令参数')]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"left"}},[t._v("命令参数")]),t._v(" "),s("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("-r, –show")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("读取并打印硬件时钟（read hardware clock and print result）")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("-s, –hctosys")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("将硬件时钟同步到系统时钟（set the system time from the hardware clock）")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("-w, –systohc")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("将系统时钟同步到硬件时钟（set the hardware clock to the current system time）")])])])]),t._v(" "),s("p",[t._v("在各个节点上 "),s("code",[t._v("root")]),t._v(" 执行 "),s("code",[t._v("hwclock -w")])])])}],!1,null,null,null);n.options.__file="sys_and_hardware_clock.md";e.default=n.exports}}]);