

## React 15的架构

Reconciler（协调器）
Renderer（渲染器）

协调器也渲染器交替工作，导致中间不能中断


## React16 架构

### Scheduler（调度器）

既然我们以浏览器是否有剩余时间作为任务中断的标准，那么我们需要一种机制，当浏览器有剩余时间时通知我们。

其实部分浏览器已经实现了这个 API，这就是requestIdleCallback。但是由于以下因素，React放弃使用：

浏览器兼容性
触发频率不稳定，受很多因素影响。比如当我们的浏览器切换 tab 后，之前 tab 注册的requestIdleCallback触发的频率会变得很低
基于以上原因，React实现了功能更完备的requestIdleCallbackpolyfill，这就是Scheduler。除了在空闲时触发回调的功能外，Scheduler还提供了多种调度优先级供任务设置。

Scheduler是独立于React的库



### Reconciler（协调器）
> Reconciler内部采用了Fiber的架构。


```js
/** @noinline */
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```

### Renderer（渲染器）
Renderer根据Reconciler为虚拟 DOM 打的标记，同步执行对应的 DOM 操作。