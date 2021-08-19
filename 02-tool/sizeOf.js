// 计算数据占用的内存

// 对于计算机基础，js内存基础的考察
// 递归
// 细心

// 各种数据类型占用字节：
// string：一个字符2个字节
// number：8个字节
// boolean：4个字节

let same = {
  ab: 'h',
};
let test = {
  a: 11,
  b: 'abc',
  c: false,
  d: same,
  e: same,
}
// 工具函数：判断数据类型
function checkDataType(data) {
  let type = typeof data;
  if (type !== 'object') return type;
  return Object.prototype.toString.call(data).replace(/^\[object (\S+)]/g, '$1');
}
// 递归处理
function calculator(obj) {
  let objType = checkDataType(obj);
  switch (objType) {
    case 'string': {
      return obj.length * 2;
    }
    case 'number': {
      return 8;
    }
    case 'boolean': {
      return 4;
    }
    case 'Array': {
      return obj.map(calculator).reduce((pre, index) => pre + index, 0);
    }
    case 'Object': {
      return sizeOfObject(obj);
    }
    // 其它字节默认为0
    default: {
      return 0;
    }
  }
}

// 对于对象字节的计算
// 对象里的key也是占用内存空间的
// 对于相同引用的计算
let seen = new WeakSet();
function sizeOfObject(obj) {
  let keys = Object.keys(obj);
  let byte = 0;
  for (let i = 0; i < keys.length; i++) {
    let item = obj[keys[i]]
    byte += calculator(keys[i]);
    if (checkDataType(item) === 'Object') {
      if (seen.has(item)) {
        continue;
      }
      seen.add(item);
    }
    byte += calculator(item);
  }
  return byte;
}

console.log(calculator(test));