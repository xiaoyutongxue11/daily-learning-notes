console.log(1 < 2 && 4 > 5); // false
console.log(1 < 2 || 4 > 5); // true

// 返回决定结果的那个值
console.log(2 && 4); // 4
console.log(2 || 4); // 2

// && 用法
if (obj.func) {
  obj.func();
}
//等价于
obj.func && obj.func();

// ||用法
if (oj.a) {
  b = obj.a;
} else {
  b = "default";
}
// 等价于
b = obj.a || "default";
