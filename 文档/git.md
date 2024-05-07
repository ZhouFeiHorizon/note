git常见问题
git拉取代码操作，你知道多少

很久没有更新博客了，由于前段时间换工作了，又接了其他的单，导致自己一直忙

前段时间入职新公司遇到一个问题，我们入职新公司了，那第一天肯定是要基础环境，我想着这不是很简单么，node，vscode，git，同步账号数据，笔记等，这一切对于我来说很简单呢，都是熟悉的操作，但我拉去代码的时候我傻眼了，这gitlab没有账号和密码呀，那我还怎么怎么拉代码

我们一般拉取代码都是通过http协议 git clone http://xxxxxxx
如果我们第一次clone，会让我们输入账号和密码，之后会保存在本地

之前就知道ssh协议，不过这玩意一直没有用过，当时想着我用http协议拉取，自己就懒的去学习了

http协议和ssh拉代码区别
Http协议拉代码我们可以匿名访问，对公用仓库可以直接取拉取

ssh协议拉代码我们必须要有认证信息

ssh协议来代码我们需要本地设置秘钥对，通过 ssh-keygen -t rsa -C "your_email@youremail.com"之后一直回车就可以了，生成，之后找到.ssh/xxx.rsa 
把公钥放到我们的代码仓库gitlab上
 git clone ssh:xxxx

git的其他问题

git pull和git fetch区别
这两个命令都是代码，git fetch是吧远程服务器的代码拉取到本地
git  pull是把远程服务器的代码拉取到本地并执行合并操作
git pull 其实就是执行了两个命令 git fetch和git merge