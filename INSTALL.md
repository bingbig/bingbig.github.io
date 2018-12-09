# 文档说明

## 部署文档
  
```bash
git clone https://github.com/bingbig/bingbig.github.io.git
git checkout dev

npm install -g vuepress
# or
npm install -D vuepress

npm i

# 开始编辑文档

npm run docs:deploy

# 等待一小会儿
open https://bingbig.github.io
```

## 编写文档
文档名**必须**用英文，否则生成上下文链接是会出现奇怪的问题。

修改`.vuepress/config.js`中`themeConfig.sidebar` 修改侧边菜单。
修改`.vuepress/config.js`中`themeConfig.nav`修改菜单栏。