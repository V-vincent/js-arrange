// 字典：ES6 中的 Map
// 字典与集合相似，字典也是一种存储唯一值的数据结构，但它是以键值对的形式来存储。
// 字典一定是以键值对的形式存储
// 使用 Map 对象： new 、 set 、 delete 、 clear 
// 字典的常用操作，键值对的增删改查。

const map = new Map()

// 增
map.set('monday', '星期一')
map.set('Tuesday', '星期二')
map.set('Wednesday', '星期三')

console.log(map.has('monday')) // true
console.log(map.size) // 3
console.log(map.keys()) // 输出{'monday', 'Tuesday', 'Wednesday'}
console.log(map.values()) // 输出{'星期一', '星期二', '星期三'}
console.log(map.get('monday')) // 星期一

map.set('monday', '星期四') // 改

map.delete('monday') // 删

map.clear() // 清空

// 给定两个数组，编写一个函数来计算它们的交集。
// 输入输出示例：

// 输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出: [9,4]
// 解释:
// nums1 和 nums2 两个数组的相交部分为 [9, 4] 。
var intersection = function (nums1, nums2) {
  let numMap = new Map();
  nums1.forEach(item => numMap.set(item, 1));
  let res = [];
  nums2.forEach(item => {
    if (numMap.get(item)) {
      res.push(item);
      numMap.delete(item);
    }
  })
  return res
};