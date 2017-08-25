# 原生JBrowse

## 数据预处理
1. 预处理配置
2. 预处理数据检验
	- [ ] 参考基因组必须是同一个
	- [ ] 染色体名一致
3. 数据预处理
	- [ ] fasta
	- [ ] GFF3
	- [ ] ...

## JBrowse配置
- 全局配置
- 具体配置
	- [ ] 定义全局配置
	- [ ] 定义tracks的配置
	- [ ] 其他配置 
- CSS

## JBrowse初始化过程
1. 读取URL中的参数
2. URL参数转成JOSN传递给Browser.js的构造器，构造器成为根配置对象( root configuration object )
3. 根对象 mix `_defaultConfig`对象
4. `_defaultConfig` 默认去读取 jbrowse_conf.json & jbrowse.conf
5. jbrowse.conf 默认读取 {dataRoot}/trackList.json {dataRoot}/tracks.conf
6. JBrowse根据配置文件AJAX读取数据（JSON、binary、.conf）和渲染页面

# JBrowse开发
## 前端
- 前端React组件化
	- 用户数据预处理配置页面组件
	- 用户JBrowse配置页面组件
	- 用户JBrowse样式配置组件
	- JBrowse组件
		- 配置接口
		- 数据模型
		- 视图
			- Tracks
			- TrackList
			- Static
			- Features
			- File
			- utils
			- Dialogs
			- Export
			- ...
	
## 后端API
- 配置文件增删改查(JSON)
	- 数据预处理配置
	- JBrowse配置
	
- 预处理数据功能接口
	- [ ] fasta
	- [ ] GFF3
	- [ ] Wiggle
	- [x] BigWig
	- [ ] BAM
	- [ ] VCF
	- [ ] REST





