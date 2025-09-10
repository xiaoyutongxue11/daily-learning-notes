// // 宏任务 1: 主程序代码（整体Script）
// console.log("宏任务-1: Start");

// // 微任务 1: Promise
// Promise.resolve().then(() => {
//   console.log("微任务-1: Promise.then");
//   // 微任务中产生宏任务 3: setTimeout
//   setTimeout(() => {
//     console.log("宏任务-3: setTimeout in Microtask");
//     // 宏任务中产生微任务 5: queueMicrotask
//     queueMicrotask(() => {
//       console.log("微任务-5: queueMicrotask in MacroTask");
//     });
//   }, 0);
// });

// // 宏任务 2: setTimeout
// setTimeout(() => {
//   console.log("宏任务-2: setTimeout");
//   // 宏任务中产生微任务 4: Promise.then
//   Promise.resolve().then(() => {
//     console.log("微任务-4: Promise.then in MacroTask");
//     // 微任务中产生宏任务 4: setInterval
//     setTimeout(() => {
//       console.log("宏任务-4: setInterval in Microtask");
//     }, 100);
//   });
// }, 0);

// // 微任务 2: queueMicrotask
// queueMicrotask(() => {
//   console.log("微任务-2: queueMicrotask");
// });

// // 微任务 3: MutationObserver (模拟)
// // 通常用于观察DOM变化，此处用queueMicrotask模拟其异步行为
// queueMicrotask(() => {
//   console.log("微任务-3: MutationObserver Simulated");
// });

// console.log("宏任务-1: End");


// // 整个 script 代码块（宏任务）
// console.log('1. [宏任务] 整个 script 开始');

// // 设置定时器（宏任务）
// setTimeout(() => {
//   console.log('7. [宏任务] setTimeout 回调');
  
//   // 在 setTimeout 中添加微任务
//   Promise.resolve().then(() => {
//     console.log('8. [微任务] setTimeout 中的 Promise');
//   });
  
// }, 0);

// // 创建 Promise（同步执行）
// new Promise((resolve, reject) => {
//   console.log('2. [同步] Promise 构造函数');
//   resolve('成功');
// }).then((result) => {
//   console.log('5. [微任务] Promise 第一个 then: ', result);
//   return result;
// }).catch((error) => {
//   console.log('[微任务] Promise catch: ', error);
// }).finally(() => {
//   console.log('9. [微任务] Promise finally');
// });

// // 添加微任务
// queueMicrotask(() => {
//   console.log('6. [微任务] queueMicrotask');
// });

// // Async/Await（基于 Promise 的语法糖）
// async function asyncFunction() {
//   console.log('3. [同步] asyncFunction 开始');
//   const result = await Promise.resolve('await 值');
//   console.log('10. [微任务] asyncFunction 中的 await: ', result);
// }

// asyncFunction();

// // 模拟 MutationObserver（浏览器环境）
// // 注意：实际环境中需要使用真实的 MutationObserver API
// function simulateMutationObserver() {
//   console.log('4. [同步] MutationObserver 模拟');
//   // 在实际浏览器中，MutationObserver 回调会作为微任务执行
//   Promise.resolve().then(() => {
//     console.log('11. [微任务] MutationObserver 回调（模拟）');
//   });
// }
// simulateMutationObserver();

// console.log('12. [宏任务] 整个 script 结束');

// // 注意：setImmediate 是 Node.js 特有，UI 渲染是浏览器特有
// // 它们在不同环境中行为可能不同


// // 1 2 3 4 12 5 6 10 11 9 7 8


const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!'); // 2. 状态变为 fulfilled， then 的回调进入微任务队列
    // 或者 reject('Error!');  状态变为 rejected， catch 的回调进入微任务队列
  }, 1000);
});

promise.then(result => { 
  console.log(result); // 3. 执行微任务
}).catch(error => {
  console.error(error);
});

console.log('Script end'); // 1. 同步代码立即执行