
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
demo.then(onResolve);

// 介绍下 Promise.all 使用、原理实现及错误处理
// 使用
// Promise.all()接受一个由promise任务组成的数组，可以同时处理多个promise任务，当所有的任务都执行完成时，
// Promise.all()返回resolve，但当有一个失败(reject)，则返回失败的信息，即使其他promise执行成功，也会返回失败。
// 以下 demo，请求两个 url，当两个异步请求返还结果后，再请求第三个 url
const p1 = request(`url1`)
const p2 = request(`url2`)
Promise.all([p1, p2]).then((datas) => { // 此处 datas 为调用 p1, p2 后的结果的数组
  return request(`url3?a=${datas[0]}&b=${datas[1]}`)
}).then((data) => {
  console.log(msg)
})
// 原理实现
function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("argument must be anarray"))
    }
    let dealNum = 0;
    let pLen = promises.length;
    let res = new Array(pLen);
    for (let i = 0; i < pLen; i++) {
      Promise.resolve(promises[i]).then(function (value) {
        dealNum++;
        res[i] = value;
        if (dealNum === pLen) {
          return resolve(res)
        }
      }, function (err) {
        return reject(reason)
      })
    }
  })
}
let p1 = Promise.resolve(1);
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2);
  }, 200)
});
let p3 = Promise.resolve(3);
promiseAll([p1, p2, p3]).then(function (res) {
  console.log(res);
})

// 错误处理
// 有时候我们使用Promise.all()执行很多个网络请求，可能有一个请求出错，但我们并不希望其他的网络请求也返回reject，要错都错，这样显然是不合理的。
// 如何做才能做到promise.all中即使一个promise程序reject，promise.all依然能把其他数据正确返回呢?
// 当promise捕获到error 的时候，代码吃掉这个异常，返回resolve，约定特殊格式表示这个调用成功了
let p4 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(4);
  }, 0)
});
let p5 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(5);
  }, 200)
});
let p6 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    try {
      console.log(XX.BBB);
    }
    catch (exp) {
      resolve("error");
    }
  }, 100)
});
Promise.all([p4, p5, p6]).then(function (results) {
  console.log("success")
  console.log(results);
}).catch(function (r) {
  console.log("err");
  console.log(r);
});

// 模拟实现一个 Promise.finally
// finally的作用：
// 在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数
Promise.prototype.finally = function (callback) {
  let Fn = this.constructor;
  return this.then(
    res => Fn.resolve(callback()).then(() => res),
    err => Fn.resolve(callback()).then(() => { throw err })
  );
};

// 设计并实现 Promise.race()
Promise.prototype.race = function (list) {
  return new Promise((resolve, reject) => {
    list.forEach(item => {
      Promise.resolve(item).then(resolve, reject);
    });
  })
}
// Promise.all可以将多个实例组装成一个新的实例，成功的时候返回一个成功数组，失败的时候则返回最先被reject失败状态的值
// race是赛跑的意思，即Promise.race([p1, p2, p3])里面的结果哪个获取的快，就返回哪个结果，不管结果本身是成功还是失败