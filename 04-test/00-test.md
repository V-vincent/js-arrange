### 箭头函数与普通函数（`function`）的区别是什么？构造函数（`function`）可以使用 `new` 生成实例，那么箭头函数可以吗？为什么？
- 函数体内的 `this` 对象，是外部第一个包裹的普通函数的`this`对象，而不是使用时所在的对象。
- 不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替。
- 不可以使用 `yield` 命令，因此箭头函数不能用作 `Generator` 函数。
- 不可以使用 `new` 命令，因为：
  - 没有自己的 `this`，无法调用 `call`，`apply`。
  - 没有 `prototype` 属性 ，而 `new` 命令在执行时需要将构造函数的 `prototype` 赋值给新的对象的 `__proto__`


### a.b.c.d 和 a['b']['c']['d']，哪个性能更高？
`a.b.c.d` 比 `a['b']['c']['d']` 性能高点，后者还要考虑 `[ ]` 中是变量的情况，再者，从两种形式的结构来看，显然编译器解析前者要比后者容易些，自然也就快一点。

### 实现模糊搜索结果的关键词高亮显示
- vue项目可以搭配`v-html`使用
- 可以用正则替换掉关键词
```js
let panter = new RegExp(word, 'g')
str.replace(panter, '<b style="color: #2D7BFF">' + word + '</b>')
```

### 如何用 css 或 js 实现多行文本溢出省略效果，考虑兼容性
单行：
```css
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```
多行：
```css
.text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; // 行数
  overflow: hidden;
}
```
兼容：
```css
p {
  position: relative;
  line-height: 20px;
  max-height: 40px;
  overflow: hidden;
}
p::after {
  content: "...";
  position: absolute;
  bottom: 0;
  right: 0;
  padding-left: 40px;
  background: -webkit-linear-gradient(left, transparent, #fff 55%);
  background: -o-linear-gradient(right, transparent, #fff 55%);
  background: -moz-linear-gradient(right, transparent, #fff 55%);
  background: linear-gradient(to right, transparent, #fff 55%);
}
```