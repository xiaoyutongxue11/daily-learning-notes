function flatten(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

function flatten2(arr) {
  let acc = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      acc = acc.concat(flatten2(item));
    } else acc.push(item);
  });
  return acc;
}

function flatten3(arr, depth = Infinity) {
  if (depth <= 0) return arr;
  let acc = [];
  arr.forEach((item) => {
    if (Array.isArray(item) && depth > 0) {
      acc = acc.concat(flattenDepth(item, depth - 1));
    } else acc.push(item);
  });
  return acc;
}

function flattenDepth(arr, depth = 1) {
  if (depth <= 0) return arr; // 控制拍平的层数

  let result = [];
  arr.forEach((item) => {
    if (Array.isArray(item) && depth > 0) {
      result = result.concat(flattenDepth(item, depth - 1)); // 递归，层级 -1
    } else {
      result.push(item);
    }
  });
  return result;
}

const arr = [1, [2], [3, 4, [5, 6]], [7, [8]]];
console.log(flatten3(arr,0));
