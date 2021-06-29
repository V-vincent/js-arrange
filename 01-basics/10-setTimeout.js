// 从一道面试题讲起
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i)
  }, 100)
}

let timer = setTimeout(function() {
  console.log('1 秒后打印');
}, 1000)
console.log(timer);