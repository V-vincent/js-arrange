// 颜色十六进制转rgba
function transformRgba(color) {
  let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  let sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew;
    }

    // 处理六位的颜色值
    let sColorChange = [];
    for (let i = 1; i <= 6; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }

    return `rgba(${sColorChange.join(',')}, 0.15)` // 15%的透明度
  } else {
    return sColor
  }
}