循环方法总结
### 循环结构
在学习循环方法之前，先理解循环结构的执行步骤：
1、声明循环变量；
2、判断循环条件；
3、执行循环体操作；
4、更新循环变量；
5、循环执行2-4，直到条件不成立，跳出循环。

### 循环方法
#### 1、for循环
```JavaScript
var arr = [1, 2, 3, 4, 5];
for (let i = 0, len = arr.length; i < len; i++) {
    console.log(`索引：${i}，元素：${arr[i]}`);
}
这里建议缓存数组长度，数组较大时对于性能有比较客观的提升。
使用了v8引擎的浏览器(有Loop-invariant code motion特性)会自动将length属性移到循环体外并缓存起来,
但是非v8浏览器（这里特指IE）还是要缓存的，而且缓存起来总没坏处。
```
在for循环中定义的新变量相当于在循环体外定义的变量，所以可以写成如下格式。
```JavaScript
var i = 0, len = arr.length;
for (; i < len; i++) {
    console.log(`索引：${i}，元素：${arr[i]}`);
}
```
每次循环执行结束都会对i进行增量操作（增量可以为负数），所以可以将更新变量写在代码块后面。而`i++`只是其中常用写法，也可以是`i = i + 2`等其他方式。
```JavaScript
var i = 0, len = arr.length;
for (; i < len;) {
    console.log(`索引：${i}，元素：${arr[i]}`);
    i++;
}
```
#### 2、while循环
当指定条件为`true`时循环一段代码块。注意：一定要对条件中使用的变量进行递增，如果不进行递增，循环就不会结束，这将会导致浏览器崩溃。
```JavaScript
var i = 0;
while (i < 5) {
    console.log(i);
    i++;
}
```
#### 3、do...while循环
`do...while`循环和`while`循环类似,区别在于`do...while`会先执行一次循环体，然后再判断循环条件，只要条件为`true`就会重复循环。
```JavaScript
var i = 0;
do {
    console.log(i);
    i++;
}
while (i < 5);
```
在`while`和`do...while`中使用`continue`要注意：`continue`不能放在更新变量之前使用，否则循环不会结束造成浏览器崩溃。
#### 4、for...in循环
`for...in`可用于遍历对象的可枚举属性，包括自有属性、继承自原型的属性，不建议用来遍历数组。
```JavaScript
var obj = {a: 1, b: 2,};
for (let i in obj) { // i是对象的属性名
    console.log(`属性：${i}，值：${obj[i]}`);
}
Object.defineProperty(obj, "c", {value: 3,}); // 增加不可枚举的属性c
Object.prototype.d = 4;
for(var i in obj){
    console.log(`属性：${i}，值：${obj[i]}`);
}
```
#### 5、for...of循环
`for...of`是ES6新增的方法，主要用来遍历具有`iterator`接口的数据集合，读取数据集合的键值。一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有`iterator`接口，就可以用`for...of`来遍历它的成员。所以`for...of`可以用来遍历**数组、`Set`和`Map`结构、某些类似数组的对象（如`arguments`对象）和字符串**等，因为这些数据结构原生部署了`iterator`接口。而普通对象不具备`iterator`接口，不能直接用来遍历普通对象。
```JavaScript
var arr = [1, 2, 3];
for (let item of arr) { // item是数组每一项的值
    console.log(`元素：${item}`);
}
for (let item of arr.values()) {
    console.log(`元素：${item}`);
}
```
想要获取数组的索引，可以用数组实例的`keys()`或者`entries()`方法
```JavaScript
for (let index of arr.keys()) {
    console.log(`索引：${index}`);
}
for (let [index, item] of arr.entries()) {
    console.log(`索引：${index}，元素：${item}`);
}
```
遍历字符串。
```JavaScript
var str = "hello";
for (let item of str) {
    console.log(item); // h e l l o
}
```
遍历`Map`对象
```JavaScript
var myMap = new Map();
myMap.set('a', 1);
myMap.set('b', 2);
myMap.set('c', 3);
for (let [key, value] of myMap) {
    console.log(`键名：${key}，键值：${value}`); // Map返回一个数组，分别是当前Map成员的键名和键值
}
// 获取键
for (let key of myMap.keys()) {
    console.log(`键名：${key}`);
}
// 获取值
for (let value of myMap.values()) {
    console.log(`键值：${value}`);
}
```
遍历`Set`对象
```JavaScript
var maSet = new Set(arr);
for (let value of maSet) {
    console.log(value); // Set返回的是一个值
}
// 遍历Map和Set对象的顺序是按照各个成员被添加进数据结构的顺序。
```
遍历`arguments`对象
```JavaScript
function printArguments() {
    for (let item of arguments) {
        console.log(item);
    }
}
printArguments('a', 'b'); // 'a' 'b'
```

#### 6、map()
`map()`方法返回一个新的数组，它对原数组的每一个值作一定的处理后放到新的数组里面，然后返回新数组。

按照原始数组的元素顺序依次处理元素，不会对空数组进行检测，也不会改变原数组,不能使用`break`和`continue`语句。
```JavaScript
var arr = [1, 2, 3];
var obj = {a: 2};
var newArr = arr.map(function(value, index, arr) {
    // value为当前元素
    // index为当前元素的索引值,可省略
    // arr为当前元素的数组对象,可省略
    console.log(this); // {a: 2}
    console.log(`索引：${index}，元素：${value}`);
    return value * this.a;
}, obj); // 方法可以接受第二个参数，回调函数内部的this对象会指向第二个参数，不传则为当前环境的this
console.log(newArr); // [2, 4, 6]
console.log(arr); // [1, 2, 3]
```

#### 7、forEach()
`forEach()`用于调用数组的每个元素，并将元素传递给回调函数。

`forEach()`不返回值，只用来操作数据，不会对空数组执行回调函数，不能使用`break`和`continue`，可以使用`return`。
```JavaScript
var arr = [1, 2, 3];
var obj = {a: 2};
var sum = 0;
arr.forEach(function(value, index, arr) { // 参数同map()
    console.log(`索引：${index}，元素：${value}`);
    console.log(this); // {a: 2}
    sum += value;
}, obj); // 方法的第二个参数同map()
console.log(sum); // 6
```
#### 8、filter()
`filter`,过滤器，顾名思义，过滤掉指定数组不符合条件的元素，返回一个数组。如果没有符合条件的元素则返回一个空数组。

不会对空数组进行检测，也不会改变原数组，不能使用`break`和`continue`。
```JavaScript
var arr = [1, 2, 3];
let newArr = arr.filter(function(value, index, arr){ // 参数同map()
    console.log(`索引：${index}，元素：${value}`);
    return value > 2;
});
console.log(newArr); // [3]
```
#### 9、some()
`some()`方法用于检测数组中是否有元素满足指定条件，返回一个布尔值。

依次执行数组的每个元素：如果有**一个元素**满足条件，就返回`true`， 剩余的元素不会再检测；如果没有满足条件的元素，则返回`false`。

不会对空数组进行检测，不会改变原始数组，不能使用`break`和`continue`。
```JavaScript
var arr = [1, 2, 3];
var result = arr.some(function(value, index, arr) {
    console.log(`索引：${index}，元素：${value}`);
    return value > 2;
});
console.log(result); // true
console.log(arr); // [1, 2, 3]
```
#### 10、every()
`every()`和`some()`类似，都是返回一个布尔值，但是要数组中的**全部元素**满足指定条件才会返回`true`,否则返回`false`。
```JavaScript
var arr = [1, 2, 3];
var result = arr.every(function(value, index, arr) {
    console.log(`索引：${index}，元素：${value}`);
    return value > 2;
});
console.log(result); // false
console.log(arr); // [1, 2, 3]
```
#### 11、reduce()、reduceRight()
`reduce()`方法接收一个函数作为累加器，数组中的每个值按顺序缩减(reduce)，最终计算返回一个值。

`reduceRight()`，顾名思义，顺序是从右往左。
```JavaScript
var arr = [1, 2, 3, 4];
var total = arr.reduce(function(total, value, index, arr) {
    // 相对于map()方法，多了一个total参数，这个是初始值, 或者计算结束后的返回值。前两个必填。
    return total + value;
})
console.log(total); // 10
```
#### 12、find()、findIndex()
`find()`方法返回数组符合条件的第一个元素的值，没有符合的会返回`undefined`。
`findIndex() `方法返回返回数组符合条件的第一个元素的索引位置，如果没有符合条件的则返回 `-1`。
```JavaScript
var arr = [1, 2, 3, 4];
var value = arr.find(function(value, index, arr) {
    return value > 2;
})
console.log(value); // 3
var index = arr.findIndex(function(value, index, arr) {
    return value > 2;
})
console.log(index); // 2
```
#### 13、indexOf()
返回某个指定的字符串值在字符串中首次出现的位置,如果没有找到匹配的字符串则返回 `-1`。可以用来判断字符串中是否存在某个字符串。

有两个参数：第一个参数为需要检索的字符串值，必填；第二个是开始检索的位置，省略则从`0`开始检索。
```JavaScript
var str = 'Hello world!';
var index = str.indexOf('w', 3); // 在第3个位置开始查找'w'第一次出现的位置
console.log(index); // 6
```

#### 14、Object.keys()/Object.values()
`Object.keys()/Object.values()`都会返回一个数组,`keys()`返回的是给定对象的所有可枚举属性的字符串数组，`values()`返回的是对应值的数组。
```JavaScript
var obj = { a: 1, b: 2,};
console.log(Object.keys(obj)); // ["a", "b"]
console.log(Object.values(obj)); // [1, 2]

var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // ["0", "1", "2"]
console.log(Object.values(arr)); // ["a", "b", "c"]
```
###   循环控制语句
#### 1、return
使用`return`会终止函数的执行并返回函数的值，如果忽略，将返回`undefined`。
#### 2、break
使用`break`语句会跳出当前循环，继续执行循环体后面的语句。如果有多层循环，`break`只能跳出一层循环。
#### 3、continue
使用`continue`语句会跳过循环中的一个迭代，继续循环中的下一个迭代。

```javascript
// return
function myReturn(){
    for (var i = 0; i < 5; i++) {
        if (i == 2) return i;
    }
}
console.log(myReturn());
// break
for (var i = 0; i < 5; i++) {
    if (i == 2) break;
    console.log(i); // 0,1
}
// continue
for (var i = 0; i < 5; i++) {
    if (i == 2) continue;
    console.log(i); // 0,1,3,4
}
```