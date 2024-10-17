const curry = function (fn) {
  return function curry(...args) {
    if (args.length < fn.length) {
      return function () {
        return curry(...args.concat(Array.from(arguments)));
      };
    }
    return fn(...args);
  };
};
 
const add = function (a, b, c) {
  return a + b + c;
};

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3));
