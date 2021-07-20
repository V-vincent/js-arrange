// 要求设计 LazyMan 类，实现以下功能
// LazyMan('Tony');
// Hi I am Tony

// LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

// LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food

class LazyManClass {
  constructor(name) {
    console.log('Hi I am ' + name);
    this.list = []; // 任务列表
    setTimeout(() => {
      this.next();
    }, 0)
  }
  next() {
    let fn = this.list.shift();
    fn && fn();
  }
  sleepFirst(time) {
    let fn = () => {
      setTimeout(() => {
        console.log(`等待了 ${time} 秒...`);
        this.next();
      }, time * 1000);
    }
    this.list.unshift(fn);
    return this;
  }
  sleep(time) {
    let fn = () => {
      setTimeout(() => {
        console.log(`等待了 ${time} 秒...`);
        this.next();
      }, time * 1000);
    }
    this.list.push(fn);
    return this;
  }
  eat(food) {
    let fn = () => {
      console.log(`I am eating ${food}`);
      this.next();
    }
    this.list.push(fn);
    return this;
  }
}
function LazyMan() {
  return new LazyManClass(...arguments);
}
// LazyMan('Tony');
// LazyMan('Tony').sleep(10).eat('lunch');
// LazyMan('Tony').eat('lunch').sleep(1).eat('dinner');
// LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');