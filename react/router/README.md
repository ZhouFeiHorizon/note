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


## react 源码

element
```ts
// React.JSX.Element
{
   $$type: Symbol('react.route'),
   key: null,
   props: {
        children: "这个是一个div"
    },
   ref: null,
   type: 'div' | (props) => {...}
   _owner: null,
   _store: null,
   _self: null,
   _source: {}
}
```

### createElement

```js

React.createElement(div, props, ...children)

const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};

function createElement(type, config, children) {
  const props = {}
 
  let key = null;
  let ref = null;
  let self = null;
  let source = null;


  if (config !== null) {


    if (config.key !== unde
      key = '' + config.key 
    )
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;

    for (const propName in config) {
      if (Object.hasOwnProperty.call(config, key)
      && !RESERVED_PROPS[propName]
      ) {
        props[propName] = config[propName];
      }
    }
  }

  // 处理 children

  const childLength = arguments.length - 2;

  if (childLength === 1) {
    props.children = children
  } else if (childLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  //  Resolve default props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (const propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props
  )
}


function ReactElement(type, key, ref, self, source, owner, props) {
  const element = {
    $$type: Symbol('react.element'),
  
    type: type,
    key: key,
    ref: ref,
    props: props,
   _owner: owner,
  };
  return element;
}



```



### createContext

```ts
import React, { useContext } from 'react'


const MyContext = React.createContext()
// 提供
<MyContext.Provider value={123}>
  // 消费
  <MyContext.Consumer>
    {
      (value) => {
        return <div>{value}</div>
      }
    }
  </MyContext.Consumer>
</MyContext.Provider>


// 消费
const value = useContext(MyContext)

```