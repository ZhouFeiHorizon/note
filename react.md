##  react 生命周期



16.3 变更

- UNSAFE_componentWillMount
- UNSAFE_componentWillReceiveProps
- UNSAFE_componentWillUpdate



```js
constructor() {}
static getDerivedStateFromProps(nextProps, state) {}
    getDerivedStateFromProps() 在调用 render方法之前调用，在初始化和后续更新都会被调用

    返回值：返回一个对象来更新 state,  如果返回 null 则不更新任何内容


    参数： 第一个参数为即将更新的 props,  第二个参数为上一个状态的 state , 可以比较props 和 state来加一些限制条件，防止无用的state更新


    注意：getDerivedStateFromProps 是一个静态函数，不能使用this, 也就是只能作一些无副作用的操作
render() {} 
componentDidMount() {}
shouldComponentUpdate(nextProps, nextState) {} 
getSnapshotBeforeUpdate(prevProps, prevState) {}
componentDidUpdate(prevProps, prevState, snapshot)
componentWillUnmount()

```

### 生命周期执行顺序

#### 创建时

- constructor()
- static getDerivedStateFromProps()
- render()
- componentDidMount()

#### 更新时

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

#### 卸载时

- componentWillUnmount()

