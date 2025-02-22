function customPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }

    const results = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed += 1;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises))
      reject(new TypeError("Argument must be an array"));
    let results = [];
    let completed = 0;
    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((value) => {
          results[index] = value;
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch((value) => {
          reject(value);
        });
    });
  });
};

// 测试 customPromiseAll
const promise1 = Promise.resolve(1);
const promise2 = new Promise((resolve) => setTimeout(resolve, 1000, 2));
const promise3 = new Promise((resolve) => setTimeout(resolve, 1000, 3));

Promise.myAll([promise1, promise2, promise3])
  .then((results) => {
    console.log(results); // [1, 2, 3]
  })
  .catch((error) => {
    console.error(error);
  });
