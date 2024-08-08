import { say } from "./m1";

function sum(a: number, b: number): number {
  return a + b;
}
console.log(sum(111, 222));
sum(333, 444);

console.log(1111);

console.log(say);

// const obj1: { name: string; age: number };
// obj1.age = 111; //在赋值前使用了变量“obj1”

const obj = { name: "aaa", age: 22 };
obj.age = 111;
console.log(obj);
