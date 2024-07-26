# async 和 await

## async

async 表示异步，通过 async 可以快速创建异步函数（返回 Promise 的函数），这个函数的返回值会自动封装在一个 Promise 中。

异步函数原始创建方式：

```javascript
function f1() {
  return Promise.resolve(10);
}

f1().then((res) => console.log(res));
```

使用 async 创建异步函数：

```javascript
async function f2() {
  return 10;
}

f2().then((res) => console.log(res));
```

## await

Promise 使用链式调用解决了异步函数中回调地狱的问题。

```javascript
function sum(a, b) {
  return new Promise((resolve, reject) => {
    resolve(a + b);
  }, 1000);
}
async function f3() {
  sum(111, 222)
    .then((res) => {
      return sum(res, 333);
    })
    .then((res) => {
      return sum(res, 444);
    })
    .then((res) => {
      console.log(res);
    });
}
f3();
```

我们希望使用同步的方式来调用异步函数。
await 表示等待，await 只能用在 async 函数或 es 的顶级作用域中，await 表达式后面跟的是一个 Promise，await 会暂停当前函数的执行，直到 Promise 的状态变为 resolved，然后返回 Promise 的值。
await 等待异步函数执行完成之后就会将结果返回。

```javascript
async function f4() {
  const res1 = await sum(111, 222); //直到异步函数结果返回之后才会赋值
  console.log(res1); //333
}
```

为什么只能在异步函数中使用？避免 await 阻塞浏览器主线程。
await 只会阻塞异步函数中的 await 后面的代码，不会阻塞异步函数以外的代码。

```javascript
async function f4() {
  const res1 = await sum(111, 222);
  console.log(res1);
}

f4();
console.log("全局");
```

先输出全局，再输出 f4 中的打印结果。
阻塞内部的代码没有问题，因为 await 后面的代码依赖 await 的结果。
同步方式调用：

```javascript
async function f5() {
  let res = await sum(111, 222);
  res = await sum(res, 333);
  res = await sum(res, 444);
  console.log(res);
}
```

## 缺少的 catch

相比于原生的 Promise，async/await 的写法更简洁，但是缺少 catch，所以需要用 try/catch 来处理错误。

```javascript
async function f6() {
  try {
    let res = await sum(111, 222);
    res = await sum(res, 333);
    res = await sum(res, 444);
    console.log(res);
  } catch {
    console;
  }
}
```

## async 函数中不写 await

async 函数中不写 await，则和普通函数差不多，但是他会返回一个 Promise。

```javascript
async function f7() {
  console.log(1);
  console.log(2);
  console.log(3);
}

function f8() {
  return new Promise((resolve, reject) => {
    console.log(1);
    console.log(2);
    console.log(3);
    resolve();
  });
}

f7();
console.log(4);
```

输出结果：

```text
1
2
3
4
```

上面的 f7 和 f8 是等价的。

## await 调用函数的流程

使用 await 调用函数后，当前函数后面的代码会在当前函数执行完成之后放在微任务队列中。
微任务队列的代码执行顺序肯定在全局调用栈代码的后面。

```javascript
async function f7() {
  console.log(1);
  await console.log(2);
  console.log(3);
}

f7();
console.log(4);
```

输出结果：

```text
1
2
4
3
```

上面的代码等价于：

```javascript
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
```

## await 不在异步函数中使用的场景

前面我们说了，await 只能用在 async 函数或 es 模块的顶级作用域中。
什么叫 es 模块的顶级作用域呢？

### 在 script 标签中加上 type="module"属性

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script type="module">
      await console.log(111);
    </script>
  </head>
  <body></body>
</html>

```

### 在.mjs 文件中使用

在.mjs 文件中可以直接使用 await：`await console.log(111);`

### 在立即执行函数中使用

```javascript
(async () => {
  await console.log(111);
})();
```

这里可能会出现一个小问题。
js 可以省略分号。假设这个立即执行函数前面还有一个函数，而刚好我们没有手动加上分号，js 会将立即执行函数作为上一个函数或者代码的返回值的调用，就会报错，上一个函数的返回值不是函数。
例如：

```javascript
f9()(async () => {
  await console.log(111);
})();
```

这种情况 js 认为 f9 函数的返回值仍然是一个函数并且需要传递一个异步函数作为参数。但是实质上，我们的 f9 函数的返回值并不是一个函数，所以报错：`Uncaught TypeError TypeError: f9(...) is not a function`
所以，写代码要保持加分号的习惯。
