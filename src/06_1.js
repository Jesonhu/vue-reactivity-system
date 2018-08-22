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

/**
 * 简单的数据响应类 
 */
class Reactivity {
  constructor(options) {
    this._options = {
      // 数据
      data: {},
      // 响应实现
      watcher: {}
    }

    // 传了参数
    if (options) {
      this._options = options;
      for (let key in this._options) {
        if (this._options.hasOwnProperty(key)) {
          // data property
          if (key === 'data') {
            this.setOwnProperty(this._options['data']);
          }

          // property
          if (key === 'watcher') {
            this.setOwnMethod(this._options['watcher'])
          }
        }
      }
      this.addSetterAndGetter();
    }
  }
  /** 
   * 将`data`中的属性添加为自己的属性.
   * 
   * @param {Object} data 实例化时参数对象`data`的值
   */
  setOwnProperty(data) {
    const _this = this;
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        _this[key] = data[key]
      }
    }
  }
  /** 
   * 将`watcher`等对象的属性添加为自己的属性.
   * 
   * @param {Object} methods  实例化时参数对象`watcher`或`computer`等的值
   */
  setOwnMethod(methods) {
    // this.setOwnProperty(methods);
    // watcher 中的`key`转换为自己的属性
    for (let key in methods) {
      if (methods.hasOwnProperty(key)) {
        this[key] = methods[key].call(this);
        this.addSetterAndGetter();
      }
    }
    this.watcher(methods);
  }
  /** 添加`getter`和`setter` */
  addSetterAndGetter() {
    for (let key in this) {
      // 只有属性且排除方法
      if (this.hasOwnProperty(key) && typeof this[key] !== 'function') {
        Object.keys(this).forEach(key => {
          let internalValue = this[key];
          let dep = new Dep();
          Object.defineProperty(this, key, {
            get() {
              dep.depend();
              return internalValue;
            },
            set(newVal) {
              internalValue = newVal;
              console.log('设置值');
              dep.notify();
            }
          });
        });
      }
    }
  }
  watcher(methods) {
    for (let key in methods) {
      if (methods.hasOwnProperty(key)) {
        watcher(methods[key], this);
      }
    }
  }
}

let reacter = new Reactivity({
  data: {
    price: 5,
    quantity: 2
  },
  // Or Named Other Name Like Computed 
  // 可以叫做其他名字
  watcher: {
    total: function () {
      return this.price * this.quantity;
    }
  }
});

console.log(reacter.total);



