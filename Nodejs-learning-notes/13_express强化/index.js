const express = require("express");
const app = express();
const path = require("path");
const studentRouter = require("./routes/student");
const goodsRouter = require("./routes/goods");
const cookieParser = require("cookie-parser");

// 配置静态资源路径
app.use(express.static(path.resolve(__dirname, "public")));
// 配置请求体解析
app.use(express.urlencoded({ extended: true }));
// 配置json数据解析
app.use(express.json());
// 配置cookie解析器
app.use(cookieParser());
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
    res.cookie("username", username);
    res.redirect("/students");
  } else res.redirect("/");
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
