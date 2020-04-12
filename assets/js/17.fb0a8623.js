(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{229:function(e,t,r){e.exports=r.p+"assets/img/WechatIMG25375.442edbd1.jpeg"},252:function(e,t,r){"use strict";r.r(t);var i=[function(){var e=this.$createElement,t=this._self._c||e;return t("h1",{attrs:{id:"docker-和-lxc"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker-和-lxc","aria-hidden":"true"}},[this._v("#")]),this._v(" Docker 和 LXC")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("LXC目前通常指"),t("code",[this._v("Linux Container")]),this._v("，即内核容器。Docker和 LXC简单的说， Docker在内核容器技术（cgroups和namespaces）的基础上，提供了一个更高层层次的控制工具，Docker包括以下特性：")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ol",[r("li",[e._v("跨主机部署")]),e._v(" "),r("li",[e._v("以应用为中心")]),e._v(" "),r("li",[e._v("自动构建")]),e._v(" "),r("li",[e._v("版本管理")]),e._v(" "),r("li",[e._v("组建重用")]),e._v(" "),r("li",[e._v("共享仓库")]),e._v(" "),r("li",[e._v("工具生态")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"lxc"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#lxc","aria-hidden":"true"}},[this._v("#")]),this._v(" LXC")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"docker"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker","aria-hidden":"true"}},[this._v("#")]),this._v(" Docker")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Docker容器的启动流程如下\n"),t("img",{attrs:{src:r(229),alt:"docker容器的启动过程"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("h3",{attrs:{id:"libcontainer"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#libcontainer","aria-hidden":"true"}},[this._v("#")]),this._v(" Libcontainer")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ol",[r("li",[e._v("运行容器")]),e._v(" "),r("li",[e._v("暂停/恢复容器（这一特性是通过cgroup中的freezer子系统来实现的）")]),e._v(" "),r("li",[e._v("销毁容器")]),e._v(" "),r("li",[e._v("向容器发送信号")]),e._v(" "),r("li",[e._v("获取容器的信息")]),e._v(" "),r("li",[e._v("修改容器的配置")]),e._v(" "),r("li",[e._v("Checkpoint/Restore容器")])])}],n=r(0),a=Object(n.a)({},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"content"},[e._m(0),e._v(" "),e._m(1),e._v(" "),e._m(2),e._v(" "),r("p",[e._v("虚拟机是用来进行硬件资源划分的解决方案，它利用了硬件的虚拟化技术，例如 VT-x， AMD-V或者privilege level（权限等级）会同时通过一个hypervisor来实现资源的彻底隔离；而容器的操作系统级别的虚拟化，利用的是内核的Cgroup和namespace特性。")]),e._v(" "),e._m(3),e._v(" "),e._m(4),e._v(" "),r("p",[e._v("Docker容器和主机共享内核，不同容器之间可以共享部分系统资源，因此容器更加轻量级，消耗的资源也更少。")]),e._v(" "),e._m(5),e._v(" "),e._m(6),e._v(" "),r("p",[e._v("项目地址： "),r("a",{attrs:{href:"https://github.com/opencontainers/runc/tree/master/libcontainer",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/opencontainers/runc/tree/master/libcontainer"),r("OutboundLink")],1)]),e._v(" "),r("p",[e._v("Libcontainer 是Docker中用于容器管理的包，它基于Go语言实现，通过管理namespaces、cgroups、capabilities以及文件系统来进行容器控制。你可以使用Libcontainer创建容器，并对容器进行生命周期管理。")]),e._v(" "),r("p",[e._v("Libcontainer功能：")]),e._v(" "),e._m(7)])},i,!1,null,null,null);a.options.__file="docker_lxc.md";t.default=a.exports}}]);