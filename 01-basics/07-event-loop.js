// 浏览器的event loop
// console.log('script start')
// async function async1() {
//   console.log('async1 start')
//   await async2()
//   console.log('async1 end')
// }
// async function async2() {
//   console.log('async2')
// }
// // async1()
// setTimeout(function () {
//   console.log('setTimeout')
// }, 0)
// new Promise(resolve => {
//   console.log('promise1 start')
//   resolve()
//   console.log('promise1 end')
// }).then(function () {
//   console.log('promise2')
// }).then(function () {
//   console.log('promise3')
// })
// async1()
// console.log('script end')

// `script start` => `async1 start` => `async2` => `promise1 start` => `promise1 end` => 
// `script end` => `async1 end` => `promise2` => `promise3` => `setTimeout`
// 给async1换一个顺序呢
// `script start` => `promise1 start`  => `promise1 end` => `async1 start` => `async2` => 
// `script end` => `promise2` => `async1 end` => `promise3` => `setTimeout`

// console.log('setTimeout start')
// setTimeout(function () {
//   console.log('setTimeout execute')
// }, 0)
// console.log('setTimeout end')

// console.log('script start');
// new Promise(function (resolve) {
//   console.log('promise1');
//   resolve();
//   console.log('promise1 end');
// }).then(function () {
//   console.log('promise2');
// })
// setTimeout(function () {
//   console.log('setimeout');
// }, 0)
// console.log('script end');

// `script start` => `promise1` => `promise1 end` => `script end` => `promise2` => `setimeout`


// async function async1() {
//   console.log('async1 start')
//   await async2();
//   console.log('async1 end')
// }
// async function async2() {
//   console.log('async2')
// }
// console.log('script start')
// async1();
// console.log('script end')

// `script start` => `async1 start` => `async2` => `script end` => `async1 end`


// node的event loop
// 由性能决定，打印先后随机，性能好没到1毫秒下限打印setImmediate
// setImmediate(() => {
//   console.log('setImmediate')
// })
// setTimeout(() => {
//   console.log('setTimeout')
// }, 0)

// 在异步模块中，setImmediate永远先执行
// let fs = require('fs')
// fs.readFile(__filename, () => {
//   setTimeout(() => {
//     console.log('setTimeout');
//   }, 0);
//   setImmediate(() => {
//     console.log('setImmediate');
//   });
// });

// setTimeout(() => {
//   console.log('setTimeout')
// }, 0)
// process.nextTick(() => {
//   console.log('nextTick1')
//   process.nextTick(() => {
//     console.log('nextTick2')
//   })
// })
// process.nextTick(() => {
//   console.log('nextTick3')
// })
// async function async1() {
//   console.log('async1 start')
//   await async2()
//   console.log('async1 end')
// }
// async function async2() {
//   console.log('async2')
// }
// async1()
// Promise.resolve().then(function () {
//   console.log('promise1')
// })
// `nextTick1` => `nextTick3` => `nextTick2` => `promise1` => `setTimeout`


// 同步回调
// let callback = function () {
//   console.log('i am do homework')
// }
// function doWork(cb) {
//   console.log('start do work')
//   cb()
//   console.log('end do work')
// }
// // 回调函数 callback 是在主函数 doWork 返回之前执行的
// doWork(callback)

// 异步回调:
// let callback = function () {
//   console.log('i am do homework')
// }
// function doWork(cb) {
//   console.log('start do work')
//   setTimeout(cb, 1000)
//   console.log('end do work')
// }
// // 回调函数在主函数外部执行
// doWork(callback)