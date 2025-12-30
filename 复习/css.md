### Flex 布局

> https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

注意，设为 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效。

#### 容器

- flex-direction
- flex-wrap
- flex-flow: 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap。
- justify-content
- align-items
- align-content: 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
- grid-template-areas：  的值是一个字符串网格，每个字符串代表一行，每个单词代表一列。相同的区域名称会合并单元格。

```scss
.flex-container {
  display: flex;
  align-items: 'center';
  justify-content: '';
  flex-direction: column;
}
```

#### 项目

- order
- flex-grow
- flex-shrink
- flex-basis: => width = flex-basis !== 'auto' ? flex-basis : width
- flex
- align-self 属性允许单个项目有与其他项目不一样的对齐方式

flex: <flex-grow> <flex-shrink> <flex-basis>

flex: initial => flex: 0 1 auto; // 初始值
flex: auto => flex: 1 1 auto; // 自动弹性。可放大可收缩，基准为自身尺寸。项目会“充满”容器。
flex: none => flex: 0 0 auto; // 无弹性。固定尺寸，既不放大也不收缩。
flex: 0 => flex: 0 1 0%; //
flex: 1 => flex: 1 1 0%;
flex: 2 => flex: 2 1 0%;
flex: 200px => flex: 1 1 200px;

## Grid 布局

> https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: repeat(3, 1fr)
}

```

- grid-template-columns

  ```scss

  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); // 始终保持每列的最小宽度，即使有空列auto-fill 最小宽度

  grid-template-columns:repeat(auto-fit, minmax(100px, 1fr)); // auto-fit 内容扩展填充所有可用空间

  ```

- align-items: 单元格内容的垂直
- justify-items: start | end | center | stretch; 单元格内容的水平位置
- place-items: <align-items> <justify-items>
- justify-content： 内容区域在容器里面的水平位置
- algin-content: 内容区域在容器里面的垂直位置
- align-center: 内容区域的垂直位置
- place-content: <align-content> <justify-content>
