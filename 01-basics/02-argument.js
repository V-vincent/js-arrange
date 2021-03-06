// JS的argument

// ### 一、前言
// 1、在函数调用的时候，浏览器每次都会传递进两个隐式参数：

// 一个是函数的上下文对象`this`，另一个则是封装实参的类数组对象`arguments`。

// 2、与其他程序设计语言不同，`ECMAScript`不会验证传递给函数的参数个数是否等于函数定义的参数个数。开发者定义的函数都可以接受任意个数的参数（但根据`Netscape`的文档，最多可接受255个），而不会引发任何错误。任何遗漏的参数都会以`undefined`传递给函数，多余的函数将忽略。

// 即参数从左向右进行匹配，如果实参个数少于形参，后面的参数对应赋值为`undefined`。如：
// ```JavaScript
// function fn (a, b, c) {
//     console.log(a, b, c); // 1 2 undefined
//     // 函数对象的length属性就是函数形参的个数
//     console.log(fn.length); // 3
// }
// fn(1, 2);
// ```
// ### 二、arguments
// #### 1、描述
// `arguments`的定义是对象，但是因为对象的属性是无序的，而`arguments`是用来存储实参的，是有顺序的，它具备和数组相同的访问性质及方式，并拥有数组长度属性`length`，所以`arguments`是特殊的对象，又叫类数组对象，当我们听到类数组时就可以知道说的是`arguments`。

// **即`arguments`是一个类数组对象，用来存储实际传递给函数的参数**，使调用函数时不局限于函数声明所定义的参数列表。
// ```JavaScript
function fn() {
    console.log(arguments);
    console.log(typeof arguments); // object
    console.log(toString.call(arguments)); // [object Arguments]
}
fn('name', 'age');
// ```
// ![](https://user-gold-cdn.xitu.io/2019/11/16/16e73bc6f649811f?w=906&h=201&f=png&s=20155)
// ### 2、访问实参和检查实参个数
// `arguments`访问单个参数的方式与访问数组元素的方式相同。例如`arguments[0]`、`arguments[1]`、`arguments[n]`，在函数中不需要明确指出参数名，就能访问它们。通过`length`属性可以知道实参的个数。
// ```JavaScript
function f2() {
    console.log(arguments[0]); // name
    console.log(arguments[1]); // age
    console.log(arguments.length); // 2
}
f2('name', 'age');
// ```
// #### 3、callee属性
// 每一个对象都有自己的属性，而`arguments`有一个`callee`属性，返回正被执行的`Function`对象。
// ```JavaScript
function f3() {
    console.log(arguments.callee === f3); // true
}
f3('name', 'age');
// ```
// #### 4、arguments的修改
// 在正常的模式下，`arguments`对象是允许在运行时进行修改的。
// ```JavaScript
function f4() {
    arguments[0] = 'sex';
    console.log(arguments[0]); // sex
}
f4('name', 'age');
// ```
// #### 5、转化成真实数组
// `arguments`是类数组对象，除了`length`属性和索引元素之外没有任何`Array`属性。例如，它没有 `pop`方法。但是它可以被转换为一个真正的`Array`:
// ```JavaScript
function f5(){
    // 可以使用slice来将arguments转换为真实数组
    var args1 = Array.prototype.slice.call(arguments);
    var args2 = [].slice.call(arguments);
    // 也可以使用Array.from()方法或者扩展运算符来将arguments转换为真实数组
    var args3 = Array.from(arguments);
    var args4 = [...arguments];
}
f5('name', 'age');
// ```
// ### 三、应用
// #### 1、借用`arguments.length`可以来查看实参和形参的个数是否一致
// ```JavaScript
// function fn (a, b, c) {
//     if (fn.length != arguments.length) {
//         console.log('形参和实参的个数不一致');
//     } else{
//         console.log('形参和实参的个数一致');
//     }
// }
// fn(1, 2);
// ```
// #### 2、借用`arguments.callee`来让匿名函数实现递归:
// ```JavaScript
let sum = function (n) {
    if (n == 1) {
        return 1;
    } else {
        return n + arguments.callee(n - 1); // 5 4 3 2 1
    }
}
console.log(sum(6)); // 21
// ```
// #### 3、遍历参数求和或者求最大值
// ```JavaScript
function max () {
    var max = arguments[0];
    for (item of arguments) {
        if (item > max) {
            max = item;
        }
    }
    return max;
}
console.log(max(5, 3, 2, 9, 4)); // 9
// ```
// #### 4、模拟函数重载
// 重载函数是函数的一种特殊情况，为方便使用，`C++`允许在同一范围中声明几个功能类似的同名函数，但是这些同名函数的形式参数（指参数的个数、类型或者顺序）必须不同，也就是说用同一个函数完成不同的功能。

// 用`arguments`对象判断传递给函数的参数个数，即可模拟函数重载：
// ```JavaScript
function doAdd() {
    if(arguments.length == 1) {
        console.log(arguments[0] + 5);
    } else if(arguments.length == 2) {
        console.log(arguments[0] + arguments[1]);
    }
}
doAdd(10);  // 15
doAdd(10, 20); // 30
// ```
// 1、arguments是一个类数组对象，用来存储实参；具有length、callee等属性；可以用arguments[0]这个形式访问实参；可以转换为真实数组。
// 2、arguments和函数相关联，其只有在函数执行时可用，不能显式创建。
// 3、arguments可以用来遍历参数；通过callee实现递归；也可以模拟函数重载。