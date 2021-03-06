// 作用域？
var a = 1;

function change1(a) {
  a = 2;
}
change1(a);
console.log(a); // 1

var user = {
  age: 10,
}

function change2(user) {
  user.age = 20;
}
change2(user);
console.log(user.age); // 20
function change3(user) {
  user = {
    age: 30
  }
}
change3(user);
console.log(user.age); // 20


function test(a, b) {
  console.log(b);
  return {
    test: function (c, a) {
      return test(c, a);
    }
  }
}
var b = test(100, 200); // 200
b.test(300); // undefined
b.test(400); // undefined
var c = test(101).test(201).test(401); // undefined undefined undefined
var d = test(102).test(202, 302); // undefined 302
d.test(); // undefined

function text(person) {
  person.age = 30;
  person = {
    name: 'pjq',
    age: 24
  };
  return person;
}
const p1 = {
  name: 'okw',
  age: 18
};
const p2 = text(p1);
console.log(p1); // { name: 'okw', age: 30 }
console.log(p2); // { name: 'pjq', age: 24 }