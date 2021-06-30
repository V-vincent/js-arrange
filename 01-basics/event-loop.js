// 基础版本
// setTimeout
// setTimeout(function () {
//   console.log('setTimeout1')
// }, 100)
// setTimeout(function () {
//   console.log('setTimeout2')
// }, 50)
// console.log('script end');

// promise
// console.log('script start');
// new Promise(function (resolve) {
//   console.log('promise1');
//   resolve();
//   console.log('promise1 end');
// }).then(function () {
//   console.log('promise2');
// })

// console.log('script end');

// async/await
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

// 组合版本一
// console.log('script start');
// setTimeout(function () {
//   console.log('setimeout');
// }, 0)
// new Promise(function (resolve) {
//   console.log('promise1');
//   resolve();
//   console.log('promise1 end');
// }).then(function () {
//   console.log('promise2');
// })
// console.log('script end');

// 组合版本二
// console.log('script start')
// async function async1() {
//   console.log('async1 start')
//   await async2()
//   console.log('async1 end')
// }
// async function async2() {
//   console.log('async2')
// }
// async1()
// new Promise(resolve => {
//   console.log('promise1 start')
//   resolve()
//   console.log('promise1 end')
// }).then(function () {
//   console.log('promise2')
// })
// console.log('script end')

// 混合版本一
// console.log('script start')
// setTimeout(() => {
//   console.log('setTimeout1')
//   Promise.resolve().then(function () {
//     console.log('promise1')
//   })
// }, 0)
// setTimeout(() => {
//   console.log('setTimeout2')
//   Promise.resolve().then(function () {
//     console.log('promise2')
//   })
// }, 0)
// console.log('script end')

// 混合版本二
// console.log('script start')
// Promise.resolve().then(() => {
//   console.log('promise1')
//   setTimeout(() => {
//     console.log('setTimeout1')
//   }, 0)
// })
// Promise.resolve().then(() => {
//   console.log('promise2')
//   setTimeout(() => {
//     console.log('setTimeout2')
//   }, 0)
// })
// Promise.resolve().then(function () {
//   console.log('promise3')
// })
// console.log('script end')

// 混合版本三
// async function async1() {
//   console.log('async1 start');
//   Promise.resolve(async2()).then(() => {
//     console.log('async1 end');
//   })
// }
// async function async2() {
//   console.log('async2');
//   Promise.resolve(async3()).then(() => {
//     console.log('async2 end');
//   })
// }
// async function async3() {
//   console.log('async3');
//   Promise.resolve().then(() => {
//     console.log('async3 end');
//   })
// }
// console.log('script start');
// async1();
// new Promise(function (resolve) {
//   console.log('promise1');
//   resolve();
// }).then(function () {
//   console.log('promise2');
// });
// console.log('script end');

// 混合版本四
// async function async1() {
//   console.log('async1 start');
//   await async2();
//   console.log('async1 end');
// }
// async function async2() {
//   console.log('async2');
//   await async3()
//   console.log('async2 end')
// }
// async function async3() {
//   await console.log('async3');
//   console.log('async3 end')
// }
// console.log('script start');
// async1();
// new Promise((resolve) => {
//   console.log('promise1');
//   resolve();
// }).then(() => {
//   console.log('promise2');
// });
// console.log('script end');

// Promise.resolve().then(() => {
//   console.log('async3 end');
//   Promise.resolve().then(() => {
//     console.log('async2 end');
//     Promise.resolve().then(() => {
//       console.log('async1 end');
//     })
//   })
// })
// Promise.resolve().then(() => {
//   console.log('promise2');
// })

// 混合版本五
async function async1() {
  console.log('async1 start');
  Promise.resolve(async2()).then(() => {
    console.log('async1 end');
  })
}
async function async2() {
  console.log('async2');
  Promise.resolve(async3()).then(() => {
    console.log('async2 end');
  })
}
async function async3() {
  await console.log('async3');
  console.log('async3 end');
}
console.log('script start');
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');

Promise.resolve().then(() => {
  console.log('async3 end');
  Promise.resolve().then(() => {
    console.log('async2 end');
  })
})
Promise.resolve().then(() => {
  console.log('async1 end');
})
Promise.resolve().then(() => {
  console.log('promise2');
})

// setTimeout和setImmediate
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


function func1() {
  console.log('func1 start');
  return new Promise(resolve => { resolve('OK'); })
}
function func2() {
  console.log('func2 start');
  return new Promise(resolve => { setTimeout(() => { resolve('OK'); }, 10) })
}
console.log(1);
setTimeout(async () => {
  console.log(2);
  await func1();
  console.log(3);
}, 20);
for (let i = 0; i < 90000000; i++) { } // 约 80 ms
console.log(4);
func1().then(() => { console.log(5); })
func2().then(() => { console.log(6); })
setTimeout(() => { console.log(7) }, 0); 
console.log(8);

// 1
// 4
// func1 start
// func2 start
// 8
// 5
// 2
// func1 start
// 3
// 7
// 6
