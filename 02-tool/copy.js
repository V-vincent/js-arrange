// 实现拷贝函数
function isObject(obj) {
  return toString.call(obj) === '[object Object]';
}

function isArray(arr) {
  return toString.call(arr) === '[object Array]';
}

function getEmpty(data) {
  if (isArray(data)) {
    return [];
  }
  if (isObject(data)) {
    return {};
  }
  return data;
}
// 深度优先遍历递归实现
function deepCloneDfs(data, map) {
  let target = getEmpty(data);
  map = map || new Map();
  map.set(data, target);
  if (data !== target) {
    for (let key in data) {
      let copy = data[key];
      if (map.get(copy)) {
        target[key] = map.get(copy);
        continue;
      }
      if (isArray(copy) || isObject(copy)) {
        target[key] = deepCloneDfs(copy, map)
      } else {
        target[key] = copy;
      }
    }
  }
  return target;
}
// 深度优先遍历非递归实现
function deepCloneDFS(data) {
  let target = getEmpty(data);
  let stacks = [];
  let map = new Map();
  if (data !== target) {
    stacks.push([data, target]);
    map.set(data, target);
  }
  while (stacks.length) {
    let [oldData, newData] = stacks.pop();
    for (let key in oldData) {
      let copy = oldData[key];
      if (map.get(copy)) {
        newData[key] = map.get(copy);
        continue;
      }
      newData[key] = getEmpty(copy);
      if (newData[key] !== copy) {
        stacks.push([copy, newData[key]]);
        map.set(copy, newData[key]);
      }
    }
  }
  return target;
}
// 广度优先遍历实现
function deepCloneBfs(data) {
  let target = getEmpty(data);
  let queue = [];
  let map = new Map()
  if (target !== data) {
    queue.push([data, target]);
    map.set(data, target);
  }
  let index = 0;
  while (index < queue.length) {
    let [oldData, newData] = queue[index++];
    for (let key in oldData) {
      let copy = oldData[key];
      if (map.get(copy)) {
        newData[key] = map.get(copy);
        continue;
      }
      newData[key] = getEmpty(copy);
      if (newData[key] !== copy) {
        queue.push([copy, newData[key]]);
        map.set(copy, newData[key]);
      }
    }
  }
  return target;
}