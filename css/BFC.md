# BFC 格式化上下文

原文链接   <https://segmentfault.com/a/1190000013647777>

## 一、BFC 的概念

### 1.规范解释

> 块格式化上下文（Block Formatting Context，BFC）是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。

### 2.通俗理解

- BFC 是一个独立的布局环境,可以理解为一个容器,在这个容器中按照一定规则进行物品摆放,并且**不会影响其它环境中的物品**。
- **如果一个元素符合触发 BFC 的条件，则 BFC 中的元素布局不受外部影响。**
- 浮动元素会创建 BFC，则浮动元素内部子元素主要受该浮动元素影响，所以**两个浮动元素之间是互不影响的**。

## 二、创建 BFC

1. 根元素或包含根元素的元素
2. 浮动元素 float ＝ left | right 或 inherit**（≠ none）**
3. 绝对定位元素 position ＝ absolute 或 fixed
4. display ＝ inline-block | flex | inline-flex | table-cell 或 table-caption
5. overflow ＝ hidden | auto 或 scroll **(≠ visible)**

## 三、BFC 的特性

1. BFC 是一个独立的容器，容器内子元素不会影响容器外的元素。反之亦如此。
2. 盒子从顶端开始垂直地一个接一个地排列，盒子之间垂直的间距是由 margin 决定的。
3. 在同一个 BFC 中，两个相邻的块级盒子的**垂直外边距**会发生重叠。
4. **BFC 区域不会和 float box 发生重叠。**
5. **BFC 能够识别并包含浮动元素，当计算其区域的高度时，浮动元素也可以参与计算了。**

## 四、BFC 的作用

### 1.包含浮动元素（清除浮动）

- 浮动元素会脱离文档流(绝对定位元素也会脱离文档流)，导致无法计算准确的高度，这种问题称为**高度塌陷**。
- 解决高度塌陷问题的前提是能够识别并包含浮动元素，也就是**清除浮动**。

![清除浮动](https://segmentfault.com/img/bVm2qT)

问题举例：如上左图所示，容器（container）没有高度或者 height = auto ,并且其子元素（sibling）是浮动元素，所以该容器的高度是不会被撑开的，即高度塌陷。

解决方法：**在容器（container）中创建 BFC。**

HTML

```
<div class="container">
        <div class="Sibling"></div>
        <div class="Sibling"></div>
</div>
```

CSS

```
.container { 
        overflow: hidden; /* creates block formatting context */ 
        background-color: green; 
} 
.container .Sibling { 
        float: left; 
        margin: 10px;
        background-color: lightgreen;  
}
```

特别提示：

- 通过 overflow:hidden 创建 BFC，固然可以解决高度塌陷的问题，但是大范围应用在布局上肯定**不是最合适的**，毕竟 overflow:hidden 会造成溢出隐藏的问题，尤其是与 JS 的交互效果会有影响。
- 我们可以使用 **clearfix** 实现清除浮动，这里就不多介绍了，想要了解的可以阅读[前端面试题-clearfix（清除浮动）](https://segmentfault.com/a/1190000013664630)。

### 2.导致外边距折叠

**相邻**的两个盒子（可能是兄弟关系也可能是祖先关系）的垂直边距相遇时， 它们将形成一个外边距。这个外边距的高度等于两个发生折叠的外边距的高度中的**较大者**。

![导致外边距折叠](https://segmentfault.com/img/bV5GnA?w=700&h=250)

HTML

```
<div class="Container"> 
    <p>Sibling 1</p> 
    <p>Sibling 2</p> 
</div>
```

CSS

```
.Container { 
    background-color: red; 
    overflow: hidden; /* creates a block formatting context */ 
} 
p { 
    background-color: lightgreen; 
    margin: 10px 0; 
}
```

如上图所示：红色盒子（Container）中包含两个绿色的兄弟元素（P），并且红色盒子设置 overflow: hidden; 则一个BFC 已经被创建,即导致外边距折叠。

理论上两个兄弟元素之间的边距应该是两个元素的边距之和（20px），但实际是 10px。这就是外边距折叠导致的。

2.1 折叠外边距的值

- 两个相邻的外边距都是 **正数** 时，折叠外边距是两者中较大的值。
- 两个相邻的外边距都是 **负数** 时，折叠外边距是两者中绝对值较大的值。
- 两个相邻的外边距是 **一正一负** 时，折叠外边距是两者相加的和。

2.2 **外边距折叠的条件是 margin 必须相邻!**

### 3.避免外边距折叠

这一听起来可能有些困惑，因为我们在前面讨论了 BFC 导致外边距折叠的问题。但我们必须记住的是**外边距折叠（Margin collapsing）只会发生在属于同一BFC的块级元素之间**。如果它们属于不同的 BFC，它们之间的外边距则不会折叠。所以通过**创建一个不同的 BFC** ，就可以避免外边距折叠。

修改前面的例子并添加第三个兄弟元素，CSS不变。

HTML

```
<div class="Container"> 
        <p>Sibling 1</p> 
        <p>Sibling 2</p> 
        <p>Sibling 3</p> 
</div>
```

结果不会改变，还会折叠外边距，三个兄弟元素（P）将会以垂直距离为 10px 的距离分开。原因是三个兄弟元素都属于同一个 BFC。

创建一个不同的 BFC ，就可以避免外边距折叠。

HTML

```
<div class="Container"> 
        <p>Sibling 1</p> 
        <p>Sibling 2</p> 
        <div class="newBFC"> 
            <p>Sibling 3</p> 
        </div> 
</div>
```

CSS

```
.Container { 
            background-color: red; 
            overflow: hidden; /* creates a block formatting context */ 
} 
p { 
            background-color: lightgreen; 
            margin: 10px 0; 
}
.newBFC { 
            overflow: hidden; /* creates new block formatting context */ 
}
```

![避免外边距折叠](https://segmentfault.com/img/bV5GGS?w=568&h=583)

当第二和第三个兄弟元素属于不同的 BFC 时，它们之间就没有外边距折叠。