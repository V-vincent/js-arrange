function executor(resolve, reject) {
  let rand = Math.random();
  console.log(1)
  console.log(rand)
  if (rand > 0.5)
    resolve()
  else
    reject()
}
var p0 = new Promise(executor);

var p1 = p0.then((value) => {
  console.log("succeed-1")
  return new Promise(executor)
})

var p3 = p1.then((value) => {
  console.log("succeed-2")
  return new Promise(executor)
})

var p4 = p3.then((value) => {
  console.log("succeed-3")
  return new Promise(executor)
})

p4.catch((error) => {
  console.log("error")
})
console.log(2)

// p0-p4四个Promise对象，无论哪个对象里面抛出异常，都可以通过最后一个对象 p4.catch 来捕获异常，
// 通过这种方式可以将所有 Promise 对象的错误合并到一个函数来处理，这样就解决了每个任务都需要单独处理异常的问题

// 回调函数延迟绑定技术
function executor(resolve, reject) {
  resolve(100)
}
let demo = new Promise(executor)
function onResolve(value) {
  console.log(value)
}
demo.then(onResolve)