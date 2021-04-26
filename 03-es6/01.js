// 解构赋值
var [x, y, z] = [1, 2, 3];
// 箭头函数
let f = v => v;
console.log(f(11));
let sum = (a, b) => a + b;
console.log(sum(1, 5));
// let getItem = id => {id: id,name: id}; //会报错，大括号会被解析为代码块
let getItem = id => ({
  id: id,
  name: 'temp'
});
console.log(getItem(30));

// 类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `(${this.x},${this.y})`;
  }
}
let p = new Point(10, 20);
console.log(p.toString());

// Promise
function loadImgAsync(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = function () {
      resolve(image)
    }
    image.onerror = function () {
      reject('加载失败,图片地址：' + url)
    }
    image.src = url;
  })
}
loadImgAsync('https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg')
  .then((image) => {
    // console.log(image);
    document.body.appendChild(image);
    return new Promise((resolve, reject) => {
      var image1 = new Image();
      resolve(image)
    })
  }, (error) => {
    console.log(error);
  }).then((image) => {
    console.log(image);
  }, (error) => {
    console.log(error);
  })