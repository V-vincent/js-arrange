function a(callback) {
  callback && callback('哇喔！');
}

function b(res) {
  console.log(res);
}
a(b);

function* fn() {
  console.log("one");
  yield '1';
  console.log("two");
  yield '2';
  console.log("three");
  return '3';
}

let f1 = fn();
f1.next();
f1.next();
f1.next();
f1.next();
// 第一次调用 next 方法时，从 Generator 函数的头部开始执行，先是打印了 one ,执行到 yield 就停下来，并将yield 后边表达式的值 '1'，作为返回对象的 value 属性值，此时函数还没有执行完， 返回对象的 done 属性值是 false。
// 第二次调用 next 方法时，同上步 。
// 第三次调用 next 方法时，先是打印了 three ，然后执行了函数的返回操作，并将 return 后面的表达式的值，作为返回对象的 value 属性值，此时函数已经结束，多以 done 属性值为true 。
// 第四次调用 next 方法时， 此时函数已经执行完了，所以返回 value 属性值是 undefined ，done 属性值是 true 。如果执行第三步时，没有 return 语句的话，就直接返回 {value: undefined, done: true}。

function* sum(a) {
  console.log('a:', a);
  let b = yield 1;
  console.log('b:', b);
  let c = yield 2;
  console.log('c:', c);
  let sum = a + b + c;
  console.log('sum:', sum)
  return sum;
}
// 不传参
let s1 = sum();
s1.next();
s1.next();
s1.next();

// 传参
let s2 = sum(10);
s2.next(20);
s2.next(30);
s2.next(40);