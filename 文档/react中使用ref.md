## 类组件中使用ref

在类组件中，你可以使用`createRef`来创建一个ref，并将它附加到DOM元素或类组件实例上。使用ref允许你在类组件中访问和操作特定的DOM元素或类组件实例。

下面是在类组件中使用ref的步骤：

1. 引入`React`和`createRef`：
   在类组件文件的顶部，你需要从React中导入`React`和`createRef`。

    ```jsx
    import React, { Component, createRef } from 'react';
    ```

2. 创建ref：
   使用`createRef`来创建一个ref对象。

    ```jsx
    class MyClassComponent extends Component {
      constructor(props) {
        super(props);
        this.myRef = createRef();
      }
   
      // ...
    }
    ```

    在上面的例子中，我们在类组件`MyClassComponent`的构造函数中创建了一个ref（`myRef`）。

3. 绑定ref到DOM元素或类组件实例：
   将创建的ref（`myRef`）绑定到你想要引用的DOM元素或类组件实例上。在类组件中，你可以使用`ref`属性来实现这一点。

    ```jsx
    class MyClassComponent extends Component {
      constructor(props) {
        super(props);
        this.myRef = createRef();
      }
   
      render() {
        return <input ref={this.myRef} />;
      }
    }
    ```

	在上面的例子中，我们将ref（`myRef`）绑定到了一个`input`元素上。

4. 在类组件中使用ref：
   现在，你可以在类组件的其他方法中通过`this.myRef.current`来访问和操作引用的DOM元素或类组件实例。

    ```jsx
    class MyClassComponent extends Component {
      constructor(props) {
        super(props);
        this.myRef = createRef();
      }
   
      handleButtonClick = () => {
        if (this.myRef.current) {
          this.myRef.current.focus();
        }
      };
   
      render() {
        return (
          <div>
            <input ref={this.myRef} />
            <button onClick={this.handleButtonClick}>Focus Input</button>
          </div>
        );
      }
    }
    ```

    在上面的例子中，我们创建了一个按钮点击事件`handleButtonClick`，当按钮被点击时，会调用`this.myRef.current.focus()`来将焦点设置到`input`元素上。

    通过这种方式，你可以在类组件中使用ref来引用和操作特定的DOM元素或类组件实例。

## ref 的使用使用方式

在 React Hooks 组件中，你可以使用`useRef`来创建并使用 ref。`useRef`是一个 Hooks 函数，它允许你在函数组件中保持可变的数据，类似于在类组件中使用实例属性。ref 在许多情况下很有用，例如访问 DOM 元素、存储任意值等。

使用`useRef`的步骤如下：

1. 引入`useRef`：
   在组件文件中，首先需要从 React 中导入`useRef`：

```jsx
import React, { useRef } from 'react';
```

2. 创建 ref：
   使用`useRef`来创建一个 ref 对象：

```jsx
const myRef = useRef(initialValue);
```

其中，`initialValue`是 ref 的初始值。

3. 将 ref 绑定到 DOM 元素：
   将`myRef`绑定到你想要引用的 DOM 元素上。这通常通过在 JSX 中的`ref`属性中传递`myRef`来实现：

```jsx
<input ref={myRef} />
```

4. 在组件中使用 ref：
   你可以在组件中通过`myRef.current`来访问 ref 的当前值。这是一个可变的对象，可以用于存储和读取任何数据。

```jsx
const MyComponent = () => {
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleButtonClick}>Focus Input</button>
    </div>
  );
};
```

在上面的例子中，我们创建了一个 input 元素的 ref，并在按钮点击事件中使用`inputRef.current.focus()`来将焦点设置到 input 元素上。

需要注意的是，`useRef`返回的`myRef.current`属性在组件的整个生命周期中保持不变，但是其内部的值可以在不重新渲染组件的情况下发生变化。这使得`useRef`适用于存储在组件渲染期间需要跨渲染保持不变的数据。


## 自定义组件ref

当你在React中创建自定义组件时，如果想在父组件中使用ref引用子组件，你需要使用`forwardRef`方法。`forwardRef`允许你将ref从父组件传递到子组件中。

下面是使用`forwardRef`的步骤：

1. 在子组件中使用`forwardRef`方法：
   在子组件中使用`forwardRef`方法来传递ref，并将它与子组件的DOM元素或其他需要引用的元素绑定起来。同时，确保在组件定义中的第二个参数（通常称为`ref`）中接收传递的ref。

```jsx
import React, { forwardRef } from 'react';

const CustomChildComponent = forwardRef((props, ref) => {
  return <input ref={ref} />;
});
```

在上面的例子中，我们创建了一个名为`CustomChildComponent`的自定义子组件，并在其中使用`forwardRef`来传递`ref`参数，并将它绑定到了`input`元素上。

2. 在父组件中使用ref：
   现在，你可以在父组件中使用`CustomChildComponent`并将一个ref传递给它。这样，父组件就可以引用子组件内部的`input`元素。

```jsx
import React, { useRef } from 'react';
import CustomChildComponent from './CustomChildComponent';

const ParentComponent = () => {
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <CustomChildComponent ref={inputRef} />
      <button onClick={handleButtonClick}>Focus Input</button>
    </div>
  );
};
```

在上面的例子中，我们在父组件中创建了一个ref（`inputRef`），并将它传递给`CustomChildComponent`作为`ref`属性。现在，我们可以在`handleButtonClick`函数中使用`inputRef.current.focus()`来将焦点设置到子组件中的`input`元素上。

通过这样的方法，你就可以在自定义组件中使用ref，并从父组件中控制子组件内部的DOM元素或组件实例。

## 自定义组件ref想向外暴露一些方法
如果你希望自定义组件使用ref时向外暴露一些方法，可以通过在子组件内部创建一个ref，并将它与需要暴露的方法关联。然后，将这个ref作为一个对象，包含暴露的方法，传递给父组件。这样，父组件就可以通过ref调用子组件暴露的方法。

下面是一个示例：

1. 子组件中创建ref和暴露方法：

```jsx
import React, { forwardRef, useRef, useImperativeHandle } from 'react';

const CustomChildComponent = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  // 暴露给父组件的方法
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 使用 useImperativeHandle 将方法暴露给父组件
  useImperativeHandle(ref, () => ({
    focusInput: focusInput
  }));

  return <input ref={inputRef} />;
});
```

在上面的例子中，我们创建了一个ref（`inputRef`）来引用`input`元素，并定义了一个`focusInput`方法用于将焦点设置到`input`元素上。然后，我们使用`useImperativeHandle`将`focusInput`方法暴露给父组件。

2. 在父组件中使用子组件的暴露方法：

```jsx
import React, { useRef } from 'react';
import CustomChildComponent from './CustomChildComponent';

const ParentComponent = () => {
  const childComponentRef = useRef(null);

  const handleButtonClick = () => {
    if (childComponentRef.current) {
      childComponentRef.current.focusInput();
    }
  };

  return (
    <div>
      <CustomChildComponent ref={childComponentRef} />
      <button onClick={handleButtonClick}>Focus Input</button>
    </div>
  );
};
```

在上面的例子中，我们在父组件中创建了一个ref（`childComponentRef`），并将其传递给`CustomChildComponent`。在父组件中的`handleButtonClick`函数中，我们可以通过`childComponentRef.current.focusInput()`调用子组件中暴露的`focusInput`方法，将焦点设置到子组件的`input`元素上。

通过这种方式，你可以在自定义组件中使用ref，并将一些方法暴露给父组件，使父组件可以调用子组件的特定功能。