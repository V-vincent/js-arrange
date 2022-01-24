// 发布订阅模式
// 实现一个发布订阅模式拥有 on emit once off 方法
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // 实现订阅
  on(type, callBack) {
    if (!this.events[type]) {
      this.events[type] = [callBack];
    } else {
      this.events[type].push(callBack);
    }
  }

  // 删除订阅
  off(type, callBack) {
    if (!this.events[type]) return;
    this.events[type] = this.events[type].filter((item) => {
      return item !== callBack;
    });
  }

  // 只执行一次订阅事件
  once(type, callBack) {
    const fn = () => {
      callBack();
      this.off(type, fn);
    }
    this.on(type, fn);
  }

  // 触发事件
  emit(type, ...rest) {
    this.events[type] &&
    this.events[type].forEach((fn) => fn.apply(this, rest));
  }
}

// 使用如下
// const event = new EventEmitter();
// const handle = (...rest) => {
//   console.log(rest);
// };
// event.on("click", handle);
// event.emit("click", 1, 2, 3, 4);
// event.off("click", handle);
// event.emit("click", 1, 2);
// event.once("dbClick", () => {
//   console.log(123456);
// });
// event.emit("dbClick");
// event.emit("dbClick");

// 参考资料
// https://juejin.cn/post/6968713283884974088#heading-1
// https://juejin.cn/post/6875152247714480136
// https://juejin.cn/post/6946022649768181774#heading-7
