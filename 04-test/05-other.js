// 为什么 for 循环嵌套顺序会影响性能？
var t1 = new Date().getTime()
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 1000; j++) {
    for (let k = 0; k < 10000; k++) { }
  }
}
var t2 = new Date().getTime();
console.log('first time', t2 - t1);

for (let i = 0; i < 10000; i++) {
  for (let j = 0; j < 1000; j++) {
    for (let k = 0; k < 100; k++) { }
  }
}
var t3 = new Date().getTime();
console.log('two time', t3 - t2);

// 第一个性能会好些，两个循环的次数一样，但是按照每次循环判断（初始化、自增次数类似）来说
// 第一个循环，会判断 `i < 100` 100次，判断j < 1000 100 * 1000次，判断 k < 10000 100 * 1000 * 10000次
// 第二个循环，会判断 `i < 10000` 10000次，判断j < 1000 10000 * 1000次，判断 k < 10000 10000 * 1000 * 100次
// 两者判断k的次数一样，但是第一个循环判断i 和 j 的次数明显小于第二个循环