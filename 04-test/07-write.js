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

