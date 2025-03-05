console.log(1);
setTimeout(() => {
  console.log(2);
});
new Promise((resolve) => {
  console.log(3);
  resolve("resolve");
  console.log(4);
  reject("error");
})
  .catch((err) => {
    console.log(err);
  })
  .then((res) => {
    console.log(res);
  });
Promise.resolve().then(() => {
  console.log(5);
});
console.log(6);
