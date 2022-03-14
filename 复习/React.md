



### React生命周期

> https://juejin.cn/post/6844904021233238024
>
> https://juejin.cn/post/6914112105964634119

- constr
- UNSAFE_componentWillMount
- UNSAFE_componentWillReceiveProps(props, state)
- `static` `getDerivedStateFromProps(nextProps,prevState)`：接收父组件传递过来的 `props` 和组件之前的状态，返回一个对象来更新 `state` 或者返回 `null` 来表示接收到的 `props` 没有变化，不需要更新 `state`
- render
- componentDidMount
- shouldComponentUpdate(nextProps, nextState) 返回一个 Boolean值
- UNSAFE_componentWillUpdate(prevProps, prevState)
- getSnapshotBeforeUpdate((prevProps, prevState) 返回一个 快照
- componentDidUpdate(prevProps, prevState, snapshot)
- componentWillUnmount

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e12b2e35c8444f19b795b27e38f4c149~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)



![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/15/16f0a0b3e20fa9aa~tplv-t2oaga2asx-watermark.awebp)