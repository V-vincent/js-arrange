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

// var a = 10;
// (function () {
//   console.log(a); // undefined
//   a = 5
//   console.log(window.a); // 10
//   var a = 20;
//   console.log(a); // 20
// })()

// 输出以下代码执行的结果并解释为什么
var obj = {
  '2': 3,
  '3': 4,
  'length': 2,
  'splice': Array.prototype.splice,
  'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj);
console.log(JSON.stringify(obj));
// 输出一个伪数组: `[empty × 2, 1, 2, splice: ƒ, push: ƒ]`
// `push()` 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度
// 第一次`push`，`obj`对象的长度为`2`，于是`obj[2] = 1`，`obj.length += 1`
// 第二次`push`，`obj`对象的长度为`3`，于是`obj[3] = 1`，`obj.length += 1`
// 使用`console.log`输出的时候，因为 `obj` 具有 `length` 属性和 `splice` 方法，故将其作为数组进行打印
// 打印时因为数组未设置下标为 `0` `1` 处的值，故打印为`empty`，主动 `obj[0]` 获取为 `undefined`