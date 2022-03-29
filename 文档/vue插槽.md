> 注意， `$scopedSlots`会包含`$slots`里面的内容，所以我们两个一起使用的时候，名字要不一样

- `$scopedSlots` 里面的属性值是函数，可以调用这个函数进行渲染，`$scopedSlots`会包含`$slots`
- `$slots` 里面的属性值是一个`VNode`

![img](https://img-blog.csdnimg.cn/137fde4ec1f64db5b07cae4665500855.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAemjpmL_po54=,size_20,color_FFFFFF,t_70,g_se,x_16)

###  插槽

通过 `this.$slots.xxx` 可以直接访问插槽内容

#### Child.vue 子组件

```html
<template>
  <div>
    <!-- 默认插槽  可通过$slots.default访问 -->
    <slot></slot>
    <!-- 具名插槽--footer 可通过$slots.footer访问 -->
    <slot name="footer"></slot>
  </div>
</template>
```

jsx写法

```jsx
export default {
  render() {
    return (
      <div>
        {/* 默认插槽 */}
        {this.$slots.default}

        {/* 具名插槽--footer */}
        {this.$slots.footer}
      </div>
    )
  }
}
```



#### Parent.vue 父组件

```html
<template>
  <div>
    <Child>
      <!-- 使用 -->
      <div>这是默认插槽的内容啊</div>

      <!-- 具名插槽 -->
      <footer slot="footer">这是具名插槽的内容啊，</footer>
    </Child>
  </div>
</template>
```

jsx写法

```jsx
export default {
  render(h) {
    return (
      <div>
        <Child>
          <div>这是默认插槽的内容啊</div>
          {/* 具名插槽 */}
          <footer slot="footer">这是具名插槽的内容啊，</footer>x
        </Child>
      </div>
    )
  },
}
```



### 作用域插槽

可以通过 `this.$scopedSlots.xxx(传递的数据)` 来渲染具体的组件

#### Child.vue 子组件

```html

<template>
  <!-- 作用域插槽 -->
  <div>
    <header>
      <!-- 具名插槽作用域插槽--header  在 jsx 中可以通过 $scopedSlots.header(传递的数据) 渲染-->
      <slot name="header" msg="具名作用域插槽--header"></slot>
    </header>

    <main>
      <!-- 默认作用域插槽  在 jsx 中可以通过 $scopedSlots.default(传递的数据) 渲染-->
      <slot msg="默认作用域插槽"></slot>
    </main>
    <footer>
      <!-- 具名插槽作用域插槽--footer  在 jsx 中可以通过 $scopedSlots.footer(传递的数据) 渲染-->
      <slot name="footer" msg="具名作用域插槽--footer"></slot>
    </footer>
  </div>
</template>
```

jsx写法

```jsx
export default {
  render() {
    return (
      <div>
        <header>{this.$scopedSlots.header?.({ msg: "具名作用域插槽--header" })}</header>
        <main>{this.$scopedSlots.header?.({ msg: "默认作用域插槽" })}</main>
        <footer>{this.$scopedSlots.footer?.({ msg: "具名作用域插槽--footer" })}</footer>
      </div>
    )
  },
}
```



#### Parent.vue 父组件

```html
<template>
  <div>
    <Child>
      <!-- 三种方法可以使用 #、v-slot、slot-scope  -->

      <!-- 使用 slot-scope 写法 vue 2.6.0 已废弃的使用 slot-scope  -->
      <template slot="header" slot-scope="{ msg }">
        <div>{{ msg }}</div>
      </template>

      <!-- 默认作用域插槽  -->
      <template #default="{ msg }">
        {{ msg }}
      </template>

      <!-- 作用域插槽--footer -->
      <template v-slot:footer="{ msg }">
        {{ msg }}
      </template>
    </Child>
  </div>
</template>
```

jsx写法

```jsx
export default {
  render() {
    return (
      <div>
        <Child
          scopedSlots={{
            header({ msg }) {
              return <div>{msg}</div>
            },
            default: (scoped) => {
              return scoped.msg
            },
            footer: ({ msg }) => {
              return msg
            },
          }}
        ></Child>
      </div>
    )
  }
}
```

