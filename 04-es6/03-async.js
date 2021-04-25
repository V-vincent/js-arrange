function a(callback) {
  callback && callback('哇喔！');
}

function b(res) {
  console.log(res);
}
// a(b);

function* fn() {
  console.log("one");
  yield '1';
  console.log("two");
  yield '2';
  console.log("three");
  return '3';
}

// let f1 = fn();
// f1.next();
// f1.next();
// f1.next();
// f1.next();
// 第一次调用 next 方法时，从 Generator 函数的头部开始执行，先是打印了 one ,执行到 yield 就停下来，并将yield 后边表达式的值 '1'，作为返回对象的 value 属性值，此时函数还没有执行完， 返回对象的 done 属性值是 false。
// 第二次调用 next 方法时，同上步 。
// 第三次调用 next 方法时，先是打印了 three ，然后执行了函数的返回操作，并将 return 后面的表达式的值，作为返回对象的 value 属性值，此时函数已经结束，多以 done 属性值为true 。
// 第四次调用 next 方法时， 此时函数已经执行完了，所以返回 value 属性值是 undefined ，done 属性值是 true 。如果执行第三步时，没有 return 语句的话，就直接返回 {value: undefined, done: true}。

function* sum(a) {
  console.log('a:', a);
  let b = yield 1;
  console.log('b:', b);
  let c = yield 2;
  console.log('c:', c);
  let sum = a + b + c;
  console.log('sum:', sum)
  return sum;
}
// 不传参
// let s1 = sum();
// s1.next();
// s1.next();
// s1.next();

// 传参
// let s2 = sum(10);
// s2.next(20);
// s2.next(30);
// s2.next(40);

// Promise
// new Promise(function (resolve, reject) {
//   resolve(1);
// }).then(function (data) {
//   console.log(data);
//   return 2; // 包装成 Promise.resolve(2)
// }).then(function (data) {
//   console.log(data);
// }).catch(function (err) {
//   console.log(err);
// })
// Promise.all
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});
const promise4 = new Promise((resolve, reject) => {
  reject('我会rejected的')
})
Promise.all([promise1, promise2, promise3]).then((values) => {
  // console.log(values); // [3, 42, "foo"]
});


Promise.allSettled([promise1, promise2, promise3, promise4]).then((res) => {
  // console.log(res);
})

function 中文编程() {
  let 秀儿 = '秀儿'
  console.log(秀儿)
}
// 中文编程();

async function async1() {
  return '秀儿';
}
// console.log(async1()); // Promise {<fulfilled>: "秀儿"}

async function async2() {
  let res = await promise3;
  console.log(res);
}
// async2();
// console.log('1');


// event-loop
async function foo() {
  console.log('foo')
}
async function bar() {
  console.log('bar start')
  await foo()
  console.log('bar end')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)
bar();
new Promise(function (resolve) {
  console.log('promise executor')
  resolve();
}).then(function () {
  console.log('promise then')
})
console.log('script end')

// script start
// bar start
// foo
// promise executor
// script end
// bar end
// promise then
// setTimeout

// node和浏览器的event loop是node 11版本开始统一的