(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{444:function(s,a,n){"use strict";n.r(a);var t=n(0),e=Object(t.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("div",{staticClass:"content"},[n("h1",{attrs:{id:"查看linux系统设备的硬件信息"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#查看linux系统设备的硬件信息","aria-hidden":"true"}},[s._v("#")]),s._v(" 查看Linux系统设备的硬件信息")]),s._v(" "),n("h2",{attrs:{id:"cpu"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#cpu","aria-hidden":"true"}},[s._v("#")]),s._v(" CPU")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("dmidecode "),n("span",{attrs:{class:"token operator"}},[s._v("|")]),n("span",{attrs:{class:"token function"}},[s._v("grep")]),s._v(" -A16 "),n("span",{attrs:{class:"token string"}},[s._v('"Memory Device"')]),s._v("\t"),n("span",{attrs:{class:"token comment"}},[s._v("# 可以看到CPU的个数")]),s._v("\n"),n("span",{attrs:{class:"token function"}},[s._v("cat")]),s._v(" /proc/cpuinfo\t\t\t\t\t\t"),n("span",{attrs:{class:"token comment"}},[s._v("# 查看计算核心数")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("h2",{attrs:{id:"内存条"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#内存条","aria-hidden":"true"}},[s._v("#")]),s._v(" 内存条")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("dmidecode "),n("span",{attrs:{class:"token operator"}},[s._v("|")]),n("span",{attrs:{class:"token function"}},[s._v("grep")]),s._v(" -A16 "),n("span",{attrs:{class:"token string"}},[s._v('"Memory Device"')]),s._v("\t"),n("span",{attrs:{class:"token comment"}},[s._v("# 内存条硬件信息")]),s._v("\n"),n("span",{attrs:{class:"token function"}},[s._v("free")]),s._v(" -g\t\t\t\t\t\t\t\t\t"),n("span",{attrs:{class:"token comment"}},[s._v("# 内存使用情况")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("p",[s._v("输出：")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("Memory Device\n\tArray Handle: 0x1000\n\tError Information Handle: Not Provided\n\tTotal Width: 72 bits\n\tData Width: 64 bits\n\tSize: No Module Installed\n\tForm Factor: DIMM\n\tSet: 16\n\tLocator: DIMM D8\n\tBank Locator: Not Specified\n\tType: DDR3\n\tType Detail: Synchronous\n\tSpeed: Unknown\n\tManufacturer:             \n\tSerial Number:         \n\tAsset Tag:         \n\tPart Number:    \n"),n("span",{attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br")])]),n("h2",{attrs:{id:"主板"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#主板","aria-hidden":"true"}},[s._v("#")]),s._v(" 主板")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("dmidecode -t 2\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("输出:")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token comment"}},[s._v("# dmidecode 2.12")]),s._v("\nSMBIOS 2.6 present.\n\nHandle 0x0200, DMI "),n("span",{attrs:{class:"token function"}},[s._v("type")]),s._v(" 2, 9 bytes\nBase Board Information\n\tManufacturer: Dell Inc.\n\tProduct Name: 0753X6\n\tVersion: A06\n\tSerial Number: "),n("span",{attrs:{class:"token punctuation"}},[s._v("..")]),s._v("CN7475121H0080.\n\tAsset Tag: Not Specified\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br")])]),n("h2",{attrs:{id:"硬盘"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#硬盘","aria-hidden":"true"}},[s._v("#")]),s._v(" 硬盘")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{attrs:{class:"token function"}},[s._v("cat")]),s._v(" /proc/scsi/scsi\t\t"),n("span",{attrs:{class:"token comment"}},[s._v("# 查看硬件信息， df -h 查看使用状态")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("输出：")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("Attached devices:\nHost: scsi0 Channel: 02 Id: 00 Lun: 00\n  Vendor: DELL     Model: PERC H700        Rev: 2.10\n  Type:   Direct-Access                    ANSI  SCSI revision: 05\nHost: scsi1 Channel: 00 Id: 00 Lun: 00\n  Vendor: TSSTcorp Model: DVD-ROM SN-108BB Rev: D150\n  Type:   CD-ROM                           ANSI  SCSI revision: 05\nHost: scsi3 Channel: 00 Id: 00 Lun: 00\n  Vendor: WD       Model: My Passport 0748 Rev: 1019\n  Type:   Direct-Access                    ANSI  SCSI revision: 06\nHost: scsi3 Channel: 00 Id: 00 Lun: 01\n  Vendor: WD       Model: SES Device       Rev: 1019\n  Type:   Enclosure                        ANSI  SCSI revision: 06\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br")])])])}],!1,null,null,null);e.options.__file="sys_info.md";a.default=e.exports}}]);