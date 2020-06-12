# element-ui添加新的主题

## 搭建环境

*注意：在项目中使用主题时，最好固定版本，不然element-ui变更时会有影响，要定制主题时版本一致，只需要指定 element-theme-chalk 的版本*

```shell
# 项目中使用scss编写需要依赖的插件
$ npm install element-ui -S
$ npm install sass-loader node-sass -D

# 安装elementUI的自定义主题工具
$ npm install element-theme -g
# 安装chalk主题
$ npm install element-theme-chalk -D
```

## 使用

```shell
$ et -i [可以自定义变量文件，默认为element-variables.scss]

> √ Generator variables file

```

直接编辑 element-variables.scss 文件，例如修改主题色为自己所需要的颜色（如：#002140）

```scss
// 修改变量 在element-variables.scss中修改
$--color-primary: #002140
```

编译主题

```shell
et

> ✔ build theme font
> ✔ build element theme
```

然后就在根目录下产生了theme的主题文件