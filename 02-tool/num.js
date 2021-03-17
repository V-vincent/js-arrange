// 数字相关工具函数

// 数字添加千分位
function numAddThousandCharacters(num) {
  // 正则
  let res = num.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ",";
    });
  })
  // toLocaleString()
  res = parseFloat(num).toLocaleString();
  res = (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return res;
}
let num = numAddThousandCharacters(12345678.23);
// console.log(num)

// 数字去掉千分位
function removeThousandSeparator(num) {
  return Number(num.toString().replace(/[ ]/g, "").replace(/,/gi, ""));
}
console.log(removeThousandSeparator(num));

// 金额转换大写
function convertCurrency(money) {
  let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']; // 汉字的数字
  let cnIntRadice = ['', '拾', '佰', '仟']; // 基本单位
  let cnIntUnits = ['', '万', '亿', '兆']; // 对应整数部分扩展单位
  let cnDecUnits = ['角', '分', '毫', '厘']; // 对应小数部分单位
  let cnInteger = '整'; // 整数金额时后面跟的字符
  let cnIntLast = '元'; // 整型完以后的单位
  let maxNum = 999999999999999.9999; // 最大处理的数字
  let integerNum; // 金额整数部分
  let decimalNum; // 金额小数部分
  let chineseStr = ''; // 输出的中文金额字符串
  let parts; // 分离金额后用的数组，预定义
  if (!money) { return ''; }
  money = parseFloat(money);

  if (money >= maxNum) { // 超出最大处理数字
    return '';
  }
  if (Number(money) === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  // 转换为字符串
  money = money.toString();
  if (money.indexOf('.') === -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0;
    let IntLen = integerNum.length;
    for (let i = 0; i < IntLen; i++) {
      let n = integerNum.substr(i, 1);
      let p = IntLen - i - 1;
      let q = p / 4;
      let m = p % 4;
      if (String(n) === '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        // 归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  // 小数部分
  if (decimalNum !== '') {
    let decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      let n = decimalNum.substr(i, 1);
      if (n !== '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (!chineseStr) {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (!decimalNum) {
    chineseStr += cnInteger;
  }
  return chineseStr;
}
console.log(convertCurrency(123456.785))