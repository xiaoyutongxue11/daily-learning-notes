# Express

## 安装

Express 是 node 中的服务器软件。
通过 express 可以快速搭建一个 web 服务器。
使用步骤：

1. 安装 express
2. 创建 index.js 编写代码

## 路由

服务器的实例是一个对象

```js
const express = express("express");
const app = express();
app.listen(3000);
```

`app.listen(3000);`监听端口号。
当客户端访问 3000 端口时，express 服务器会返回一个响应。

路由的回调函数会接受三个参数：

```js
app.get("/", (req, res, next) => {
  console.log("有人向根目录发送get请求");
});
```

### req：请求信息

一些 url 等参数。

### res：响应信息

res.send("hello express"); //发送请求信息
res.sendStatus(404); //向客户端发送请求的响应状态码
res.status //用来设置响应状态码

使用了 res.sendStatus 就不要和 res.send 一起使用了。
sendStatus 之后数据已经发出去了，整个响应流程已经结束了，如果还是用 send 的话就会报错。
我们一般这样搭配使用：

```js
app.get("/hello", (req, res) => {
  console.log("有人向根目录发送get请求");
  res.status(200);
  res.send("<h1>这是我的第一个服务器</h1>");
});
```

## 中间件

中间件是 express 的核心，它允许我们编写一些代码，在请求和响应之间进行拦截。
只要访问路径中包含了 use 函数的第一个参数，就能访问到。
中间件会匹配所有请求，路径设置为父路径。
地址可以不写，默认为 "/"，这样的话发的所有请求都能访问到。

```js
app.use("/hello", (req, res, next) => {
  console.log("有人向根目录发送get请求");
  res.status(200);
  res.send("<h1>这是我的第一个服务器</h1>");
});
```

访问路径以`\`为分割符号，只要路径中包含了`\hello`，就能访问到。
例如`\hello\123`，`\hello\123\456`都能访问到。
但是`\hello123`不能访问到。

### 中间件的第三个参数 next：

中间件可以用来添加一些逻辑。
next()：表示继续执行下一个中间件。
首先先看没有使用 next 的情况：

```js
app.use((req, res, next) => {
  res.status(200);
  res.send("<h1>111</h1>");
});

app.use((req, res, next) => {
  res.status(200);
  res.send("<h1>222</h1>");
});

app.use((req, res, next) => {
  res.status(200);
  res.send("<h1>222</h1>");
});
```

结果：只执行了第一个中间件。
原因：在 send 之后起始整个响应过程就已经结束了，后面的中间件不会再执行了。

使用 next:

```js
app.use((req, res, next) => {
  res.status(200);
  // res.send("<h1>111</h1>");
  next();
});

app.use((req, res, next) => {
  res.status(200);
  res.send("<h1>222</h1>");
});

app.use((req, res, next) => {
  res.status(200);
  res.send("<h1>222</h1>");
});
```

结果：执行了第二个中间件
原因：第一个中间件没有调用 send，而是调用了 next，表示执行下一个中间件。这是第二个中间件 send 了，第三个就不会执行了。

next 在什么场景下使用呢？
我们可以用创建一个权限判断中间件，如果有权限，就 next，没有权限就返回错误信息。

## nodemon

### 全局安装

安装命令后方加`-g`
安装 nodemon 之后无需手动刷新。
输入 nodemon 指令默认启动当前项目路径下的 index.js
nodemon + 文件路径

### 安装到当前项目

安装命令后不用加`-g`
执行时用`npx nodemon + 文件路径`
为什么加`npx`呢？因为命令行默认使用全局命令，而这个安装在局部，就要加 npx

## 如何访问网页

服务器中的代码，对于外部来说都是不可见的。
我们在 public 中写的 html 页面，浏览器无法直接访问。
如果希望浏览器能够访问，则需要将页面所在目录设置为可以静态的。

如何设置静态的？
例如：使用 app.use(express.static("public"))，设置 static 中间件后，浏览器访问会自动去 public 目录下找。

```js
const path = require("path");
app.use(express.static(path.resolve(__dirname, "./public")));
```

此时，我们想要在网页上显示的东西需要放到 public 目录下才能正常显示。
我们使用浏览器访问页面的时候，也不再需要加上/public 了，因为现在的根目录就是 public 目录了。我们直接写页面名就可以，比如"/index.html"，但是一般情况下，我们什么都不输入，浏览器会自动寻找 index.html。

## query 和 占位参数 的区别

query 参数客户端和服务端双方都要要传属性名和属性值。(/hello => /hello?id=123)
占位参数直接直接在路径上传属性值即可。（/hello/:id => /hello/123）

## 登录 demo

我们用 post 请求实现一个登录功能：

网页代码：

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>静态网页</title>
  </head>
  <body>
    <form action="/login" method="post">
      <input type="text" name="username" placeholder="用户名" />
      <br />
      <input type="password" name="password" placeholder="密码" />
      <br />
      <input type="submit" value="提交" />
    </form>
    <hr />
    <h1>静态网页</h1>
    <img src="./img.jpg" width="200px" />
  </body>
</html>
```

服务器代码：

```js
const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(path.resolve(__dirname, "./public")));

app.post("/login", (req, res, next) => {
  console.log("收到登录请求");
  if (req.body.username === "admin" && req.body.password === "123456") {
    res.status(200);
    res.send("登录成功");
  } else {
    res.status(401);
    res.send("用户名或密码错误");
  }
});
```

运行后发现，req.body 为 undefined，因为没有解析请求体。
使用中间件，express.urlencoded()可以解析请求体。
在 post 请求前面加中间件：`app.use(express.urlencoded()); //解析请求体`即可。

解决这个问题之后，我们又有一个问题，登录的数据不灵活，是我们现在写死了的。

