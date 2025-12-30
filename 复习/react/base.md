# api

```tsx
import { useImperativeHandle } from 'react'

const Demo = () => {
  useImperativeHandle(ref, {
    async getValue() {

    }
  })
}
```

### react 闭包理解

```jsx

const Counter = () => {
  const [count, setCount] = useState(0)
  const handleClick = useCallback(() => {
    setCount(count + 1)
  }, [])

  return (<div>
      <div>count{count}</div>
      <button onClick={handleClick}>+1</button>
    </div>)
}

// 第一次渲染: 作用域A
A {
 count: 0,
 handleClick: () => {}
}

// 第二次渲染: 作用域B
B {
  count: 1,
  handleClick: A.handleClick // 检查useCallback依赖[] → 返回A.handleClick（还是旧的！）
}


// 第一次渲染
const firstElement =  <Counter />
// 作用域：A  {  count: 0，handleClick: () => {} }

// 第一次 点击按钮
// 第二次渲染
const secondElement =  <Counter />
// count: 1
// handleClick: 会进行比较， 发现依赖项没有变化，引用 第一次渲染 结果的 handleClick,
// 作用域： B { count: 1, handleClick: A.handleClick }


// 第二次点击按钮，
// 执行handleClick, 由于 handleClick 是 第一次渲染 结果的 handleClick，里面依赖的词法作用域是第一次的
// 就变成了 setCount(A.count + 1) => 1

```

### 合成事件

> Portal 中的事件会冒泡到 React 父组件，即使 Portal 挂载到 DOM 树的不同位置！
>
> React16 及之前，监听在`document`上，`react 17+`，监听在容器上

```js
// React 16 及之前：所有事件委托到 document
document.addEventListener('click', (nativeEvent) => {
  // React 在这里处理所有点击事件
});

// React 17+：事件委托到 React 树的根容器
const rootNode = document.getElementById('root');
rootNode.addEventListener('click', (nativeEvent) => {
  // React 在这里处理事件
});

// Portal 事件同样被捕获和处理
```

**事件顺序**

```js
// 实际顺序（React 17+）：
1. 点击元素触发原生事件
2. 事件冒泡到 React 根容器（如 #root）
3. React 捕获事件，创建合成事件
4. 沿着虚拟 DOM 树触发 React 事件处理器
5. 如果还有原生监听器，继续执行

// ❌ 不是：原生事件全部执行完 → 再执行 React 事件
// ✅ 而是：事件在某个阶段被 React 捕获处理
```

```
// 当点击 Portal 中的按钮时：
1. 原生事件在 <button> 上触发
2. 冒泡到 document（或根容器）
3. React 捕获到原生事件
4. React 创建合成事件（SyntheticEvent）
5. React 根据虚拟 DOM 树重建事件传播路径
6. 沿着虚拟 DOM 树向上冒泡（不是原生 DOM 树！）
7. 触发父组件的 onClick 处理函数
```

- 阻止合成事件冒泡，用 e.stopPropagation()

**stopImmediatePropagation**

```js
// stopPropagation() vs stopImmediatePropagation()
// 相同元素上的多个事件监听器：

element.addEventListener('click', listener1);
element.addEventListener('click', listener2);
element.addEventListener('click', listener3);

// 如果 listener2 调用：
// e.stopPropagation() → listener3 仍会执行，但事件不会冒泡到父元素
// e.stopImmediatePropagation() → listener3 不会执行，事件立即停止
```

### ErrorBoundary 错误边界

```tsx

import React, { ErrorInfo, isValidElement } from 'react'

const initialState = { error: null, hasError: false }

interface ErrorBoundaryProps {
  fallback: React.Node | (props: {
    resetErrorBoundary: () => void
    error: Error
  }) => React.Node
}

class ErrorBoundary extends React.component {
  state = {...initialState}
  
  // der_iver
  static getDeriverStateFromError(error: Error) 
  // static getDeriverStateFormError(error: Error)  {
  //   return { error, hasError: true }
  // }

  resetErrorBoundary() {
    this.state({ ...initialState })
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  render() {
    const { hasError, error,  } = this.state
    const { children, fallback  } = this.props

    if (!hasError) {
      return <>{children}</>
    }

    if (isValidElement(fallback)) {
      return fallback
    }

    if (typeof fallback === 'function') {
      return fallback({ error, resetErrorBoundary: this.resetErrorBoundary })
    }

    return <>{error?.message}</>
  }

}

```
