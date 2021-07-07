# [node.js 断点调试](https://www.cnblogs.com/xyyyy/p/10310328.html)

> 原文链接 https://www.cnblogs.com/xyyyy/p/10310328.html

首先进入node的目录 然后  

```shell
node --inspect-brk  你需要调试的js
```

提示如下

 ```shell
Debugger listening on ws://127.0.0.1:9229/c0d4687c-fe68-4ef6-99bd-707fa4d233b3

For help see https://nodejs.org/en/docs/inspector
 ```



这个时候打开谷歌  输入链接 chrome://inspect/#devices 点击  inspect 按钮

然后就可以打断点调试了。