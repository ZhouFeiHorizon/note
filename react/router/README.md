## 区别

> react-router 实现了路由的核心功能
>
> react-router-dom  用于 React WEB 应用的路由依赖. 基于 react-router，加入了在浏览器运行环境下的一些功能，例如：`BrowserRouter` 和 `HashRouter` 组件，前者使用 `pushState` 和 `popState` 事件构建路由;后者使用 `window.location.hash` 和 `hashchange` 事件构建路由
>
> `react-router-native`: 用于 React Native 应用的路由依赖。基于 react-router，加入了 react-native 运行环境下的一些功能
>
> 
> 



# react-router-dom

> react-router-dom 会自动引入 react-router

```jsx
// props.children === Vue 里面 的 $slots.default
<MyNavLink to="/home">哈哈哈</MyNavLink> 
// 等价于
<myNavLink to="/home" children="哈哈哈" />

<Switch>
  <Route path="/"></Route>
</Switch>

```
