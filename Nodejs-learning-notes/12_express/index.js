const express = require("express");
const app = express();

const path = require("path");

app.use(express.static(path.resolve(__dirname, "./public")));

app.use(express.urlencoded()); //解析请求体

let user = [
  {
    username: "admin",
    password: "123456",
    nickName: "小明",
  },
  {
    username: "user",
    password: "123",
    nickName: "小红",
  },
];

app.get("/login", (req, res, next) => {
  console.log("收到登录请求");
  if (req.query.username === "admin" && req.query.password === "123456") {
    res.status(200);
    res.send("登录成功");
  } else {
    res.status(401);
    res.send("用户名或密码错误");
  }
});

app.post("/login", (req, res, next) => {
  console.log("收到登录请求");
  const loginUser = user.find(
    (item) =>
      item.username === req.body.username && item.password === req.body.password
  );
  if (loginUser) {
    res.status(200);
    res.send(`欢迎${loginUser.nickName}回来`);
  } else {
    console.log(loginUser, user);
    res.status(401);
    res.send("用户名或密码错误");
  }
  // if (req.body.username === "admin" && req.body.password === "123456") {
  //   res.status(200);
  //   res.send("登录成功");
  // } else {
  //   res.status(401);
  //   res.send("用户名或密码错误");
  // }
});

app.post("/regist", (req, res, next) => {
  console.log("收到注册请求");
  const { username, password, nickName } = req.body;
  const registUser = user.find(
    (item) => item.name === username || item.nickName === nickName
  );
  if (!registUser) {
    user.push({
      username,
      password,
      nickName,
    });
    res.status(200);
    res.send("注册成功");
  } else {
    res.status(401);
    res.send("用户名或昵称已存在");
  }
});

app.get("/hello", (req, res, next) => {
  console.log("有人向根目录发送get请求");
  res.status(200);
  res.send("<h1>这是我的第一个服务器</h1>");
});

app.use("/hello", (req, res, next) => {
  console.log("有人向根目录发送get请求");
  res.status(200);
  res.send("<h1>这是我的第一个服务器</h1>");
});

// app.use((req, res, next) => {
//   res.status(200);
//   // res.send("<h1>111</h1>");
//   next();
// });

// app.use((req, res, next) => {
//   res.status(200);
//   res.send("<h1>222222222222</h1>");
// });

// app.use((req, res, next) => {
//   res.status(200);
//   res.send("<h1>222</h1>");
// });

app.listen(5002, () => {
  console.log("服务器启动");
});
