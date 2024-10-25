function Person(name, age) {
  this.name = name;
  this.age = age;
}
/**
 * 1、将构造函数和新对象绑定
 * 2、将this和新对象绑定
 * 3、返回新对象
 */
function newObject(Constructor, ...args) {
  // 创建一个空对象，并将其链接到构造函数的prototype上
  const obj = Object.create(Constructor.prototype);
  // 执行构造函数，将this绑定到新对象上，并传入参数
  const result = Constructor.apply(obj, args);
  // 如果构造函数返回的是对象，则返回对象，否则放回新创建的对象
  return result instanceof Object ? result : obj;
}

const per = newObject(Person, "zhangsan", 18);
console.log(per.name);
console.log(per.age);
