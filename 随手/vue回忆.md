# vue.js 乱写

## 2019-7-18

v-on

修饰符

.stop - ev.stopPropagation();
.prevent - ev.preventDefault();
.once 
.left 鼠标有左键
.right 右键
.middle 中健

键修饰符
@keyup.enter

子组件, 更新 title

```js

this.$emit("update:title", this.title)

```

```html
<div 
    v-bind:title="doc.title"
    v-on:update:title="doc.title=$event"></div>

```

为了方便起见
在父组件中

```html
<div v-bind:title.sync="doc.title"></div>
```

:title.sync="doc.title"

this.$emit('update:title', newValue)

