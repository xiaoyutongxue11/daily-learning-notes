// 模拟异步任务（用setTimeout代替网络请求）
const fetchData = (taskName, delayMs, shouldFail = false) => {
  return () =>
    new Promise((resolve, reject) => {
      console.log(taskName);
      setTimeout(() => {
        if (shouldFail) {
          reject(`任务 ${taskName} 失败`); // 模拟失败
        } else {
          resolve(`任务 ${taskName} 结果`); // 模拟成功
        }
      }, delayMs);
    });
};

const concurrentLimit = async (tasks, limit) => {
  //   const results = [];
  //   const taskQueue = [...tasks]; // 复制任务队列

  //   const worker = async () => {
  //     while (taskQueue.length > 0) {
  //       const task = taskQueue.shift(); // 取出队列头部任务
  //       console.log(taskQueue);

  //       try {
  //         const result = await task(); // 执行任务（等待完成）
  //         results.push(result); // 成功结果入队
  //       } catch (error) {
  //         results.push(error); // 失败错误入队
  //       }
  //     }
  //   };

  //   // 启动最多limit个工作线程
  //   const workerCount = Math.min(limit, tasks.length);
  //   const workers = Array.from({ length: workerCount }, worker);

  //   // 等待所有工作线程完成
  //   await Promise.all(workers);
  //   return results;

  let result = [];
  let taskQueue = [...tasks];
  const worker = async () => {
    while (taskQueue.length != 0) {
      let task = taskQueue.shift();
      try {
        let res = await task();
        result.push(res);
      } catch (err) {
        result.push(err);
      }
    }
  };
  let workers = Array.from({ length: Math.min(limit, tasks.length) }, worker);
  await Promise.all(workers);
  return result;
};

const testTasks = [
  fetchData("API_1", 1000), // 任务1：延迟1秒，成功
  fetchData("API_2", 500), // 任务2：延迟1.5秒，成功
  fetchData("API_3", 2000, true), // 任务3：延迟2秒，失败
  fetchData("API_4", 500), // 任务4：延迟0.5秒，成功
];

// 运行并发限制（最多2个任务同时执行）
concurrentLimit(testTasks, 2)
  .then((results) => {
    console.log("\n最终结果：");
    results.forEach((res, index) => {
      console.log(`结果${index + 1}:`, res);
    });
  })
  .catch((error) => {
    console.error("全局错误捕获（理论上不会触发）:", error);
  });
