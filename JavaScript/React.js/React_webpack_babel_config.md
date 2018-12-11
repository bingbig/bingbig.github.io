# React + webpack + Babel  配置

一开始想着偷懒，直接想从百度和Google上搜了配置办法，搜了很多的，结果都是不能用的，非常郁闷，难道这些人都没有经过测试就把自己的配置放到网上去？这也太不负责了吧！

不过后来冷静下来突然联想到，前端技术更新快，会不会网上搜的配置已经落后了啊？！于是去 [webpack官网](https://webpack.js.org/configuration/) 查看官方文档，天啊，官方文档写的也太好了吧！简洁明了易懂！



==***主要版本信息==



## 1. 配置

所以呢，前端技术还是要去官方看最新的文档好啊。下面的配置用的是最新版本的webpack3。

```js
const path = require('path');

module.exports = {
	entry: {
		'app': [
			'babel-polyfill',
			'react-hot-loader/patch',
			'./src/index.js'
		]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
  module: {
	rules: [
			{
				test: /\.jsx?$/,
				use: ['react-hot-loader/webpack', 'babel-loader?cacheDirectory'],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000
	}
};
```



## 2. 安装React和antd

```bash
npm -g install cnpm
cnpm i
```

只给配置不给packge.json告诉版本是耍流氓！

```js
{
  "name": "myapp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "dev": "webpack-dev-server --color --open --progress"
  },
  "author": "liub1993",
  "license": "MIT",
  "devDependencies": {
    "babel-loader": "^7.1.2",
    "babel-preset-es2016": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-register": "^6.26.0",
    "css-loader": "^0.28.5",
    "file-loader": "^0.11.2",
    "jsxobj": "^1.1.0",
    "react-hot-loader": "^1.3.1",
    "style-loader": "^0.18.2",
    "webpack": "^3.5.5",
    "webpack-dev-server": "^2.7.1"
  },
  "dependencies": {
    "antd": "^2.12.8",
    "react": "^15.6.1",
    "react-dom": "^15.6.1"
  }
}
```

.babelrc

```javas
{
  "presets": [ "es2016", "react" ],
  "plugins": ["react-hot-loader/babel"]
}
```



## 3. 目录结构

```
myapp/
	dist/				# 编译输出
		bundle.js
		index.html
	/node_modules 
	/src				# 源代码
		app.css
		index.js
	.babelrc
	.gitignore
	package.js
	webpack.config.js
```

dist/index.html

```html
 <html>
   <head>
     <title>Getting Started</title>
   </head>
   <body>
		<script src="bundle.js"></script>
   </body>
  </html>
```

src/index.js

```javas
import './app.css';
import _ from 'lodash';

function component() {
	var element = document.createElement('div');
	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	element.classList.add('hello');
	return element;
}

document.body.appendChild(component());
```

src/app.css

```css
.hello {
  color: red;
}
```



## 4. 运行

1. 开发环境热加载

   ```bash
   npm run dev
   ```

2. 生产环境

    ```bash
   npm run build
    ```



## 5. 报错

### 5.1 react-hot-loader Error

```bash
ERROR in multi ./node_modules/_webpack-dev-server@2.7.1@webpack-dev-server/client?http://localhost:9000 babel-polyfill react-hot-loader/patch ./src/index.js
Module not found: Error: Can't resolve 'react-hot-loader/patch' in '/Users/liub/Sites/liub1993.github.io/myapp'
 @ multi ./node_modules/_webpack-dev-server@2.7.1@webpack-dev-server/client?http://localhost:9000 babel-polyfill react-hot-loader/patch ./src/index.js

ERROR in multi ./node_modules/_webpack-dev-server@2.7.1@webpack-dev-server/client?http://localhost:9000 babel-polyfill react-hot-loader/patch ./src/index.js
Module not found: Error: Can't resolve 'react-hot-loader/webpack' in '/Users/liub/Sites/liub1993.github.io/myapp'
 @ multi ./node_modules/_webpack-dev-server@2.7.1@webpack-dev-server/client?http://localhost:9000 babel-polyfill react-hot-loader/patch ./src/index.js
```

重新安装beta版本的react-hot-loader

```bash
cnpm install react-hot-loader@next
```

