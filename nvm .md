# windows下安装 nvm+踩坑记录

> NVM (Node Version Manager): Nodejs的版本管理工具

1. 下载 `nvm` ，访问链接 https://github.com/coreybutler/nvm-windows/releases ， 点击 `nvm-setup.zip`，先下载下来，别着急安装

2. 卸载原有的`nodejs`，把以前的`nodejs`卸载

3. 安装nvm,解压，点击nvm-setup.exe进行安装，一直下一步就可以了

4. 安装成功之后，我们就可以用命令 `nvm install <版本号>` 安装指定的node版本了，如果发现安装失败，下载速度很慢，我们可以设置成**淘宝镜像**下载，进入`nvm` 的安装目录（默认目录是：`C:\Users\Administrator\AppData\Roaming\nvm`）找到`settings.txt`文件

   在文件的最后加入以下内容

   ```
   node_mirror: https://npm.taobao.org/mirrors/node/
   npm_mirror: https://npm.taobao.org/mirrors/npm/
   ```

   

   ```bash
   nvm install <版本号>  #安装指定版本
   nvm install latest  #安装最新版
   nvm install lts #安装长期支持版
   nvm current    #查看当前使用的node版本
   
   nvm list # 查看安装的所用版本
   
   nvm use <版本号> # 切换到指定版本
   ```

5.  使用 `nvm use <版本号>` 把node切换到指定版本，**注意：如果这里有报错，nvm use 版本号 出现了乱码**那是权限问题，我们需要进入目录`C:\Windows\System32` 找到 `cmd.exe` 右键选择管理员身份运行，之后执行`nvm use 版本号` 没有报错就解决了。

6.  使用 node -v 查看当前node版本是否切换成功

   

参考 

https://blog.csdn.net/Zxiuping/article/details/120719532

https://www.jianshu.com/p/1886243db936