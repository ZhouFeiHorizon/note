## React16 有哪些更新？

核心架构重写：Fiber

```js

// React 15 使用 Stack Reconciler（同步、递归、不可中断）
// React 16 使用 Fiber Reconciler（异步、可中断、增量渲染）

// Fiber 带来的好处：
// 1. 增量渲染（将渲染工作拆分成多个chunk）
// 2. 更好的错误处理（错误边界）
// 3. 为 Suspense、并发模式打下基础

```

## React17 有哪些更新？

React 17 是一个 **"桥梁版本"**，主要目标是 **实现渐进式升级**，并没有带来太多新特性，而是为未来版本做铺垫。以下是主要更新：

#### **1. 新的 JSX 转换方式**

```jsx
// React 17 之前
import React from 'react';

function App() {
  return React.createElement('h1', null, 'Hello World');
}

// React 17 之后（自动由编译器转换）
import { jsx } from 'react'
function App() {
  return <h1>Hello World</h1>;
}
// 不再需要每个文件都 import React
```

**好处：**

- ✅ 减少 bundle 体积（无需在每个文件引入 React）
- ✅ 为未来 React 特性做准备
- ✅ 与 TypeScript 4.1+ 兼容

---

####### **2. 事件委托机制的改变**
**之前：** 所有事件都委托到 `document` 上

```javascript
// React 16
document.addEventListener('click', handler); // React 的委托
```

**React 17：** 事件委托到 **React 渲染树的根容器**

```javascript
// React 17
const rootNode = document.getElementById('root');
rootNode.addEventListener('click', handler); // 事件委托到这里
```

**解决的问题：**

- ✅ **多版本 React 共存**：不同版本的 React 应用可以嵌套使用
- ✅ **更符合预期**：事件冒泡行为与原生 DOM 更一致
- ✅ **e.stopPropagation()** 现在真正有效

---

#### **3. 移除事件池（Event Pooling）**

```javascript
// React 16（有问题）
function handleChange(e) {
  setData(data => ({
    ...data,
    text: e.target.value // 异步访问 e.target 可能出错
  }));
}

// React 17（修复）
function handleChange(e) {
  // e 现在是持久化的，可以安全地在异步中使用
  setData(data => ({
    ...data,
    text: e.target.value // 安全！
  }));
}
```

---

### 🔧 **破坏性变更**

### **1. 组件生命周期调整**

- **`componentWillMount`、`componentWillReceiveProps`、`componentWillUpdate`**：
  现在需要加 `UNSAFE_` 前缀才能使用
- **新的严格模式警告**：帮助发现不安全的生命周期使用

### **2. 事件系统对齐**

- **`onScroll`** 事件不再冒泡（与浏览器保持一致）
- **`onFocus`** 和 **`onBlur`** 使用原生 `focusin`/`focusout`（现在会冒泡）
- **合成事件** 的 `e.nativeEvent` 现在是真正的原生事件

### **3. 其他 DOM 相关变更**

- **去除事件委托中的优化**：某些边缘情况的行为更可预测
- **`useEffect` 清理函数** 的 timing 更一致（始终异步执行）

---

#### 🛠️ **开发者工具改进**

#### **新的 Profiler 特性**

```javascript
// React DevTools 新增功能
- 组件渲染原因分析
- 提交(commit)详细信息
- 时间线视图改进
```

---

#### 📦 **构建系统变更**

#### **移除私有导出**

```javascript
// 以下内部 API 不再暴露，影响某些库：
React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
// 相关库需要更新适配
```

---

#### 🌟 **为未来铺路的特性**

#### **1. 支持渐进式升级**

```javascript
// 可以在一个页面中运行多个 React 版本
const React15App = React15.createRoot(document.getElementById('app15'));
const React17App = React17.createRoot(document.getElementById('app17'));
```

#### **2. 为 React 18 并发特性做准备**

- 内部重构 Fiber 架构
- 改进 Suspense 机制

---

#### 🚀 **升级指南**

#### **自动升级（推荐）**

```bash
# 使用官方升级脚本
npx react-codemod@latest rename-unsafe-lifecycles
```

#### **手动检查清单**

1. **移除废弃的生命周期** 或添加 `UNSAFE_` 前缀
2. **更新测试代码** 中的事件模拟
3. **检查第三方库** 兼容性
4. **验证事件冒泡行为** 变化是否影响逻辑

---

#### 📊 **兼容性矩阵**

| 特性             | 支持情况      | 备注           |
| ---------------- | ------------- | -------------- |
| 浏览器支持       | IE11+         | 仍需 polyfill  |
| TypeScript       | 4.1+ 完全支持 | 新 JSX 转换    |
| Next.js          | 11.0.0+       | 内置支持       |
| Create React App | 4.0.0+        | 默认使用新 JSX |

---

#### ⚠️ **常见升级问题**

### **问题 1：事件处理**

```javascript
// ❌ 之前可能有效的 hack
document.addEventListener('click', (e) => {
  if (e.target.matches('.my-button')) {
    // React 16 中不会触发，因为事件被 document 捕获
  }
});

// ✅ React 17 修复：事件现在在 root 容器处理
```

#### **问题 2：Portal 中的事件**

```jsx
// ✅ Portal 事件现在能正确冒泡到父组件
const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    children,
    document.getElementById('modal-root')
  );
};
```

## React18 有哪些更新？

https://juejin.cn/post/7094037148088664078

#### IE 浏览器不支持

#### 控制台打印

> React.StrictMode 会进行两次打印，不便于区分，React 18 之后，把多余的那次打印为灰色

#### render Api

react 17

```jsx
// react 17
import React from 'react'
import ReactDom from 'react-dom'
import App from './App'

const container = document.getElementById('root')

// 渲染
ReactDom.render(<App />, container)
// 卸载
ReactDom.unmountComponentAtNode(container)
```

react 18

```jsx
// react 18
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('root')

const root = createRoot(container)
// 渲染
root.render(<App />)
// 卸载
root.unmount()
```

#### setState 自动批处理

> 在 react17 中，只有 react 生命周期或者React 合成事件中，会进行批处理，原生 js 事件、promise，setTimeout、setInterval 不会
> react18，将所有事件都进行批处理，即多次 setState 会被合并为 1 次执行，提高了性能，

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  console.log('组件渲染'); // 观察渲染次数

  const handleTimeout = () => {
  setTimeout(() => {
    setCount(count + 1);
    setFlag(!flag);
    // React 17: 打印两次 "组件渲染"
    // React 18: 打印一次 "组件渲染"
  }, 1000);
  };

  return <button onClick={handleTimeout}>点击</button>;
}
```

```jsx
// react 17
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  console.log('组件渲染, count, count2', count, count2);

  const handleAdd = () => {
    setTimeout(() => {
      console.log('开始')
      setCount(count + 1);
      console.log('setCount 之后')
      setCount2(count2 + 1);
      console.log('setCount2 之后')
    });
  };

  <div>
    <div>count：{count}</div>
    <div>count2：{count2}</div>
    <button onClick={handleAdd}>+1</button>
  </div>

// 点击按钮，执行结果如下

// 开始
// 组件渲染, count, count2 1 0
// setCount 之后
// 组件渲染, count, count2 1 1
// setCount2 之后

// ✅ 解决方案
setTimeout(() => {
  // un stable batched updates
  // unstable_batchedUpdates
  ReactDOM.unstable_batchedUpdates(() => {
    setCount(c => c + 1);  // ✅ 批处理
    setFlag(f => !f);      // ✅ 一次渲染
  });
}, 1000);
```

#### flushSync


> 批处理的破坏性改动，如果像退出`批量更新`

```jsx
import React, { useState } from 'react';
import { flushSync } from 'react-dom';

const App: React.FC = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  console.log("渲染")
  return (
    <div
      onClick={() => {
        flushSync(() => {
          setCount1(count => count + 1);
        });
        // 第一次更新
        flushSync(() => {
          setCount2(count => count + 1);
        });
        // 第二次更新
      }}
    >
      <div>count1： {count1}</div>
      <div>count2： {count2}</div>
    </div>
  );
};

export default App;

```

```jsx
import React from "react";
import { flushSync } from "react-dom";

class UpdateDemo extends React.Component {
  state = {
    count: 0,
  };

  add = () => {
    setTimeout(() => {
      flushSync(() => {
        this.setState({
          count: this.state.count + 1,
        });
        // 同步执行，执行setState、执行render，之后再执行下面的代码
      });
      console.log("this.state.count", this.state.count);
    }, 0);
  };
  render() {
    console.log("render");
    return (
      <div>
        <div>count: {this.state.count} </div>
        <button onClick={this.add}>+1</button>
      </div>
    );
  }
}

export default UpdateDemo;


```

#### 关于 React 组件的返回值,

> 在  React 17  中，如果你需要返回一个空组件，React 只允许返回 null。如果你显式的返回了  undefined，控制台则会在运行时抛出一个错误。
> 在  React 18  中，不再检查因返回  undefined  而导致崩溃。既能返回 null，也能返回 undefined（但是 React 18 的 dts 文件还是会检查，只允许返回 null，你可以忽略这个类型错误）。

#### useId

#### useSyncExternalStore

#### useInsertionEffect

````jsx
const useCSS = rule => {
   useInsertionEffect(() => {
     if (!isInserted.has(rule)) {
       isInserted.add(rule);
           document.head.appendChild(getStyleForRule(rule));
         }
       });
       return rule;
     };
     ```

   const App: React.FC = () => {
   const className = useCSS(rule);
   return <div className={className} />;
   };
 export default App;
````

这个 Hooks 只建议  css-in-js 库来使用。 这个 Hooks 执行时机在 DOM 生成之后，useLayoutEffect 之前，它的工作原理大致和  useLayoutEffect  相同，只是此时无法访问  DOM  节点的引用，一般用于提前注入  <style>  脚本。

##### setState 自动批处理

在 react17 中，只有 react 事件会进行批处理，原生 js 事件、promise，setTimeout、setInterval 不会
react18，将所有事件都进行批处理，即多次 setState 会被合并为 1 次执行，提高了性能，在数据层，将多个状态更新合并成一次处理（在视图层，将多次渲染合并成一次渲染）

```js
function App() {
const [count, setCount] = useState(0);
const [flag, setFlag] = useState(false);

console.log('组件渲染'); // 观察渲染次数

const handleTimeout = () => {
 setTimeout(() => {
   setCount(count + 1);
   setFlag(!flag);
   // React 17: 打印两次 "组件渲染"
   // React 18: 打印一次 "组件渲染"
 }, 1000);
};

return <button onClick={handleTimeout}>点击</button>;
}
```

#### 并发更新

```ts
// 传统同步渲染（React 17及之前）
render() → 更新DOM → 用户交互被阻塞

// 并发模式（React 18）
开始渲染 → 可中断 → 继续渲染 → 提交更新
用户交互始终可响应
```

**启用并发模式：**

```jsx
// React 18 默认启用并发特性
import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

```

#### useTransition

```jsx
import React, { useState, useEffect, useTransition } from 'react';

const App: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    // 使用了并发特性，开启并发更新
    startTransition(() => {
      setList(new Array(10000).fill(null));
    });
  }, []);
  return (
    <>
      {list.map((_, i) => (
        <div key={i}>{i}</div>
      ))}
    </>
  );
};

export default App;
```

## React19 有哪些更新？
