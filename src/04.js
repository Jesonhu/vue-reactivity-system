/**
 * @see 观察者模式
 */
class Dep {
  constructor() {
    this.subscribers = [];
  }
  /** 
   * 记录动作.
   * 将目标添加为订阅者.
   */
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
let target = null;

const watcher = (myFunc) => {
  target = myFunc;
  dep.depend();
  target();
  target = null;
}

watcher(() => {
  total = price * quantity;
});

console.log(total); // => 10
price = 10;
console.log(total); // => 10
dep.notify();
console.log(total); // => 20

let legs = 4;
let animalNum = 2;
let totalLegs = 0;

watcher(() => { totalLegs = legs * animalNum });
console.log(totalLegs); // => 8;
legs = 2;
console.log(totalLegs); // => 8;
dep.notify();
console.log(totalLegs); // => 4;
animalNum = 4;
legs = 4;
console.log(totalLegs); // => 4;
dep.notify();
console.log(totalLegs); // => 16;
