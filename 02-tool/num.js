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
  res = (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return res;
}
// let num = numAddThousandCharacters(12345678.23);
// console.log(num)

// 数字去掉千分位
function removeThousandSeparator(num) {
  return Number(num.toString().replace(/[ ]/g, "").replace(/,/gi, ""));
}
// console.log(removeThousandSeparator(num));

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

// 数字动画
const Odometer = (function (win, doc) {
  class OdometerFn {
    constructor(x, y) {
      this.setting = {
        len: null, // 默认最小位数
        speed: 1000, // 动画速度
        num: "", // 初始化值
        symbol: '', // 默认的分割符号，千，万，千万
        dot: 0, // 保留几位小数点 
        zero: true
      }
      this.$parent = doc.querySelector(x);
      this.html = `<div class="number-animate-dom" data-num="{{num}}">
                        <span class="number-animate-span" style="font-family: digitalNumberFont;">0</span>
                        <span class="number-animate-span" style="font-family: digitalNumberFont;">1</span>
                        <span class="number-animate-span" style="font-family: digitalNumberFont;">2</span>
                        <span class="number-animate-span" style="font-family: digitalNumberFont;">3</span>
                        <span class="number-animate-span" style="font-family: digitalNumberFont;">4</span>
                        <span class="number-animate-span" style="font-family: digitalNumberFont;">5</span>
                        <span class="number-animate-span" style="font-family: digitalNumberFont;">6</span>
                        <span class="number-animate-span" style="font-family: digitalNumberFont;">7</span>
                        <span class="number-animate-span" style="font-family: digitalNumberFont;">8</span>
                        <span class="number-animate-span" style="font-family: digitalNumberFont;">9</span>
                        <span class="number-animate-span" style="font-family: digitalNumberFont;">0</span>
                        <span class="number-animate-span" style="font-family: digitalNumberFont;">.</span>
                      </div>`;
      this.extend(this.setting, y);
      this.init(this.$parent, y)
    }
    init(x, y) {
      x.innerHTML = this.setNumDom(this.numToArr(this.setting.num))
      this.animate(x);
    }
    animate($parent) { // 执行动画
      let $dom = $parent.querySelectorAll('.number-animate-dom');
      for (let o of $dom) {
        let num = o.getAttribute('data-num');
        if (this.setting.zero) num = (num == 0 ? 10 : num);
        this._height = o.offsetHeight / 12;
        o.style['transform'] = o.style['-webkit-transform'] = 'translateY(' + (num == "." ? -11 * this._height : -num * this._height) + 'px)';
        o.style['transition'] = o.style['-webkit-transition'] = (num == "." ? 0 : this.setting.speed / 1000) + 's'
      }
    }
    setNumDom(arrStr) { // 分割符号
      let shtml = '<div class="number-animate">';
      arrStr.forEach((o, i) => {
        if (i != 0 && (arrStr.length - i) % 3 == 0 && this.setting.symbol != "" && o != ".") {
          shtml += '<div class="number-animate-dot"><span>' + this.setting.symbol + '</span></div>' + this.html.replace("{{num}}", o);
        } else {
          shtml += this.html.replace("{{num}}", o);
        }
      });
      shtml += '</div>';
      return shtml;
    }
    update(num) {
      let newArr = this.numToArr(num); let $dom = this.$parent.querySelectorAll(".number-animate-dom");
      if ($dom.length != newArr.length) {
        this.$parent.innerHTML = this.setNumDom(this.numToArr(num))
      } else {
        [].forEach.call($dom, (o, i) => {
          o.setAttribute('data-num', newArr[i]);
        });
      }
      this.animate(this.$parent);
    }
    numToArr(num) {
      num = parseFloat(num).toFixed(this.setting.dot);
      let arrStr = typeof (num) === 'number' ? num.toString().split("") : num.split("")
      let arrLen = arrStr.length;
      if (arrStr.length <= this.setting.len) {
        for (let _lens = 0; _lens < this.setting.len - arrLen; _lens++) {
          arrStr.unshift(0)
        }
      }
      return arrStr;
    }
    extend(n, n1) {
      for (let i in n1) { n[i] = n1[i] }
    }
  }
  return OdometerFn;
})(window, document);
// export { // 很关键
//   Odometer
// }
