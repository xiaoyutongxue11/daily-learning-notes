# TypeScript

## TypeScript 是什么

- 以 JavaScript 为基础构建的语言
- 一个 JavaScript 的超集
- 可以在任何支持 JavaScript 的平台执行
- ts 不能被 js 解析器直接执行
- ts 扩展了 js，并添加了类型

运行时，ts 先编译成为 js，再运行。

## typescript 增加了什么

- 类型
- 支持 es 的新特性
- 添加抽象类、新特性、装饰器等新特性
- 丰富的配置选项（可以被编译成任意版本的 js，解决兼容性）

## 类型

**基础类型**

```js
// 先声明再赋值
let a: number;
a = 10;

// 声明时赋值，会自动推断
let b = false;

// 对函数参数个数、参数类型、返回值的约束
function sum(a: number, b: number): number {
  return a + b;
}
sum(111, 222);

// 使用 | 联合类型
let c: "male" | "female";
```

**any 和 unknown 和 never**

```js
let d: unknown;
d = 11;
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
```

any 类型可以赋值给任意类型的变量。

unknown 类型（类型安全的 any）是未知类型，不能任意赋值给别的类型。

never 类型：在 TypeScript 中，当你声明一个函数返回 never 类型时，意味着这个函数不会正常结束。TypeScript 的类型系统要求所有表达式都有确定的值，因此不允许返回 never 类型的函数有可访问的终结点（never 类型的函数即函数体中的代码块必须确保函数一定会抛出异常或者进入死循环）。

void 包括 undefined 不包括 null。

**object 和{}**

```js
// object范围非常广
let h: object;
h = {};
h = function () {};

// {}可以指定对象中的确定属性和可选属性
let i: { name: string, age?: number };
i = { name: "111" };

// [propName: string]: any 索引签名
let j: { name: string, [propName: string]: any };
j = { name: "111", age: 111, gender: "男" };
```

**箭头函数**

```js
let k: (a: number, b: number) => number;
k = function (a, b) {
  return a + b;
};
```

**数组和元组**

```js
let l: string[];
l = ["111", "222"];

let m: Array<string>;
m = ["111", "222"];

// 元组就是固定长度的数组
let n: (string | number)[];
n = ["111", 222];

let o: [string, string];
o = ["111", "222"];
```

**枚举**

```js
// 枚举类型不赋值默认值就是 0,1,2......
enum Gender {
  male,
  female,
}
let p: { name: string; gender: number };
p = { name: "111", gender: 1 };
if (p.gender === Gender.male) console.log("是男的");
```

**&符号别致用法**

```js
let q: { name: string } & { age: number };
q = { name: "111", age: 111 };
```

**类型别名 type**

```js
// 类型的别名
type myType = "111" | "222" | "333";
let r: myType;
let s: myType;
r = "333";
```
