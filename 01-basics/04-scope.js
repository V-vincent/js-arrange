// JavaScript执行机制

// 变量提升
// showName(); // '函数showName被执行'
// console.log(a); // ReferenceError: a is not defined
// console.log(name); // undefined
// var name = '变量提升';
// function showName() {
//   console.log('函数showName被执行');
// }
// 从以上代码可以得出：
// • 在执行过程中，若使用了未声明的变量，那么 JavaScript 执行会报错。
// • 在一个变量定义之前使用它，不会出错，但是该变量的值会为 undefined，而不是定义时的值。
// • 在一个函数定义之前使用它，不会出错，且函数能正确执行。

// 变量声明
// var name = '变量提升';
// 以上代码可以看作
var name = undefined; // 声明部分
name = '变量提升'; // 赋值部分

// 函数声明
function foo() {
  console.log('foo')
}
var bar = function () {
  console.log('bar')
}

showName(); // 1
var showName = function () {
  console.log(2)
}
function showName() {
  console.log(1)
}
showName(); // 2

// 以上代码等同于
// 编译阶段
// var showName;
// function showName() {
//   console.log(1)
// }
// // 执行阶段
// showName(); // 1
// // 重新赋值
// showName = function () {
//   console.log(2)
// }
// showName(); // 2

var a = 2;
function add(b, c) {
  return b + c; 
}
function addAll(b, c) {
  var d = 10;
  result = add(b, c);
  return a + result + d;
}
addAll(3, 6);