# 

## 总结
> 全局前置路由
```js
// 全局前置路由
router.beforeEach((to,from,next){})

// 全局后置路由
router.abterEach((fo, from){})

// 路由独享守卫
{
  beforeEnter(to, from, next) {}
}

// 组件内
{
  beforeRouteEnter(to, from, next) {},
  beforeRouteUpdate(to,from, next) {},
  beforeRouteLeave(to, fro, next) {}
}
```