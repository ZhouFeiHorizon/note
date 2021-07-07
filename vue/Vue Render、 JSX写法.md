# Vue Render、 JSX写法



## 插槽

> `this.$scopedSlots` 访问作用域插槽，每个作用域插槽都是一个返回若干 VNode 的函数 
>
> `this.$slots` 访问静态插槽的内容，每个插槽都是一个 VNode 数组

 #### Vue中使用

###### 默认插槽

```js
// 定义带插槽的组件，`$slots.default`为匿名插槽，其余的则是具名插槽，匿名插槽的插槽名可以省略
const MySlot = {
  render (h) {
    return h('div', [
      h('header', [this.$slots.header]),
      h('main', [this.$slots.header]),
      h('footer', [this.$slots.footer])
    ])
  }
}

// 在`children子节点`中指定插槽名以使用具名插槽，未指定插槽名的则放入匿名插槽中
export default {
  components: { MySlot },
  render (h) {
    return h('MySlot', [
      h('template', { slot: 'header' }, 'hello world'),
      'children node',
      h('div', { slot: 'footer' }, 'this is footer')
    ])
  }
}


```

###### 作用域插槽

```js
// 定义作用域插槽
const MySlot = {
  data () {
    return { user: 'John', content: 'vue', copytight: 'CopyRight' }
  },
  render (h) {
    return h('div', [
      h('header', [this.$scopedSlots.header({ user: this.user })]),
      h('main', [this.$scopedSlots.default({ content: this.content })]),
      h('footer', [this.$scopedSlots.footer({ copytight: this.copytight })])
    ])
  }
}

// 要使用作用域插槽的数据内容，则插槽必须在组件的数据对象`scopedSlots`中使用，如`header`所示
// 作用域插槽也可以当作普通插槽使用，如`default`和`header`
export default {
  components: { MySlot },
  render (h) {
    return h('MySlot', {
      scopedSlots: {
        header: props => `hello, ${props.user}`
      }
    }, [
      'children node',
      h('div', { slot: 'footer' }, 'this is footer')
    ])
  }
}


```

#### JSX中使用

```jsx
export default {
    render(h) {
        return <div>{this.scopedSlots.default()}</div>
    }
}
```

自定义调用、比如通过实例、自定义渲染、（例如表格插件中用）

```jsx
export default {
    render(h) {
        const instance = this.instance
        const defaultSlot = instance.$scopedSlots.default
        // 定义插槽
        if (defaultSlot) {
            // scopedData
            return defaultSlot(scopedData)
        }
    }
}
```



###### 默认插槽

```jsx
const MySlot = {
  render (h) {
    return (
      <div>
        <header>{this.$slots.header}</header>
        <main>{this.$slots.default}</main>
        <footer>{this.$slots.footer}</footer>
      </div>
    )
  }
}

export default {
  render (h) {
    return (
      <MySlot>
        <template slot='header'>hello world</template>
        children node
        <div slot='footer'>this is footer</div>
      </MySlot>
    )
  }
}

```

###### 作用域插槽

```jsx
const MySlot = {
  data () {
    return { user: 'John', content: 'vue', copytight: 'CopyRight' }
  },
  render (h) {
    return (
      <div>
        <header>{this.$scopedSlots.header({ user: this.user })}</header>
        <main>{this.$scopedSlots.default({ content: this.content })}</main>
        <footer>{this.$scopedSlots.footer({ copytight: this.copytight })}</footer>
      </div>
    )
  }
}

export default {
  render (h) {
    return (
      <MySlot
        scopedSlots={{
          header: props => `hello, ${props.user}`
        }}
      >
        children node
        <div slot='footer'>this is footer</div>
      </MySlot>
    )
  }
}

```



## 问题

1. 属性 `model` 不能传递

   不生效

   ```html
   <Form model={model} />
   ```

   通过props解决

   ```html
   <Form {...{ props: { model: model } }}>
       
   </Form>
   ```

   