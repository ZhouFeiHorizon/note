# caret-color 改变光标颜色

### 一、CSS改变输入框光标颜色的原生属性caret-color

CSS `caret-color`属性可以改变输入框插入光标的颜色，同时又不改变输入框里面的内容的颜色。

例如：

```
input {
    color: #333;
    caret-color: red;
}
```

结果光标颜色变成红色，文字还是深黑色：



`caret-color`属性不仅对于原生的输入表单控件有效，设置`contenteditable`的普通HTML标签也适用。

例如：

```
[contenteditable="true"] {
    width: 120px;
    border: 1px solid #ddd;
    padding: 3px;
    line-height: 20px;
    color: #333;
    caret-color: red;
}
```