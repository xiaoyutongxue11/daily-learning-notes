function Person(name, age) {
  this.name = name;
  this.age = age;
}
/**
 * 1、将构造函数和新对象绑定
 * 2、将this和新对象绑定
 * 3、返回新对象
 */
// function newObject(Constructor, ...args) {
//   // 创建一个空对象，并将其链接到构造函数的prototype上
//   const obj = Object.create(Constructor.prototype);
//   // 执行构造函数，将this绑定到新对象上，并传入参数
//   const result = Constructor.apply(obj, args);
//   // 如果构造函数返回的是对象，则返回对象，否则放回新创建的对象
//   return result instanceof Object ? result : obj;
// }

// 创建一个对象，将对象的原型指向构造函数的prototype
// 执行构造函数，绑定this为新创建的对象
// 如果构造函数返回的是一个对象，则返回该对象，如果不是，则返回创建的对象

function myNew(Constructor, ...args) {
  let obj = Object.create(Constructor.prototype);
  let res = Constructor.apply(obj, args);
  return typeof res === "object" ? res : obj;
}

const per = newObject(Person, "zhangsan", 18);
console.log(per.name);
console.log(per.age);
console.log(per instanceof Person);
