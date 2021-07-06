// 从一道面试题讲起
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i)
  }, 100)
}

let timer = setTimeout(function () {
  console.log('1 秒后打印');
}, 1000)
console.log(timer);

let startTime = +new Date();
for (let i = 0; i < 90000000; i++) { } // 约 50 ms
let endTime = +new Date();
console.log(endTime - startTime);

// let startTime = +new Date();
// setTimeout(() => {
//   console.log(1);
//   let endTime = +new Date();
//   console.log(endTime - startTime);
// }, 20);
// for (let i = 0; i < 90000000; i++) { } 
// let startTime2 = +new Date();
// setTimeout(() => {
//   console.log(2);
//   let endTime2 = +new Date();
//   console.log(endTime2 - startTime2);
// }, 0);

// setTimeout(() => {
//   console.log(1);
// }, 20);
// for (let i = 0; i < 9000000; i++) { } 
// setTimeout(() => {
//   console.log(2);
// }, 0);


var name = "我是全局的变量";
var user = {
  name: "我是对象里面的变量",
  showName: function () {
    console.log(this.name);
  }
}
setTimeout(user.showName, 1000);

// 第一种是将 user.showName 放在匿名函数中执行
// function 函数
setTimeout(function () {
  user.showName();
}, 1000);
// 或箭头函数
setTimeout(() => user.showName(), 1000);
// 第二种是使用 call/apply/bind 等方法，改变 showName 的 this 指向
setTimeout(user.showName.call(user), 1000)

var name = "我是全局的变量";
var user = {
  name: "我是对象里面的变量",
  showName: function () {
    setTimeout(function () {
      console.log(this.name);
    }, 0)
  }
}
user.showName();

// 箭头函数
// var name = "我是全局的变量";
// var user = {
//   name: "我是对象里面的变量",
//   showName: function () {
//     setTimeout(() => {
//       console.log(this.name);
//     })
//   }
// }
// user.showName();

// 变量缓存
// var name = "我是全局的变量";
// var user = {
//   name: "我是对象里面的变量",
//   showName: function () {
//     let that = this;
//     setTimeout(() => {
//       console.log(that.name);
//     })
//   }
// }
// user.showName();

// 参数传递
// var name = "我是全局的变量";
// var user = {
//   name: "我是对象里面的变量",
//   showName: function () {
//     setTimeout((that) => {
//       console.log(that.name);
//     }, 0, this)
//   }
// }
// user.showName();

// 闭包
// var name = "我是全局的变量";
// var user = {
//   name: "我是对象里面的变量",
//   showName: function () {
//     void function (that) {
//       setTimeout(() => {
//         console.log(that.name);
//       }, 0)
//     }(this)
//   }
// }
// user.showName();

// 最小时延
let startTime = +new Date();
setTimeout(function () {
  let endTime1 = +new Date();
  console.log("setTimeout1：", endTime1 - startTime);
  setTimeout(function () {
    let endTime2 = +new Date();
    console.log("setTimeout2：", endTime2 - startTime);
    setTimeout(function () {
      let endTime3 = +new Date();
      console.log("setTimeout3：", endTime3 - startTime);
      setTimeout(function () {
        let endTime4 = +new Date();
        console.log("setTimeout4：", endTime4 - startTime);
        setTimeout(function () {
          let endTime5 = +new Date();
          console.log("setTimeout5：", endTime5 - startTime);
          setTimeout(function () {
            let endTime6 = +new Date();
            console.log("setTimeout6：", endTime6 - startTime);
          }, 0)
        }, 0)
      }, 0)
    }, 0)
  }, 0)
}, 0)


let startTime = +new Date();
function cb() {
  console.log(+new Date() - startTime)
  setTimeout(cb, 0);
}
setTimeout(cb, 0);

setTimeout(() => {
  setTimeout(() => {
    setTimeout(() => {
      setTimeout(() => {
        setTimeout(() => {
          let startTime = +new Date();
          setTimeout(() => console.log(+new Date() - startTime), 0);
          setTimeout(() => console.log(+new Date() - startTime), 0);
          setTimeout(() => console.log(+new Date() - startTime), 0);
          setTimeout(() => console.log(+new Date() - startTime), 0);
          setTimeout(() => console.log(+new Date() - startTime), 0);
        }, 0)
      }, 0)
    }, 0)
  }, 0)
}, 0)

setTimeout(() => console.log(5), 5);
setTimeout(() => console.log(4), 4);
setTimeout(() => console.log(3), 3);
setTimeout(() => console.log(2), 2);
setTimeout(() => console.log(1), 1);
setTimeout(() => console.log(0), 0);