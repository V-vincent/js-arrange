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