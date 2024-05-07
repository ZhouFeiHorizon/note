### BFC

> 块级格式化上下文 (block format context)

BFC 是一个完全独立的空间，让空间里的子元素不会影响到外面的布局

**BFC 的布局规则** \*

- 内部的 Box 会在垂直方向，一个接一个地放置。

- Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠。

- 每个盒子（块盒与行盒）的 margin box 的左边，与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

- BFC 的区域不会与 float box 重叠。

- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

- 计算 BFC 的高度时，浮动元素也参与计算。

  ```html
  <div class="root">
    <div class="float">
    </div>
  </div>
  ```

  ```css
  .float {
     width: 1500px;
     height: 500px;
     background-color: green;
     float: left;
  }
  ```

  > root 现在高度是0，给root添加BFC，root就有高度了

**触发 BFC 的条件** \*

- 根元素 html
- float 的值不是 none。
- position 的值 absoute、fixed
- display 的值是 inline-block、table-cell、flex、table-caption 或者 inline-flex
- overflow 的值不是 visible

**解决什么问题**

1. 可以用来解决两栏布局`BFC 的区域不会与 float box 重叠`

   ```css
   html,
   body {
     padding: 0;
     margin: 0;
     height: 100%;
   }
   
   .left {
     float: left;
     width: 200px;
     height: 100%;
     border: 1px solid red;
   }
   
   .right {
     overflow: hidden;
     height: 100%;
     background-color: green;
   }
   ```

   ```html
    <div class="left"></div>
    <div class="right"></div>
   ```

2. 解决 margin 塌陷和 margin 合并问题

3. 解决浮动元素无法撑起父元素