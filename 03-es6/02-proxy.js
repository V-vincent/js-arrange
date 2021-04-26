// let obj = new Proxy({}, {
// get: function (target, key, receiver) {
//   console.log(`正在get：${key}!`);
//   return Reflect.get(target, key, receiver);
// },
// set: function (target, key, value, receiver) {
//   console.log(`正在set：${key}的值为：${value}!`);
//   console.log('目标对象', target);
//   return Reflect.set(target, key, value, receiver);
// }
// })
// Reflect.get方法允许你从一个对象中取属性值
// var obj = { x: 1, y: 2 };
// Reflect.get(obj, "x"); // 1

// Reflect.set 方法允许你在对象上设置属性
// var obj = {};
// Reflect.set(obj, "prop", "value"); // true （返回一个 Boolean 值表明是否成功设置属性）
// obj.prop; // "value"

let target = {};
let handler = {
  get: function (target, key, receiver) {
    console.log(`正在get：${key}!`);
    return target[key];
  },
  set: function (target, key, value, receiver) {
    console.log(`正在set：${key}的值为：${value}!`);
    target[key] = value;
  }
}
let obj = new Proxy(target, handler);
obj.a;
obj.a = '1';

let boy = new Proxy({}, {
  get: function () {
    return '你好帅！';
  }
})
console.log(boy.name);
let littleBoy = Object.create(boy);
console.log(littleBoy.name);

// 在读取代理对象的某个属性时触发该操作，比如在执行 proxy.foo 时
handler.get()

// 在给代理对象的某个属性赋值时触发该操作，比如在执行 proxy.foo = 1 时
handler.set()

// 在定义代理对象某个属性时的属性描述时触发该操作，比如在执行 Object.defineProperty(proxy, "foo", {}) 时。
handler.defineProperty()

// 在读取代理对象的原型时触发该操作，比如在执行 Object.getPrototypeOf(proxy)时
handler.getPrototypeOf()

// 在设置代理对象的原型时触发该操作，比如在执行 Object.setPrototypeOf(proxy, null)时
handler.setPrototypeOf()

// 在判断一个代理对象是否是可扩展时触发该操作，比如在执行 Object.isExtensible(proxy)时
handler.isExtensible()

// 在让一个代理对象不可扩展时触发该操作，比如在执行 Object.preventExtensions(proxy)时
handler.preventExtensions()

// 在获取代理对象某个属性的属性描述时触发该操作，比如在执行 Object.getOwnPropertyDescriptor(proxy, "foo")时
handler.getOwnPropertyDescriptor()

// 在判断代理对象是否拥有某个属性时触发该操作，比如在执行 "foo" in proxy时
handler.has()

// 在删除代理对象的某个属性时触发该操作，比如在执行 delete proxy.foo 时
handler.deleteProperty()

// 在获取代理对象的所有属性键时触发该操作，比如在执行 Object.getOwnPropertyNames(proxy) 时
handler.ownKeys()

// 在调用一个目标对象为函数的代理对象时触发该操作，比如在执行 proxy() 时
handler.apply()

// 在给一个目标对象为构造函数的代理对象构造实例时触发该操作，比如在执行new proxy() 时
handler.construct()