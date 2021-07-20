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

// 在输入框中如何判断输入的是一个正确的网址
function isUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

// 不用加减乘除运算符，求整数的7倍
function getSevenNum(num) {
  let arr = Array(num);
  let res = Array(7).fill(1).map(() => {
    res.push(...arr);
  })
  return res.length;
}
function getSevenNum2(num) {
  // 进制转换方式 - 利用 toString 转为七进制整数；然后末尾补0(左移一位)后通过 parseInt 转回十进制
  return parseInt([num.toString(7), '0'].join(''), 7);
}


// 模拟实现一个 localStorage
class localStorage {
  constructor() {
    this.store = {};
  }
  setItem(key, val) {
    this.store[key] = val;
  }
  getItem(key) {
    return this.store[key] || null;
  }
  removeItem(key) {
    delete this.store[key]
  }
  clear() {
    this.store = {};
  }
}

// 模拟 localStorage 时如何实现过期时间功能
(function () {
  var getItem = localStorage.getItem.bind(localStorage)
  var setItem = localStorage.setItem.bind(localStorage)
  var removeItem = localStorage.removeItem.bind(localStorage)
  localStorage.getItem = function (keyName) {
    var expires = getItem(keyName + '_expires')
    if (expires && new Date() > new Date(Number(expires))) {
      removeItem(keyName)
      removeItem(keyName + '_expires')
    }
    return getItem(keyName)
  }
  localStorage.setItem = function (keyName, keyValue, expires) {
    if (typeof expires !== 'undefined') {
      var expiresDate = new Date(expires).valueOf()
      setItem(keyName + '_expires', expiresDate)
    }
    return setItem(keyName, keyValue)
  }
})()

// 编程题
// url有三种情况
// https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33
// https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800&local_province_id=33
// https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33
// 匹配elective后的数字输出（写出你认为的最优解法）:
// [] || ['800'] || ['800','700']
function getUrlValue(url) {
  if (!url) return;
  let res = url.match(/(?<=elective=)(\d+(,\d+)*)/);
  return res ? res[0].split(',') : [];
}

// 编程题，请写一个函数，完成以下功能
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


// 用 setTimeout 实现 setInterval，阐述实现的效果与setInterval的差异
function mySetInterval(fn, timer, args) {
  mySetInterval.timer && clearTimeout(mySetInterval.timer);
  if (!mySetInterval.clearTimeout) {
    mySetInterval.timer = setTimeout(() => {
      fn.call(this, ...args);
      mySetInterval(fn, timer, args);
    }, timer)
  }
}
mySetInterval.clear = function () {
  this.clearTimeout = true;
  clearTimeout(this.timer);
}
mySetInterval(console.log, 1000, '测试')
// 5秒后清理定时器
setTimeout(() => {
  mySetInterval.clear();
}, 5000)

// setTimeout(fn, time)是超时调用，它在大于等于time之后调用fn；
// 而setIntervl(fn, time)是间歇调用，每隔time调用一次。
// 使用setInterval()创建的定时器确保了定时器代码规则地插入队列中。这个问题在于：如果定时器代码在代码再次添加到队列之前还没完成执行，结果就会导致定时器代码连续运行好几次。而之间没有间隔。不过幸运的是：javascript引擎足够聪明，能够避免这个问题。当且仅当没有该定时器的如何代码实例时，才会将定时器代码添加到队列中。这确保了定时器代码加入队列中最小的时间间隔为指定时间。
// 这种重复定时器的规则有两个问题：1.某些间隔会被跳过 2.多个定时器的代码执行时间可能会比预期小。
// 而用setTimeout模拟实现的setInterval通过递归调用可以实现：在前一个定时器代码执行完成之前，不会向队列插入新的定时代码，确保不会有任何的缺失间隔。而且，它保证在下一次定时器代码执行之前，至少要等待指定的时间间隔。

// 求两个日期中间的有效日期
// 如 2015-2-8 到 2015-3-3，返回【2015-2-8 2015-2-9...】
function rangeDay(day1, day2) {
  const res = []
  const dayTimes = 24 * 60 * 60 * 1000; // 一天
  const startTime = day1.getTime();
  const range = day2.getTime() - startTime; // 间隔天数时间戳
  let total = 0;
  while (total <= range && range > 0) {
    // toLocaleDateString() 方法可根据本地时间把 Date 对象的日期部分转换为字符串，并返回结果。
    res.push(new Date(startTime + total).toLocaleDateString().replace(/\//g, '-'))
    total += dayTimes;
  }
  return res
};
rangeDay(new Date("2015-02-08"), new Date("2015-03-03"))