```js
module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            // 指定加载器
            loader: "babel-loader",
            // 设置babel
            options: {
              presets: [
                [
                  // 设置预定义环境
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的浏览器
                    targets: {
                      chrome: "58",
                      ie: "11",
                    },
                    // 指定corejs版本
                    corejs: "3",
                    // 使用功能corejs的方式为按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        exclude: /node_modules/,
      },
    ],
  },
```

这样配置之后，打包后的文件仍然不能在 ie 浏览器上运行。
查看打包后的 js 文件 bundle.js，我们可以看到：

```js
(() => {
  "use strict";
  function o(o, l) {
    return o + l;
  }
  console.log(o(111, 222)),
    o(333, 444),
    console.log(1111),
    console.log("hello");
  var l = { name: "aaa", age: 111 };
  console.log(l);
})();
```

源代码的 index.ts 文件中的 const、箭头函数等 es6 语法的代码都被转换为了可兼容 ie 浏览器的代码。为什么还是不能在 ie 上运行？

原因：打包后的代码会被 webpack 自动加上立即执行函数，ie 不支持这个立即执行函数。

我们需要设置 webpack 的配置文件，将立即执行函数设置为 false，这样打包后的代码就不会被自动加上立即执行函数。

```js
 output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    environment: {
      arrowFunction: false,
    },
  },
```
