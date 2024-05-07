主播运营平台还是创作者平台



内容流列表

PM

- 内容流（人工配置）、内容流（机械挖掘）用来干嘛的

  

- table 的选择框checkbox

- ~~移除：不做~~

  

SERVER

- 内容标签：下拉列表和游戏标签列表一样吗

  





```diff
import { useEffect, useRef } from 'react';

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isMounted = useRef(false);

+  useEffect(() => {
+   isMounted.current = false;
+  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
```



内容分发管理

ID：放在第一项， 那么固定最右边吗







1. 绑定的内容流可被分发到搜索结构化卡片



---

1. 接单方订单派送失败
2. 这个为什么不直接在server去掉（附件资料选择类型的时候去掉最后两项；）
3. 还有一个 出口单需要增加一个开舱时间
4. 字段开舱时间
