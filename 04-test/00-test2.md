## 这些看似简单的打印面试题，你都做对了吗？

### 变量和函数
#### 一
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

#### 二
```js
console.log(a);
var a = 1;
function a() {}
console.log(a);
```
输出：`ƒ a() {}`和`1`。都说**函数提升优先于变量提升**，那你是否有些疑惑呢？如果是优先的话，不应该是以下这样子吗？
```js
function a = function() {}
var a;
console.log(a);
a = 1;
console.log(a);
```
我一开始认为第一个打印是这样输出`undefined`的，但是看到运行结果是`ƒ a() {}`我就百思不得其解。百度得来的解释是“函数提升优先级高于变量提升，且不会被同名变量声明时覆盖，但是会被同名变量赋值后覆盖”；“不会被同名变量声明时覆盖”，这个说法我一直觉得差点意思，直到后来看了《你不知道的JavaScript上卷》（第一部分作用域和闭包>第4章>4.3函数优先），里面有一段话是这样说的“**注意，`var foo`尽管出现在`function foo()...`的声明之前，但它是重复的声明（因此被忽略了），因为函数声明会被提升到普通变量之前。**”。于是我觉得“同名变量声明会被忽略”要比“不会被同名变量声明时覆盖”要好一点。当然，其实最终结果都差不多。
所以关于函数提升，我的理解是“**函数和变量声明中，函数优先被提升，并且重复变量声明会被忽略，会被同名变量或函数声明覆盖（函数声明有赋值操作）**”

函数a和变量a出发找地方建房子，虽然函数a晚出发，但是它速度快（函数提升优先级高于变量提升），等变量a到的时候函数a已经建好房子并且住进去了，变量a看到这个风水宝地被占了于是就走了（且不会被同名变量声明时覆盖），这时候打印的是`ƒ a() {}`；但是变量a不甘心，它搬救兵（`a = 1`）回来了（同名变量赋值），最后再打印`a`的结果会是`1`。

#### 三
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
PS：把`Foo`里面的`this.a`去掉再打印看看。

#### 四
```js
function test1() {
  console.log(name);
  console.log(age);
  var name = 'test1';
  let age = 18;
}
test1();
```
输出 `undefined` 和报错 `ReferenceError`；变量提升就不多解释了。

`let`的变量提升：
```js
var name = '张三'
{
  
  let name = '李四'
  console.log(name)
}
```
输出：`Uncaught ReferenceError: Cannot access 'name' before initialization`
如果`let` 不存在变量提升，那么应该会打印`张三`；结果却抛出了`ReferenceError`，这说明`let`也会变量提升，但是存在**暂时性死区**，在变量声明前不允许访问。

变量的赋值可以分为三个阶段：
- 创建变量，在内存中开辟空间
- 初始化变量，将变量初始化为 `undefined`
- 真正赋值
关于`let`、`var` 和`function` ：
`let` 的**创建**过程被提升了，但是初始化没有提升。
`var` 的**创建**和**初始化**都被提升了。
`function` 的**创建**、**初始化**和**赋值**都被提升了。

#### 相关面试题
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
```js
a();
function a() {
  console.log(1);
}
function a() {
  console.log(2);
}
```
```js
var b = 10;
(function b() {
  b = 20;
  console.log(b);
})();
console.log(b);
```
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
```js
var a = 1;
(function (a) {
  a = 2;
})(a)
console.log(a);
```
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
#### 一
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
- 对象的键名只能是字符串和 Symbol 类型。
- 其他类型的键名会被转换成字符串类型。
- 对象转字符串默认会调用 toString 方法。
输出：
- example1：输出`c`；键名会转化为字符串，`a[b]`和 `a[c]`都是 `a['123']`
- example2：输出`b`； Symbol类型的数据是唯一的，当作键名也不会一样，所以 `a[b]` 会输出`b` 
- example3：输出`c`；对象转字符串默认调用`toString`方法，`a[b]`和 `a[c]` 都是 `a['[object Object]']`

#### 二
```js
let a = { name: '张三' };
let b;
b = a;
a.name = '李四';
console.log(b.name);
```
输出：`李四`。当设置`b = a`时，它们为相同的引用；修改引用的属性值，所有指向这个引用的对象都会改变。

#### 三
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

#### 四
```js
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a.x);
console.log(b.x);
```
分别输出：`undefined`、`{ n: 2 }`
`a.x = a = { n: 2 }` 的执行顺序（从左往右）
1. `a`，得到 `a` 的引用，即 `{ n: 1 }`
2. `a.x`，给旧对象声明了一个`x`属性，即得到 `{ n: 1, x: undefined }`
3. `a`，得到 `a` 的引用
4. `a = { n: 2 }`，**覆盖 `a` 的引用**，即 `a` 指向了 `{ n: 2 }`，同时操作完成后返回右操作数 `{ n: 2 }`
5. `a.x = { n: 2 }`，把 `a.x` 指向 `{ n: 2 }`，即把 `{ n: 1, x: undefined }` 中的 `x` 指向`{ n: 2 }`
最后 `a = { n: 2 }`，`b = { n: 1, x: { n: 2 } }`

#### 五
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
输出：`10` 和 `undefined`。函数`fn1`中的`this`指向`obj`对象；而`fn2`是箭头函数，箭头函数没有自己的执行上下文，会继承调用函数中的 `this`，即`fn2`中的`this`指向`window`对象。

### 四则运算
#### 一
```js
console.log(+true);
console.log(!'AA');
```
输出：`1`、`false`。加号运算会尝试将 `boolean` 类型转换为数字类型，`true`转为`1`，`false`转为`0`；字符串`'AA'`是真值，非真即为`false`。

#### 二
```js
console.log(1 == new Number(1));
console.log(1 === new Number(1));
```
输出：`true`、`false`。`new Number(1)`为一个对象，当使用`==`时类型不同会进行隐式转换，转化为相同的类型再比较，所以输出`true`；当使用`===`时，值和类型都要相等，所以输出`false`。

#### 三
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
`a++`和`++a`的区别：
- `a++`：先将`a`的值赋给一个变量，再自增
- `++a`：先自增，再把`a`的值赋给一个变量
举例说明：
```js
var a = 0;
b = a++; // 等同于 b = a; a = a + 1; 此时 b = 0，a = 1
```
```js
var a = 0;
b = ++a; // 等同于 a = a + 1; b = a; 此时 b = 1，a = 1
```

#### 相关面试题
```js
console.log(String('11') == new String('11'));
console.log(String('11') === new String('11'));
console.log(1 + "1");
console.log(2 * "2");
console.log([1, 2] + [2, 1]);
console.log("a" + + "b");
console.log(+ "3" + 2 + 1);
console.log(1 + + '2' + '3');
console.log('A' - 'B' + 'C');
console.log(0 && 2 || 1);
var aa = 0.1, bb = aa+++aa, cc = aa--+bb;
console.log(bb, cc); 
```

### 事件循环
#### 一
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

#### 二
```js
console.log('setTimeout start')
setTimeout(function () {
  console.log('setTimeout execute')
}, 0)
console.log('setTimeout end')
```
`setTimeout start` => `setTimeout end` => `setTimeout execute`

#### 三
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
`script start` => `promise1` => `promise1 end` => `script end` => `promise2` => `setimeout`

#### 四
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
`script start` => `async1 start` => `async2` => `script end` => `async1 end`

#### 五
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
`script start` => `async1 start` => `async2` => `promise1 start` => `promise1 end` => 
`script end` => `async1 end` => `promise2` => `promise3` => `setTimeout`