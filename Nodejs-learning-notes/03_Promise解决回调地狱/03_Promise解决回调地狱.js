function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(a + b);
    }, 1000);
  });
}

// sum(111, 222).then((result) => {
//   console.log(result);
//   return "第一个then返回结果";
// });

// const promise1 = sum(111, 222);
// console.log(promise1);

// const promise1 = sum(111, 222).then((result) => {
//   console.log(result);
//   return "第一个then返回结果";
// });

// setTimeout(() => {
//   console.log(promise1);
// }, 1000);

// const promise2 = promise1.then((result) => {
//   console.log(result);
//   return "第二个then返回结果";
// });

// setTimeout(() => {
//   console.log(promise2);
// }, 1000);

// const promise3 = sum(111, 222)
//   .then((result) => {
//     console.log(result);
//     return "第一个then返回结果";
//   })
//   .then((result) => {
//     console.log(result);
//     return "第二个then返回结果";
//   })
//   .then((result) => {
//     console.log(result);
//     return "第三个then返回结果";
//   });

// setTimeout(() => {
//   console.log(promise3);
// }, 1000);

// sum(111, 222)
//   .then((result) => result + 333)
//   .then((result) => result + 444)
//   .then((result) => console.log(result));
