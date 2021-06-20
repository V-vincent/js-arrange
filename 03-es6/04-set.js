// 集合
// 集合是一种无序且唯一的数据结构
// 集合的常用操作： 去重、判断某元素是否在集合中、求交集
// ES6 的集合： Set

// ES6 中的 Set 可以做什么？
// 使用 Set 对象： new 、 add 、 delete 、 has 、 size
// 迭代 Set ：多种迭代方法、 Set 与 Array 互转、求并集/交集/差集

// 求并集
const unionSet = (arr1, arr2) => {
  let union = new Set();
  arr1.forEach(item => {
    union.add(item)
  });
  arr2.forEach(item => {
    union.add(item)
  });
  return [...union];
}
// console.log(unionSet([1, 2, 3,], [2, 3, 4, 5])); // [ 1, 2, 3, 4, 5 ]

// 求交集
const intersectionSet = (arr1, arr2) => {
  let intersection = new Set();
  let arrSet = new Set(arr1);
  arr2.forEach(item => {
    if (arrSet.has(item)) intersection.add(item);
  })
  return [...intersection];
}
// console.log(intersectionSet([1, 2, 3,], [2, 3, 4, 5])); // [ 2, 3 ]

// 求差集
const differenceSet = (arr1, arr2) => {
  let difference = new Set();
  let arrSet = new Set(arr1);
  arr2.forEach(item => {
    if (!arrSet.has(item)) difference.add(item);
  })
  return [...difference];
}
// console.log(differenceSet([1, 2, 3,], [2, 3, 4, 5])); // [ 4, 5 ]


// 扩展运算符
// 并集
const unionExtend = (arr1, arr2) => {
  return [...new Set([...arr1, ...arr2])];
}
// console.log(unionExtend([1, 2, 3,], [2, 3, 4, 5])); // [ 1, 2, 3, 4, 5 ]

// 交集
const intersectionExtend = (arr1, arr2) => {
  let arrSet = new Set(arr1);
  return arr2.filter(item => arrSet.has(item));
}
// console.log(intersectionExtend([1, 2, 3,], [2, 3, 4, 5])); // [ 2, 3 ]

// 差集
const differenceExtend = (arr1, arr2) => {
  let arrSet = new Set(arr1);
  return arr2.filter(item => !arrSet.has(item));
}
console.log(differenceExtend([1, 2, 3,], [2, 3, 4, 5])); // [ 4, 5 ]