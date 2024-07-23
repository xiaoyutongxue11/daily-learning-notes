# 宏任务和微任务

## 导入

首先我们看看这三段代码的执行顺序：

```javascript
console.log(1111);

setTimeout(() => {
  console.log(3333);
}, 0);

Promise.resolve(10).then(() => {
  console.log(2222);
});
```

输出结果：

```text
1111
2222
3333
```

js 是单线程的，他的运行是基于事件循环机制（`event loop`），所有要执行的代码放在调用栈中。消息队列（任务队列）放置等待执行的代码。当调用栈中的代码执行完毕后任务队列的代码才会进到调用栈中。
定时器的作用是间隔一段时间后将函数放到任务队列。
<span style="color:blue">
_`console.log` 在全局作用域中，一定在调用栈中，所以 `console` 将会比定时器中的代码先执行。_
</span>
那么，为什么 `0` 延时的定时器中的回调函数会比 `Promise` 的回调函数执行晚呢？
当`Promise`的状态从`pending`变为`fulfilled`时，会触发`then`方法，`then`方法中的函数会进入任务队列。
那这样，更加解释不清楚了，`Promise`的回调函数和`setTimeout`的回调函数都是放入任务队列中的，为什么执行顺序是`Promise`的回调函数快一点呢？

## 宏任务和微任务

### 解释

实际上，任务队列有两种，一种叫宏任务队列，一种叫微任务队列。
大部分代码都会去宏任务队列中排队。
<span style="color:blue">
_`Promise` 的回调函数（`then`、`catch`、`finally`）会进入微任务队列排队，而 setTimeout 的回调函数会进入宏任务队列排队。_
</span>

代码执行流程：

- 执行调用栈代码
- 执行微任务队列代码
- 执行宏任务队列代码

### queueMicrotask 方法

`queueMicrotask`方法用来向微任务队列中添加任务。

**例 1**

```javascript
queueMicrotask(() => {
  console.log(111);
});

console.log(222);
```

输出结果：222 111
原因：`console` 在调用栈中，`queueMicrotask` 在微任务队列中。
**例 2**

```javascript
queueMicrotask(() => {
  console.log(111);
});

Promise.resolve(10).then(() => {
  console.log(333);
});
```

输出结果：111 333
原因：两者都在微任务队列中，谁在前，谁先进调用栈。
**例 3**

```javascript
Promise.resolve(10).then(() => {
  console.log(222);
  setTimeout(() => {
    console.log(333);
  });
});

queueMicrotask(() => {
  console.log(111);
});
```

输出结果：222 111 333
原因：先把第一个 `then` 回调函数放到微任务队列，然后将 `queueMicrotask` 放到微任务队列，最后将 `setTimeout` 放到宏任务队列。
**例 4**

```javascript
Promise.resolve(10).then(() => {
  console.log(222);
  Promise.resolve(10).then(() => {
    console.log(333);
  });
});

queueMicrotask(() => {
  console.log(111);
});
```

输出结果：222 111 333
原因：先把第一个 `then` 回调函数放到微任务队列，然后将 `queueMicrotask` 放到微任务队列，最后将第二个 `then` 放到微任务队列。
