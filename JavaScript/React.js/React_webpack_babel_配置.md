# React + webpack + Babel  配置

一开始想着偷懒，直接想从百度和Google上搜了配置办法，搜了很多的，结果都是不能用的，非常郁闷，难道这些人都没有经过测试就把自己的配置放到网上去？这也太不负责了吧！

不过后来冷静下来突然联想到，前端技术更新快，会不会网上搜的配置已经落后了啊？！于是去 [webpack官网](https://webpack.js.org/configuration/) 查看官方文档，天啊，官方文档写的也太好了吧！简洁明了易懂！



所以呢，前端技术还是要去官方看最新的文档好啊。下面的配置用的是最新版本的webpack3。

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
	rules: [
			{
				test: /\.jsx?$/,
				use: ['babel-loader?cacheDirectory'],
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

