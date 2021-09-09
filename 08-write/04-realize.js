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
function getServeNum(num) {
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
console.log(getServeNum(10));

// 输入 '1, 2, 3, 5, 7, 8, 10' 输出 '1~3, 5, 7~8, 10'
// 连续数归纳
function continuityNum(str) {
  let arr = str.split(',');
  arr.push('');
  let res = [];
  let end;
  let start = end = parseInt(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    if (end + 1 === arr[i]) {
      end++;
    } else {
      if (start === end) res.push(start);
      else res.push(start + '~' + end);
      start = end = parseInt(arr[i]);
    }
  }
  return res.join(',');
}

// 实现一个 compose 函数
// 用法如下:
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
const com = compose(fn1, fn2, fn3, fn4);
// console.log(com(1)); // 1 + 4 + 3 + 2 + 1 = 11
// 分析 compose 返回一个函数，里面按后入先出的顺序执行
function compose(...fn) {
  return (num) => {
    return fn.reverse().reduce((pre, cur) => {
      return cur(pre);
    }, num)
  }
}
// function compose(...fn) {
//   if (!fn.length) return (v) => v;
//   if (fn.length === 1) return fn[0];
//   return fn.reduce(
//     (pre, cur) =>
//       (...args) =>
//         pre(cur(...args))
//   );
// }