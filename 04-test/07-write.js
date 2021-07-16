// 实现一个 compose 函数
// 用法如下:
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
const com = compose(fn1, fn2, fn3, fn4);
// console.log(com(1)); // 1 + 4 + 3 + 2 + 1 = 11
// 分析 compose 返回一个函数，里面按后入先出的顺序执行
function compose(...fn) {
  return (num) => {
    return fn.reverse().reduce((pre, cur) => {
      return cur(pre);
    }, num)
  }
}
// function compose(...fn) {
//   if (!fn.length) return (v) => v;
//   if (fn.length === 1) return fn[0];
//   return fn.reduce(
//     (pre, cur) =>
//       (...args) =>
//         pre(cur(...args))
//   );
// }

// setTimeout 模拟实现 setInterval
const mySetInterval = (fn, time) => {
  let timer = null;
  const interval = () => {
    fn();
    timer = setTimeout(interval, time);
  }
  interval();
  return {
    cancel: () => {
      clearTimeout(timer);
    }
  }
}
// let time = mySetInterval(() => {
//   console.log(111);
// }, 1000)
// setTimeout(() => {
//   time.cancel();
// }, 3000);

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

// 发布订阅模式
// 实现一个发布订阅模式拥有 on emit once off 方法
class EventEmitter {
  constructor() {
    this.events = {};
  }
  // 实现订阅
  on(type, callBack) {
    if (!this.events[type]) {
      this.events[type] = [callBack];
    } else {
      this.events[type].push(callBack);
    }
  }
  // 删除订阅
  off(type, callBack) {
    if (!this.events[type]) return;
    this.events[type] = this.events[type].filter((item) => {
      return item !== callBack;
    });
  }
  // 只执行一次订阅事件
  once(type, callBack) {
    function fn() {
      callBack();
      this.off(type, fn);
    }
    this.on(type, fn);
  }
  // 触发事件
  emit(type, ...rest) {
    this.events[type] &&
      this.events[type].forEach((fn) => fn.apply(this, rest));
  }
}
// 使用如下
// const event = new EventEmitter();
// const handle = (...rest) => {
//   console.log(rest);
// };
// event.on("click", handle);
// event.emit("click", 1, 2, 3, 4);
// event.off("click", handle);
// event.emit("click", 1, 2);
// event.once("dbClick", () => {
//   console.log(123456);
// });
// event.emit("dbClick");
// event.emit("dbClick");

// 数组去重
function uniqueArr(arr) {
  return [...new Set(arr)];
}

// 数组扁平化
// 实现一个方法使多维数组变成一维数组
// 递归版本
function flatter(arr) {
  if (!arr.length) return;
  return arr.reduce(
    (pre, cur) =>
      Array.isArray(cur) ? [...pre, ...flatter(cur)] : [...pre, cur],
    []
  );
}

// 迭代
function flatter(arr) {
  if (!arr.length) return;
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
