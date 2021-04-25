
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


function executor(resolve, reject) {
  let rand = Math.random();
  console.log(1)
  console.log(rand)
  if (rand > 0.5)
    resolve()
  else
    reject()
}
var p0 = new Promise(executor);

var p1 = p0.then((value) => {
  console.log("succeed-1")
  return new Promise(executor)
})

var p3 = p1.then((value) => {
  console.log("succeed-2")
  return new Promise(executor)
})

var p4 = p3.then((value) => {
  console.log("succeed-3")
  return new Promise(executor)
})

p4.catch((error) => {
  console.log("error")
})
console.log(2)

// p0-p4四个Promise对象，无论哪个对象里面抛出异常，都可以通过最后一个对象 p4.catch 来捕获异常，
// 通过这种方式可以将所有 Promise 对象的错误合并到一个函数来处理，这样就解决了每个任务都需要单独处理异常的问题

// 回调函数延迟绑定技术
function executor(resolve, reject) {
  resolve(100)
}
let demo = new Promise(executor)
function onResolve(value) {
  console.log(value)
}
demo.then(onResolve)