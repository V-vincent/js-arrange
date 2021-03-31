// new Date() 不传参时皆可兼容；new Date("2021/03/31 12:00:00") 任何浏览器都可兼容
// 传参时有些浏览器不兼容（没错，就是IE浏览器）；
// IE任何版本都不兼容：new Date("2021-03-31 12:00:00") ；
// 扩展日期转换格式
Date.prototype.format = function (fmt) {
  var pattern = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "H+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "w+": getWeek(this.getDay()), // 星期
    "q+": "第" + Math.floor((this.getMonth() + 3) / 3) + "季度", // 季度
    "S": this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in pattern)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1,
      (RegExp.$1.length == 1) ? (pattern[k]) : (("00" + pattern[k]).substr(("" + pattern[k]).length)));
  return fmt;
}
function getWeek(i) {
  switch (i) {
    case 0: return "星期日";
    case 1: return "星期一";
    case 2: return "星期二";
    case 3: return "星期三";
    case 4: return "星期四";
    case 5: return "星期五";
    case 6: return "星期六";
      break;
  }
}