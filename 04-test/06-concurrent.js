// JS 实现一个带并发限制的异步调度器 Scheduler，
// 保证同时运行的任务最多有两个。完善代码中 Scheduler 类，使得以下程序能正确输出。

// finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。
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

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
});

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
addTask(100, '5')

// output: 2 3 1 4
// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队 
// 800ms时，3完成，输出3，任务4进队 
// 1000ms时，1完成，输出1 
// 1200ms时，4完成，输出4