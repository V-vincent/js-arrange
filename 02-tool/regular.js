let common = {};
// 身份证号码正则验证
common.validIdcard = function (idcard) {
  return /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(idcard)
}
// 正则验证:港澳居民来往内地通行证
// H12345678 或 H1234567801
common.validIdHMCurrent = function (idcard) {
  return /^[H|h|M|m](\d{8}|\d{10})$/.test(idcard);
}
// 台湾居民来往大陆通行证
// 规则： 新版8位或18位数字， 旧版10位数字 + 英文字母
// 样本： 12345678 或 1234567890B  R122159007
common.validIdTwCurrent = function (idcard) {
  return /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/.test(idcard);
}
// 中华人民共和国港澳居民居住证
// 号码以810000或820000开头，18位数字
// 样本： 810000199408230021
common.validIdHMCard = function (idcard) {
  return /^8[12]0000(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dX]$/.test(idcard);
}
// 中国人民共和国台湾居民居住证
// 号码以830000开头，18位数字
// 样本： 830000199408230021
common.validIdTwCard = function (idcard) {
  return /^830000(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dX]$/.test(idcard);
}

// 统一社会信用码 18位or15位
common.validTissueUsc = function (idcard) {
  return /^[0-9A-Za-z]{15}$|^[0-9A-Za-z]{18}$|^[0-9A-Za-z]{19}$|^[0-9A-Za-z]{20}$/g.test(idcard);
  // return /^[0-9A-Za-z]{5,20}$/g.test(idcard);
  // return /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g.test(idcard) || /^\d{6}[^_IOZSVa-z\W]{9}$/g.test(idcard)
}

//  电话号码|手机号验证
common.isMobile = function (phone) {
  let isFixMob = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
  let isPhone = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
  return isFixMob.test(phone) || isPhone.test(phone);

}
// 金额验证
common.isMoney = function (money) {
  let reg = /^(\d+|\d+\.\d{1,6})$/;
  return reg.test(money);
}