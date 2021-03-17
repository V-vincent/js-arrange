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
  this.sayName = function () {
    console.log(this.name);
  }
}
// let person = myNew(Person, '你好，new');
// console.log(person); // {name: "你好，new"}

// 手写实现call、apply、bind函数
// call 、 apply 、 bind 都是用来改变函数执行上下文的，可以借助它们来实现继承
// call 和 apply 的区别是参数不一样， call 是具体参数， apply 是参数数组； call 是 apply 的语法糖
// bind 返回一个新函数供之后调用， call 和 apply 是立即执行的


function person(name) {
  this.name = name;
  this.sayName = function () {
    console.log(this.name);
  }
}
let obj = {
  name: '张山',
  say: function (action, more) {
    console.log(this);
    console.log(this.name + action + (more || ''));
  }
}
let obj2 = {
  name: '华子',
}
obj.say('晋级');
// obj.say.call(obj2, '改变上下文')

// 主要是要实现改变this的指向
// call
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('this is not function');
  }
  // 传入空、null、undefined等即为window
  context = context || window;
  // 参数从第二个开始获取
  let args = [...arguments].slice(1);
  // this是当前要执行的函数，如say；改变this指向，就是给传入对象context定义一个函数
  context.fn = this;
  let res = context.fn(...args); // 执行函数
  delete context.fn; // 执行完要移除属性，不要对context造成影响
  return res; // 返回执行结果
}
// obj.say.myCall(obj2, '来了');

// apply
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function');
  }
  context = context || window;
  context.fn = this;
  let res;
  // 参数数组得做一些处理，不是数组就犯规了呀
  let args = arguments[1];
  if (args && !Array.isArray(args)) {
    throw new TypeError('arguments is not a array');
  }
  if (args) {
    res = context.fn(...args);
  } else {
    res = context.fn();
  }
  delete context.fn;
  return res;
}
// obj.say.myApply(obj2, '大力出奇迹');
// obj.say.myApply(obj2, ['大力出奇迹']);

// bind
// 返回一个函数？
let obj3 = {
  name: '王二'
}
let bind = obj.say.bind(obj2, '这样')
bind('那样')
// 用call实现
// Function.prototype.myBind = function (context) {
//   if (typeof this !== 'function') {
//     throw new TypeError('this is not a function');
//   }
//   // 当前要绑定的函数
//   let that = this;
//   // 处理绑定时候的参数
//   let args = [...arguments].slice(1);
//   // 返回一个函数
//   return function F() {
//     // 因为是返回函数，还有可能会被new一下
//     if (this instanceof F) {
//       return new that(...args, ...arguments);
//     }
//     // 函数再执行的时候返回结果
//     return that.call(context, ...args, ...arguments);
//   }
// }

// 用apply实现

Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function');
  }
  // 当前要绑定的函数
  let that = this;
  // 处理绑定时候的参数
  let args = [...arguments].slice(1);
  // 返回一个函数
  return function F() {
    // 因为是返回函数，还有可能会被new一下
    if (this instanceof F) {
      return new that(...args, ...arguments);
    }
    // 函数再执行的时候返回结果
    return that.apply(context, args.concat(...arguments));
  }
}
let myBind = obj.say.myBind(obj2, '买入', '吗？')
myBind('卖出')