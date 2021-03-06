// 为了比较这些不同解法的性能，先写了一个测试模板，用来计算它们的耗时，测试环境是在谷歌浏览器。
// 先生成一个长度足够长的数组
let arr1 = Array.from(Array(100000), (item, index) => index);
let arr2 = Array.from(Array(50000), (item, index) => index * 2);
let arr = [...arr1, ...arr2];

// 方法所用时长
console.log(`去重前数组的长度: ${arr.length}`);
let startTime = +new Date();

// unique方法返回去重后的数组
let result = unique(arr);
let endtTime = +new Date();

console.log(`去重后数组的长度: ${result.length}`);
console.log(`耗时：${endtTime - startTime}毫秒`);

// 测试方法
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('arr 不是数组');
    return;
  }
  return unique6(arr); // 具体方法
}

// 双重for循环
// 这个是最容易理解的方法，外层循环遍历元素，内层循环检查是否重复。定义一个数组`res`保存结果，遍历需要去重的数组，如果该元素已经存在在`res`中，则说明是重复的元素，如果没有，则放入 `res`中
function unique1(arr) {
  var res = [];
  var isRepeat;
  for (let ai = 1, alen = arr.length; ai < alen; ai++) {
    isRepeat = false;
    for (let ri = 0, rlen = res.length; ri < rlen; ri++) {
      if (res[ri] == arr[ai]) {
        isRepeat = true;
        break;
      }
    }
    if (!isRepeat) res.push(arr[ai]);
  }
  return res;
}
// 输出
// 去重前数组的长度: 150000
// 去重后数组的长度: 100000
// 耗时：3983毫秒
// 重复试验输出：3954、3990、3942、3975、3964

// 嗯嗯，处理一个15w长度的数组要4秒左右。
// 上面的写法是将原数组中的元素和结果数组中的元素一一作比较，下面这个是将原数组中重复元素的最后一个元素放入结果数组中。
// function unique1(arr) {
//     var res = [];
//     var alen = arr.length;
//     for (let ai = 1; ai < alen; ai++) {
//         for (let ri = ai + 1; ri < alen; ri++){
//             if (arr[ai] === arr[ri]) ri = ++ai;
//         }
//         res.push(arr[ai]);
//     }
//     return res;
// }
// 耗时：9314、9232、9122、9220、9175
// 但是这个写法处理15W长度的数组耗时是九千多毫秒。原因是一个原数组`arr`和结果数组`res`比较，一个是将两个原数组自己作比较（这个时间复杂度没得说，就是`O(n^2)`）。结果数组`res`一开始的长度是0，和原数组比较相当于一个大人背着一个婴儿走路，虽然这个小孩会慢慢长大，但总是比大人要小很多，自然会走快些。第二个写法是原数组跟原数组比较，相当于一个大人背着另一个同样重的大人走路，这样自然也走不快。
// 所以用双重`for`循环比较时，不要将两个原数组作比较，要将原数组和结果数组比较。

// 另外，不要使用splice去除原数组重复的这种方法，这种更加耗时。它不仅是要做`len--`和`i--`的操作，这个方法本身是这样的，你每在中间移除一个值，后面的全部就要往前面移一个位置，这无疑是很耗时的。所以，非常非常不建议用这种方法去去重。

// 循环方法 + indexOf()
// 在实验循环方法：`for`循环、`for...of`、`filter()`、`map()`、`forEach()`、`reduce()`等方法分别搭配`indexOf()`时，得到的结果都相差不大，结构也都差不多，都是一次循环加`indexOf()`。 所以便将它们归为一类。
// ##### 1、for循环 + indexOf()
// function unique2(arr){
//     var res = arr.length > 0 ? [arr[0]] : [];
//     for (let ai = 1, alen = arr.length; ai < alen; ai++) {
//         if (res.indexOf(arr[ai]) === -1) res.push(arr[ai]);
//     }
//     return res;
// }
// 耗时：7761、7735、7845、7775、7828

// ##### 2、for...of + indexOf()
// function unique2(arr) {
//     var res = [];
//     for (let i of arr) {
//         if (res.indexOf(i) === -1) res.push(i);
//     }
//     return res;
// }
// 耗时：7805、7771、7835、7841、7787

// ##### 3、filter() + indexOf()
// function unique2(arr) {
//     var res = arr.filter((item, index)=> {
//         return arr.indexOf(item) === index;
//     })
//     return res;
// }
// 耗时：7833、7809、7820、7749、7778

// ##### 4、map() + indexOf()
// function unique2(arr) {
//     var res = arr.map((item, index)=> {
//         return arr.indexOf(item) === index;
//     })
//     return res;
// }
// 耗时：7773、7842、7884、7815、7763、7855

// ##### 5、forEach() + indexOf()
function unique2(arr) {
  var res = [];
  arr.forEach((item, index, array) => {
    if (res.indexOf(item) == -1) res.push(item);
  })
  return res;
}
// 耗时：7805、7789、7737、7771、7780

// 也可以是循环方法搭配`includes()`使用，`includes()`方法是用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。`includes()`和`indexOf()`类似，耗时也都差不多。
// function unique2(arr) {
//     var res = [];
//     for (let item of arr) {
//         if (res.includes(item) === false) res.push(item);
//     }
//     return res;
// }
// 耗时：7785、7869、7925、7872、7972

// sort()排序后遍历数组
// 先使用 sort()对数组进行排序,然后比较相邻元素是否相等，从而排除重复项
function unique3(arr) {
  arr = arr.sort();
  var res = arr.length > 0 ? [arr[0]] : [];
  for (let ai = 1, alen = arr.length; ai < alen; ai++) {
    if (arr[ai] !== arr[ai - 1]) res.push(arr[ai]);
  }
  return res;
}
// 耗时：13、13、14、13、12

// 4、new Set()
// `ES6`新增了`Set`这一数据结构，类似于数组，`Set`的成员具有唯一性，基于这一特性，就非常适合用来做数组去重。
function unique4(arr) {
  // return Array.from(new Set(arr)); // 耗时：14、13、11、10、11
  return [...new Set(arr)]; // 耗时：15、14、11、10、10
}
// 耗时：221、259、223、224、221
// 耗时：209、216、215、225、227

// 5、new Map()
// `ES6`新增的还有`Map()`，这种方法和`Set()`类似，也是具有唯一性。
function unique5(arr) {
  var res = [];
  var myMap = new Map();
  for (var ai = 0, alen = arr.length; ai < alen; ai++) {
    if (!myMap.has(arr[ai])) {
      myMap.set(arr[ai], 1);
      res.push(arr[ai]);
    }
  }
  return res;
}
// 耗时： 19、21、20、18、21

// 6、使用对象key来去重
// 利用对象的特性（唯一性），不能出现相同的key值
function unique6(arr) {
  var obj = {};
  var res = [];
  for (let item of arr) {
    if (!obj[item]) {
      res.push(item);
      obj[item] = 1;
    }
  }
  return res;
}
// 耗时： 11、17、15、10、10