function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000);
  });
}

// const promise4 = sum(111, 222)
//   .then((res) => "哈哈")
//   .catch((res) => {
//     console.log(res, "catch捕获的数据");
//     return "嘻嘻";
//   })
//   .then((res) => console.log(res));

// Promise.resolve(10).then((res) => console.log(res));

// Promise.reject(10).catch((res) => console.log(res));

// Promise.all([
//   sum(111, 222),
//   sum(222, 333),
//   sum(333, 444),
//   Promise.reject(10),
// ]).then((res) => console.log(res));

// Promise.race([sum(111, 222), sum(222, 333), sum(333, 444), Promise.reject(10)])
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((res) => {
//     console.log(res);
//   });

// Promise.allSettled([
//   sum(111, 222),
//   sum(222, 333),
//   sum(333, 444),
//   Promise.reject(10),
// ]).then((res) => {
//   console.log(res);
// });

// Promise.any([
//   sum(111, 222),
//   sum(222, 333),
//   sum(333, 444),
//   Promise.reject(10),
// ]).then((res) => {
//   console.log(res);
// });

// Promise.any([Promise.reject(10), Promise.reject(20), Promise.reject(30)])
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((res) => console.log(res));

Promise.any([sum(111, 222), sum(222, 333), sum(333, 444), Promise.reject(10)])
  .then((res) => {
    console.log(res);
  })
  .catch((res) => console.log(res));
