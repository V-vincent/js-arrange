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
// var name = undefined; // 声明部分
// name = '变量提升'; // 赋值部分

// 函数声明
// function foo() {
//   console.log('foo')
// }
// var bar = function () {
//   console.log('bar')
// }

// 函数提升，编译，执行
// showName(); // 1
// var showName = function () {
//   console.log(2)
// }
// function showName() {
//   console.log(1)
// }
// showName(); // 2

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

// 调用栈
// var a = 2;
// function add(b, c) {
//   return b + c; 
// }
// function addAll(b, c) {
//   var d = 10;
//   result = add(b, c);
//   return a + result + d;
// }
// addAll(3, 6);

// 变量覆盖问题
// var name = "极客时间"
// function showName() {
//   console.log(myname);
//   if (0) {
//     var myname = "极客邦"
//   }
//   console.log(myname);
// }
// showName();

// 本应销毁的变量没有被销毁
// function foo() {
//   for (var i = 0; i < 7; i++) {
//   }
//   console.log(i);
// }
// foo()

// ES6 引入了 let  和 const  关键字，从而使 JavaScript 也能像其他语言一样拥有了块级作用域。

function varTest() {
  var x = 1;
  if (true) {
    var x = 2; // 同样的变量!
    console.log(x); // 2
  }
  console.log(x); // 2
}

function letTest() {
  let x = 1;
  if (true) {
    let x = 2; // 不同的变量
    console.log(x); // 2
  }
  console.log(x); // 1
}
// varTest();
// letTest();

// JavaScript 是如何支持块级作用域的
function foo() {
  var a = 1
  let b = 2
  {
    let b = 3
    var c = 4
    let d = 5
    console.log(a)
    console.log(b)
  }
  console.log(b)
  console.log(c)
  console.log(d)
}
// foo();


// let myname = '极客时间'
// {
//   console.log(myname);
//   let myname = '极客邦'
// }

// 作用域链和闭包


// function add() {
//     var counter = 0;
//     return counter += 1;
// }
// add();
// add();
// add();
var add = (function () {
  var counter = 0;
  return function () {
    return counter += 1;
  }
})();
// function add() {
//     var counter = 0;
//     return function () {
//         return counter += 1;
//     }
// }
// var closure = add();
// console.log(closure());
// console.log(closure());
// console.log(closure());

// for (var i = 1; i <= 5; i++) {
//     setTimeout(function() {
//         console.log(i)
//     }, 10)
// }
// for (var i = 1; i <= 5; i++) {
//     (function(j) {
//         setTimeout(function() {
//             console.log(j)
//         }, 10)
//     })(i)
// }
// for (let i = 1; i <= 5; i++) {
//     setTimeout(function() {
//         console.log(i)
//     }, 10)
// }
// for(var i = 1; i<=5; i++){
//     setTimeout(function(j){
//         console.log(j)
//     }, 10, i)
// }

function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = function () {
    return this.name;
  };

  this.getMessage = function () {
    return this.message;
  };
}

function MyObject(name) {
  this.name = name.toString();
}
MyObject.prototype.getName = function () {
  return this.name;
}


// function Cars(){
//     this.name = "BMW";
//     this.color = ["white","black"];
// }
// Cars.prototype.sayColor = function(){
//     var outer = this;
//     return function(){
//         return outer.color
//     };
// };
//
// var instance = new Cars();
// console.log(instance.sayColor()())
//
//
//
// function Cars(){
//     this.name = "BMW";
//     this.color = ["white","black"];
// }
// Cars.prototype.sayColor = function(){
//     var outerColor = this.color; // 保存一个副本到变量中
//     return function(){
//         return outerColor; // 应用这个副本
//     };
//     outColor = null; // 释放内存
// };
//
// var instance = new Cars();
// console.log(instance.sayColor()())

var single = function () {
  var obj = {
    name: 'vincent',
    age: 18
  };
  function getName() {
    return obj.name;
  };
  return getName();
}
var getName = single();