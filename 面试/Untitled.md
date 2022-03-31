

# 有N个台阶，一步可以走一梯或者两梯，请问有多少种走法

> 最近面试，被问到了这个问题，由于没有看过算法这方面的题，自然这题就凉凉了
>
> 力扣题链接 https://leetcode-cn.com/problems/climbing-stairs/

![](D:\note\面试\images\Untitled\image-20220329234148281.png)

图片来源知乎



### 分析特殊情况

F(0) `n == 0`   0种走法

F(1) `n == 1`  1种走法

F(2) `n == 2`  2种走法



### `N > 2`



分析当要走N梯时，到底N梯时最后的一种走法只有两种，走一梯或者走两梯，那么就是从 `n-1`或者`n-2`梯上来

所以 `F(N) = F(N-1) + F(N-2)`



### 递归实现


```js
function calcWalkWay(n) {
    if (n <= 2) return n
    
    return calcWalkWay(n-1) + calcWalkWay(n-2)
}
```

优化，由于上面是递归，栈内存会消耗很大，空间复杂度很大



### 动态规划

可以使用**动态规划**

`dp[n]`就代表第`n`梯的走法

```js
function calcWalkWay(n) {
	if (n <= 2) return n
    
    const dp = []
    dp[1] = 1
    dp[2] = 2
    
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2]
    }
    return dp[n]
}
```

根据上面的还可以对数据优化

```js
function calcWalkWay(n) {
	if (n <= 2) return n
   
    let pre = 1
    let current = 2
    
    for (let i = 3; i <= n; i++) {
        //[current, pre] = [current + pre, current]
        const temp = current
        current = current + pre
        pre = temp
    }
    return current
}
```

