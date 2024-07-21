function sum(a, b, cb) {
  setTimeout(() => {
    cb(a + b);
  }, 1000);
}

console.log("1111111");
const result1 = sum(111, 222, (res) => {
  console.log(res); //将在1s后打印
});
// console.log(result);
console.log("2222222");

console.log("1111111");
const result2 = sum(111, 222, (res) => {
  sum(res, 333, (r) => {
    console.log(r);
  });
});
console.log("2222222");

const promise1 = new Promise((resolve, reject) => {
  //   reject("执行出错");
  //   throw new Error("出错了");
  //   resolve("执行正常");
  setTimeout(() => {
    resolve("执行正常");
  }, 1000);
});

promise1.then(
  (result) => {
    console.log(result, "2s之后");
  },
  (reason) => {
    console.log(reason);
  }
);
console.log(promise1);
