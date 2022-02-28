# linux 中安装 puppeteer



> 参考 https://www.jb51.net/article/174962.htm

1. 安装nodejs和npm

   ```shell
   # 下载解压
   wget -c https://nodejs.org/dist/v8.9.1/node-v8.9.1-linux-x64.tar.xz
   tar -xvf node-v8.9.1-linux-x64.tar.xz
   # 移动重命名(可选)
   mv node-v8.9.1-linux-x64 /www/nodejs
   # 创建软连接（快捷方式）,如果上一步重命名不同则这一步的下划线部分根据实际情况做调整
   ln -s /www/nodejs/bin/node /usr/local/bin/node
   ln -s /www/nodejs/bin/npm /usr/local/bin/npm
   ```

2.  由于 puppeteer 要使用浏览器， 需要安装 **chromium**, 

   ```shel
   yum install chromium
   ```

3. 安装 `puppeteer` ，有很多说只用安装 `puppeteer-core`

4. 修改启动参数，需要修改 puppeteer.launch 的 args，这是必须的

   ```js
   // get
   async function getPDF(html) {
     // const browser = await puppeteer.launch({ headless: true });
     // linux 下
     const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
     const page = await browser.newPage();
     // await page.goto('https://blog.risingstack.com', {waitUntil: 'networkidle0'});
     // await page.goto(url, { waitUntil: "networkidle0" });
     // const html = ``;
     await page.setContent(html);
   
     const pdf = await page.pdf({ format: "A4" });
   
     await browser.close();
     return pdf;
   }
   
   ```

5. 如果发现中文字符显示不出来， 安装发现有些字体文件显示不出来， 需要安装字体文件

   把本地的字体文件可以拷贝到服务器上，

   把  windows目录下  `C:\Windows\Fonts`  下部分字体文件拷贝到 linux的 `/usr/share/fonts` 目录下

   

   