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


// 写出如下代码的打印结果
// function changeObjProperty(o) {
//   o.siteUrl = "http://www.baidu.com";
//   o = new Object(); // 引用改变
//   o.siteUrl = "http://www.google.com";
// }
// let webSite = new Object();
// changeObjProperty(webSite);
// console.log(webSite.siteUrl); // "http://www.baidu.com"

// 请写出如下代码的打印结果
function Foo() {
  Foo.a = function () {
    console.log(1)
  }
  this.a = function () {
    console.log(2)
  }
}
// 以上只是 Foo 的构建方法，没有产生实例，此刻也没有执行
Foo.prototype.a = function () {
  console.log(3)
}
// 现在在 Foo 上挂载了原型方法 a ，方法输出值为 3
Foo.a = function () {
  console.log(4)
}
// // 现在在 Foo 上挂载了直接方法 a ，输出值为 4
// Foo.a();
// // 立刻执行了 Foo 上的 a 方法，也就是刚刚定义的，所以
// // # 输出 4
// let obj = new Foo();
// /* 
//   这里调用了 Foo 的构建方法。Foo 的构建方法主要做了两件事：
//   1. 将全局的 Foo 上的直接方法 a 替换为一个输出 1 的方法。
//   2. 在新对象上挂载直接方法 a ，输出值为 2。
// */
// obj.a();
// // 因为有直接方法 a ，不需要去访问原型链，所以使用的是构建方法里所定义的 this.a，
// // # 输出 2
// Foo.a();
// // 构建方法里已经替换了全局 Foo 上的 a 方法，所以
// // # 输出 1

// 修改以下 print 函数，使之输出 0 到 99，或者 99 到 0
// 要求：
// 1、只能修改 setTimeout 到 Math.floor(Math.random() * 1000 的代码
// 2、不能修改 Math.floor(Math.random() * 1000
// 3、不能使用全局变量
// function print(n) {
//   setTimeout(() => {
//     console.log(n);
//   }, Math.floor(Math.random() * 1000));
// }
// for (var i = 0; i < 10; i++) {
//   print(i);
// }
// // 1、按时间来
// function print(n) {
//   setTimeout(() => {
//     console.log(n);
//   }, 1, Math.floor(Math.random() * 1000));
// }
// // 2、匿名函数
// function print(n) {
//   setTimeout(console.log(n), Math.floor(Math.random() * 1000));
//   // setTimeout((() => {
//   //   console.log(n);
//   // })(n), Math.floor(Math.random() * 1000));
// }

// 分别写出如下代码的返回值
String('11') == new String('11'); // true
String('11') === new String('11'); // false
// new String() 返回的是对象
// == 的时候会隐性转换，实际运行的是 String('11') == new String('11').toString();

// 请写出如下代码的打印结果
var name = 'Tom';
(function () {
  if (typeof name == 'undefined') {
    var name = 'Jack';
    console.log('Goodbye ' + name);
  } else {
    console.log('Hello ' + name);
  }
})();
// Goodbye Jack
// 变量提升

// 扩展题，请写出如下代码的打印结果
// var name = 'Tom';
// (function () {
//   if (typeof name == 'undefined') {
//     name = 'Jack';
//     console.log('Goodbye ' + name);
//   } else {
//     console.log('Hello ' + name);
//   }
// })();
// hello Tom
// 1、首先在进入函数作用域当中，获取name属性
// 2、在当前作用域没有找到name
// 3、通过作用域链找到最外层，得到name属性
// 4、执行else的内容，得到Hello Tom

// 输出以下代码执行结果
function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}
async function main() {
  console.time();
  const x = wait();
  const y = wait();
  const z = wait();
  await x;
  await y;
  await z;
  console.timeEnd();
}
main();
// 三个任务发起的时候没有await，可以认为是同时发起了三个异步。之后各自await任务的结果。结果按最高耗时计算，由于三个耗时一样。所以结果是 10 * 1000ms（或者稍微大于这个数）

// 四则运算打印
// console.log(1 + "1") // '11'
// console.log(2 * "2") // 4
// console.log([1, 2] + [2, 1]) // '1,22,1'
// console.log("a" + + "b") // 'aNaN'
// console.log(+ "3" + 2 + 1) // 6
// console.log(1 + + '2' + '3') // '33'
// console.log('A' - 'B' + 'C') // 'NaNC'
// console.log(0 && 2 || 1) // 1

// var aa = 0.1, bb = aa+++aa, cc = aa--+bb;
// console.log(bb, cc); 
// bb = aa++ +aa = 0.1 + aa = 0.1 + 1.1 = 1.2; aa = 1.1;
// cc = 1.1-- + 1.2 = 1.1 + 1.2 = 2.3; aa = 0.1;

// 对象获取属性值
// const bird = {
//   size: "small"
// };
// const mouse = {
//   name: "Mickey",
//   small: true
// };
// console.log(mouse[bird.size]);
// console.log(mouse[bird["size"]]);
// console.log(mouse.bird.size);