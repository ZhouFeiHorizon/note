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