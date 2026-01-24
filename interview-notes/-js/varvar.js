var a = 1;
var b = 2;
let obj = {
  a: 3,
  b: 4,
  getA: function () {
    var a = 5;
    setTimeout(function () {
      console.log(this.a, "a");
    }, 0);
  },
  getB: function () {
    var b = 6;
    return function () {
      console.log(this.b, "b");
    };
  },
};
obj.getA();
obj.getB()();
