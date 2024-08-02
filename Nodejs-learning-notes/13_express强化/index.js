const express = require("express");
const app = express();
const path = require("path");
const studentRouter = require("./routes/student");
const goodsRouter = require("./routes/goods");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
// const cookieParser = require("cookie-parser");

// 配置静态资源路径
app.use(express.static(path.resolve(__dirname, "public")));
// 配置请求体解析
app.use(express.urlencoded({ extended: true }));
// 配置json数据解析
app.use(express.json());
// 使用session中间件
app.use(
  session({
    store: new FileStore({
      path: path.resolve(__dirname, "sessions"),
      secret: "hello",
      ttl: 1000 * 60 * 60 * 24 * 30, // 闲置时间
    }),
    secret: "hello",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
  })
);
// 配置cookie解析器
// app.use(cookieParser());
// 设置模板引擎类型
app.set("view engine", "ejs");
// 设置模板引擎路径
app.set("views", path.resolve(__dirname, "views"));

// 编写路由
app.get("/", (req, res) => {
  res.render("login");
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "123456") {
    // 默认情况下，cookie的有效期是一次会话，一次会话就是浏览器从开到关的过程
    // cookie的有效期可以设置:expires指定具体时间，maxAge(ms)指定有效期
    // cookie一旦发送给浏览器就不能修改
    // 我们可以发送新的同名cookie（可以重新设置有效期）来替换旧的
    // res.cookie("username", username, { maxAge: 1000 * 60 * 60 * 24 * 30 });
    req.session.username = username; // 手动写
    req.session.save(() => {
      // 持久化机制自动存，存好了再跳转
      res.redirect("/students");
    });
  } else {
    res.send("用户名或密码错误");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.use(studentRouter); // 路径：/xxx
app.use("/goods", goodsRouter); // 路径：/goods/xxx

//在所有路由后面配置404中间件
app.use((req, res) => {
  res.status(404);
  res.send("<h1>404 Not Found</h1>");
});

app.listen(5003, () => {
  console.log("服务器已启动");
});
