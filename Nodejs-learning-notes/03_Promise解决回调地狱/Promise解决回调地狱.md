# Promise是如何解决回调地狱的

## 使用 Promise

```javascript
function sum(a, b) {
  //sum方法返回一个Promise对象
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //这里不再使用return返回，也不用使用回调函数，而是直接调用resolve方法
      resolve(a + b);
    }, 1000);
  });
}

//通过.then方法获取结果
sum(111, 222).then((result) => {
  console.log(result);
});
```

但是这貌似并没有解决我们遇到的回调地狱的问题。

## .then 和.catch 返回一个 Promise 对象

首先，我们用一个值来接收刚刚执行的函数的返回值，并打印输出。

```javascript
const promise1 = sum(111, 222).then((result) => {
  console.log(result);
});

console.log(promise1);
```

我们可以发现，该函数的返回结果仍然是一个 `Promise` 对象。

```javascript
Promise {[[PromiseState]]: 'pending', [[PromiseResult]]: undefined, Symbol(async_id_symbol): 8, Symbol(trigger_async_id_symbol): 1}
```

但是他的 PromiseResult 是 undefined，我们尝试给 then 方法返回一个值试试。

```javascript
const promise1 = sum(111, 222).then((result) => {
  console.log(result);
  return "第一个then返回结果";
});

console.log(promise1);
```

打印结果 `PromiseResult` 还是 `undefined`，这是因为 `.then` 方法执行是异步调用的，他的执行顺序在`console.log(promise1);`后方。
所以我们尝试过一会再打印这个值试试。
这时我们发现,刚刚在 `then`方法中返回的值就是新的 `Promise` 的 `PromiseResult` 的值。

```javascript
Promise {[[PromiseState]]: 'fulfilled', [[PromiseResult]]: '第一个then返回结果', Symbol(async_id_symbol): 7, Symbol(trigger_async_id_symbol): 5}
```

同样的，`.catch`也会返回一个 `Promise` 对象。你也可以在`.catch`方法中返回一个值试试。

## 解决回调地狱

既然 Promise.then 方法返回一个 Promise 对象，我们就可以利用这个特性来解决回调地狱。

```javascript
const promise1 = sum(111, 222).then((result) => {
  console.log(result);
  return "第一个then返回结果";
});

setTimeout(() => {
  console.log(promise1);
}, 1000);

const promise2 = promise1.then((result) => {
  console.log(result);
  return "第二个then返回结果";
});

setTimeout(() => {
  console.log(promise2);
}, 1000);
```

第二个 then 的结果也能正常显示。

```javascript
Promise {[[PromiseState]]: 'fulfilled', [[PromiseResult]]: '第二个then返回结果', Symbol(async_id_symbol): 9, Symbol(trigger_async_id_symbol): 7}
```

这样免去了使用回调函数的麻烦。
写法可以改写为下面这种形式,也叫做`Promise`的链式调用：

```javascript
const promise3 = sum(111, 222)
  .then((result) => {
    console.log(result);
    return "第一个then返回结果";
  })
  .then((result) => {
    console.log(result);
    return "第二个then返回结果";
  })
  .then((result) => {
    console.log(result);
    return "第三个then返回结果";
  });

setTimeout(() => {
  console.log(promise3);
}, 1000);
```

这样就能轻松实现 sum 的加减了。

```javascript
sum(111, 222)
  .then((result) => result + 333)
  .then((result) => result + 444)
  .then((result) => console.log(result));
```