# linux


```shell
$ vim # sdfksdf
```



.prettierrc 文件，代码格式化配置 用来项目中的格式化 

```json
{
  "printWidth": 100, //每行最多多少个字符换行
  "singleQuote": true, //单引号
  "trailingComma": "es5", // 对象属性最后有 "," 
  "semi":true //是否需要分号
}
```

trailingComma，最后 b : 2 后面是否有“,”

```css
{
a:1,
b:2,
}
```

```json
{
    // tab缩进大小,默认为2
    "tabWidth": 4,
    // 使用tab缩进，默认false
    "useTabs": false,
    // 使用分号, 默认true
    "semi": false,
    // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
    "singleQuote": false,
    // 行尾逗号,默认none,可选 none|es5|all
    // es5 包括es5中的数组、对象
    // all 包括函数对象等所有可选
    "TrailingCooma": "all",
    // 对象中的空格 默认true
    // true: { foo: bar }
    // false: {foo: bar}
    "bracketSpacing": true,
    // JSX标签闭合位置 默认false
    // false: <div
    //          className=""
    //          style={{}}
    //       >
    // true: <div
    //          className=""
    //          style={{}} >
    "jsxBracketSameLine": false,
    // 箭头函数参数括号 默认avoid 可选 avoid| always
    // avoid 能省略括号的时候就省略 例如x => x
    // always 总是有括号
    "arrowParens": "avoid"
}

```



```shell
 # ESLint fix自动修复所有格式问题
 eslint --fix --ext .js --ext .jsx --ext .vue src/ test/unit test/e2e/specs
```



new http://gzt.mh.gz.cegn.cn/work/content_column_subscribe/quickSubscribe

old   http://gzt.mh.gz.cegn.cn/work/content_column_subscribe/quickSubscribe



**fireFox 低版本（52.3.0-6）中会出现 .finally is not defined 的问题** 

安装包 `promise.prototype.finally`

`yarn add promise.prototype.finally`

```js
require('promise.prototype.finally').shim()
```



**VUE路由-IE浏览器中的路由跳转后页面不变更问题**

```js
/**
 * 是否IE浏览器
 */
export function isIE() {
  return (
    '-ms-scroll-limit' in document.documentElement.style &&
    '-ms-ime-align' in document.documentElement.style
  )
}
```

```js
// VUE路由-IE浏览器中的路由跳转后页面不变更问题
    if (isIE()) {
      console.log('%c!<----------- IE浏览器 ----------->', 'color:blue')
      window.addEventListener(
        'hashchange',
        () => {
          var currentPath = window.location.hash.slice(1)
          if (this.$route.path !== currentPath) {
            this.$router.push(currentPath)
          }
        },
        false
      )
    }
```



**ie9中渐变**

```less
/**
解决方案：IE可以依靠滤镜实现渐变。
1. startColorStr起始颜色
2. endColorStr结束颜色
3. gradientType为0时代表垂直(默认值)，为1时代表水平
filter: progid:DXImageTransform.Microsoft.gradient(GradientType=1, startColorstr=#ff0067, endColorstr=#ff5698);
*/

//=========================================================
// less
// 垂直
@mixin -gradient($start, $end, $isVertical: false) {
  @if ($isVertical == false) {
    filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,startColorStr=$start,endColorStr=$end);
    background: linear-gradient(to bottom, $start,  $end)
  } @else {
    filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=1,startColorStr=$start,endColorStr=$end);
    background: linear-gradient(to top, $start,  $end)
  }
}
// 使用 
@include linear-gradient(#ff0067, #d9ff00);
//=========================================================


//=========================================================
// less
// 垂直
.linear-gradient(@start, @end, @isVertical: false) when (@isVertical=true){
  filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=1,startColorStr=@start,endColorStr=@end);
  background: linear-gradient(to bottom, @start,  @end)
}
// 水平
.linear-gradient(@start, @end, @isVertical: false) when (@isVertical=false) {
  filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,startColorStr=@start,endColorStr=@end);
  background: linear-gradient(to right, @start,  @end)
}
// 使用 
.linear-gradient(#ff0067, #d9ff00);
//=========================================================


```



## a 标签的 target 数据

a 标签的 target 数据指定一个 iframe 的name，那么点击a标签就会把iframe 的src换为 a标签的href



1. 首页
   - 区域列表获取接口， 搜索时按区域的接口
   - 首页的职位列表是否要根据当前选择的区域进行查询
2. 职位列表、职位详情，只有元， 差多少钱一小时和多少钱一个月没有在一起返回（目前是混合的）
3. 预支薪水：多了合同的提交， 要增加合同一个字段
4. 我的页面：专属客服电话是写死还是后台请求
5. 职位详情，差微信号和手机号





| 账号/手机号 | 验证码 | 用户名            | 厂商ID | 公司名 |
| ----------- | ------ | ----------------- | ------ | ------ |
| 12342149124 | 4607   | 用户1528491267002 | boe    |        |
|             |        |                   |        |        |
|             |        |                   |        |        |
|             |        |                   |        |        |





