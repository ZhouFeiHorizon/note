# uni-app 使用 subNVue 注意事项

## 模板注意事项

1. 文字必须用 text 标签包裹，不然设置样式无效
2. 



## css

1、在 nuve页面 中，Flexbox 是默认且唯一的布局模型。

2、宽度使用100%无效，如需撑满页面可使用 `width:750upx;`

3、nuve设置边框使用border:1px solid #d91d5a是无效的，需如下设置：

```css
border-width: 1px;
border-color: #d91d5a;
border-radius: 30upx;
```



4、不可直接对父级div元素直接设置text的样式，需对文字单独设置样式

5、如需在nvue页面设置溢出隐藏，则需在text设置如下属性：

```css
lines: 1;
text-overflow: ellipsis;
12
```

6、nvue页面不支持less和scss，并且不支持子级选择器

7、  backgound: #fff; 会不生效， 要设置成 background-color: #fff