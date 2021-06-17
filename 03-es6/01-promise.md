## Promise

### 了解 Promise

`Promise` 是异步编程的一种解决方案，ES6 新增的一个对象，用来传递 **异步操作** 的消息。它代表了某个未来才会知道结果的事件（通常是一个异步操作），并且这个事件提供统一的 API，可供进一步处理。

`Promise` 有以下两个特点：

- **`Promise` 的状态不受外界影响**。`Promise` 翻译过来是承诺的意思，这个承诺会在未来有一个确切的答复，并且该承诺有三种状态，分别是：**等待中 `pending`、已完成 `resolved`、已失败 `rejected`**。它代表一个异步操作，只有异步操作的结果可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
- `Promise` 一旦由等待状态变成为其他状态就永远 **不能更改为其他状态** 了。也就是说，当状态从 `pending` 变为 `resolved` 或者 `rejected` 后，状态就不能更改了。

```js
new Promise((resolve, reject) => {
  resolve("resolve");
  reject("reject"); // 这个reject无效
});
```

在构造 `Promise` 的时候，构造函数内部的代码是立即执行的：

```js
new Promise((resolve, reject) => {
  console.log(1);
  resolve("resolve");
});
console.log(2);

// 先后输出：1 2
```

`Promise` 很好地解决了 **回调地狱** 的问题，使代码可以变得更加简洁优雅。

`Promise` 也存在一些缺点：

- 它一旦新建就会立即执行，无法中途取消；
- 错误是需要通过回调函数捕获。

### Promise 的链式调用

`promise` 构造函数内是同步执行的， 通过 `then` 实现链式调用，`then` 方法是异步执行的。

```js
new Promise(function (resolve, reject) {
  resolve(1);
})
  .then(function (data) {
    console.log(data);
    return 2; // 包装成 Promise.resolve(2)
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });
```

### Promise 的实现解构

#### 看 `Promise` 结构思考问题

先看看这个 `Promise` 的结构：

```js
new Promise(function (resolve, reject) {
  resolve(1);
  // reject(2);
}).then(function (data) {
  // console.log(data);
});
```

思考以下问题：

- `Promise`传进去一个函数 `fn`，函数里面怎么处理呢？
- `Promise`内部是同步立即执行的，那么`fn` 函数应该是直接执行？
- 函数的两个参数也是函数：`resolve`、`reject`
- 用 `try...catch...`？`catch` 捕获的肯定是执行 `reject` 函数了
- `then` 函数（链式调用）怎么实现呢？**延迟回调绑定技术**
- `resolve` 函数即 `then` 的第一个参数
- `reject` 可以当做 `then` 的第二个参数

#### 定义状态常量

首先，创建三个表示状态的常量：

```js
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";
```

#### 搭建构造函数的框架

然后，搭建构造函数的框架：

```js
function myPromise(fn) {
  // 传入的是一个函数
  // 定义一个常量that来缓存当前的this对象
  const that = this;
  // 初始状态是pending
  that.status = PENDING;
  // 定义一个变量来保存resolve或者reject传入的值
  that.params = null;
  // 定义两个数组来记录异步操作之后回来执行的函数（即保存then中的回调函数，等状态改变时执行）
  that.resolvedCallBacks = []; // 状态转为成功之后执行的函数
  that.rejectedCallBacks = []; // 状态转为失败之后执行的函数
  // 定义resolve函数
  function resolve() {}
  // 定义reject函数
  function reject() {}
  // 执行fn函数
  fn();
}
```

#### 完善 `resolve` 和 `reject` 函数

之后，完善 `resolve` 和 `reject` 函数：

```js
// 定义resolve函数
function resolve(params) {
  // 只有状态为初始状态时才执行
  if (that.status === PENDING) {
    that.status = RESOLVED; // 执行之后状态改为成功
    that.params = params; // 记录传入的参数
    // 遍历回调函数并执行
    that.resolvedCallBacks.map(function (callback) {
      callback && callback(that.params);
    });
  }
}
// 定义reject函数
function reject(params) {
  // 只有状态为初始状态时才执行
  if (that.status === PENDING) {
    that.status = REJECTED; // 执行之后状态改为失败
    that.params = params; // 记录传入的参数
    // 遍历回调函数并执行
    that.resolvedCallBacks.map(function (callback) {
      callback && callback(that.params);
    });
  }
}
```

#### 执行 `fn` 函数

执行 `fn` 函数时，把 `resolve` 和 `reject` 当做参数传入，捕捉到错误后执行 `reject` 函数：

```js
// 执行fn函数
try {
  fn(resolve, reject);
} catch (e) {
  reject(e);
}
```

#### 链式调用 `then` 的实现

在 `Promise` 的原型上扩展 `then` 函数，**通过延迟回调绑定技术实现链式调用**：

- `then` 函数有两个参数 `onFulfilled`、 `onRejected` (参数为函数)
- 当前实例状态变成成功状态时，`onFulfilled` 作为回调函数被调用
- 当前实例状态变成失败状态时，`onRejected` 作为回调函数被调用
- 其实就是把对应状态的函数加进回调数组中，等 `fn()` 函数执行完后执行回调

```js
myPromise.prototype.then = function (onFulfilled, onRejected) {
  let that = this;
  // console.log(that.status);
  // 当状态为 PENDING 时，把 onFulfilled 和 onRejected 加进对应数组中
  if (that.status === PENDING) {
    that.resolvedCallbacks.push(onFulfilled);
    that.rejectedCallbacks.push(onRejected);
    // console.log(that.rejectedCallbacks, that.resolvedCallbacks);
  }
  // 当状态为 RESOLVED 时，执行 onFulfilled
  if (that.status === RESOLVED) {
    onFulfilled(that.params);
  }
  // 当状态为 RESOLVED 时，执行 onRejected
  if (that.status === REJECTED) {
    onRejected(that.params);
  }
};
```

### 完整的 `Promise` 函数实现

完整的 `Promise` 函数如下：

```js
// 定义promise的三个状态
const PENDING = "PENDING";
const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED";
function myPromise(fn) {
  // 当前执行上下文
  let that = this;
  // 初始状态是pending
  that.status = PENDING;
  // 参数
  that.params = null;
  // 定义两个回调数组：存储 resolve 和 reject 要执行的函数(then传进来的函数)
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
      that.resolvedCallbacks.map((cb) => cb(that.params));
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
      that.rejectedCallbacks.map((cb) => cb(that.params));
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
myPromise.prototype.then = function (onFulfilled, onRejected) {
  let that = this;
  // console.log(that.status);
  // 当状态为 PENDING 时，把 onFulfilled 和 onRejected 加进对应数组中
  if (that.status === PENDING) {
    that.resolvedCallbacks.push(onFulfilled);
    that.rejectedCallbacks.push(onRejected);
    // console.log(that.rejectedCallbacks, that.resolvedCallbacks);
  }
  // 当状态为 RESOLVED时，执行 onFulfilled
  if (that.status === RESOLVED) {
    onFulfilled(that.params);
  }
  // 当状态为 RESOLVED时，执行 onRejected
  if (that.status === REJECTED) {
    onRejected(that.params);
  }
};
```

以上就是简易版的 `Promise` 实现了，来运行一下：

```js
new myPromise(function (resolve, reject) {
  resolve(1);
  // reject(2);
}).then(
  function (data) {
    console.log(data);
  },
  function (err) {
    console.log(err);
  }
);
```

### Promise.all

#### 使用

所有都成功才成功 resolve ；只要有一个失败就马上返回失败 reject ；
`Promise.all()` 接受一个 `promise` 的 `iterable` (一个可迭代对象，如 `Array` 或 `String`)类型的输入，可以同时处理多个 `promise` 任务。**它等待所有任务都完成才返回，或有第一个失败即返回**。

- 当所有的任务都执行完成时，`Promise.all(`) 返回 `resolve`；
- 但当有一个失败(`reject`)，则返回失败的信息，即使其他 `promise` 执行成功，也会返回失败。
  使用：

```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});
Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values); // [3, 42, "foo"]
});
```

`Promise.all()` 适合 `Promise` 彼此依赖时或其中任何一个 `rejected` 时立即结束的场景。

#### 模拟实现

模拟实现：

```js
function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("argument must be anarray"));
    }
    let dealNum = 0;
    let pLen = promises.length;
    let res = new Array(pLen);
    for (let i = 0; i < pLen; i++) {
      Promise.resolve(promises[i]).then(
        function (value) {
          dealNum++;
          res[i] = value;
          if (dealNum === pLen) {
            return resolve(res);
          }
        },
        function (err) {
          return reject(err);
        }
      );
    }
  });
}
```

使用验证：

```js
let p1 = Promise.resolve(1);
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2);
  }, 200);
});
let p3 = Promise.resolve(3);
promiseAll([p1, p2, p3]).then(function (res) {
  console.log(res);
});
```

#### 错误处理

有时候我们使用 `Promise.all()` 执行很多个网络请求，可能有一个请求出错，但我们并不希望其他的网络请求也返回 `reject`，要错都错，这样显然是不合理的。

如何做才能做到 `promise.all` 中即使一个 `promise` 程序 `reject`，`promise.all` 依然能把其他数据正确返回呢?

解决办法：错误特殊处理，也返回 `resolve`；即当 `promise` 捕获到 `error` 的时候，代码吃掉这个异常，返回 `resolve`，约定特殊格式表示这个调用成功了。

```js
let p4 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(4);
  }, 0);
});
let p5 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(5);
  }, 200);
});
let p6 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    try {
      console.log(XX.BBB);
    } catch (exp) {
      resolve("error");
    }
  }, 100);
});
Promise.all([p4, p5, p6])
  .then(function (results) {
    console.log("success");
    console.log(results);
  })
  .catch(function (r) {
    console.log("err");
    console.log(r);
  });
```

还有一种方法是通过 `Promise.allSettled` 来处理：

### Promise.allSettled

当 `Promise` 彼此不依赖时，例如有 3 个 `Promise` ： `p1`、 `p2`、`p3`，`p1` 和 `p3` 的结果是重要的，`p2` 失败也不能影响的，那这个时候可以用 `Promise.allSettled`。

`Promise.allSettled()` 方法返回一个在所有给定的 `promise` 都已经 `fulfilled` 或 `rejected` 后的 `promise` ，并带有一个对象数组，每个对象表示对应的 `promise` 结果。

```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});
const promise4 = new Promise((resolve, reject) => {
  reject("我会rejected的");
});
Promise.allSettled([promise1, promise2, promise3, promise4]).then((res) => {
  console.log(res);
});
```

每个结果对象都有一个 `status` ，如果为 `fulfilled` ，则为成功的， `value` 为成功后返回的值；如果为 `rejected`，则是失败的， `reason` 为失败后返回的值。

### Promise.race

与 `Promise.all()` 的区别：

- `Promise.all` 可以将多个实例组装成一个新的实例，成功的时候返回一个成功数组，失败的时候则返回最先被 `reject` 失败状态的值
- `race` 是赛跑的意思，即 `Promise.race([p1, p2, p3])` 里面的结果哪个获取的快，就返回哪个结果，不管结果本身是成功还是失败

模拟实现 `Promise.race()`：

```js
Promise.prototype.myRace = function (list) {
  return new Promise((resolve, reject) => {
    list.forEach((item) => {
      Promise.resolve(item).then(resolve, reject);
    });
  });
};
```

### Promise.finally

`finally` 的作用：在 `promise` 结束时，无论结果是 `fulfilled` 或者是 `rejected` ，都会执行指定的回调函数。
模拟实现 `Promise.finally`：

```js
Promise.prototype.finally = function (callback) {
  let Fn = this.constructor;
  return this.then(
    (res) => Fn.resolve(callback()).then(() => res),
    (err) =>
      Fn.resolve(callback()).then(() => {
        throw err;
      })
  );
};
```
