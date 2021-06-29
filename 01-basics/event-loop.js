// 基础版本
// setTimeout
// console.log('script start');
// setTimeout(function () {
//   console.log('setTimeout')
// }, 0)
// console.log('script end');

// promise
// console.log('script start');
// Promise.resolve().then(function () {
//   console.log('promise');
// })
// console.log('script end');

// async/await
// async function async1() {
//   console.log('async1 start')
//   await 1;
//   console.log('async1 end')
// }
// console.log('script start')
// async1();
// console.log('script end')

// 单个任务进化版本


// setTimeout(() => {
//   console.log('timer1')
//   Promise.resolve().then(function () {
//     console.log('promise1')
//   })
// }, 0)
// setTimeout(() => {
//   console.log('timer2')
//   Promise.resolve().then(function () {
//     console.log('promise2')
//   })
// }, 0)

// Promise.resolve().then(() => {
//   console.log('Promise1')
//   setTimeout(() => {
//     console.log('setTimeout1')
//   }, 0)
// })
// setTimeout(() => {
//   console.log('setTimeout2')
//   Promise.resolve().then(() => {
//     console.log('Promise2')
//   })
// }, 0)

// console.log('start')
// setTimeout(() => {
//   console.log('timer1')
//   Promise.resolve().then(function () {
//     console.log('promise1')
//   })
// }, 0)
// setTimeout(() => {
//   console.log('timer2')
//   Promise.resolve().then(function () {
//     console.log('promise2')
//   })
// }, 0)
// Promise.resolve().then(function () {
//   console.log('promise3')
// })
// console.log('end')

// console.log('打印' + 10);
// new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     console.log('打印' + 5);
//   });
// }).then(
//   console.log('打印' + 6));
// setTimeout(function () {
//   new Promise(function (resolve, reject) {
//     console.log('打印' + 7);
//   });
// })

// console.log('打印' + 1);
// setTimeout(function () {
//   console.log('打印' + 2);
// })
// new Promise(function (resolve) {
//   console.log('打印' + 3);
//   resolve();
// }).then(function () {
//   console.log(4);
// }
// );
// console.log('打印' + 10);
// new Promise(function (resolve) {
//   setTimeout(function () {
//     console.log('打印' + 5);
//   });
//   resolve();
// }).then(function () {
//   console.log('打印' + 6)
// });
// setTimeout(function () {
//   new Promise(function (resolve) {
//     console.log('打印' + 7);
//   });
// })

// console.log('start')
// setTimeout(() => {
//   console.log('timer1')
//   Promise.resolve().then(function () {
//     console.log('promise1')
//   })
// }, 0)
// setTimeout(() => {
//   console.log('timer2')
//   Promise.resolve().then(function () {
//     console.log('promise2')
//   })
// }, 0)
// Promise.resolve().then(function () {
//   console.log('promise3')
// })
// console.log('end')

// console.log('script start')

// async function async1() {
//   await async2()
//   console.log('async1 end')
// }
// async function async2() {
//   console.log('async2 end')
// }
// async1()

// setTimeout(function () {
//   console.log('setTimeout')
// }, 0)

// new Promise(resolve => {
//   console.log('Promise')
//   resolve()
// })
//   .then(function () {
//     console.log('promise1')
//   })
//   .then(function () {
//     console.log('promise2')
//   })

// console.log('script end')

// setTimeout(() => {
//   console.log('timeout');
// }, 0)
// setImmediate(() => {
//   console.log('immediate')
// })
// const fs = require('fs')
// fs.readFile(__filename, () => {
//   setTimeout(() => {
//     console.log('timeout');
//   }, 0)
//   setImmediate(() => {
//     console.log('immediate')
//   })
// })
// setTimeout(() => {
//   setImmediate(() => {
//     console.log('setImmediate');
//   });
//   setTimeout(() => {
//     console.log('setTimeout');
//   }, 0);
// }, 0);
// setImmediate(function(){
//   console.log("setImmediate");
//   setImmediate(function(){
//     console.log("嵌套setImmediate");
//   });
//   process.nextTick(function(){
//     console.log("nextTick");
//   })
// });

// console.log('start')
// setTimeout(() => {
//   console.log('timer1')
//   Promise.resolve().then(function () {
//     console.log('promise1')
//   })
// }, 0)
// setTimeout(() => {
//   console.log('timer2')
//   Promise.resolve().then(function () {
//     console.log('promise2')
//   })
// }, 0)
// Promise.resolve().then(function () {
//   console.log('promise3')
// })
// console.log('end')

// https://zhuanlan.zhihu.com/p/54882306
// https://blog.csdn.net/qq_41257129/article/details/100743394