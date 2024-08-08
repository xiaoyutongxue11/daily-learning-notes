let a: number;
a = 10;

let b = false;

function sum(a: number, b: number): number {
  return a + b;
}

sum(111, 222);

let c: "male" | "female";

let d: unknown;
d = 11;
if (d === "male") c = d; // 不报错
// c = d; 报错

let e: any;
e = 11;
// c = e; 不报错

function f(): void {
  console.log(1);
  //   return; 不报错
  //   return undefined; 不报错
  //   return null; 报错
}

// never即函数体中的代码块必须确保函数一定会抛出异常或者进入死循环
function g(): never {
  throw new Error("This function should not return a value.");
  //   console.log(111); 报错
}

let h: object;
h = {};
h = function () {};

let i: { name: string; age?: number };
i = { name: "111" };

let j: { name: string; [propName: string]: any };
j = { name: "111", age: 111, gender: "男" };

let k: (a: number, b: number) => number;
k = function (a, b) {
  return a + b;
};

let l: string[];
l = ["111", "222"];

let m: Array<string>;
m = ["111", "222"];

// 元组就是固定长度的数组
let n: (string | number)[];
n = ["111", 222];

let o: [string, string];
o = ["111", "222"];

// 枚举类型不赋值默认值就是 0,1,2......
enum Gender {
  male,
  female,
}
let p: { name: string; gender: number };
p = { name: "111", gender: 1 };
if (p.gender === Gender.male) console.log("是男的");

let q: { name: string } & { age: number };
q = { name: "111", age: 111 };

// 类型的别名
type myType = "111" | "222" | "333";
let r: myType;
let s: myType;
r = "333";
