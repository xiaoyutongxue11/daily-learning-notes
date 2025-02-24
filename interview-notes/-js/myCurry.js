// const curry = function (func) {
//   let args = Array.prototype.slice.call(arguments, 1);
//   return function () {
//     let curArgs = Array.from(arguments);
//     let totalArgs = args.concat(curArgs);
//     if (totalArgs.length >= func.length) {
//       return func.apply(null, totalArgs);
//     } else {
//       totalArgs.unshift(func);
//       return curry.apply(null, totalArgs);
//     }
//   };
// };

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else return function (...newArgs) {
      return curried(...args, ...newArgs);
    };
  };
}

function add(a, b, c, d) {
  return (a + b) * c + d;
}

const curryAdd = curry(add);
console.log(curryAdd(1, 2)(3, 4));
