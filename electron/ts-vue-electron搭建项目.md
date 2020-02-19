用vue-cli3+Electron开发一个跨平台的桌面应用（这里只是搭建了项目）
原创ddx2019 最后发布于2019-10-31 22:44:52 阅读数 663  收藏
展开
## 1. 安装vue-cli3（这里使用的是yarn，进行这一步的前提是安装好node和yarn）

yarn global add @vue/cli
vue --version  （此命令意在查看vue的版本，可确认是否安装成功，）
1
2
## 2. 创建vue项目

vue create vue-electron-demo   （vue-electron-demo是你要创建的项目名称）
1
##3 . 创建vue项目过程，选常用模块以及配置
此时需要选择项目的一些配置，选定敲回车，出现的顺序以及基本选择如下：（上下键，空格是选择，enter是确定）

? Please pick a preset: (Use arrow keys)
 default (babel, eslint)———————（默认安装，选择它后项目将是默认配置）
 > Manually select features——————（自定义安装，选它后，后续又会出现你需要选择的一些模块）
 > 1
 > 2
 > 3
 > 选择自定义安装之后：(这里选择了常用模块)

? Check the features needed for your project:
 (*) Babel——————（转码器，将ES6代码转为ES5代码，从而在现有环境执行。 ）
 ( ) TypeScript——————（是JS（后缀.js）的超集，后缀为.ts,包含并扩展了 JavaScript 的语法,现很少人用）
 ( ) Progressive Web App (PWA) Support————（渐进式Web应用程序）
 (*) Router——————（vue-router  即vue路由）
 (*) Vuex——————（vuex ,vue的状态管理模式）
 (*) CSS Pre-processors——————（ CSS 预处理器（如：less、sass））
 (*) Linter / Formatter——————（代码风格检查和格式化（如：ESlint））
>( ) Unit Testing——————（单元测试）
> ( ) E2E Testing————————（/e2e（end to end） 测试）
>1
>2
>3
>4
>5
>6
>7
>8
>9
>10
>选好后敲回车：

? Use history mode for router? (Requires proper server setup for index fallback in production)
 (Y/n)———————— n （是否采用history模式，这里对vue-router，vue-router 默认使用hash模式，可参考vue-router的官网， ）
1
2
我们不采用history模式，敲“n”，回车：

? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default):
  Sass/SCSS (with dart-sass)
 > Sass/SCSS (with node-sass)————（这里选css预处理，一般项目用scss,这里选了第二个）
 >   Less
 >   Stylus
 > 1
 > 2
 > 3
 > 4
 > 5
 > eslint代码格式化检查工具的配置：

? Pick a linter / formatter config: (Use arrow keys)
 ESLint with error prevention only
  ESLint + Airbnb config
 > ESLint + Standard config——————（这里选，标准配置）
 >   ESLint + Prettier
 > 1
 > 2
 > 3
 > 4
 > 5
 > 何时进行 进行格式检查：

? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>(*) Lint on save——————（在保存代码的时候，检查代码格式）
> ( ) Lint and fix on commit
>1
>2
>3
>将babel、eslint等的配置文件放在哪里：

? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? (Use arrow keys)
 In dedicated config files
 > In package.json——————（放在package.json里）
 > 1
 > 2
 > 3
 > 是否记录，这一次的配置选择：

? Save this as a preset for future projects? (y/N)———— (N不记录)
1
安装后移动到目录 并启动：
选择后敲回车，开始创建项目，创建完成后，根据提示，输入命令，运行项目：

 cd vue-electron-demo——————（该命令是进入项目目录下）
 yarn serve——————（运行项目）
1
2
**项目运行成功：**出现 http://localhost:8080等，可在浏览器打开 http://localhost:8080 。 到此vue的项目搭建完成。

4. 搭建好vue的项目后，自动安装electron
  在命令行 Ctrl+c, 结束项目运行终止批处理操作吗(Y/N)? Y;
  项目根部运行命令：

vue add electron-builder——————（安装electron）
1
配置选项，选择Electron的版本

? Choose Electron Version (Use arrow keys)
  ^4.0.0
  ^5.0.0
> ^6.0.0——————（这里选择electron的6.0版本）
> 1
> 2
> 3
> 4
> 安装完成后，查看项目的目录结构，会自动在src目录下生成background.js并修改了package.json。
> 运行项目：

yarn electron:serve————————（运行项目）
1
编译成功后，就会出现开发环境的APP了。接下来就是改配置，进行开发。

5. 开发完成后，打包：
  yarn electron:build——————（打包的命令）
  1
  小tip：
  ① 打包完成后，项目下会多出一个dist_electron的文件夹，该文件夹下有一个**.exe**的应用程序安装包，双击可进行安装（可发给别人安装），因为这里没有进行配置，会是默认的安装路径（C盘），并会在桌面创建一个该程序的快捷方式。
  ② （dist_electron\win-unpacked）此下有一个无须安装的绿色版本，故也可将win-unpacked整个发给别人安装。
  ————————————————
  版权声明：本文为CSDN博主「ddx2019」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
  原文链接：https://blog.csdn.net/ddx2019/article/details/102847122