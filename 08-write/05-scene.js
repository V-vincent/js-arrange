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

// 求两个日期中间的有效日期
// 如 2015-2-8 到 2015-3-3，返回['2015-2-8', '2015-2-9'...]
function getRangeDay(start, end) {
  let res = [];
  let oneDay = 24 * 60 * 60 * 1000;
  let startDate = start.getTime();
  let range = end.getTime() - startDate;
  let total = 0;
  while (total <= range && range > 0) {
    res.push(new Date(startDate + total).toLocaleDateString())
    total += oneDay;
  }
  return res;
}
// console.log(getRangeDay(new Date("2015-02-08"), new Date("2015-03-03")));