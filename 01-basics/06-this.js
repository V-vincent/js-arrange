// new
// 创建一个空对象
// 将这个空对象的__proto__指向构造函数的原型
// 将this指向空对象
// 对构造函数返回值做判断

function myNew(Con, ...args) {
  // 创建一个空对象
  let obj = {};
  // 将这个空对象的__proto__指向构造函数的原型
  // obj.__proto__ = Con.prototype;
  Object.setPrototypeOf(obj, Con.prototype);
  // 将this指向空对象
  let res = Con.apply(obj, args);
  // 对构造函数返回值做判断
  return res instanceof Object ? res : obj;
}
// 构造函数Person
function Person(name) {
  this.name = name;
  return '十二点的程序员'
}
let person = myNew(Person, '你好，new');
console.log(person); // {name: "你好，new"}

// 手写实现call、apply、bind函数
