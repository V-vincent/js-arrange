// 实现 (5).add(3).minus(2) 功能
Number.prototype.add = function (num) {
  return this.valueOf() + num;
}
Number.prototype.minus = function (num) {
  return this.valueOf() - num;
}
console.log((5).add(3).minus(2))

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