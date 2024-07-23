// console.log(1111);

// Promise.resolve(10).then(() => {
//   console.log(2222);
// });

// setTimeout(() => {
//   console.log(3333);
// }, 0);

// queueMicrotask(() => {
//   console.log(111);
// });

// Promise.resolve(10).then(() => {
//   console.log(333);
// });

// console.log(222);

Promise.resolve(10).then(() => {
  console.log(222);
  Promise.resolve(10).then(() => {
    console.log(333);
  });
});

queueMicrotask(() => {
  console.log(111);
});
