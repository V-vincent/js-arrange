// 栈的实现
class Stack {
  constructor() {
    this.items = [];
  }
  // 入栈或压栈
  push(ele) {
    this.items.push(ele);
  }
  // 移除栈顶元素
  pop() {
    return this.items.pop();
  }
  // 返回栈顶的元素
  peek() {
    return this.items[this.items.length - 1];
  }
  // 判断是否为空
  isEmpty() {
    return !this.items.length;
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

let stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);

// 利用栈实现的二进制转换
function sysConvert(decimal) {
  let stack = new Stack();
  let remainder;
  while (decimal > 0) {
    remainder = decimal % 2;
    decimal = Math.floor(decimal / 2);
    stack.push(remainder)
  }
  let str = '';
  while (!stack.isEmpty()) {
    str += stack.pop();
  }
  return str;
}
console.log(sysConvert(23));