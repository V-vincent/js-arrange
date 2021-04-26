// 拦截代理
// 如何让 e == 5 && e == 8 
var e = {
  i: 0,
  // valueOf: function () {
  //   return this.i++ * 3 + 5;
  // },
  toString: function () {
    return this.i++ * 3 + 5;
  },
}
console.log(e == 5 && e == 8);

var f = [5, 8];
f.join = f.shift;
console.log(f == 5 && f == 8);

var g = new Proxy({ i: 0 }, {
  get(target) {
    return () => target.i++ * 3 + 5;
  }
});
console.log(g == 5 && g == 8);
var h = 0;
Object.defineProperty(window, 'i', {
  get: function () {
    return h++ * 3 + 5;
  },
})
console.log(i === 5 && i === 8);