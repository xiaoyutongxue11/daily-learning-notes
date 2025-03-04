// console.log("script start");

// setTimeout(() => {
//   console.log("setTimeout");
// }, 0);

// Promise.resolve()
//   .then(() => {
//     console.log("promise1");
//   })
//   .then(() => {
//     console.log("promise2");
//   })
//   .then(() => {
//     console.log("promise3");
//   });

// async function async1() {
//   console.log("async1 start");
//   await async2();
//   process.nextTick(() => console.log("nextTick"));
//   console.log("async1 end");
// }

// async function async2() {
//   console.log("async2");
// }

// async1();

// console.log("script end");

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