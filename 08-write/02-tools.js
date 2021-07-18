// 统计时间
// console.time();
// console.timeEnd();

// 深拷贝的实现

// JSON 版本：
// 缺陷：其他引用类型、拷贝函数、循环引用等情况没有考虑到。
function jsonClone(data) {
  return JSON.parse(JSON.stringify(data));
}

// 手写版本
// 1、从浅拷贝开始
// 2、递归深拷贝
// 3、考虑数组
// 4、考虑循环引用：用 map 存储对象
// 5、考虑其它类型

// 数据类型的定义
const objectTag = '[object Object]';
const arrayTag = '[object Array]';
const mapTag = '[object Map]';
const setTag = '[object Set]';
const argsTag = '[object Arguments]';
// 可以遍历的数据类型
const deepTags = [objectTag, arrayTag, mapTag, setTag, argsTag];

// 其它不可遍历的数据类型
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

// 判断数据是引用类型的数据
function isObject(data) {
  let type = typeof data;
  return data !== null && (type === 'object' || type === 'function');
}
// 根据构造函数的类型初始化数据
function initData(data) {
  let Con = data.constructor;
  return new Con();
}
// 获取数据的类型
function getDataType(data) {
  return Object.prototype.toString.call(data);
}
// Symbol 类型数据的克隆
function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe));
}
// 正则类型的数据克隆
function cloneReg(targe) {
  const reFlags = /\w*$/;
  const result = new targe.constructor(targe.source, reFlags.exec(targe));
  result.lastIndex = targe.lastIndex;
  return result;
}
// 函数的克隆
function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[0].split(',');
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}

function cloneOtherType(targe, type) {
  const Ctor = targe.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe);
    case regexpTag:
      return cloneReg(targe);
    case symbolTag:
      return cloneSymbol(targe);
    case funcTag:
      return cloneFunction(targe);
    default:
      return null;
  }
}
// 深拷贝函数
function deepClone(data, map = new WeakMap()) {
  // 基础类型数据，直接返回
  if (!isObject(data)) return data;
  // 引用类型数据
  let target;
  let type = getType(data); // 获取数据类型
  if (deepTags.includes(type)) target = initData(data); // 可遍历的数据
  else return cloneOtherType(data, type); // 不可遍历的数据：如 new 构造函数得到的数据
  // 防止循环引用
  if (map.get(data)) return map.get(data);
  // 克隆 set
  if (type === setTag) {
    data.forEach(item => {
      target.add(deepClone(item, map));
    });
    return target;
  }
  // 克隆 map
  if (type === mapTag) {
    data.forEach((item, key) => {
      target.set(key, deepClone(item, map));
    });
    return target;
  }
  // 克隆数组或者对象
  for (let key in data) {
    if (isObject(data[key])) {
      target[key] = deepClone(data[key], map);
    } else {
      target[key] = data[key];
    }
  }
  return target;
}

// 防抖的实现
// 触发事件 n 秒后函数执行一次，如果在 n 秒内重新触发，则重新计算时间。
// 思路实现：
// 参数：传入一个函数和等待时间
// 返回：一个函数
// 利用 setTimeout 实现，如果重复触发则利用 clearTimeout 清除定时器，之后重新计时
// 适用场景：防止多次提交按钮，只执行最后提交的一次
function debounce(fn, time) {
  time = time || 1000;
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, ...args);
    }, time);
  }
}

// 节流的实现
// 连续触发事件但是在 n 秒内只执行一次，稀释函数的执行频率。
// 思路实现：
// 利用 setTimeout 实现，执行一次清除该定时器，如果存在定时器则跳过
function throttle(fn, time) {
  time = time || 1000;
  let timer = null;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      fn.call(this, ...args);
    }, time)
  }
}

// 实现一个 sleep 函数
// sleep 函数输入一个时间，返回一个 Promise 函数供 sleep 进行链式调用
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
sleep(1000).then(() => {
  console.log('1 秒后打印')
})