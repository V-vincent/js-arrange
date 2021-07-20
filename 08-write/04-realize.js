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
// 思路：
// 利用数组的长度属性
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

// 输入 '1, 2, 3, 5, 7, 8, 10' 输出 '1~3, 5, 7~8, 10'
// 连续数归纳
function continuityNum(str) {
  let arr = str.split(',');
  arr.push('');
  let res = [];
  let start = end = parseInt(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    if (end + 1 == arr[i]) {
      end++;
    } else {
      if (start == end) res.push(start);
      else res.push(start + '~' + end);
      start = end = parseInt(arr[i]);
    }
  }
  return res.join(',');
}

// 