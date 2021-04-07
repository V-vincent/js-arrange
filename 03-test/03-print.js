// 以下代码输出什么？
// var b = 10;
// (function b() {
//   b = 20;
//   console.log(b); // Function b
// })();

// 改造下面的代码，使之分别打印10和20。
// var b = 10;
// (function b() {
//   b = 20;
//   console.log(b);
// })();

// 打印10
// var b = 10;
// (function () {
//   console.log(b); // 10 
//   b = 20;
// })();

// 打印20
// var b = 10;
// (function b() {
//   var b = 20;
//   console.log(b);
// })();

// setTimeout
// setTimeout(function () {
//   console.log('1000')
// }, 1000)
// setTimeout(function () {
//   console.log('500')
// }, 500)

var a = 10;
(function () {
  console.log(a); // undefined
  a = 5
  console.log(window.a); // 10
  var a = 20;
  console.log(a); // 20
})()