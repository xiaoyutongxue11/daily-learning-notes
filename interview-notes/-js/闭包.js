// 闭包：内层函数+外层函数的局部变量
// 闭包不一定要return，闭包不一定会内存泄漏

// function outer() {
//   const a = 1;
//   function inner() {
//     console.log(a);
//   }
//   inner();
// }
// outer();

// 外部需要使用闭包内的变量，就要使用return
// 为什么不直接return？直接return q,q这个值会在函数调用完之后被立即销毁
// 但是返回一个函数被外部接收这个变量会一直存在
// 我们使用闭包，主要是为了满足在函数外部，想要使用函数内部的变量的场景

function outer() {
  const a = 10;
  return function () {
    console.log(a);
  };
}

const fn = outer();
fn();

// 为什么不直接使用全局变量呢？
// 使用全局变量容易被修改。
// 例如：下面这种情况只要i被修改了，那个func函数就不准确了
let i = 0;
function func1() {
  i++;
  console.log(`函数被调用了${i}次`);
}

function count() {
  let i = 0;
  function func() {
    i++;
    console.log(`函数被调用了${i}次`);
  }
  return func;
}

const func2 = count();
func2();
func2();
// 多次调用func2不会初始化i，因为count函数只调用了一次，
// 一次调用count函数，他返回了一个func函数，
// 我们将这个func函数赋值给了func2，
// 之后一直在调用func2，也就是一直在调用func函数

// 闭包引起内存泄漏
// 通过分析上面的代码，我们看到，
// func2是一个全局的变量，代码执行完成后不会立即销毁
// 通过func2我们可以调用func函数，
// func函数中引用了i，
// i被引用就不会被回收，就会一直存在
// 可以通过free或delete或手动赋值为null来回收
