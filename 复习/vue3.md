## vue3

> [Vue3 的 8 种和 Vue2 的 12 种组件通信，值得收藏](https://juejin.cn/post/6999687348120190983)
>
> [聊一聊 Vue3 的 9 个知识点](https://juejin.cn/post/7026249448233631752)

**Vue3 有哪些变化**

- 新增了三个组件：`Fragment` 支持多个根节点、`Suspense` 可以在组件渲染之前的等待时间显示指定内容、`Teleport` 可以让子组件能够在视觉上跳出父组件(如父组件 overflow:hidden)
- 新增指令 `v-memo`，可以缓存 html 模板，比如 v-for 列表不会变化的就缓存，简单说就是用内存换时间
- 支持 `Tree-Shaking`，会在打包时去除一些无用代码，没有用到的模块，使得代码打包体积更小
- 新增 `Composition API` 可以更好的逻辑复用和代码组织，同一功能的代码不至于像以前一样太分散，虽然 Vue2 中可以用 minxin 来实现复用代码，但也存在问题，比如方法或属性名会冲突，代码来源也不清楚等
- 用 `Proxy` 代替 `Object.defineProperty` 重构了响应式系统，可以监听到数组下标变化，及对象新增属性，因为监听的不是对象属性，而是对象本身，还可拦截 apply、has 等 13 种方法
- 重构了虚拟 DOM，在编译时会将事件缓存、将 slot 编译为 lazy 函数、保存静态节点直接复用(静态提升)、以及添加静态标记、Diff 算法使用 最长递增子序列 优化了对比流程，使得虚拟 DOM 生成速度提升 `200%`
- 支持在 `<style></style>` 里使用 `v-bind`，给 CSS 绑定 JS 变量(`color: v-bind(str)`)
- 用 `setup` 代替了 beforeCreate 和 created 这两个生命周期
- 新增了**开发环境**的两个钩子函数，在组件更新时 `onRenderTracked` 会跟踪组件里所有变量和方法的变化、每次触发渲染时 `onRenderTriggered` 会返回发生变化的新旧值，可以让我们进行有针对性调试
- 毕竟 Vue3 是用 `TS` 写的，所以对 `TS` 的支持度更好
- Vue3 不兼容 `IE11`

### vue3 生命周期

| 选项式 API        | Hook inside `setup` |
| ----------------- | ------------------- |
| `beforeCreate`    | Not needed\*        |
| `created`         | Not needed\*        |
| `beforeMount`     | `onBeforeMount`     |
| `mounted`         | `onMounted`         |
| `beforeUpdate`    | `onBeforeUpdate`    |
| `updated`         | `onUpdated`         |
| `beforeUnmount`   | `onBeforeUnmount`   |
| `unmounted`       | `onUnmounted`       |
| `errorCaptured`   | `onErrorCaptured`   |
| `renderTracked`   | `onRenderTracked`   |
| `renderTriggered` | `onRenderTriggered` |
| `activated`       | `onActivated`       |
| `deactivated`     | `onDeactivated`     |

### 基本代码

#### main.js

```js
// main.js
import { createApp } from "vue";
import App from "./App.vue";

import HelloWorld from "./components/HelloWorld.vue";
const app = createApp(App);

// 全局组件
app.component("HelloWorld", HelloWorld);

// 全局属性
// vue2.0 Vue.prototype.$http
app.config.globalProperties.$http = () => {
  console.log("http ==");
};

app.mount("#app");
```

#### App.vue

```html
<!--- App.vue  -->
<template>
  <div>
    <!-- v-model="xxx"  <==> v-model:modelValue="xxx" -->
    <!-- :value="xxx" @input="xxx = $event" -->
    <!-- value $emit('input', '传递') -->

    <!-- 
      visible.sync="visible" 
      ==>
      :visible="visible" @update:visible="visible = $event"
      -->

    <!-- vue3 把 .sync 去掉，==> 
        v-model:visible="visible"
       -->

    <!--     
    <div :ref="setDivRef">
      count: {{ count }}
      <p>
        <button @click="add">+</button>
        <button @click="reduce">-</button>
      </p>
    </div>

    <ul>
      <li>姓名：{{ user.name }}</li>
      <li>年龄：{{ user.age }}</li>
    </ul> -->

    <!-- v-model="num" -->
    <Child
      title="父组件传递的title"
      :modelValue="num"
      @update:modelValue="num = $event"
      @change="onChildChange"
      v-model:visible="visible"
      ref="childRef"
    ></Child>
    <!-- <HelloWorld></HelloWorld> -->
  </div>
</template>

<script>
  import Child from "./Child-setup.vue";
  import { reactive, ref } from "@vue/reactivity";
  import { onMounted, provide } from "@vue/runtime-core";
  export default {
    components: { Child },
    // data() {
    //   return {
    //     msg: '哈哈哈',
    //   }
    // },
    setup() {
      const msg = ref("哈哈哈2"); // => reactive({value: 哈哈哈2 })
      const obj = ref({ x: "xx" });
      console.log(" obj.value: ", obj.value);
      const user = reactive({ name: "张三", age: 18 });
      const count = ref(0);

      provide("count", count);
      provide("http", () => {
        console.log("$http >>>");
      });

      const add = () => {
        count.value++;
      };

      const reduce = () => {
        count.value--;
      };

      const num = ref(1);
      const visible = ref(false);

      // this.$refs.childRef x
      // refs
      // 1. 用字符串
      const childRef = ref(null);
      onMounted(() => {
        console.log(" childRef.value: ", childRef.value);
      });

      let divRef;
      const setDivRef = (el) => {
        console.log(" el: ", el);
        divRef = el;
      };

      return {
        msg,
        user,
        count,
        add,
        reduce,
        num,
        visible,
        childRef,
        setDivRef,
      };
    },

    methods: {
      onChildChange() {},
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
```

#### Child-composition （组合式 api）

```html
<template>
  <!-- 
  1. 多个片段， 多个根标签 
  2. v-for v-if 优先级变化 v3 v-if > v-for
-->
  <div>
    <button @click="triggerEvent">触发事件</button>

    <div>num2：{{ num2 }}</div>
    <div>count：{{ count }}</div>

    modelValue：{{ modelValue }}
    <button @click="add">+</button>
    <hr />
    visible：{{ visible }}
    <button @click="updateVisible">更新visible</button>

    <!--   -->
    <teleport to="body">
      <div v-if="visible">对话框</div>
    </teleport>
  </div>
</template>

<script>
  import {
    computed,
    inject,
    onActivated,
    onBeforeMount,
    onBeforeUnmount,
    onBeforeUpdate,
    onDeactivated,
    onMounted,
    onUnmounted,
    onUpdated,
    watch,
    watchEffect,
  } from "@vue/runtime-core";
  export default {
    props: {
      title: String,
      modelValue: Number,
      visible: Boolean,
    },
    // computed: {
    //   num2() {
    //     return this.modelValue * 2
    //   }
    // },
    emits: ["change", "update:modelValue", "update:visible"],
    // 发生在 beforeCreate
    // attrs 除了 class style,props 之外的属性
    //

    // watch: {
    //   title: {
    //     deep: true, // 深度简单

    //   }
    // },
    // 组合式API(composition),  选项式API(options)
    setup(props, { emit, attrs, slots }) {
      console.log(" attrs: ", attrs);
      console.log(" props: ", props);

      // computed
      const num2 = computed(() => props.modelValue * 2);
      // const num2 = computed({
      //   get: () => props.modelValue * 2,
      //   set: (val) => {
      //     ssss
      //   }
      // })

      //
      const count = inject("count");
      console.log(" count: ", count);

      // watch
      // this.$watch()
      const unwatch = watch(
        () => props.modelValue,
        (newVal, oldValue) => {
          console.log(" newVal: ", newVal);
          if (newVal >= 10) {
            // 取消监听
            unwatch();
          }
        },
        {
          deep: true,
          // immediate: true
        }
      );

      // 自动收集依赖，所以会初始化的时候就执行一次
      watchEffect(() => {
        console.log(" props.modelValue: ", props.modelValue);
      });

      // hooks
      onBeforeMount(() => {});
      onMounted(() => {
        console.log("哈哈哈");
      });
      onBeforeUpdate(() => {});
      onUpdated(() => {});
      onBeforeUnmount(() => {});
      onUnmounted(() => {});

      // keep-alive
      onActivated(() => {});
      onDeactivated(() => {});

      // methods
      const triggerEvent = () => {
        emit("change", "传递的数据");
      };

      const add = () => {
        emit("update:modelValue", props.modelValue + 1);
      };
      const updateVisible = () => {
        console.log(" props.visible: ", props.visible);
        emit("update:visible", !props.visible);
      };

      return {
        triggerEvent,
        add,
        updateVisible,
        num2,
        count,
      };
    },
    // beforeCreate() {
    //   console.log('beforeCreate')
    // },
    // created() {
    //   console.log('created')
    // },

    // beforeDestroy beforeUnmount
    // destroyed unmounted
  };
</script>
```

#### Child-setup

```html
<template>
  <div>
    <p>title: {{ title }}</p>
    <p>num2: {{ num2 }}</p>
    <p>count: {{ count }}</p>

    <div>
      modelValue：{{ modelValue }}
      <button @click="add">+</button>
    </div>

    <button @click="triggerEvent">触发事件</button>

    <!-- <input type="text" v-model="inputValue"> -->
    <!--   -->
    <input type="text" :value="inputValue" @input="onInputUpdate" />

    <!-- volar -->
    <Foo></Foo>
  </div>
</template>

<!--- vue 3.2.x -->
<script setup>
  import {
    computed,
    getCurrentInstance,
    inject,
    ref,
    useAttrs,
    useSlots,
  } from "@vue/runtime-core";
  import Foo from "./foo.vue";

  // props
  const props = defineProps({
    title: String,
    modelValue: Number,
  });
  // computed
  const num2 = computed(() => props.modelValue * 2);
  const count = inject("count");

  // emit
  const emit = defineEmits(["change", "update:modelValue", "update:visible"]);
  const triggerEvent = () => {
    emit("change", "传递的数据");
  };
  const add = () => {
    emit("update:modelValue", props.modelValue + 1);
  };

  // 向父组件暴露自己的属性和方法
  defineExpose({
    num2,
    test() {
      console.log("888");
    },
  });

  const attrs = useAttrs();
  console.log(" attrs: ", attrs);
  const solts = useSlots();

  const ctx = getCurrentInstance();

  const http = ctx.appContext.config.globalProperties.$http;
  http("xxx");

  const $http = inject("http");
  $http();

  // $ref: ref(false)

  const inputValue = ref("");

  const onInputUpdate = (event) => {
    console.log(" event: ", event);
    inputValue.value = event.target.value;
  };
</script>
```

## 