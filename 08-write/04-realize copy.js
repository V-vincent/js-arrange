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