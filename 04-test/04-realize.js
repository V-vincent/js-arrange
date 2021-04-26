// 实现 (5).add(3).minus(2) 功能
Number.prototype.add = function (num) {
  return this.valueOf() + num;
}
Number.prototype.minus = function (num) {
  return this.valueOf() - num;
}
// console.log((5).add(3).minus(2))

// 使用迭代的方式实现 flatten 函数
let flattenArr = [1, 2, 3, [4, 5], [6, [7, [8]]]];
function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr;
}
// 递归实现
function flatten1(arr) {
  let arrs = [];
  arr.map(item => {
    if (Array.isArray(item)) {
      arrs.push(...flatten(item))
    } else {
      arrs.push(item)
    }
  })
  return arrs
}
// console.log(flatten1(flattenArr));

// 某公司 1 到 12 月份的销售额存在一个对象里面
// 如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。
function dealSaleDate(obj) {
  if (toString.call(obj) !== '[object Object]') {
    throw new Error('this obj is not an object');
  }
  let arr = Array(12).fill(null);
  for (let i = 0; i < 12; i++) {
    arr[i] = obj[i + 1] || null
  }
  return arr;
}
let saleObj = { 1: 222, 2: 123, 5: 888 };
let saleArr = Array.from({ length: 12 }).map((item, index) => saleObj[index + 1] || null);

// 要求设计 `LazyMan` 类，实现以下功能
// LazyMan('Tony');
// Hi I am Tony

// LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

// LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food

// 实现
class LazyManClass {
  constructor(name) {
    this.taskList = []; // 任务列表
    this.name = name;
    console.log(`Hi I am ${this.name}`);
    setTimeout(() => {
      this.next();
    }, 0)
  }
  sleepFirst(time) {
    // 在前面加入任务
    let fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`);
        this.next();
      }, time * 1000);
    }
    this.taskList.unshift(fn);
    return this;
  }
  sleep(time) {
    // 在后面加入任务
    let fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`);
        this.next();
      }, time * 1000);
    }
    this.taskList.push(fn);
    return this;
  }
  eat(food) {
    let fn = () => {
      console.log('I am eating ' + food);
      this.next();
    }
    this.taskList.push(fn);
    return this;
  }
  next() {
    // 取出任务列表前面的任务执行
    let fn = this.taskList.shift();
    fn && fn();
  }
}
function LazyMan(name) {
  return new LazyManClass(name);
}
// LazyMan('Tony');
// LazyMan('Tony').sleep(1).eat('lunch');
// LazyMan('Tony').eat('lunch').sleep(1).eat('dinner');
// LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(2).sleep(1).eat('junk food');


// 请实现一个 add 函数，满足以下功能
// add(1); 			// 1
// add(1)(2);  	// 3
// add(1)(2)(3); // 6
// add(1)(2, 3); // 6
// add(1, 2)(3); // 6
// add(1, 2, 3); // 6
function add() {
  let args = [...arguments];
  let fn = function () {
    args.push(...arguments);
    return add.call(null, ...args);
  }
  fn.toString = function () {
    return args.reduce((pre, cur) => pre + cur);
  }
  return fn;
}


// 在输入框中如何判断输入的是一个正确的网址
function isUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}