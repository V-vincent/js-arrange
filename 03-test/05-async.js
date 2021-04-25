// event-loop
async function foo() {
  console.log('foo')
}
async function bar() {
  console.log('bar start')
  await foo()
  console.log('bar end')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)
bar();
new Promise(function (resolve) {
  console.log('promise executor')
  resolve();
}).then(function () {
  console.log('promise then')
})
console.log('script end')

// script start
// bar start
// foo
// promise executor
// script end
// bar end
// promise then
// setTimeout

// node和浏览器的event loop是node 11版本开始统一的