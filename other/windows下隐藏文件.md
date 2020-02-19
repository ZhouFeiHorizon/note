# Windows 下彻底隐藏文件和文件夹的方法

**利用 attrib 命令来隐藏文件**

1. **首先按Win+R调出运行窗口，并输入cmd调出命令行窗口。**

![img](https://pic3.zhimg.com/80/v2-241a42e3dd5b9fe78e9334cc5d9f0be2_hd.jpg)

![img](https://pic2.zhimg.com/80/v2-ea21f345f539e247aa97600cbb2359c1_hd.png)

**2. 输入attrib命令**

比如我要隐藏D盘test文件夹中的所有文件和文件夹：

![img](https://pic2.zhimg.com/80/v2-98c68c36b90b86d9a23d84cb19dd9829_hd.jpg)

则在命令行输入

d:

cd test

attrib +h +s * /s /d

![img](https://pic1.zhimg.com/80/v2-0359810231c9736cc17c7313e307796c_hd.jpg)

再回到文件夹，可以发现文件都不见了，虽然我的文件属性里面勾选了显示隐藏文件。

![img](https://pic4.zhimg.com/80/v2-f8f7dc8f19dd97c147d9b942c4512bfb_hd.jpg)



**3. attrib 命令含义**

输入attrib /？ 得到attrib命令的含义：

![img](https://pic2.zhimg.com/80/v2-3a7a85343d3ac23c9c5b75fc73a18a71_hd.jpg)

R 只读属性
A 存档属性
S 系统属性
H 隐藏属性

/S /D 可以对该目录下所有匹配的文件和文件夹执行属性

\* 通配符，指代任意文件或者文件夹

由于我们刚刚输入了 attrib +h +s * /s /d ，就将该目录下的所有文件和文件夹都设置成了系统属性和隐藏属性。由于window默认隐藏系统文件夹，所以即便勾选了显示隐藏文件，文件还是不会显示。

**4. 恢复显示隐藏的文件和文件夹**

- 输入相反的命令 attrib -h -s * /s /d ， 这样文件就会显示出来了

![img](https://pic2.zhimg.com/80/v2-8cceccdcc47eca5f19d6d5b02257faed_hd.jpg)

- 第二种就是改变文件夹设置，去掉隐藏受保护的系统文件。

![img](https://pic1.zhimg.com/80/v2-0f8a846e259dc42caf26d3fc5587a49c_hd.png)

![img](https://pic3.zhimg.com/80/v2-82cd34facfb07dbb5c5b3b8410cdc22e_hd.jpg)

不建议这么操作。系统文件显示出来后，如果误删将会导致系统问题，这也是为什么windows默认隐藏受保护的系统文件的原因。