function func(xx) {
  console.log(this); // global
  this.x = xx;
  return this;
}

var x = func(5); // var 定义的变量是全局变量
var y = func(6);

console.log(x.x); // 6
console.log(y.x); // 6

console.log(x, y); // global global
