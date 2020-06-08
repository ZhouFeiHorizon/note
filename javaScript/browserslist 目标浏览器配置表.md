# browserslist 目标浏览器配置表

原文链接 <https://www.jianshu.com/p/bd9cb7861b85>

**为什么需要：**
根据提供的目标浏览器的环境来，智能添加css前缀，js的polyfill垫片,来兼容旧版本浏览器，而不是一股脑的添加。避免不必要的兼容代码，以提高代码的编译质量。

**共享使用browserslist的组件们：**

| 组件名                                    | 功能                                  |
| :---------------------------------------- | :------------------------------------ |
| Autoprefixer                              | postcss添加css前缀组件                |
| bable-preset-env                          | 编译预设环境 智能添加polyfill垫片代码 |
| eslint-plugin-compat                      |                                       |
| stylelint-no-unsupported-browser-features |                                       |
| postcss-normalize                         |                                       |
| 等等...                                   |                                       |

**基础语法**： 只要`package.json`配置了`browserslist`对象,需要的组件将自动匹配到并使用,也可以配置到具体的组件参数上



```javascript
{// package.json
  "browserslist": [ // 注意：是一个数组对象
    "> 1%",
    "last 2 versions"
  ] }
```

**last 2 versions：**CanIUse.com追踪的IE最新版本为11,向后兼容两个版本即为10、11

**设置语法：**通过浏览器过滤的思路实现
 默认是兼容所有最新版本

| 例子                         | 说明                                                  |
| :--------------------------- | :---------------------------------------------------- |
| `> 1%`                       | 全球超过1%人使用的浏览器                              |
| `> 5% in US`                 | 指定国家使用率覆盖                                    |
| `last 2 versions`            | 所有浏览器兼容到最后两个版本根据CanIUse.com追踪的版本 |
| `Firefox ESR`                | 火狐最新版本                                          |
| `Firefox > 20`               | 指定浏览器的版本范围                                  |
| `not ie <=8`                 | 方向排除部分版本                                      |
| `Firefox 12.1`               | 指定浏览器的兼容到指定版本                            |
| `unreleased versions`        | 所有浏览器的beta测试版本                              |
| `unreleased Chrome versions` | 指定浏览器的测试版本                                  |
| `since 2013`                 | 2013年之后发布的所有版本                              |

**筛选后查询,验证：**`npx browserslist` 打印出所有浏览器版本支出情况，