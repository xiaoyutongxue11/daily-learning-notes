// Function.prototype.myBind = function (ctx) {
//   if (typeof this !== "function") {
//     throw new TypeError("Type Error");
//   }
//   let fn = this;
//   let args = Array.prototype.slice.call(arguments, 1);
//   return function F() {
//     let restArgs = Array.prototype.slice.call(arguments);
//     let allArgs = args.concat(restArgs);
//     if (Object.getPrototypeOf(this) === F.prototype) {
//       return new fn(...allArgs);
//     } else {
//       return fn.apply(ctx, allArgs);
//     }
//   };
// };
Function.prototype.myBind = function (ctx) {
  if (typeof this !== "function") throw new Error("Type Error");
  let fn=this;
  let args = Array.prototype.slice.call(arguments, 1);
  return function f() {
    let restArgs = Array.prototype.slice.call(arguments);
    let allArgs = args.concat(restArgs);
    if (Object.getPrototypeOf(this) === f.prototype) {
      return new fn(...allArgs);
    } else {
      return fn.apply(ctx, allArgs);
    }
  };
};

// Function.prototype.myCall = function (ctx, ...args) {
//   if (typeof this !== "function") throw new Error("Type Error");
//   ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx);
//   let key = Symbol("key");
//   Object.defineProperty(ctx, key, {
//     enumerable: false,
//     value: this,
//   });
//   let result = ctx[key](...args);
//   delete ctx[key];
//   return result;
// };

Function.prototype.myCall = function (ctx, ...args) {
  if (typeof this !== "function") throw new Error("Type Error");
  ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx);
  let key = Symbol("key");
  Object.defineProperty(ctx, key, {
    enumerable: false,
    value: this,
  });
  let res = ctx[key](...args);
  delete ctx[key];
  return res;
};

// Function.prototype.myApply = function (ctx, args) {
//   if (typeof this !== "function") throw new Error("Type Error");
//   ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx);
//   let key = Symbol("key");
//   Object.defineProperty(ctx, key, {
//     enumerable: false,
//     value: this,
//   });
//   args = args ?? [];
//   let result = ctx[key](...args);
//   delete ctx[key];
//   return result;
// };

Function.prototype.myApply = function (ctx, args) {
  if (typeof this !== "function") throw new Error("Type Error");
  ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx);
  let key = Symbol("key");
  Object.defineProperty(ctx, key, {
    enumerable: false,
    value: this,
  });
  args = args ?? [];
  let res = ctx[key](...args);
  delete ctx[key];
  return res;
};

function sum(a, b, c, d) {
  console.log(this, a, b, c, d);
}

function log() {
  console.log(this);
}

/**myBind */
// let fn = sum.myBind("ctx", 1, 2);
// new fn(3, 4);
// fn(3, 4);

/**myCall */
// sum.myCall("ctx", 1, 2, 3, 4);
// log.myCall("ctx");

/**myApply */
sum.myApply("ctx", [1, 2, 3, 4]);
// log.myApply("ctx");
