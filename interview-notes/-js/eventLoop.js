// console.log("script start");

// async function async1() {
//   await async2();
//   console.log("async1 end");
// }
// async function async2() {
//   console.log("async2 end");
//   return Promise.resolve().then(() => {
//     console.log("async2 end1");
//   });
// }
// async1();

// setTimeout(function () {
//   console.log("setTimeout");
// }, 0);

// new Promise((resolve) => {
//   console.log("Promise");
//   resolve();
// })
//   .then(function () {
//     console.log("promise1");
//   })
//   .then(function () {
//     console.log("promise2");
//   });

// console.log("script end");

// 分析：script start、async2 end、Promise、script end、async2 end1、async1 end、promise1、promise2、setTimeout
// 实际输出：script start、async2 end、Promise、script end、async2 end1、promise1、promise2、async1 end、setTimeout

// new Promise((resolve, reject) => {
//   setTimeout(function () {
//     console.log("2");
//     resolve();
//   }, 5000);
// }).then((res) => {
//   console.log("1");
// });

// setImmediate(() => {
//   console.log("timeout1");
//   Promise.resolve().then(() => console.log("promise resolve"));
//   process.nextTick(() => console.log("next tick1"));
// });
// setImmediate(() => {
//   console.log("timeout2");
//   process.nextTick(() => console.log("next tick2"));
// });
// setImmediate(() => console.log("timeout3"));
// setImmediate(() => console.log("timeout4"));

// setTimeout(() => {
//     console.log(1)
// });

// new Promise((resolve) => {
//     console.log(2);
//     for (let i = 0; i < 10000; i ++) {
//         if(i === 9999) resolve();
//     }
//     console.log(3);
// })
//     .then(() => console.log(4));

// console.log(5);
// 结果：2,3,5,4，1

// setTimeout(() => {
//   console.log("timer1");
//   Promise.resolve().then(function () {
//     console.log("promise1");
//   });
// }, 0);
// setTimeout(() => {
//   console.log("timer2");
//   Promise.resolve().then(function () {
//     console.log("promise2");
//   });
// }, 0);

// setImmediate(() => console.log("immediate1"));
// setImmediate(() => {
//   console.log("immediate2");
//   Promise.resolve().then(() => console.log("promise resolve"));
// });
// setImmediate(() => console.log("immediate3"));
// setImmediate(() => console.log("immediate4"));

// async function async1() {
//   test().then(() => {
//     console.log("2");
//   });
// }
// async function test() {
//   return new Promise((resolve, reject) => {
//     resolve();
//     console.log("1");
//   });
// }

// async1();
// new Promise((resolve, reject) => {
//   resolve();
// })
//   .then(() => {
//     console.log("3");
//   })
//   .then(() => {
//     console.log("4");
//   })
//   .then(() => {
//     console.log("5");
//   })
//   .then(() => {
//     console.log("6");
//   });

// 分析：1、3、4、5、6、2
// 输出：1、3、4、2、5、6

// new Promise((resolve, reject) => {
//   console.log("p1-0");
//   resolve();
// })
//   .then(() => {
//     console.log("p1-1");
//     new Promise((resolve, reject) => {
//       console.log("p2-0");
//       resolve();
//     })
//       .then(() => {
//         console.log("p2-1");
//       })
//       .then(() => {
//         console.log("p2-2");
//       });
//   })
//   .then(() => {
//     console.log("p1-2");
//   });

// new Promise((resolve, reject) => {
//   console.log("p1-0");
//   resolve();
// })
//   .then(() => {
//     setTimeout(() => {
//       console.log("macrotask-1");
//       new Promise((resolve, reject) => {
//         console.log("p2-0");
//         resolve();
//       })
//         .then(() => {
//           setTimeout(() => {
//             console.log("macrotask-2");
//           }, 0);
//           console.log("p2-1");
//         })
//         .then(() => {
//           console.log("p2-2");
//         });
//     }, 0);
//     console.log("p1-1");
//   })
//   .then(() => {
//     console.log("p1-2");
//   });


// async function async1() {
//   console.log("a1-0");
//   await async2();
//   console.log("a1-1");
//   setTimeout(() => {
//     console.log("macro-2");
//   }, 0);
// }
// async function async2() {
//   console.log("a2-0");
//   setTimeout(() => {
//     console.log("macro-3");
//   }, 0);
// }

// setTimeout(() => {
//   console.log("macro-1");
// }, 0);
// async1();

// function runAsync(x) {
//   return new Promise((resolve, _) => {
//     setTimeout(() => {
//       console.log(x);
//       resolve(x);
//     }, 1000);
//   });
// }
// Promise.all([runAsync(1), runAsync(2), runAsync(3)]).then((res) => {
//   console.log("res", res);
// });

// function runAsync(x) {
//   return new Promise((resolve, _) => {
//     setTimeout(() => {
//       console.log(x);
//       resolve(x);
//     }, 1000 * x);
//   });
// }
// Promise.race([runAsync(1), runAsync(2), runAsync(3)]).then((res) => {
//   console.log("res", res);
// });


console.log("script start");

async function async1() {
  await async2();
  console.log("async1 end");
  new Promise((resolve) => {
    resolve();
  }).then(function () {
    console.log("xxx");
  });
}
async function async2() {
  console.log("async2 end");
  return Promise.resolve().then(() => {
    console.log("async2 end1");
  });
}
async1();

setTimeout(function () {
  console.log("setTimeout");
}, 0);

new Promise((resolve) => {
  console.log("Promise");
  resolve();
})
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  })
  .then(function () {
    console.log("promise3");
  })
  .then(function () {
    console.log("promise4");
  })
  .then(function () {
    console.log("promise5");
  })
  .then(function () {
    console.log("promise6");
  })
  .then(function () {
    console.log("promise7");
  });

console.log("script end");