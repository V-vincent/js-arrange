// 工具函数：判断数据类型
function checkDataType(data) {
  let type = typeof data;
  if (type !== 'object') return type;
  return Object.prototype.toString.call(data).replace(/^\[object (\S+)\]/g, '$1');
}

// 判断A是否是B类型的数据
function myInstanceof(A, B) {
  let A = A.__proto__;
  let B = B.prototype;
  while (1) {
    if (A === B) return true;
    else if (A === null) return false;
    A = A.__proto__;
  }
}