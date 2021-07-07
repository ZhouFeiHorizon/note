# [node版本切换工具n的使用介绍](https://www.cnblogs.com/shengulong/p/11937317.html)

#### 全局安装

```
npm install -g n
```

mac的安装目录/usr/local/n/versions/node/13.2.0

因此首先在/usr/local/创建目录n，修改权限为普通访问权限，这样后续操作就不需要使用sudo

#### 基本操作

n x.x.x 安装某个版本

n latest 安装最新版本

n stable 安装稳定版本lts

n rm x.x.x 删除某个版本

n use 7.10.0 some.js 用制定的版本执行脚本
n 可以查看所有已安装的node版本，可以根据上下和回车选择要使用的版本

n help 帮助信息

n ls 查看已经安装的版本

n ls-remote --all 查看服务器上所有可用的版本





## nvm 

### windows下nvm的命令([]中的参数可有可无)：

```
nvm arch                         查看当前系统的位数和当前nodejs的位数
nvm install <version> [arch]     安装制定版本的node 并且可以指定平台 version 版本号  arch 平台
nvm list [available]         
  - nvm list   查看已经安装的版本
  - nvm list installed 查看已经安装的版本
  - nvm list available 查看网络可以安装的版本
nvm on                           打开nodejs版本控制
nvm off                          关闭nodejs版本控制
nvm proxy [url]                  查看和设置代理
nvm node_mirror [url]            设置或者查看setting.txt中的node_mirror，如果不设置的默认是 https://nodejs.org/dist/
nvm npm_mirror [url]             设置或者查看setting.txt中的npm_mirror,如果不设置的话默认的是：https://github.com/npm/npm/archive/.
nvm uninstall <version>          卸载制定的版本
nvm use [version] [arch]         切换制定的node版本和位数
nvm root [path]                  设置和查看root路径
nvm version                      查看当前的版本
```