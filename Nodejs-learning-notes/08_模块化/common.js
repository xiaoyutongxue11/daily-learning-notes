let a = 10;
let b = 20;
console.log("模块");

// exports.a = "111";
// exports.b = "222";
// exports.c = "333";

// exports.fn = function () {
//   console.log("fn");
// };

// exports.obj = {
//   name: "obj",
// };

module.exports = {
  num1: 1,
  num2: 2,
  func: function () {
    console.log("func");
  },
  myObj: {
    name: "myObj",
  },
};

console.log(arguments);
