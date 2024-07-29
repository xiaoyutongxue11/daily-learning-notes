const express = require("express");
const app = express();
app.listen(5000);

// app.get("/hello", (req, res, next) => {
//   console.log("有人向根目录发送get请求");
//   res.status(200);
//   res.send("<h1>这是我的第一个服务器</h1>");
// });

// app.use("/hello", (req, res, next) => {
//   console.log("有人向根目录发送get请求");
//   res.status(200);
//   res.send("<h1>这是我的第一个服务器</h1>");
// });

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
