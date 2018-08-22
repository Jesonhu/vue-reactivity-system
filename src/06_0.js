'use strict';

let data = { price: 5, quantity: 2}
let target = null;

class Dep {
  constructor() {
    /** 订阅者构成的数组 */
    this.subscribers = [];
  }
  /** 保存动作 */
  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }
  /** 执行动作 */
  notify() {
    this.subscribers.forEach(sub => sub());
  }
}

// 可枚举属性
// @see Object.key()
// @see Object.getOwnProperty
// @desc get => dep.depend() 保存当前目标对象
// @desc set => dep.notify() 重新运行所有目标
Object.keys(data).forEach(key => {
  let internalValue = data[key];
  let dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      dep.depend();
      return internalValue;
    },
    set(newVal) {
      internalValue = newVal;
      dep.notify();
    }
  });
});

const watcher = (...myFunc) => {
  target = myFunc[0];
  if (myFunc[1]) {
    target.call(myFunc[1]);
  } else {
    target();
  }
  target = null;
}

watcher(() => {
  data.total = data.price * data.quantity;
});

// console.log(data.total); // => 10
// data.price = 6;
// console.log(data.total); // => 12
// data.quantity = 1;
// console.log(data.total); // => 6
window.Reactivity = data;



