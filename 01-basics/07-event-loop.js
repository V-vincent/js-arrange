async function async1() {
  console.log('async1 start');
  await async2();
  console.log('asnyc1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(() => {
  console.log('setTimeOut');
}, 0);
async1();
new Promise(function (reslove) {
  console.log('promise1 before reslove');
  reslove();
  console.log('promise1 after reslove');
}).then(function () {
  console.log('promise2');
})
console.log('script end');

// script start
// async1 start
// async2
// promise1 before reslove
// promise1 after reslove
// script end
// asnyc1 end
// promise2
// setTimeOut