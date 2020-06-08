# css命名方法总结

把页面分隔成模块， 模板的类名唯一

比如侧栏导航 

```shell
# 结构
.side-nav
  .side-nav-list
  .slide-nav-item
```



```scss

//  有些小的
.side-nav {
    // BEM
    &__wrap {
        // wrap 下面应该还有一层单独的
    }
    &__content {
        
        // 有可能有同级
        // 有margin，没有padding
    }
    &__inner {
        // 没有同级
        // 对应的内层、有padding，没有margin
    }
    &-list {
        
    }
    &-item {
        
    }
    .xxx {
        
    }
}
```

