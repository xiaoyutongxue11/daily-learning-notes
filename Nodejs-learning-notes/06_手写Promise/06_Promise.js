const PROMISE_STATE = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};
class MyPromise {
  #state = PROMISE_STATE.PENDING; // pending fulfilled rejected
  #result;
  #callbacks = [];
  constructor(executor) {
    executor(this.#resolve.bind(this), this.#reject.bind(this));
  }
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

  // #resolve = (value) => {
  //   // console.log("resolve", value);
  //   // this.#result = value;
  //   console.log(this);
  // };

  #reject(reason) {
    console.log("reject");
  }
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
}

const mp = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("value1");
  }, 0);
  // resolve("value1");
});

const mp2 = new MyPromise((resolve, reject) => {
  resolve("value1");
});

console.log("mp2", mp2);

mp.then((result) => {
  console.log(result, "111");
});

mp.then((result) => {
  console.log(result, "222");
});

mp2.then((result) => {
  console.log(result, "333");
});

setTimeout(() => {
  console.log("444");
}, 0);

const mp3 = new MyPromise((resolve, reject) => {
  resolve("初值");
});

mp3
  .then((result) => {
    console.log(result);
    return "第一个then";
  })
  .then((result) => {
    console.log(result);
    return "第二个then";
  })
  .then((result) => {
    console.log(result);
  });
