/**
 * @see 观察者模式
 */
class Dep {
  constructor() {
    this.subscribers = [];
  }
  /** 记录动作 */
  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }
  /** 再次播放我们的动作 */
  notify() {
    this.subscribers.forEach(sub => sub());
  }
}

// 让它生(运行起来)...
const dep = new Dep();

let price = 5;
let quantity = 2;
let total = 0;
let target = () => { total = price * quantity }
dep.depend();
target();

console.log(total); // => 10
price = 10;
console.log(total); // => 10
dep.notify();
console.log(total); // => 20
