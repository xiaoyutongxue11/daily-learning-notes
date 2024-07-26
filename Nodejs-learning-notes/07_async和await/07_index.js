// // function f1() {
// //   return Promise.resolve(10);
// // }

// // f1().then((res) => console.log(res));

// // async function f2() {
// //   return 10;
// // }

// // f2().then((res) => console.log(res));

// function sum(a, b) {
//   return new Promise((resolve, reject) => {
//     resolve(a + b);
//   }, 1000);
// }
// async function f3() {
//   sum(111, 222)
//     .then((res) => {
//       return sum(res, 333);
//     })
//     .then((res) => {
//       return sum(res, 444);
//     })
//     .then((res) => {
//       console.log(res);
//     });
// }

// f3();

// async function f4() {
//   const res1 = await sum(111, 222);
//   console.log(res1);
// }

// f4();
// console.log("全局");

// async function f5() {
//   let res = await sum(111, 222);
//   res = await sum(res, 333);
//   res = await sum(res, 444);
//   console.log(res);
// }

// async function f6() {
//   try {
//     let res = await sum(111, 222);
//     res = await sum(res, 333);
//     res = await sum(res, 444);
//     console.log(res);
//   } catch {
//     console;
//   }
// }

// function f8() {
//   return new Promise((resolve, reject) => {
//     console.log(1);
//     console.log(2);
//     console.log(3);
//     resolve();
//   });
// }

// async function f7() {
//   console.log(1);
//   await console.log(2);
//   console.log(3);
// }

// f7();
// console.log(4);

// console.log([] == ![]);

function f9() {
  return new Promise((resolve, reject) => {
    console.log(1);
    console.log(2);
    resolve();
  }).then(() => {
    console.log(3);
  });
}

f9();
console.log(4);

(async () => {
  await console.log(111);
})();
