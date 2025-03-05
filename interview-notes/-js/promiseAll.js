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
  // return new Promise((resolve, reject) => {
  //   if (!Array.isArray(promises)) return new Error("Argument must be an array");
  //   let result = [];
  //   let completed = 0;
  //   promises.forEach((p, index) => {
  //     Promise.resolve(p)
  //       .then((value) => {
  //         result[index] = value;
  //         completed++;
  //         if (completed === promises.length) resolve(result);
  //       })
  //       .catch((value) => {
  //         reject(value);
  //       });
  //   });
  // });
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) throw new Error("参数只能是数组");
    let res = [];
    let completed = 0;
    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((val) => {
          completed++;
          res[index] = val;
          if (completed === promises.length) resolve(res);
        })
        .catch((val) => {
          reject(val);
        });
    });
  });
};

Promise.myAllSettled = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) return new Error("Argument must be an array");
    let result = [];
    let completed = 0;
    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((value) => {
          result[index] = { status: "fullfilled", value };
        })
        .catch((value) => {
          result[index] = { status: "rejected", value };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) resolve(result);
        });
    });
  });
};

Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) return new Error("Argument must be an array");
    let completed = 0;
    promises.forEach((p) => {
      Promise.resolve(p)
        .then((value) => {
          resolve(value);
        })
        .catch(() => {
          completed++;
          if (completed === promises.length)
            reject(new Error("All promises were rejected"));
        });
    });
  });
};

Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) return new Error("Argument must be an array");
    promises.forEach((p) => {
      Promise.resolve(p)
        .then((value) => {
          resolve(value);
        })
        .catch((value) => {
          reject(value);
        });
    });
  });
};

// 测试 customPromiseAll
// const promise1 = Promise.reject(1);
const promise2 = new Promise((resolve) => setTimeout(resolve, 1000, 2));
const promise3 = new Promise((resolve) => setTimeout(resolve, 1000, 3));
// const promise4 = Promise.reject(4);

Promise.myRace([promise2, promise3])
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.log(error);
  });
