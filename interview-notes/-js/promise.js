console.log("script start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("promise1");
  })
  .then(() => {
    console.log("promise2");
  })
  .then(() => {
    console.log("promise3");
  });

async function async1() {
  console.log("async1 start");
  await async2();
  process.nextTick(() => console.log("nextTick"));
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

async1();

console.log("script end");