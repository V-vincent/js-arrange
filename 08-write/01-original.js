// instanceof 的实现
// 作用：可以通过 instanceof 判断引用数据的类型。
// 缺点：
// 所有引用类型数据用 instanceof 检测 Object 都会返回 true，这是因为引用数据类型的原型链上都来自 Object 。即所有引用类型的数据都是 Object 的实例
// 基本数据类型不能通过 instanceof 来判断。
// 使用：A instanceof B，结果返回一个布尔值。
// 例子：[] instanceof Array; 
// console.log([] instanceof Array); // true
// 原理：通过判断 A 对象的原型链中能不能找到 B 对象的 prototype。
// 手写实现：
function myInstanceof(A, B) {
  A = A.__proto__;
  B = B.prototype;
  while (true) {
    if (A === B) return true;
    else if (A === null) return false;
    A = A.__proto__;
  }
}
// console.log(myInstanceof([], Array));
// console.log(myInstanceof([], Function));

// call/apply/bind 的实现
// 作用：改变执行上下文，即改变 this 指向
// call 和 apply 的区别：call 是具体参数，apply 是参数数组
// call 更接近 JS 引擎的处理，所以性能要好一点，而 apply 还要对参数数组做一层解构处理
// bind 返回一个函数供之后调用，call 和 apply 是立即执行
// 使用：
let thisObj1 = {
  name: "vincent",
  say: function () {
    console.log(this.name, ...arguments);
  }
}
let thisObj2 = {
  name: "起风了",
}
// thisObj1.say(1, 2);
// thisObj1.say.call(thisObj2, 1, 2, 3);
// thisObj1.say.apply(thisObj2, [1, 2, 3]);
// let bindFn = thisObj1.say.bind(thisObj2, 1, 2);
// bindFn(3, 4);

// 手写实现：
// 1.在构造函数 Function 的原型上挂载函数
// 2.判断当前被调用的是不是一个函数，不是则报错返回
// 3.获取要被指向的执行上下文，即第一个参数或是 window/global;
// 4.把当前被调用函数挂载在执行上下文上面
// 5.执行，得到执行结果
// 6.移除被调用函数的挂载，返回执行结果
// apply 要多一步，去判断第二个参数是不是数组，不是数组则报错返回
// bind 是返回一个函数，可以借助 call 或 apply 实现
// call
Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError("this is not function");
  }
  context = context || window || global;
  context.fn = this;
  let res = context.fn(...args);
  delete context.fn;
  return res;
}
// thisObj1.say.myCall(thisObj2, 1, 2, 3);
// apply
Function.prototype.myApply = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError("this is not function");
  }
  context = context || window || global;
  context.fn = this;
  if (args.length > 1) {
    throw new TypeError('arguments is not a array');
  }
  let res;
  if (args.length === 0) res = context.fn();
  else res = context.fn(...args[0]);
  delete context.fn;
  return res;
}
// thisObj1.say.myApply(thisObj2, [1, 2, 3]);
// bind
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError("this is not function");
  }
  const that = this;
  return function F() {
    if (this instanceof F) {
      return new that(...args, ...arguments);
    }
    return that.call(context, ...args, ...arguments)
  }
}
// let bindFn = thisObj1.say.bind(thisObj2, 1, 2);
// bindFn(3, 4);


// 实现一个 new
// 实现过程
// 1、创建一个新对象
// 2、将构造函数的原型赋给新对象的 __proto__
// 3、将执行上下文指向新对象
// 4、根据构造函数的返回结果类型返回新对象或者构造函数的返回值
function myNew(Con, ...args) {
  let obj = new Object();
  obj.__proto__ = Con.prototype;
  let res = Con.call(obj, ...args);
  return typeof res === 'object' ? res : obj;
}

// 实现一个 flat 函数，将数组偏平化
let flatArr = [1, 2, 3, [4, 5], [6, [7, [8]]]];
// console.log(flatArr.flat(Infinity))
// function flatten(arr) {
//   while (arr.some(item => Array.isArray(item))) {
//     arr = [].concat(...arr);
//   }
//   return arr;
// }
// 迭代
function flatten(arr) {
  let res = [];
  arr.map(item => {
    if (Array.isArray(item)) {
      res.push(...flatten(item))
    } else {
      res.push(item);
    }
  })
  return res;
}
// console.log(flatten(flatArr))

// 用 setTimeout 模拟实现 setInterval
// setTimeout：在指定毫秒之后执行回调函数
// setInterval：间歇调用，每隔指定毫秒之后调用一次
// 模拟实现：在 setTimeout 的回调函数内继续调用该函数（递归调用的思想）
// 扩展：返回一个对象出去，留一个停止调用的操作
function mySetInterval(fn, time, ...args) {
  let timer = null;
  function interval() {
    fn.call(this, ...args);
    timer = setTimeout(interval, time);
  }
  interval();
  return {
    clear: () => {
      clearTimeout(timer);
    }
  }
}
// let timer = mySetInterval(function () {
//   console.log(0, ...arguments);
// }, 1000, 1, 2, 3)
// setTimeout(() => {
//   timer.clear();
// }, 3000);

// 另一个版本
// function mySetInterval(fn, timer, args) {
//   mySetInterval.timer && clearTimeout(mySetInterval.timer);
//   if (!mySetInterval.clearTimeout) {
//     mySetInterval.timer = setTimeout(() => {
//       fn.call(this, ...args);
//       mySetInterval(fn, timer, args);
//     }, timer)
//   }
// }
// 清理函数
// mySetInterval.clear = function () {
//   this.clearTimeout = true;
//   clearTimeout(this.timer);
// }
// mySetInterval(console.log, 1000, '测试')
// 5秒后清理定时器
// setTimeout(() => {
//   mySetInterval.clear();
// }, 5000)

// 能反过来使用 setInterval 模拟实现 setTimeout 吗？
const mySetTimeout = (fn, time) => {
  let timer = setInterval(() => {
    clearInterval(timer);
    fn();
  }, time);
}
// mySetTimeout(() => {
//   console.log(1);
// }, 1000)


// 继承
// 寄生组合继承
// 核心是 将父类的原型赋值给了子类，并且将构造函数设置为子类，
// 这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数
function Parent(name) {
  this.name = name || 'vincent';
  this.run = function (todo) {
    console.log(this.name + todo);
  }
}
Parent.prototype.say = function () {
  console.log('I am ' + this.name);
}
function Child(name) {
  // 在子类的构造函数中通过 Parent.call(this) 继承父类的属性
  Parent.call(this, name);
}
// 核心
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

// let child1 = new Child('干饭魂');
// child1.run(); // 干饭魂干饭
// child1.say(); // 干饭魂
// console.log(child1)

// Class 继承
class ParentClass {
  constructor(name) {
    this.name = name;
  }
  run(todo) {
    console.log(this.name + todo);
  }
}
class ChildClass extends ParentClass {
  constructor(name) {
    super(name);
  }
  say() {
    console.log('I am ' + this.name);
  }
}
let child1 = new ChildClass('vincent');
child1.say();
child1.run('跑步');