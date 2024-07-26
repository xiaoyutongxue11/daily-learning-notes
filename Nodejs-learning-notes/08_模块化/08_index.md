# 模块化

## 模块化是什么

模块化就是将一个大的代码文件，拆分成多个小的代码文件，每个小的代码文件就是一个模块。
原始的实现模块化的方式：通过 script 标签引入 js 文件，通过全局变量的方式暴露模块。
缺点：

- 无法选择要引入的部分内容。
- 在复杂的模块场景下容易出错。

## CommonJS

在 node 中，默认支持的模块化规范就是 CommonJS。
在 CommonJS 中，一个 js 文件就是一个模块。
使用.cjs 为扩展名的文件也认为是 CommonJs 模块。
也可以引入文件夹模块（通常将其他模块在 index.js 文件中导入，我们直接引入 index.js 文件即可）。

### 模块

通过相对路径引入，扩展名可以省略不写。
如果省略了扩展名，node 会自动为我们的文件补全扩展名。自动寻找.js 文件，如果没有，就找.json 文件，优先找.js 文件。

```js
require("./common.js");
```

引入核心模块，直接写核心模块的名字即可。也可以在核心模块前加 node:做标识，可以让查找速度更快。

在定义模块是，模块中的内容默认不能被外部看到。
可以通过 exports 或者 module.exports 暴露模块内容。

#### 使用 exports 导出

```js
let a = 10;
let b = 20;
console.log("模块");

exports.a = "111";
exports.b = "222";
exports.c = "333";

exports.obj = {
  name: "obj",
};

exports.fn = function () {
  console.log("fn");
};
```

导入：

```js
const m1 = require("./common");
console.log(m1);
m1.fn();
```

#### 使用 module.exports 导出

使用 module.exports 可以同时暴露多个内容。

```js
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
```

module.exports 和 exports 是相等的。那既然这样，为什么不用 exports={}来导出多个变量呢？
module.exports 可以重新赋值，exports 不能。
_module.exports={} 是改对象，如果他里面的属性变了，导入这个 module 的文件也会跟着改变。_
exports={} 是改变量，他改变了，导出的东西不会跟着改变。

### 模块的包装

所有 CommonJS 模块的代码，都会被包装在函数调用中。
如何证明呢？
打印 arguments（函数的实参）即可。

```js
console.log(arguments);
```

exports、require、module、filename（当前模块路径）、dirname（当前模块的目录的路径） 都是 CommonJS 模块的变量，这些变量都是自动的。

## es 模块

默认情况下，.js、.cjs 文件都视为 CommonJS 规范的模块。
要想使用 es 模块，可以采用下面两种方案：

- 使用.mjs 作为扩展名（es 模块扩展名不能省略）；
- 在 package.json 中添加 type 字段，值为 module。设置之后当前项目下所有 js 文件都默认为 es 模块。

### 导出

```js
export const a = 10;
export const b = "111";
export const obj = {
  name: "obj",
};

export default function sum(a, b) {
  return a + b;
}
//export default 默认导出一个值，不能是表达式
```

### 导入

```js
import { a, b, obj as o } from "./es.mjs"; // 命名导入需要加{}
console.log(a, b, o);

import sum from "./es.mjs"; // 默认导出的内容不用加{}且可以随便起名
console.log(sum);
```

可以通过 as 来指定名字。

```js
import * as m4 from "./es.mjs";
console.log(m4);
console.log(m4.a);
```

将模块中的所有东西导出到一个变量中。
开发时要尽量避免`import * as m4 from "./es.mjs";`
前端使用 webpack 打包时，会认为这些都是项目中必须使用的，于是全部打包进去，这样会导致打包后的文件体积过大。

通过 es 模块化导入的内容都是常量（常量锁的的是变量，不影响对象的修改）。
es 模块化导入的内容都是浅拷贝。
es 模块都是运行在严格模式下的。
es 模块化在浏览器中同样支持，但是一般不直接使用，通常结合 webpack 使用。

