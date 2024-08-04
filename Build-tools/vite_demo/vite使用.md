# Vite

相较于 webpack，vite 采用了不同的运行方式。
开发时，并不对代码打包，而是采用 ESM 的方式来运行项目。
在项目部署时，再对项目进行打包。
除了速度外，Vite 使用起来更加方便。

安装：`yarn add -D vite`
源码文件可以直接放在根目录，也可以放在 src 下，文件目录直接在 index.html 中指定即可。

引入时，需要给 script 标签加上 type="module" 属性。

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script type="module" src="./src/index.js"></script>
  </head>
  <body></body>
</html>
```

Vite 开发是用的 ES Module。

打包后，也是以 ES Module 进行打包。

ES Module 的运行必须要以 url 运行，也就是必须运行在服务器上才能看到页面效果。

编写了 ES modules 代码后，必须通过 http 或 https 环境来运行以确保模块化导入能够正确解析或加载。

使用`open with default browser`直接访问打包后的静态页面（index.html）是无效的。这时的路径为：`file:///D:/daily-learning-notes/Build-tools/vite_demo/dist/index.html`

使用 `open with server` 访问也是不行的，因为 live-server 的路径不对，我们在访问是要以 dist 为根目录，而 list-server 会默认最基层的根路径。例如本项目使用 live-server，访问的路径为`http://127.0.0.1:5500/Build-tools/vite_demo/dist/index.html`

所以运行 vite 的命令时，要么整一个服务器，让打包的代码在服务器上运行。要么执行`yarn vite preview`命令，预览 dist 文件中打包后的 index.html 文件。

上面执行的`yarn vite`命令启动的是开发服务器，并没有对代码进行打包。
`vite build` 打包代码。
`vite preview` 预览打包后的代码。
`create vite` 快速创建框架项目。
