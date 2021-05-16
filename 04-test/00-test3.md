### 如何让 `a == 5 && a == 8`？
#### 题解一
隐式转换，利用对象的 `valueOf` 或 `toString` 方法
```js
var a = {
  i: 0,
  // valueOf: function () {
  //   return this.i++ * 3 + 5;
  // },
  toString: function () {
    return this.i++ * 3 + 5;
  },
}
console.log(a == 5 && a == 8);
```
#### 题解二
隐式转换，利用数组的 `join` 和 `shift` 方法。
```js
var a = [5, 8];
a.join = a.shift;
console.log(a == 5 && a == 8);
```
或者 `pop` 方法也可以
```js
var a = [8, 5];
a.join = a.pop;
console.log(a == 5 && a == 8);
```
####  题解三
利用 `proxy` 代理
```js
var a = new Proxy({ i: 0 }, {
  get(target) {
    return () => target.i++ * 3 + 5;
  }
});
console.log(a == 5 && a == 8);
```
####  题解四
利用`Object.defineProperty`，这个方法用即使全等(`===`)也都可以
```js
var a = 0;
Object.defineProperty(window, 'i', {
  get: function () {
    return a++ * 3 + 5;
  },
})
console.log(i === 5 && i === 8);
```