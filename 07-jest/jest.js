// 被测试对象
let add = (a, b) => a - b;

// let res = add(1, 2);
// let expect = 3;
// if (res !== expect) {
//   throw new Error(`1 + 2 应该等于${expect}，但是结果却是${res}`);
// }

// 测试代码
let expect = (res) => {
  return {
    toBe: (actual) => {
      if (res !== actual) {
        throw new Error('期望值与预期值不符')
      }
    }
  }
}
expect(add(1, 2)).toBe(3);

let test = (desc, fn) => {
  try {
    fn();
  } catch (err) {
    console.log(`${desc}没有通过`);
  }
}
test("加法测试", () => {
  expect(add(1, 2)).toBe(3);
})

