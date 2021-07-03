// 从一道面试题讲起
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i)
  }, 100)
}

let timer = setTimeout(function() {
  console.log('1 秒后打印');
}, 1000)
console.log(timer);

// let startTime = +new Date();
// for (let i = 0; i < 90000000; i++) { } // 约 50 ms
// let endTime = +new Date();
// console.log(endTime - startTime);

// let startTime = +new Date();
// setTimeout(() => {
//   console.log(1);
//   let endTime = +new Date();
//   console.log(endTime - startTime);
// }, 20);
// for (let i = 0; i < 90000000; i++) { } 
// let startTime2 = +new Date();
// setTimeout(() => {
//   console.log(2);
//   let endTime2 = +new Date();
//   console.log(endTime2 - startTime2);
// }, 0);

setTimeout(() => {
  console.log(1);
}, 20);
for (let i = 0; i < 9000000; i++) { } 
setTimeout(() => {
  console.log(2);
}, 0);