// 回调函数
// 将一个函数作为参数传递给另外一个函数，那作为参数的这个函数就是回调函数
// function callback() {
//   console.log('callback');
// }
// function test(callback) {
//   console.log('start');
//   callback && callback();
//   console.log('end');
// }
// test(callback);

function callback() {
  console.log('callback');
}
function test(callback) {
  console.log('start');
  setTimeout(callback, 1000);
  console.log('end');
}
test(callback);