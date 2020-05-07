# vue 3.0 的一些配置

## vue.config.js

在项目的根路径下创建文件 `veu.config.js`

```js
module.exports = {
    baseUrl: '/, //　更路径
    outputDir: 'dist',	// 构建输出目录
    assetsDir: 'assets', // 静态资源目录（js,css,img,fonts）
    lintOnSave: false, 	// 是否开启eslint保存检测， 有效值： true || false || error
    devServer: {
    	open: true,
    	host: 'localhost',
    	port: 8081,
    	https: false,
    	hotOnly: false,  // 热更新
    	proxy: {	// 配置跨越
    		'/api': {
    			target: 'http//localhost:5000/api/', 	// 跨越地址
    			ws: true, 
    			changOrigin: true,
                pathRewrite: {
					'^api': ''
                }
			}
		}
	}
}
```



