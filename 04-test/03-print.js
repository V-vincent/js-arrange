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
// var obj = {
//   '2': 3,
//   '3': 4,
//   'length': 2,
//   'splice': Array.prototype.splice,
//   'push': Array.prototype.push
// }
// obj.push(1)
// obj.push(2)
// console.log(obj);
// console.log(JSON.stringify(obj));
// 输出一个伪数组: `[empty × 2, 1, 2, splice: ƒ, push: ƒ]`
// `push()` 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度
// 第一次`push`，`obj`对象的长度为`2`，于是`obj[2] = 1`，`obj.length += 1`
// 第二次`push`，`obj`对象的长度为`3`，于是`obj[3] = 1`，`obj.length += 1`
// 使用`console.log`输出的时候，因为 `obj` 具有 `length` 属性和 `splice` 方法，故将其作为数组进行打印
// 打印时因为数组未设置下标为 `0` `1` 处的值，故打印为`empty`，主动 `obj[0]` 获取为 `undefined`

// 输出以下代码的执行结果并解释为什么
// var a = { n: 1 };
// var b = a;
// a.x = a = { n: 2 };
// console.log(a.x); // undefined
// console.log(b.x); // { n: 2 }
// a.x = a = { n: 2 }的执行顺序
// 1. a，得到a的引用，即{ n: 1 }
// 2. a.x，给旧对象声明了一个x属性，即{ n: 1, x: undefined }
// 3. a，得到a的引用
// 4. a = { n: 2 }，覆盖a的引用，即a指向了{ n: 2 }，同时操作完成后返回右操作数 { n: 2 }
// 5. a.x = { n: 2 }，把a.x指向{ n: 2 }，即把{ n: 1, x: undefined }中的 x 指向{ n: 2 }
// 最后a = { n: 2 }，b = { n: 1, x: { n: 2 } }

// 输出以下代码运行结果
// example 1
// var a = {}, b = '123', c = 123;
// a[b] = 'b';
// a[c] = 'c';
// console.log(a[b]); // c

// example 2
// var a = {}, b = Symbol('123'), c = Symbol('123');
// a[b] = 'b';
// a[c] = 'c';
// console.log(a[b]); // b

// example 3
// var a = {}, b = { key: '123' }, c = { key: '456' };
// a[b] = 'b';
// a[c] = 'c';
// console.log(a[b]); // c

// 对象键名转换：
// 对象的键名只能是字符串和 Symbol 类型。
// 其他类型的键名会被转换成字符串类型。
// 对象转字符串默认会调用 toString 方法。

// example 1
// 键名会转化为字符串，a[b] 和 a[c] 都是 a['123']
// example 2
// Symbol类型的数据是唯一的，当作键名也不会一样，所以a[b] 会输出 'b'
// example 3
// 对象转字符串默认调用 toString 方法，a[b]和a[c]都是a['[object Object]']
