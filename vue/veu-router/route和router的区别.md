# vue-resource 中 route 和 router 的区别

1. route 是 VueRouter 的一个对象， 通过 Vue.use(VueRouter) 和 VueRouter 构造函数得到的一个router 的实例对象， 这个对象中是一个全局的对象， 他包含了所有的路由保护了许多对象和属性

```js
// 本质是向 history 栈中添加一个路由，在我们看来是 切换路由，但本质是在添加一个history记录
$router.push({path: 'home'})
```
2. route是一个跳转的路由对象，每一个路由都会有一个route对象，是一个局部的对象，可以获取对应的name,path,params,query等

   我们可以从vue devtools中看到每个路由对象的不同

```js
$router.replace({path:'home'});//替换路由，没有历史记录
```

$route为当前router跳转对象里面可以获取name、path、query、params等

$router为VueRouter实例，想要导航到不同URL，则使用$router.push方法

