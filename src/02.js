let price = 5;
let quantity = 2;
let total = 0;

// 动作
let target = () => { total = price * quantity };

// 记录动作
let storage = [];
const record = () => { storage.push(target) }

// 稍后运行
const replay = () => { storage.forEach(run => run()) }

record();
target();

console.log(total); // => 10
price = 20;
console.log(total); // => 10
replay();
console.log(total); // => 40

quantity = 4;
console.log(total); // => 40
replay();
console.log(total); // => 80

