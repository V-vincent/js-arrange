### 变量和函数
#### 一、变量提升
```js
var a = 'hello world';
var a;
console.log(a);
```
输出：`hello world`；先声明后赋值，以上代码相当于：
```js
var a;
var a;
a = 'hello world';
console.log(a);
```
#### 二、暂时性死区
```js
function test() {
  console.log(name);
  console.log(age);
  var name = 'test';
  let age = 18;
}
test();
```
输出 `undefined` 和报错 `ReferenceError`；变量提升就不多解释了。

`let`的变量提升：
```js
var name = '张三'
{
  console.log(name)
  let name = '李四'
}
```
输出：`Uncaught ReferenceError: Cannot access 'name' before initialization`；
如果 `let` 不存在变量提升，那么应该会打印 `张三` ；结果却抛出了 `ReferenceError`，这说明 `let` 也会变量提升，但是存在**暂时性死区**，在变量声明前不允许访问。

变量的赋值可以分为三个阶段：
- 创建变量，在内存中开辟空间
- 初始化变量，将变量初始化为 `undefined`
- 真正赋值
关于`let`、`var` 和 `function` ：
- `let` 的**创建**过程被提升了，但是初始化没有提升。
- `var` 的**创建**和**初始化**都被提升了。
- `function` 的**创建**、**初始化**和**赋值**都被提升了。

#### 三、函数提升
```js
console.log(a);
var a = 1;
function a() {}
console.log(a);
```
输出：`ƒ a() {}` 和`1`。

都说**函数提升优先于变量提升**，那你是否有些疑惑呢？如果是优先的话，不应该是以下这样子吗？
```js
function a = function() {}
var a;
console.log(a);
a = 1;
console.log(a);
```
我一开始认为第一个打印是这样输出`undefined`的，但是看到运行结果是`ƒ a() {}`我就百思不得其解。百度得来的解释是“函数提升优先级高于变量提升，且不会被同名变量声明时覆盖，但是会被同名变量赋值后覆盖”；“不会被同名变量声明时覆盖”，这个说法我一直觉得差点意思，直到后来看了《你不知道的JavaScript上卷》（第一部分作用域和闭包>第4章>4.3函数优先），里面有一段话是这样说的“**注意，`var foo`尽管出现在`function foo()...`的声明之前，但它是重复的声明（因此被忽略了），因为函数声明会被提升到普通变量之前。**”。于是我觉得“同名变量声明会被忽略”要比“不会被同名变量声明时覆盖”要好一点。当然，其实最终结果都差不多。

所以关于函数提升，我的理解是“**函数和变量声明中，函数优先被提升，并且重复变量声明会被忽略，会被同名变量或函数声明覆盖（函数声明有赋值操作）**”。

#### 四、函数挂载问题
```js
function Foo() {
  Foo.a = function () {
    console.log(1)
  }
  this.a = function () {
    console.log(2)
  }
}
Foo.prototype.a = function () {
  console.log(3)
}
Foo.a = function () {
  console.log(4)
}
Foo.a();
let obj = new Foo();
obj.a();
Foo.a();
```
输出：`4`、`2`、`1`。
- `Foo.a()`：在 `Foo` 上挂载了直接方法 `a` ，输出值为 `4`。
- `obj.a()`：因为有直接方法 `a`，不需要去访问原型链，所以使用的是构建方法里所定义的 `this.a`，输出 `2`
- `Foo.a()`：构建方法里已经替换了全局 `Foo` 上的 `a` 方法，所以输出 `1`
PS：把 `Foo` 里面的 `this.a` 去掉再打印看看。

#### 相关面试题
##### 一
```js
var a = 10;
(function () {
  console.log(a);
  a = 5;
  console.log(window.a);
  var a = 20;
  console.log(a);
})()
```
##### 二
```js
a();
var a = function () {
  console.log(1);
}
a();
function a() {
  console.log(2);
}
a();
```
##### 三
```js
a();
function a() {
  console.log(1);
}
function a() {
  console.log(2);
}
```
##### 四
```js
var a = 1;
(function (a) {
  a = 2;
})(a)
console.log(a);
```
##### 五
```js
var b = 10;
(function b() {
  b = 20;
  console.log(b);
})();
console.log(b);
```
##### 六
```js
var name = 'Tom';
(function () {
  if (typeof name == 'undefined') {
    var name = 'Jack';
    console.log('Goodbye ' + name);
  } else {
    console.log('Hello ' + name);
  }
})();
```
##### 七
```js
var name = 'Tom';
(function () {
  if (typeof name == 'undefined') {
    name = 'Jack';
    console.log('Goodbye ' + name);
  } else {
    console.log('Hello ' + name);
  }
})();
```
##### 八
```js
function test(a, b) {
  console.log(b);
  return {
    test: function (c, a) {
      return test(c, a);
    }
  }
}
var b = test(100, 200);
b.test(300);
b.test(400);
var c = test(101).test(201).test(401);
var d = test(102).test(202, 302);
d.test();
```

### 对象
#### 一、对象键名转换
```js
// example 1
var a = {}, b = '123', c = 123;
a[b] = 'b';
a[c] = 'c';
console.log(a[b]);
// example 2
var a = {}, b = Symbol('123'), c = Symbol('123');
a[b] = 'b';
a[c] = 'c';
console.log(a[b]);
// example 3
var a = {}, b = { key: '123' }, c = { key: '456' };
a[b] = 'b';
a[c] = 'c';
console.log(a[b]);
```
对象键名转换：
- 对象的键名只能是字符串和 `Symbol` 类型。
- 其他类型的键名会被转换成字符串类型。
- 对象转字符串默认会调用 `toString` 方法。
输出：
- example1：输出 `c`；键名会转化为字符串，`a[b]`和 `a[c]`都是 `a['123']`
- example2：输出 `b`； Symbol类型的数据是唯一的，当作键名也不会一样，所以 `a[b]` 会输出`b` 
- example3：输出 `c`；对象转字符串默认调用`toString`方法，`a[b]`和 `a[c]` 都是 `a['[object Object]']`

#### 二、对象引用问题
```js
let a = { name: '张三' };
let b;
b = a;
a.name = '李四';
console.log(b.name);
```
输出：`李四`。

当设置 `b = a` 时，它们为相同的引用；修改引用的属性值，所有指向这个引用的对象都会改变。

扩展：
```js
function test(person) {
  person.age = 30;
  person = {
    name: 'def',
    age: 24
  };
  return person;
}
const p1 = {
  name: 'abc',
  age: 18
};
const p2 = test(p1);
console.log(p1);
console.log(p2);
```
#### 三、对象引用问题
```js
function change(obj) {
  obj.url = "http://www.baidu.com";
  obj = new Object();
  obj.url = "http://www.google.com";
}
let webUrl = new Object();
change(webUrl);
console.log(webUrl.url);
```
输出：`http://www.baidu.com`。对象引用地址和指向问题。
- 扩展一：
```js
var user = {
  age: 10,
}
function change(user) {
  user.age = 20;
}
change(user);
console.log(user.age);
```
- 扩展二：
```js
var user = {
  age: 10,
}
function change(user) {
  user = {
    age: 30
  }
}
change(user);
console.log(user.age);
```

#### 四、对象引用问题
```js
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a.x);
console.log(b.x);
```
输出：`undefined`、`{ n: 2 }`。

`a.x = a = { n: 2 }` 的执行顺序（从左往右）
1. `a`，得到 `a` 的引用，即 `{ n: 1 }`
2. `a.x`，给旧对象声明了一个`x`属性，即得到 `{ n: 1, x: undefined }`
3. `a`，得到 `a` 的引用
4. `a = { n: 2 }`，**覆盖 `a` 的引用**，即 `a` 指向了 `{ n: 2 }`，同时操作完成后返回右操作数 `{ n: 2 }`
5. `a.x = { n: 2 }`，把 `a.x` 指向 `{ n: 2 }`，即把 `{ n: 1, x: undefined }` 中的 `x` 指向`{ n: 2 }`
最后 `a = { n: 2 }`，`b = { n: 1, x: { n: 2 } }`。

#### 五、this指向问题
```js
let obj = {
  val: 10,
  fn1() {
    console.log(this.val);
  },
  fn2: () => {
    console.log(this.val);
  }
};
obj.fn1();
obj.fn2();
```
输出：`10` 和 `undefined`。

函数`fn1`中的`this`指向`obj`对象；而`fn2`是箭头函数，箭头函数没有自己的执行上下文，会继承调用函数中的 `this`，即`fn2`中的`this`指向`window`对象。

### 类型转换
#### 一、转 `Boolean`
```js
console.log(!'AA');
console.log(!'');
console.log(!undefined);
```
输出：`false`、`true`、`true`。

转换为 `Boolean` 类型时，除了 `undefined`， `null`， `false`， `NaN`， `''`， `0`， `-0`，其他所有值都转为 `true`，包括所有对象。
#### 二、`==` 和 `===`
```js
console.log(1 == new Number(1));
console.log(1 === new Number(1));
console.log('11' == new String('11'));
console.log('11' === new String('11'));
```
输出：`true`、`false`、`true`、`false`。
- 对于 `==` 来说，如果对比双方的类型不一样的话，就会进行类型转换。
- 对于 === 来说，就是判断两者类型和值是否相同。 
`Number` 是JS的内置构造器函数，`new Number(1)` 得到的是一个对象，当使用 `==` 时类型不同会进行类型转换，转化为相同的类型再比较，所以输出 `true` ；当使用 `===` 时，值和类型都要相等，所以输出`false`。`String` 同理。

#### 三、四则运算符
```js
console.log(1 + true);
console.log(1 + "1");
console.log(2 * "2");
console.log([1, 2] + [2, 1]);
console.log("a" + + "b");
console.log(+ "3" + 2 + 1);
console.log(1 + + '2' + '3');
console.log('A' - 'B' + 'C');
```
加法运算符有以下两个特点：
- 运算中其中一方为字符串，那么就会把另一方也转换为字符串。
- 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串。
对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字。

#### 四、变量自增
```js
let num = 1;
console.log(num++);
console.log(++num);
console.log(num);
```
输出：`1`、`3`、`3`。以上打印代码相当于：
```js
console.log(num);
num = num + 1;
num = num + 1;
console.log(num);
console.log(num);
```
`a++` 和 `++a` 的区别：
- `a++`：先将 `a` 的值赋给一个变量，再自增
- `++a`：先自增，再把 `a` 的值赋给一个变量
举例说明：
```js
var a = 0;
b = a++; // 等同于 b = a; a = a + 1; 此时 b = 0，a = 1
```
```js
var a = 0;
b = ++a; // 等同于 a = a + 1; b = a; 此时 b = 1，a = 1
```
扩展：
```js
var a = 0.1, b = a+++a, c = a--+b;
console.log(a, b, c); 
```
输出：`0.1`、`1.2`、`2.3`。

因为 `b = a++ + a = 0.1 + a = 0.1 + 1.1 = 1.2;`，此时 `a = 1.1`；
`c = a-- + b = 1.1 + 1.2 = 2.3`; 此时 `a = 0.1`。

### 事件循环
异步回调的两种方式：
1. **第一种是把异步回调函数封装成一个宏任务，添加到消息队列尾部，当循环系统执行到该任务的时候执行回调函数**。如`setTimeout` 和 `XMLHttpRequest` 的回调函数。
2. **第二种方式的执行时机是在主函数执行结束之后、当前宏任务结束之前执行回调函数**，这通常都是以微任务形式体现的。浏览器可以通过使用 `MutationObserver` 和 `Promise` 产生微任务。
#### 一、setTimeout
```js
console.log('setTimeout start')
setTimeout(function () {
  console.log('setTimeout execute')
}, 0)
console.log('setTimeout end')
```
输出顺序：`setTimeout start` => `setTimeout end` => `setTimeout execute`
#### 二、for循环里面的setTimeout
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
```
第一个循环结果输出3个`3`；`setTimeout`函数会被添加到消息队列尾部，当它真正被执行时`for`循环已经走完，这时`i = 6`。

第二个循环输出`0` `1` `2`；`let` 具有块级作用域，每次迭代`i` 都会创建为一个新值，并且每个值都会存在于循环内的块级作用域。

#### 三、Promise
```js
console.log('script start');
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
  console.log('promise1 end');
}).then(function () {
  console.log('promise2');
})
setTimeout(function () {
  console.log('setimeout');
}, 0)
console.log('script end');
```
输出顺序：`script start` => `promise1` => `promise1 end` => `script end` => `promise2` => `setimeout`。

`Promise` 采用了**回调函数延迟绑定技术**，`new Promise`里面的代码是同步执行的并且还没有绑定回调函数（`then`后面的函数），所以打印 `script start` 之后会继续打印 `promise1` 和 `promise1 end` ；`Promise` 的回调函数会加入到当前宏任务中的微任务里面，而 `setTimeout` 的回调函数是添加到维护宏任务的消息队列后面去的，所以是先打印  `promise2` 再打印 `setimeout`。

#### 四、async/await
```js
async function async1() {
  console.log('async1 start')
  await async2();
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
async1();
console.log('script end')
```
输出顺序：`script start` => `async1 start` => `async2` => `script end` => `async1 end`。

**`async` 是一个通过异步执行并隐式返回 `Promise` 作为结果的函数**。它跟 `Promise`的执行方式类似，不过是以同步的方式执行，可以把 `await` 让出线程的标志，执行到 `await` 后会跳出当前`async`函数（`async1`）继续执行后面的代码（`async2`） ，执行完再回来 `async1` 函数内 `await` 后面的代码。

#### 五、事件循环
```js
console.log('script start')
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
async1()
setTimeout(function () {
  console.log('setTimeout')
}, 0)
new Promise(resolve => {
  console.log('promise1 start')
  resolve()
  console.log('promise1 end')
}).then(function () {
  console.log('promise2')
}).then(function () {
  console.log('promise3')
})
console.log('script end')
```
输出顺序：`script start` => `async1 start` => `async2` => `promise1 start` => `promise1 end` => `script end` => `async1 end` => `promise2` => `promise3` => `setTimeout`。

解这个题需要好好理解异步回调的两种方式，`Promise` 的是微任务，`setTimeout` 的是宏任务；**每个宏任务都关联了一个微任务队列，微任务的执行时机是在主函数执行结束之后、当前宏任务结束之前**。如果在执行微任务的过程中，产生了新的微任务，同样会将该微任务继续添加到当前微任务队列中，V8 引擎一直循环执行微任务队列中的任务，直到队列为空才算执行结束。

### 总结
以上的这些面试题大部分考察的是你对JS执行机制的理解，关于JS执行机制的知识点可以看我费了好大的劲整理出来的[JavaScript执行机制的知识点整理（很详细）](https://juejin.cn/post/6960589680739876894)这篇文章，相信你看完之后会有很大的收获，可以把知识点串起来建立一个体系化的知识系统。