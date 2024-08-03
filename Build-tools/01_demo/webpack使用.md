# webpack

当我们习惯了在 node 中编写代码的方式后，回到前端编写 html、css、js 这些代码会感觉各种不便。比如：不能放心使用模块化规范（浏览器兼容性问题），即使可以使用模块化规范，也会面临模块过多（对于浏览器来说，一个模块就是一个文件，这会导致加载速度缓慢）的加载问题。

构建工具的作用就是对代码进行打包，将多个模块打包成一个文件，这样解决了兼容性的问题，又解决了模块过多的问题。

构建工具可以将使用 ESM 规范编写的代码转换成为旧的 js 语法。这样可以使得所有浏览器可以支持。

使用 webpack 的前提是项目使用 node 编写的，因为 webpack 是用 node 编写的。

## webpack 使用步骤

- 初始化项目
- 安装 webpack，webpack-cli
  - npm install -D webpack webpack-cli （-D 表示开发依赖，项目运行不必须的依赖，开发过程所需要的）
- 在 src 目录中编写代码
- 执行 cli 命令：npx webpack(webpack 局部安装后的运行命令)
- 打包完成之后出现了一个 dist 文件夹，index.js 打包完成之后会有一个 main.js 文件

注意：

- 项目是 node 管理的，src 目录下的代码，是要在浏览器运行的，而不是服务器运行的，所以我们需要使用 es 模块化规范，而不是 node 的模块化规范
- 原来写 js 文件的时候，扩展名不可省略，现在使用 webpack 打包的话，扩展名可以省略，因为 webpack 会默认会识别 js 文件
- webpack 默认打包入口文件是 src 目录下的 index.js
- webpack 是按需打包，引入了但是没使用就不会打包（前提：配置 tree-shaking 之后就不会打包 import 但实际未使用的模块了）

## webpack 配置文件

webpack.config.js 是 webpack 的配置文件，用来配置 webpack 的打包规则。
放在根目录的文件。
需要遵循 node 的模块化规范。
src 里面的是前端规范，src 以外的是 node 规范。
webpack.config.js 暴露一个配置对象。
当引入了 jquery 之后，没有直接使用 jquery，webpack 也会对 jquery 进行打包，因为 jquery 等一些库中，执行了一些原生的 js，包含一些依赖关系。

- mode：打包模式。production：生产模式。development：开发模式。
- entry: 指定打包的入口文件
  - 默认："./src/index.js"
  - 传路径数组：["./src/index.js","./src/m1.js"]，最终也是打包到一个文件 main.js
  - 传对象：
  ```js
  {
  main: "./src/index.js",
  hello: "./src/m1.js"
  }
  ```
- output: 指定打包的出口文件。默认为 main.js。

```js
output: {
  path:path.resolve(__dirname, "dist"),//默认为dist文件夹，指定打包路径，必须为绝对路径
  filename: "main.js",//打包后的文件名，如果和main.js相同，则打包后会覆盖原内容，如果不同则会添加一个新的文件，但是不会删除原来的main.js文件。
  clean: true,//清空path路径原来的打包文件
}
```

如果上面的 entry 传的是路径数组，filename 可以传`[name].js`

## 打包后的文件在页面上显示

在 dist 文件夹下面创建一个 index.html 文件，在 index.html 中引入 main.js 即可。

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script defer src="./main.js"></script>
  </head>
  <body></body>
</html>
```

由于页面中可能有的地方使用了 dom，所以我们要将 script 标签写在 body 中，这样数据加载完就不会报错。或者我们可以将 script 标签放在 head 中，这时就要使用异步加载。
实际开发中，我们希望所有对项目的更改都放在 src 中，而不是去 dist 文件夹中手动更改。

## loader

webpack 默认情况下只会处理 js 文件，如果我们希望它可以处理其他类型的文件，则要为其引入 loader。
loader 的作用：将文件从不同的格式转换为 webpack 可以理解的 js 代码。

```js
module: {
  rules: [
    {
      test: /\.css$/i, // 处理以.css结尾的文件
      use: ["style-loader", "css-loader"], //使用何种loader
    },
  ];
}
```

css-loader：将 css 文件转换为 js 文件，但是不能处理 css 中的样式。
style-loader：将 css 文件转换为 js 文件，并且将 css 插入到 dom 中。
使用时，必须把 css-loader 放在 style-loader 的后面。这个 use 数组是栈的执行方式，后进先出。

打包图片资源：

```js
{
  test: /\.(jpg|png|gif)$/i,
  type: "asset/resource",
},
```

## webpack 对代码的优化

webpack 打包的时候会对代码进行分析。
例如：

```js
const a = 10;
console.log(a);
// 打包后
console.log(10);
```

## babel-loader 解决兼容性问题

在写页面时，我们可能使用一些 es 的新特性，比如箭头函数。但是这些特性在旧的浏览器中不一定支持。
babel 可以将新的 js 语法抓换为旧的 js 语法，以提高代码的兼容性。
如果我们希望 webpack 支持 babel，则需要向 webpack 中添加 babel-loader。

在 module.rules 中配置：

```js
      {
        test: /\.m?js$/, // 以js结尾或mjs结尾的文件
        exclude: /(node_nodules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      }
```

这样箭头函数就会转换为普通函数：

```js
document.body.onclick = function () {
  alert("点击了页面");
};
```

## plugin

html-webpack-plugin：将打包后的文件插入到 html 中。
插件不会对代码进行编译，loader 会对代码进行编译。
插件是辅助我们开发用的工具。
