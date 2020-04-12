(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{327:function(t,s,a){"use strict";a.r(s);var n=a(0),r=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"convert-ensemble-gtf-to-gff3-for-jbrowse"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#convert-ensemble-gtf-to-gff3-for-jbrowse","aria-hidden":"true"}},[t._v("#")]),t._v(" Convert ensemble gtf to gff3 for JBrowse")]),t._v(" "),a("div",{staticClass:"language-python line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("#!/usr/bin/python")]),t._v("\n"),a("span",{attrs:{class:"token triple-quoted-string string"}},[t._v('"""\nConvert ensemble gtf to gff3 for JBrowse\nCopyright (C)\n__Author__: liubing\n"""')]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" sys\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" re\n\n"),a("span",{attrs:{class:"token builtin"}},[t._v("chr")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("''")]),t._v("\nkeep_features "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token string"}},[t._v('"CDS"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"UTR"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"exon"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"gene"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"transcript"')]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{attrs:{class:"token builtin"}},[t._v("len")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sys"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("argv"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("2")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\t"),a("span",{attrs:{class:"token keyword"}},[t._v("print")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"Run:\\n\\tpython "')]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" sys"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("argv"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token number"}},[t._v("0")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('" input.gtf output.gff3"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\texit"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\ngtf_file "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" sys"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("argv"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token number"}},[t._v("1")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{attrs:{class:"token builtin"}},[t._v("len")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sys"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("argv"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("2")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\tgff_file "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" gtf_file"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("rstrip"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'gtf'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'gff3'")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("else")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\tgff_file "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" sys"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("argv"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token number"}},[t._v("2")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),a("span",{attrs:{class:"token comment"}},[t._v("### Parse gtf file")]),t._v("\ngtf "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token builtin"}},[t._v("open")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("gtf_file"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'r'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ngff "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token builtin"}},[t._v("open")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("gff_file"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'w'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\ngtf_lines "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" gtf"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("readlines"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("for")]),t._v(" line "),a("span",{attrs:{class:"token keyword"}},[t._v("in")]),t._v(" gtf_lines"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\t"),a("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" re"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("match"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("r"),a("span",{attrs:{class:"token string"}},[t._v("'^#'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" line"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\t\t"),a("span",{attrs:{class:"token keyword"}},[t._v("continue")]),t._v("\n\tfeatureline "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" line"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("strip"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("split"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'\\t'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("seq"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" source"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" feature"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" start"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" end"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" score"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" strand"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" frame"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" attributes"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" featureline\n\t"),a("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" feature "),a("span",{attrs:{class:"token operator"}},[t._v("not")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("in")]),t._v(" keep_features"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\t\t"),a("span",{attrs:{class:"token keyword"}},[t._v("continue")]),t._v("\n\n\tseq "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token builtin"}},[t._v("chr")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" seq\n\t"),a("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" feature "),a("span",{attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'transcript'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\t\tfeature "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'mRNA'")]),t._v("\n\n\tattributes_array "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" attributes"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("replace"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'\"'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{attrs:{class:"token string"}},[t._v("''")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("strip"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("';'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("split"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'; '")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\n\t"),a("span",{attrs:{class:"token keyword"}},[t._v("if")]),t._v(" feature "),a("span",{attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'gene'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\t\tID "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token builtin"}},[t._v("str")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("attributes_array"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token number"}},[t._v("0")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("split"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token number"}},[t._v("1")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\tcount "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("0")]),t._v("\n\t\tName "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" attributes_array"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token number"}},[t._v("1")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("split"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token number"}},[t._v("1")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\t\tgff"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("write"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t\t\t"),a("span",{attrs:{class:"token string"}},[t._v("'\\t'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("join"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("seq"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" source"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" feature"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" start"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" end"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" score"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" strand"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" frame"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'\\t'")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" \n\t\t\t"),a("span",{attrs:{class:"token string"}},[t._v("'ID='")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" ID "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("';Name='")]),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v("Name "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),a("span",{attrs:{class:"token string"}},[t._v("'\\n'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),a("span",{attrs:{class:"token keyword"}},[t._v("elif")]),t._v(" feature "),a("span",{attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'mRNA'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\t\tcount "),a("span",{attrs:{class:"token operator"}},[t._v("+=")]),t._v(" "),a("span",{attrs:{class:"token number"}},[t._v("1")]),t._v("\n\t\tParent "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" ID\n\t\tID "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token builtin"}},[t._v("str")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("attributes_array"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token number"}},[t._v("0")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("split"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{attrs:{class:"token number"}},[t._v("1")]),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\tID "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" ID "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'.'")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token builtin"}},[t._v("str")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("count"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\tName "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" Name "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'.'")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token builtin"}},[t._v("str")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("count"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\tgff"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("write"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t\t\t"),a("span",{attrs:{class:"token string"}},[t._v("'\\t'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("join"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("seq"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" source"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" feature"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" start"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" end"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" score"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" strand"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" frame"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'\\t'")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" \n\t\t\t"),a("span",{attrs:{class:"token string"}},[t._v("'ID='")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" ID "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("';Parent='")]),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" Parent "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),a("span",{attrs:{class:"token string"}},[t._v("';Name='")]),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v("Name "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),a("span",{attrs:{class:"token string"}},[t._v("'\\n'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),a("span",{attrs:{class:"token keyword"}},[t._v("else")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\t\tgff"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("write"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t\t\t"),a("span",{attrs:{class:"token string"}},[t._v("'\\t'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("join"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("seq"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" source"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" feature"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" start"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" end"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" score"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" strand"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" frame"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'\\t'")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" \n\t\t\t"),a("span",{attrs:{class:"token string"}},[t._v("'Parent='")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" ID "),a("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'\\n'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\ngff"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("close"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ngtf"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("close"),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br"),a("span",{staticClass:"line-number"},[t._v("24")]),a("br"),a("span",{staticClass:"line-number"},[t._v("25")]),a("br"),a("span",{staticClass:"line-number"},[t._v("26")]),a("br"),a("span",{staticClass:"line-number"},[t._v("27")]),a("br"),a("span",{staticClass:"line-number"},[t._v("28")]),a("br"),a("span",{staticClass:"line-number"},[t._v("29")]),a("br"),a("span",{staticClass:"line-number"},[t._v("30")]),a("br"),a("span",{staticClass:"line-number"},[t._v("31")]),a("br"),a("span",{staticClass:"line-number"},[t._v("32")]),a("br"),a("span",{staticClass:"line-number"},[t._v("33")]),a("br"),a("span",{staticClass:"line-number"},[t._v("34")]),a("br"),a("span",{staticClass:"line-number"},[t._v("35")]),a("br"),a("span",{staticClass:"line-number"},[t._v("36")]),a("br"),a("span",{staticClass:"line-number"},[t._v("37")]),a("br"),a("span",{staticClass:"line-number"},[t._v("38")]),a("br"),a("span",{staticClass:"line-number"},[t._v("39")]),a("br"),a("span",{staticClass:"line-number"},[t._v("40")]),a("br"),a("span",{staticClass:"line-number"},[t._v("41")]),a("br"),a("span",{staticClass:"line-number"},[t._v("42")]),a("br"),a("span",{staticClass:"line-number"},[t._v("43")]),a("br"),a("span",{staticClass:"line-number"},[t._v("44")]),a("br"),a("span",{staticClass:"line-number"},[t._v("45")]),a("br"),a("span",{staticClass:"line-number"},[t._v("46")]),a("br"),a("span",{staticClass:"line-number"},[t._v("47")]),a("br"),a("span",{staticClass:"line-number"},[t._v("48")]),a("br"),a("span",{staticClass:"line-number"},[t._v("49")]),a("br"),a("span",{staticClass:"line-number"},[t._v("50")]),a("br"),a("span",{staticClass:"line-number"},[t._v("51")]),a("br"),a("span",{staticClass:"line-number"},[t._v("52")]),a("br"),a("span",{staticClass:"line-number"},[t._v("53")]),a("br"),a("span",{staticClass:"line-number"},[t._v("54")]),a("br"),a("span",{staticClass:"line-number"},[t._v("55")]),a("br"),a("span",{staticClass:"line-number"},[t._v("56")]),a("br"),a("span",{staticClass:"line-number"},[t._v("57")]),a("br"),a("span",{staticClass:"line-number"},[t._v("58")]),a("br"),a("span",{staticClass:"line-number"},[t._v("59")]),a("br"),a("span",{staticClass:"line-number"},[t._v("60")]),a("br"),a("span",{staticClass:"line-number"},[t._v("61")]),a("br"),a("span",{staticClass:"line-number"},[t._v("62")]),a("br"),a("span",{staticClass:"line-number"},[t._v("63")]),a("br"),a("span",{staticClass:"line-number"},[t._v("64")]),a("br"),a("span",{staticClass:"line-number"},[t._v("65")]),a("br")])])])}],!1,null,null,null);r.options.__file="gtf2gff3.md";s.default=r.exports}}]);