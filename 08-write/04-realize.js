// 实现 (5).add(3).minus(2) 功能
Number.prototype.add = function (num) {
  return this.valueOf() + num;
}
Number.prototype.minus = function (num) {
  return this.valueOf() - num;
}
// console.log((5).add(3).minus(2));

// 实现一个 add 函数，满足以下功能
add(1); 			// 1
add(1)(2);  	// 3
add(1)(2)(3); // 6
add(1)(2, 3); // 6
add(1, 2)(3); // 6
add(1, 2, 3); // 6

// 实现
function add(...args) {
  // 在内部返回一个函数
  let fn = function () {
    return add.call(null, ...args, ...arguments);
  }
  // 这个函数做一层隐式转换
  fn.toString = function () {
    return args.reduce((pre, cur) => pre + cur);
  }
  return fn;
}

// 不用加减乘除运算符，求整数的 7 倍
function getSevevNum(num) {
  let res = [];
  let arr = Array.from({ length: num });
  let temp = Array.from({ length: 7 });
  temp.map(item => {
    res.push(...arr);
  })
  return res.length;
  // 进制转换方式 - 利用 toString 转为七进制整数；然后末尾补0(左移一位)后通过 parseInt 转回十进制
  // return parseInt([num.toString(7), '0'].join(''), 7);
}
// console.log(getSevevNum(10));

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
function dealSaleObjToArr(obj) {
  return Array.from({ length: 12 }).map((item, index) => obj[index + 1] || null);
}
// console.log(dealSaleObjToArr({ 1: 222, 2: 123, 5: 888 }))