Function.prototype.myCall = function (thisArg, ...args) {
  thisArg = thisArg ?? window;
  const fn = Symbol("fn");
  thisArg[fn] = this;
  const result = thisArg[fn](...args);
  delete thisArg[fn];
  return result;
};

function sayHi(age, sex) {
  console.log(this.name, age, sex);
  return age;
}

const obj = {
  name: "yy",
};

Function.prototype.myApply = function (thisArg, args) {
  thisArg = thisArg ?? window;
  if (!Array.isArray(args)) {
    throw new Error("参数必须是数组类型");
  }
  const fn = Symbol("fn");
  thisArg[fn] = this;
  const result = thisArg[fn](args);
  delete thisArg[fn];
  return result;
};

Function.prototype.myBind = function (thisArg, ...args) {
  const originFn = this;
  function boundFn(...callArgs) {
    const isNew = this instanceof boundFn;
    const finalThis = isNew ? this : thisArg;
    return originFn.call(finalThis, ...args, ...callArgs);
  }
  boundFn.prototype = Object.create(originFn.prototype);
  return boundFn;
};

const boundSayHi = sayHi.myBind(obj, 18);
const result = boundSayHi("女");
console.log(result);

function myNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const result = constructor.call(obj, ...args);
  return result !== null &&
    (typeof result === "object" || typeof result === "function")
    ? result
    : obj;
}

function person(name) {
  this.name = name;
  return function () {
    console.log(name);
  };
}

const p = myNew(person, "xiao");
p();

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
const res = curriedAdd(1)(2)(3);
console.log(res);

function decodeURL(url) {
  const urlObj = new URL(url);
  const res = {};
  const query = urlObj.searchParams.entries();
  for (let [key, value] of query) {
    res[key] = decodeURIComponent(value);
  }
  return res;
}

const url =
  "http://www.baidu.com?t=1111&top_padding=65&bottom_padding=33&name=张三";

const urlObj = decodeURL(url);
console.log(urlObj);

function debounce(fn, delay = 1000) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function throttle(fn, delay = 1000) {
  let lastTime = 0;
  return function (...args) {
    let now = new Date.now();
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}
