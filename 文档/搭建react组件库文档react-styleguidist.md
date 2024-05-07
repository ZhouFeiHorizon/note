## react-styleguidist 介绍

[官网](https://react-styleguidist.js.org/)

就可以根据我们写的 React 组件文件+markdown文件，生成文档，支持热更新

![React Styleguidist 示例样式指南](https://react-styleguidist.js.org/img/workbench.jpg)





## 安装

```bash
npm install --save-dev react-styleguidist
```

## 命令

- `styleguidist server` 开发环境运行服务 dev server
- `styleguidist build` 进行打包，生成静态文件

**参数**

--config 配置文件路径

##使用 create react app 创建的项目

如果我们是使用` create react app `已经创建的react项目，我们只需安装 `react-styleguidist `就可以用了

安装 `react-styleguidist `

```bash
npm install --save-dev react-styleguidist
```



在`package.json`中添加如下命令

```josn
"doc:server": "styleguidist server",
"doc:build": "styleguidist build"
```

在项目根目录下创建 配置文件 `styleguide.config.js`， 我们也可以通过--config 来指定配置文件

@TODO

 ```bash
 styleguidist build --config=script/styleguide.config.js
 ```

```js
module.exports = {
  components: "./src/components/**/*.{tsx,jsx,js}",
}
```

