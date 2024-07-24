# 手写 Promise

## 使用私有函数存储数据

使用私有的 `resolve`和 `reject` 函数存储数据，不允许外部调用。

## 解决 this 为 undefined 的问题

我们现在需要将 `resolve` 函数的参数存储在 `Promise` 中。

```javascript
#resolve(value) {
 console.log("resolve", value);
 this.#result = value;
}
```

如果 `resolve` 是这样编写的，我们运行会发现，报如下错误：

```text
Uncaught TypeError TypeError: Cannot set properties of undefined (setting '#result')
  at #resolve
```

大概意思就是 `this` 是 `undefined`。我们可以打印一下 `this` 看看。

```javascript
#resolve(value) {
  console.log(this);
}
```

打印结果：`undefined`。
为什么呢？
`this` 是谁，看函数的调用方式。
我们的 `resolve` 是以函数形式调用的。在严格模式下，直接调用的函数就是 `undefined`。
解决方式有两种：

- _`bing`配合普通函数_：使用 `bind` 方法将 `resolve` 函数的 `this` 绑定到构造器中，也就是当前实例对象；
  ```javascript
  this.#resolve.bind(this);
  ```
- _将普通函数改为箭头函数_：不使用普通函数编写，而是用箭头函数。（通过直接写函数的方式是添加到原型中的，通过把函数赋值的形式是存在对象自身中的）
  ```javascript
  #resolve = (value) => {
  // console.log("resolve", value);
  // this.#result = value;
  console.log(this);
  };
  ```

## Promise 的数据应当只能修改一次

我们需要创建一个变量来记录 `Promise` 的状态，当状态改变时，就不允许再改变。

## 代码中尽量少使用字符串，尽量使用变量

## 解决 then 读取数据的问题

目前，`then` 只能读取已经存储进 `Promise` 的数据，不能读取异步存储的数据。
当 `Promise` 的 `resolve` 方法里面有异步代码时，使用 `Promise.then` 也需要获取数据。
这是我们可以设置一个变量，来存储 `then` 方法的回调函数，当 `resolve` 执行时，就调用这个回调函数。

```javascript
  #callback;

  #resolve(value) {
    if (this.#state !== PROMISE_STATE.PENDING) return;
    this.#result = value;
    this.#state = PROMISE_STATE.FULFILLED;

    this.#callback && this.#callback(this.#result);
  }

  const mp = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve("value1");
    });
  });

  mp.then((result) => {
    console.log(result);
  });
```

## 将 then 中的函数添加到微任务队列中执行

这段代码不是直接在调用栈了，变成了异步了。

```javascript
  #resolve(value) {
    //state不等于0，说明值已经被修改了
    if (this.#state !== PROMISE_STATE.PENDING) return;
    this.#result = value;
    this.#state = PROMISE_STATE.FULFILLED;

    queueMicrotask(() => {
      this.#callback && this.#callback(this.#result);
    });
  }

  then(onFulfilled, onRejected) {
    if (this.#state === PROMISE_STATE.PENDING) this.#callback = onFulfilled;
    else if (this.#state === PROMISE_STATE.FULFILLED)
      queueMicrotask(() => {
        onFulfilled(this.#result);
      });
  }
```

我们可以尝试像之前一样去打印看看：

```javascript
mp.then((result) => {
  console.log(result);
});

setTimeout(() => {
  console.log(111);
}, 0);
```

打印结果：

```text
value1
111
```

打印结果正常，微任务队列的代码执行速度比宏任务队列代码执行快。

## 解决 then 只能读取一次数据的问题

首先，我们先来通过我们自己的 `MyPromise` 可以读取几次数据：

```javascript
mp.then((result) => {
  console.log(result, "111");
});

mp.then((result) => {
  console.log(result, "222");
});
```

打印结果：

```text
value1 222
```

原因：我们的`#callback` 变量每次都是简单的赋值，下一个 `then` 调用的时候，`#callback` 变量的值又被覆盖了。
同一时刻，可能有多个函数，我们要使用数组来存储回调函数。

```javascript
  #callbacks = [];

  #resolve(value) {
    //state不等于0，说明值已经被修改了
    if (this.#state !== PROMISE_STATE.PENDING) return;
    this.#result = value;
    this.#state = PROMISE_STATE.FULFILLED;

    // 在数据进来的时候才能调取数据的回调函数
    queueMicrotask(() => {
      this.#callbacks.forEach((callback) => {
        callback(this.#result);
      });
    });
  }

  then(onFulfilled, onRejected) {
    if (this.#state === PROMISE_STATE.PENDING) {
      // this.#callback = onFulfilled;
      this.#callbacks.push(() => {
        onFulfilled(this.#result);
      });
    } else if (this.#state === PROMISE_STATE.FULFILLED)
      queueMicrotask(() => {
        onFulfilled(this.#result);
      });
  }
```

### 解决链式调用问题

首先，链式调用的 result 来源于上一个 then 返回的 Promise 的 result。
所以 then 要返回一个 Promise。

```javascript
then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.#state === PROMISE_STATE.PENDING) {
        // this.#callback = onFulfilled;
        this.#callbacks.push(() => {
          onFulfilled(this.#result);
        });
      } else if (this.#state === PROMISE_STATE.FULFILLED) {
        queueMicrotask(() => {
          onFulfilled(this.#result);
        });
      }
    });
  }
```

又,返回的 Promise 也是要存数据的，存的数据又是什么呢？是我本次的调用 then 之后返回的数据。
我本次调用 then 返回的数据在哪呢？在调用 then 时传的回调函数的值。

```javascript
then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.#state === PROMISE_STATE.PENDING) {
        this.#callbacks.push(() => {
          resolve(onFulfilled(this.#result));
        });
      } else if (this.#state === PROMISE_STATE.FULFILLED) {
        queueMicrotask(() => {
          resolve(onFulfilled(this.#result));
        });
      }
    });
  }
```

this.#callbacks 最终 push 的是那个箭头函数。
