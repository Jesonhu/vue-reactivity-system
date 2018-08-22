# Vue 数据响应系统原理简单实现测试代码

### 步骤
1. [JS 编程常规工作方式](./src/01.js)
2. [保存工作方式](./src/02.js)
3. [扩展出负责维护目标列表的类](./src/03.js)
4. [观察者功能](./src/04.js)
5. [Object.defineProperty()](./src/05_1.js)
6. [两者结合](./src/05_2.js)
7. [Reactivity](./src/06_0.js)
8. 待优化...

### 参考资料
+ [Vue.js是如何做到数据响应的](http://web.jobbole.com/95035/)
+ 订阅者模式
+ [Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
+ [JavaScript中typeof详解](https://www.cnblogs.com/liu-fei-fei/p/7715870.html)
+ [Vue技术内幕](http://hcysun.me/vue-design/art/1start-learn.html)
+ Vue Dev分支源码:
  + [vue/src/core/observer/dep.js--Dep实现](https://github.com/vuejs/vue/blob/dev/src/core/observer/dep.js)
  + [vue/src/core/observer/index.js--定义Getter和Setter](https://github.com/vuejs/vue/blob/dev/src/core/observer/index.js)