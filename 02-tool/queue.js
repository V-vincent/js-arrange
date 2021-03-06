// 队列的实现
class Queue {
  constructor() {
    this.items = [];
  }
  // 添加 队尾添加
  enqueue(ele) {
    this.items.push(ele);
  }
  // 队首删除
  dequeue() {
    return this.items.shift();
  }
  // 返回队列中的第一个元素
  front() {
    return this.items[0];
  }
  // 判断是否为空
  isEmpty() {
    return this.items.length ? false : true;
  }
  // 栈的长度
  size() {
    return this.items.length;
  }
  // 清空
  clear() {
    this.items = [];
  }
}

let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);

var arr = [];
var startTime = +new Date();
for (let i = 0; i < 100000; i++) {
  arr.push(i);
}
var endTime = +new Date();
console.log('push耗时：' + (endTime - startTime) + '毫秒');

arr = [];
// 在数组前面添加元素
var startTime = +new Date();
for (let i = 0; i < 100000; i++) {
  arr.unshift(i);
}
var endTime = +new Date();
console.log('unshift耗时：' + (endTime - startTime) + '毫秒');

// shift 移除数组第一个元素
var startTime = +new Date();
for (let i = 0; i < 100000; i++) {
  arr.shift(i);
}
var endTime = +new Date();
console.log('shift耗时：' + (endTime - startTime) + '毫秒')