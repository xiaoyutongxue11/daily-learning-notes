// const serial = ["green", "yellow", "red"];
// function delay(duration = 1000) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, duration);
//   });
// }

// class Signal {
//   constructor(options) {
//     this.sig = options.init;
//     this.times = options.times;

//     this.eventMap = new Map();
//     this.eventMap.set("change", new Set());
//     this.eventMap.set("tick", new Set());

//     this.setTime();
//     this.exchange();
//   }

//   get next() {
//     return serial[(serial.indexOf(this.sig) + 1) % serial.length];
//   }
//   get remain() {
//     let diff = this.end - Date.now();
//     if (diff < 0) {
//       diff = 0;
//     }
//     return diff / 1000;
//   }

//   on(event, handler) {
//     this.eventMap.get(event).add(handler);
//   }
//   off(event, handler) {
//     this.eventMap.get(event).delete(handler);
//   }
//   emit(event) {
//     this.eventMap.get(event).forEach((h) => {
//       h.call(this, this);
//     });
//   }
//   async exchange() {
//     await 1;
//     if (this.remain > 0) {
//       this.emit("tick");
//       await delay(1000);
//     } else {
//       this.sig = this.next;
//       this.setTime();
//       this.emit("change");
//     }
//     this.exchange();
//   }

//   setTime() {
//     this.start = Date.now();
//     const time = this.times[serial.indexOf(this.sig)];
//     this.end = this.start + time;
//   }
// }

// // 创建信号灯对象，并设置信号灯切换时间（单位：毫秒）
// const signal = new Signal({
//   init: "green", // 初始状态为绿灯
//   times: [5000, 3000, 10000], // 绿灯、黄灯、红灯的持续时间分别是5秒、3秒、10秒
// });

// // 监听信号灯变化事件
// signal.on("change", () => {
//   console.log(`${signal.sig}`);
// });

// // 监听信号灯每秒的滴答事件
// signal.on("tick", () => {
//   console.log(`${signal.sig}, ${signal.remain}s`);
// });

const serial = ["green", "yellow", "red"];
const times = [5000, 3000, 10000];

function delay(duration = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

class Signal {
  constructor(options) {
    this.sig = options.init;
    this.times = options.times;

    this.eventMap = new Map();
    this.eventMap.set("change", new Set());
    this.eventMap.set("tick", new Set());

    this.setTime();
    this.exchange();
  }

  on(event, handler) {
    this.eventMap.get(event).add(handler);
  }
  off(event, handler) {
    this.eventMap.get(event).delete(handler);
  }
  emit(event) {
    this.eventMap.get(event).forEach((h) => {
      h.call(this, this);
    });
  }

  get next() {
    return serial[(serial.indexOf(this.sig) + 1) % serial.length];
  }
  setTime() {
    this.start = Date.now();
    this.end = this.start + this.times[serial.indexOf(this.sig)];
  }

  async exchange() {
    await 1;
    if (this.remain > 0) {
      this.emit("tick");
      await delay(1000);
    } else {
      this.sig = this.next;
      this.setTime();
      this.emit("change");
    }
    this.exchange();
  }

  get remain() {
    let diff = this.end - Date.now();
    if (diff < 0) {
      diff = 0;
    } else {
      return diff/1000;
    }
  }
}

const signal = new Signal({
  init: "green",
  times,
});

signal.on("change", () => {
  console.log(signal.sig);
});

signal.on("tick", () => {
  console.log(`${signal.sig},${signal.remain}`);
});
