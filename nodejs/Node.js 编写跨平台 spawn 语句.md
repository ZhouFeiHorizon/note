# [Node.js 编写跨平台 spawn 语句](http://quanzhan.applemei.com/webStack/TWpVM053PT0=)



原文 <http://quanzhan.applemei.com/webStack/TWpVM053PT0=>



Node.js 是[跨平台](https://www.baidu.com/s?wd=%E8%B7%A8%E5%B9%B3%E5%8F%B0&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)的，也就是说它能运行在 [Windows](https://www.baidu.com/s?wd=Windows&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)、OSX 和 Linux 平台上。很多 Node.js 开发者都是在 OSX 上做开发的，然后再将代码部署到 Linux 服务器上。由于 OSX 和 Linux 都是基于 Unix 的，因此两者共性很多。Windows 也是 Node.js 官方支持的平台，只要你通过正确的方式写代码，就能在各个平台上毫无压力的跑起来。



Node.js 的子进程（`child_process`）模块下有一 `spawn` 函数，可以用于调用系统上的命令，如在 Linux, macOS 等系统上，我们可以执行

```
const spawn = require('child_process').spawn;spawn('npm', {stdio: 'inherit'});
```

来调用 `npm` 命令。

然而，同样的语句在 Windows 上执行则会报错。

```
Error: spawn npm ENOENTat exports._errnoException (util.js:855:11)at Process.ChildProcess._handle.onexit (internal/child_process.js:178:32)at onErrorNT (internal/child_process.js:344:16)at nextTickCallbackWith2Args (node.js:455:9)at process._tickCallback (node.js:369:17)at Function.Module.runMain (module.js:432:11)at startup (node.js:141:18)at node.js:980:3
```



因为在 Windows 上，当我们执行 `npm` 时，我们实际执行的是 `npm.cmd` 批处理，而在 Windows 上，`.cmd`, `.bat` 批处理是无法脱离 `cmd.exe` 这一解释器而单独运行的。



因此，我们需要显式地调用 `cmd`



```
spawn('cmd', ['/c', 'npm'], {stdio: 'inherit'});
```



或者使用在调用 `spawn` 函数时，设置 `shell` 选项为 `true` 以隐式地调用 `cmd` （该选项[添加](https://github.com/nodejs/node/commit/c3bb4b1aa5e907d489619fb43d233c3336bfc03d)自 Node.js v6 版本）



```
spawn('npm', {stdio: 'inherit',shell: true});
```



另外，虽然在 Linux, macOS 等系统上不需要设置 `shell` 选项，命令也能够正常执行；设置 `shell` 为 `true` 也不会妨碍命令的执行，只是会额外的产生一个本不必要的 shell 进程，影响性能。



因此，如果想要编写跨平台的 spawn 命令，而又不想增加额外的开销的话，可以这样写



```
const process = require('process');const { spawn } = require('child_process');spawn('npm', {stdio: 'inherit',// 仅在当前运行环境为 Windows 时，才使用 shellshell: process.platform === 'win32'});
```



## 第三方模块 [cross-spawn](https://www.npmjs.com/package/cross-spawn)



关于 `spawn` 函数的跨平台写法，除了自己编写代码的时候做处理，也有第三方模块封装好了相关细节，如 [cross-spawn](https://www.npmjs.com/package/cross-spawn)。



使用该模块，可以在调用 `spawn` 函数时，自动根据当前的运行平台，来决定是否生成一个 shell 来执行所给的命令。





而且，还能够





- 支持低于 v6 的 Node.js 版本 （使用 `shell` 选项需要至少 Node.js v6）；
- 跨平台地支持 [shebang](https://zh.wikipedia.org/wiki/Shebang)；
- 对命令和参数中的字符进行转义更为方便。



### 安装



```
npm install cross-spawn
```



### 用法



```js
const spawn = require('cross-spawn');
spawn('npm', {stdio: 'inherit'});
```