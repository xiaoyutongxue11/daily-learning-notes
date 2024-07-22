# Promise 详解

## then 和 catch 会‘见机执行’

`then`和`catch`都将会获得他想要的数据。如果不能获得他想要的数据，他将不会执行。
比如：当上一个`Promise`存储的值是正常的时候，使用`catch`将无法取出数据（前提：`sum` 函数存的数据是正常的，也就是使用 `resolve` 方法存的）。

```javascript
function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000);
  });
}

sum(111, 222)
  .then((res) => "哈哈")
  //catch不会执行
  .catch((res) => {
    console.log(res);
    return "嘻嘻";
  })
  .then((res) => console.log(res));
//第二个then，打印出来“哈哈”，表明获取了第一个then的数据
```

同理，当上一个`Promise`存储的值是错误的时候，使用`then`将无法取出数据（前提：`sum` 函数存的数据是拒绝的或者错误的）。

```javascript
function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(a + b);
    }, 1000);
  });
}
const promise4 = sum(111, 222)
  .then((res) => "哈哈") //不会执行
  .catch((res) => {
    console.log(res, "catch捕获的数据");
    return "嘻嘻";
  })
  .then((res) => console.log(res)); //不会执行
```

## Promise 的静态方法

### Promise.resolve

`Promise.resolve`将会创建一个立即完成的 `Promise`。

```javascript
Promise.resolve(10).then((res) => console.log(res)); //打印结果：10
```

### Promise.reject

`Promise.reject`将会创建一个立即拒绝的 `Promise`。

```javascript
Promise.reject(10).catch((res) => console.log(res)); //打印结果：10
```

### Promise.all

`Promise.all`接收数组参数，其中每个元素都是一个返回数据为正常的 `Promise`。

```javascript
function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000);
  });
}
Promise.all([sum(111, 222), sum(222, 333), sum(333, 444)]).then(
  (res) => console.log(res) //[333, 555, 777]
);
```

若其中一个报错，就返回错误。

```javascript
// Error
Promise.all([
  sum(111, 222),
  sum(222, 333),
  sum(333, 444),
  Promise.reject(10),
]).then((res) => console.log(res));
```

### Promise.allSettled

`Promise.allSettled`接收数组参数，其中每个元素都是一个 `Promise`,将会返回 `Promise` 的执行结果（无论正常或者异常）。

```javascript
Promise.allSettled([
  sum(111, 222),
  sum(222, 333),
  sum(333, 444),
  Promise.reject(10),
]).then((res) => {
  console.log(res);
});
```

```javascript
[
  {
    status: "fulfilled",
    value: 333,
  },
  {
    status: "fulfilled",
    value: 555,
  },
  {
    status: "fulfilled",
    value: 777,
  },
  {
    status: "rejected",
    reason: 10,
  },
];
```

### Promise.race

`Promise.race`接收数组参数，将返回执行最快的 `Promise`，（无论对错）。

```javascript
Promise.race([sum(111, 222), sum(222, 333), sum(333, 444)]).then((res) => {
  console.log(res); //打印结果：333
});
//这里三个函数都是延时的，谁在前，谁先执行完成
```

```javascript
Promise.race([
  sum(111, 222),
  sum(222, 333),
  sum(333, 444),
  Promise.resolve(10),
]).then((res) => {
  console.log(res); //打印结果：10
});
//Promise.resolve没有延时，会先执行
```

```javascript
Promise.race([sum(111, 222), sum(222, 333), sum(333, 444), Promise.reject(10)])
  .then((res) => {
    console.log(res);
  })
  .catch((res) => {
    console.log(res); //打印结果：10
  });
//Promise.reject没有延时，会先执行
```

### Promise.any

`Promise.any`接收数组参数，将返回执行最快的 `Promise`，（无论对错）。

```javascript
Promise.any([sum(111, 222), sum(222, 333), sum(333, 444)]).then((res) => {
  console.log(res); //打印结果：333
});
//这里三个函数都是延时的，谁在前，谁先执行完成
```

```javascript
Promise.any([
  sum(111, 222),
  sum(222, 333),
  sum(333, 444),
  Promise.reject(10),
]).then((res) => {
  console.log(res); //打印结果：333
});
//Promise.reject不会执行
```

如果传的都是未完成的 `Promise`，就会报错。

```javascript
//ERROR:Uncaught AggregateError AggregateError: All promises were rejected
Promise.any([Promise.reject(10), Promise.reject(20), Promise.reject(30)]).then(
  (res) => {
    console.log(res);
  }
);
```
