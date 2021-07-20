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


// 实现一个异步调度器
// 保证同时运行的任务最多有两个。完善代码中 Scheduler 类，使得以下程序能正确输出。
// finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，
// 都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。
class Scheduler {
  constructor() {
    this.taskList = [];
    this.curTask = 0;
  }
  // async add(fn) {
  //   if (this.curTask >= 2) {
  //     await new Promise(resolve => this.taskList.push(resolve));
  //   }
  //   this.curTask++;
  //   return await fn().finally(() => {
  //     this.curTask--;
  //     if (this.taskList.length) {
  //       this.taskList[0]();
  //       this.taskList.shift();
  //     }
  //   })
  // }
  async add(promiseCreator) {
    if (this.curTask >= 2) {
      await new Promise(resolve => this.taskList.push(resolve))
    }
    return this.handlerPromise(promiseCreator);
  }
  async handlerPromise(fn) {
    this.curTask++;
    try {
      return await fn();
    } catch (err) {
      return Promise.reject(err);
    } finally {
      this.curTask--;
      if (this.taskList.length) {
        this.taskList[0]();
        this.taskList.shift();
      }
    }
  }
}

const timeout = (time) => {
  return new Promise(resolve => setTimeout(resolve, time));
}
let scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')

// output: 2 3 1 4
// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队 
// 800ms时，3完成，输出3，任务4进队 
// 1000ms时，1完成，输出1 
// 1200ms时，4完成，输出4