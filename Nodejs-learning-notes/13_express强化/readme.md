# Express 强化

## 服务器编写

```js
const express = require("express");
const app = express();
const path = require("path");

// 配置静态资源路径
app.use(express.static(path.resolve(__dirname, "public")));
// 配置请求体解析
app.use(express.urlencoded({ extended: true }));
// 配置json数据解析
app.use(express.json());

// 编写路由
app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});

//在所有路由后面配置404中间件
app.use((req, res) => {
  res.status(404);
  res.send("<h1>404 Not Found</h1>");
});

app.listen(5000, () => {
  console.log("服务器已启动");
});
```

## 使用模板引擎动态渲染页面

假设我们有一个学生数组，我们希望他在页面中以表格的形式显示，想一下，如果在 public 目录下创建一个 students.html 他的数据将是静态的。
如果我们希望数据是动态的，我们可以在服务器端渲染页面，我们可以使用 express 提供的模板来渲染我们的页面。
express 提供了很多模板引擎，其中和 jsp 很像的一种模板引擎叫 ejs

### 安装 ejs

命令：`npm install ejs`

### 配置 express 模板引擎为 ejs

```js
// 设置模板引擎类型
app.set("view engine", "ejs");
// 设置模板引擎路径
app.set("views", path.resolve(__dirname, "views"));
```

在 views 目录下创建 ejs 扩展名的文件，语法和 html 一样。
用户无法直接访问 views 目录下的文件，需要使用 express 渲染。
res 有一个函数，res.render(模板文件名，数据)，这个函数会自动渲染模板文件，并将数据传递给模板引擎。

```js
app.get("/students", (req, res) => {
  res.render("students", { name: "张三", age: 12, helloStr: "<h1>你好</h1>" });
});
```

页面显示传过来的数据：

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ejs模板</title>
  </head>
  <body>
    <h1>students</h1>
    <%=name %> <br />
    <%-name %> <br />
    <%=age %> <br />
    <%=helloStr %> <br />
    <%-helloStr %> <br />
  </body>
</html>
```

`<%=xxx %>`的形式会对数据进行转义，也就是不论用什么语法写的，最终都只会成为一个简单的字符串。可以有效避免 xss 攻击。
`<%-xxx %>`的形式不会对数据进行转义，也就是会保留原来的语法。
什么叫 xss 攻击？就是当用户输入恶意代码时，恶意代码会执行。
`<% xxx %>`也可以用来显示数据。
三者可以嵌套写。

关于 xss 攻击（举个例子）：

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ejs模板</title>
  </head>
  <body>
    <h1>students</h1>
    <%=name %> <br />
    <%-name %> <br />
    <%=age %> <br />
    <%=helloStr %> <br />
    <%-helloStr %> <br />
    <form action="/setName" method="post">
      <input type="text" name="name" placeholder="请输入名字" />
      <input type="submit" value="提交" />
    </form>
  </body>
</html>
```

这种情况，用户输入恶意代码时，恶意代码会在页面中执行。
ejs 是运行在服务器中的，我们前面写的 ejs 界面都是渲染在服务器中的。

注释：`<%# name %>`

### 刷新数据

当给表格添加一项数据时，添加完成后，我们一般会响应“添加成功”页面，也就是`res.send("添加成功");`这条语句。
我们往往希望添加成功之后直接刷新表格就可以了，而不是跳出一个添加成功的页面。
如果我们在添加学生的路由中使用语句`res.render("students", { students: STUDENTS });`重新渲染 students 页面，会导致表单重复提交。
这时，我们可以使用重定向：`res.redirect("/students");`解决。

### 将数据写入文件，实现持久化

```js
const fs = require("fs/promises");
const STUDENTS = require("./data/students.json");
app.get("/students", (req, res) => {
  //   res.render("students", { name, age: 12, helloStr: "<h1>你好</h1>" });
  res.render("students", { students: STUDENTS });
});

app.post("/addStudent", (req, res) => {
  const { name, age, gender } = req.body;
  const newStu = {
    id: STUDENTS.at(-1).id + 1, // 不用length的原因：length变化太大
    name,
    age: +age,
    gender,
  };
  STUDENTS.push(newStu);
  fs.writeFile(
    path.resolve(__dirname, "./data/students.json"),
    JSON.stringify(STUDENTS)
  )
    .then(() => {
      res.redirect("/students");
    })
    .catch(() => {
      res.status(500);
      res.send("添加失败");
    });
});
```
