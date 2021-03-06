// function add() {
//     var counter = 0;
//     return counter += 1;
// }
// add();
// add();
// add();
var add = (function () {
  var counter = 0;
  return function () {
    return counter += 1;
  }
})();
// function add() {
//     var counter = 0;
//     return function () {
//         return counter += 1;
//     }
// }
// var closure = add();
// console.log(closure());
// console.log(closure());
// console.log(closure());

// for (var i = 1; i <= 5; i++) {
//     setTimeout(function() {
//         console.log(i)
//     }, 10)
// }
// for (var i = 1; i <= 5; i++) {
//     (function(j) {
//         setTimeout(function() {
//             console.log(j)
//         }, 10)
//     })(i)
// }
// for (let i = 1; i <= 5; i++) {
//     setTimeout(function() {
//         console.log(i)
//     }, 10)
// }
// for(var i = 1; i<=5; i++){
//     setTimeout(function(j){
//         console.log(j)
//     }, 10, i)
// }

function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = function () {
    return this.name;
  };

  this.getMessage = function () {
    return this.message;
  };
}

function MyObject(name) {
  this.name = name.toString();
}
MyObject.prototype.getName = function () {
  return this.name;
}


// function Cars(){
//     this.name = "BMW";
//     this.color = ["white","black"];
// }
// Cars.prototype.sayColor = function(){
//     var outer = this;
//     return function(){
//         return outer.color
//     };
// };
//
// var instance = new Cars();
// console.log(instance.sayColor()())
//
//
//
// function Cars(){
//     this.name = "BMW";
//     this.color = ["white","black"];
// }
// Cars.prototype.sayColor = function(){
//     var outerColor = this.color; //保存一个副本到变量中
//     return function(){
//         return outerColor; //应用这个副本
//     };
//     outColor = null; //释放内存
// };
//
// var instance = new Cars();
// console.log(instance.sayColor()())

var single = function () {
  var obj = {
    name: 'vincent',
    age: 18
  };
  function getName() {
    return obj.name;
  };
  return getName();
}
var getName = single();