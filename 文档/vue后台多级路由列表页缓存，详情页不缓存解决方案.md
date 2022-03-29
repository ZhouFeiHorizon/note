# vue后台多级路由列表页缓存，详情页不缓存解决方案

> 在后台管理系统中，我们要在列表页的时候对页面进行缓存搜索条件，页码等， 这样进入详情页面返回列表页的时候数据才不至于清空，但我们又不能对详情页进行缓存，但点击菜单的时候应该重新加载，不要使用缓存

我们可以使用几种方法实现
1. 通过修改保留在url上，也不能保存太多数据，比较麻烦，在后台项目中不推荐使用

2. 通过`keep-alive`加上 指令`v-if`的方式，在路由配置的mate上加keepAlive，通过判断是否是keepAlive来进行是否缓存

   ```javascript
   // 在 router中
    {
       path: '/user',
       meta: {
         title: '用户列表',
         keepAlive: true,
       },
       //...
    },
     {
       path: '/user/:id',
       meta: {
         title: '用户详情页',
         keepAlive: false,
       },
       //...
    },
   ```
   在模板中使用
     ```html
     <keep-alive>
          <router-view class="site-content" :key="$route.path" v-if="meta.keepAlive"></router-view>
     </keep-alive>
     <router-view class="site-content" :key="$route.path" v-if="!meta.keepAlive"></router-view>
     ```

​		但这种方式最简单，多级路由也能缓存，不过这种缺点就是不能动态删除缓存， 还有就是我们想在路由切换的时候做动画不好做，不能直接用 `transition`做过渡动画

3. 通过`keep-alive`加上传递参数`include`来实现，`keep-alive` 的 `include`缓存的是组件名， 所以我们的路由名和组件名保持一致，这样就方便操作

   我们就可以创建一个数组，保存要缓存的组件名，在路由配置 `meta`上加上`hidden` 就代表这个菜单要隐藏，是详情，在路由变化的时候，我们就判断是否详情页，不是详情页的时候我们就`push`当前路由名（就对应的组件名），是详情页的时候就不操作，由于点击菜单的时候我们要清空缓存，那我们就在点击菜单的时候清空列表

   `layout.vue` 代码

   ```html
   <!-- layout.vue -->
   <template>
     <el-container class="app-layout">
       <el-aside width="238px" class="app-layout-sider">
         <Sidebar @menu-select="onMenuSelect"></Sidebar>
       </el-aside>
       <el-main class="app-layout-content">
         <transition name="fade-transform" mode="out-in">
           <keep-alive :include="keepAlive.list">
             <router-view class="app-layout-view" :keepAlive="keepAlive" :key="$route.path"></router-view>
           </keep-alive>
         </transition>
       </el-main>
     </el-container>
   </template>
   ```
    ```javascript
   // layout.vue
   import Sidebar from "./Sidebar"
   
   export default {
     name: "Layout",
     components: { Sidebar },
     data() {
       const keepAlive = {
         list: [],
   
         add(name) {
           if (!keepAlive.list.includes(name)) {
             keepAlive.list.push(name)
           }
         },
   
         delete(name) {
           const index = keepAlive.list.indexOf(name)
           if (index > -1) {
             keepAlive.list.splice(index, 1)
           }
         },
   
         clear() {
           keepAlive.list = []
         },
       }
   
       return {
         keepAlive,
       }
     },
   
     watch: {
       "$route.path": {
         immediate: true,
         handler() {
           // 保证这个后于 onMenuSelect
           setTimeout(() => {
             // 隐藏的菜单-详情页不进行缓存
             if (!this.$route.meta.hidden) {
               const name = this.$route.name
               name && this.keepAlive.add(name)
             }
           }, 10)
         },
       },
     },
     methods: {
       onMenuSelect() {
         // 菜单重新选择的时候清空缓存
         this.keepAlive.clear()
       },
     },
   }
    ```

**路由配置**
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af11f824a7fb4219adda85e9ea08a9cc~tplv-k3u1fbpfcp-watermark.image?)

**多级解决**
在created的时候，往里面缓存列表里面 push 当前组件名，就实现了多级缓存
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/534b7af617204a1daa5d163946d28464~tplv-k3u1fbpfcp-watermark.image?)
    

代码

```vue
<template>
  <keep-alive :include="(keepAlive && keepAlive.list) || []">
    <router-view :keepAlive="keepAlive"></router-view>
  </keep-alive>
</template>

<script>
/**
 * 空白组件--但是能做缓存处理
 */
export default {
  name: "KeepAliveBlank",
  props: {
    keepAlive: Object,
  },
  created() {
    this.keepAlive.add("KeepAliveBlank")
  },
}
</script>
```







