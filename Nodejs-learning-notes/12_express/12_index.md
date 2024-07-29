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
