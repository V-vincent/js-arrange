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

// 手写实现一个Promise
// 看着这个Promise结构
new Promise(function (resolve, reject) {
  resolve(1);
  // reject(2);
}).then(function (data) {
  // console.log(data);
})
// Promise传进去一个函数，函数里面怎么处理呢？
// Promise内部是同步立即执行的，那么fn函数应该是直接执行？
// 函数的两个参数也是函数：resolve、reject
// 用try...catch...？catch捕获的肯定是执行reject函数了
// then函数（链式调用）怎么实现呢？
// resolve函数即then的第一个参数
// reject可以当做then的第二个参数

// 定义promise的三个状态
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

function myPromise(fn) {
  // 当前执行上下文
  let that = this;
  // 初始状态是pending
  that.status = PENDING;
  // 参数
  that.params = null;
  // 定义两个回调数组：存储resolve和reject要执行的函数(then传进来的函数)
  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];

  // 定义resolve函数
  function resolve(params) {
    // 只有状态为PENDING时才可以操作
    if (that.status === PENDING) {
      // 修改状态
      that.status = RESOLVED;
      that.params = params;
      // console.log('我是resolve函数');
      // 遍历执行函数
      that.resolvedCallbacks.map(cb => cb(that.params));
    }
  }

  // 定义rejected函数
  function reject(params) {
    // 只有状态为PENDING时才可以操作
    if (that.status === PENDING) {
      that.status = REJECTED;
      that.params = params;
      // console.log('我是reject函数');
      // 遍历执行函数
      that.rejectedCallbacks.map(cb => cb(that.params));
    }
  }

  // 执行fn()
  try {
    fn(resolve, reject);
    // console.log('我是fn函数');
  } catch (err) {
    reject(err);
  }
}
// 在Promise的原型上扩展then函数，实现链式调用
// 其实就是把对应状态的函数加进回调数组中，等fn()函数执行完后执行回调
myPromise.prototype.then = function (onFulfilled, onRejected) {
  let that = this;
  // console.log(that.status);
  // 当状态为PENDING时，把onFulfilled和onRejected加进对应数组中
  if (that.status === PENDING) {
    that.resolvedCallbacks.push(onFulfilled);
    that.rejectedCallbacks.push(onRejected);
    // console.log(that.rejectedCallbacks, that.resolvedCallbacks);
  }
  // 当状态为RESOLVED时，执行onFulfilled
  if (that.status === RESOLVED) {
    onFulfilled(that.params);
  }
  // 当状态为RESOLVED时，执行onRejected
  if (that.status === REJECTED) {
    onRejected(that.params);
  }
}

new myPromise(function (resolve, reject) {
  console.log(1);
  resolve('我是resolve');
  // reject('我是reject');
  console.log(2);
}).then(function (res) {
  console.log('res:', res)
}, function (err) {
  console.log('err:', err)
})