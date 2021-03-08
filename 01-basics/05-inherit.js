// function Person(name) {
//   this.name = name;
// }

// let person = new Person('张三');
// // person.say(); // 张三
// console.log(person.constructor === Person); // true

// Person.prototype.say = function () {
//   console.log(this.name);
// }
// console.log(typeof Person.prototype); // "object"
// var person1 = new Person('Mick');
// person1.name = 'Mick11'; // 此时 person1 已经有 name 这个属性了
// person1.say();

// A对象通过继承B对象，直接拥有B对象的所有属性和方法。
// 原型链继承
// 将父类的实例作为子类的原型
// 父类
// function Parent(name) {
//   this.name = name || '干饭人';
//   this.run = function () {
//     console.log(this.name + '干饭');
//   }
// }
// Parent.prototype.say = function () {
//   console.log('我是' + this.name);
// }
// 子类
// function Child() { };
// 将父类的实例作为子类的原型
// Child.prototype = new Parent();
// 子类的实例
// let child1 = new Child();
// child1.say(); // 我是干饭人
// child1.run(); // 干饭人干饭
// 存在问题：
// • 原型对象（引用类型）的属性会被所有实例共享
// • 创建子类实例（ child1 ）时无法向父类构造函数（ Parent ）传参
// 借助构造函数继承
// 在子类构造函数中通用 call() 调用父类型构造函数
// function Parent(name) {
//   this.name = name || '干饭人';
//   this.run = function () {
//     console.log(this.name + '干饭');
//   }
// }
// 在子类构造函数中通用 call() 调用父类型构造函数
// function Child (name) {
//   Parent.call(this, name);
// }
// let child1 = new Child('到点了？');
// child1.run(); // 到点了？干饭
// 优点：
// • 避免了引用类型的属性被所有实例共享
// • 可以在 Child 中向 Parent  传参
// 缺点
// • 只能继承父类的实例属性和方法，不能继承原型属性/方法
// • 无法实现函数复用，每次创建实例都会创建一遍方法
// 组合继承
// 核心是通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用
// function Parent(name) {
//   this.name = name || '干饭人';
//   this.run = function () {
//     console.log(this.name + '干饭');
//   }
// }
// Parent.prototype.say = function () {
//   console.log('我是' + this.name);
// }
// function Child (name, time) {
// 在子类的构造函数中通过 Parent.call(this) 继承父类的属性
//   Parent.call(this, name);
//   this.time = time || '十二点';
// }
// 改变子类的原型为 new Parent() 来继承父类的函数
// Child.prototype = new Parent();
// let child1 = new Child('干饭魂', '七点');
// child1.run(); // 干饭魂干饭
// child1.say(); // 干饭魂
// console.log(child1.time); // 七点
// 优点：
// • 可以继承实例属性/方法，也可以继承原型属性/方法
// • 不存在引用属性共享问题
// • 可传参
// • 函数可复用
// 缺点：
// • 调用了两次父类构造函数，生成了两份实例
// 寄生组合继承
// 这种继承方式对组合继承中调用了两次父类构造函数这点进行了优化
// 核心是将父类的原型赋值给了子类，并且将构造函数设置为子类，这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数
// function Parent(name) {
//   this.name = name || '干饭人';
//   this.run = function () {
//     console.log(this.name + '干饭');
//   }
// }
// Parent.prototype.say = function () {
//   console.log('我是' + this.name);
// }
// function Child (name, time) {
//   // 在子类的构造函数中通过 Parent.call(this) 继承父类的属性
//   Parent.call(this, name);
//   this.time = time || '十二点';
// }
// Child.prototype = Object.create(Parent.prototype); // 核心
// Child.prototype.constructor = Child; // 核心
// let child1 = new Child('干饭魂', '八点');
// child1.run(); // 干饭魂干饭
// child1.say(); // 干饭魂
// console.log(child1.time); // 八点
// 很完美的继承方式。
// Class 继承
// 其实在 JS 中并不存在类，class 只是语法糖，本质还是函数
// class Person {}
// typeof Person; // function
// class 实现继承的核心在于使用 extends 表明继承自哪个父类，并且在子类构造函数中必须调用 super，因为这段代码可以看成 Parent.call(this, value)
// class Parent {
//   // 调用类的构造方法
//   constructor(name) {
//     this.name = name || '干饭人';
//   }
//   run() {
//     console.log(this.name + '干饭了');
//   }
// }
// class Child extends Parent {
//   constructor(name) {
//     // 通过super调用父类的构造方法
//     super(name)
//   }
//   say() {
//     console.log('我是' + this.name);
//   }
// }
// let child1 = new Child('干饭class');
// child1.run(); // 干饭class干饭了
// child1.say(); // 我是干饭class
// 优点：
// • 语法简单易懂,操作更方便
// 缺点：
// • 并不是所有的浏览器都支持 class 关键字