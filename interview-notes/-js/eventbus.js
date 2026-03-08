class EventBus {
  constructor() {
    this.event = {};
  }

  on(eventName, event) {
    if (!this.event[eventName]) {
      this.event[eventName] = [];
    }
    this.event[eventName].push(event);
  }
  emit(eventName, ...args) {
    if (!this.event[eventName]) return;
    for (let e of this.event[eventName]) {
      e(...args);
    }
  }

  off(eventName, event) {
    if (!this.event[eventName]) return;
    this.event[eventName] = this.event[eventName].filter((fn) => fn !== event);
  }
}
const bus = new EventBus();

function output(message) {
  console.log(message, "eventbus");
}

bus.on("message", output);
bus.emit("message", "hello");
bus.off("message", output);
bus.emit("message", "hello");
