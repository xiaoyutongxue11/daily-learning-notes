const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs/promises");

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

let name = "张三";
app.post("/setName", (req, res) => {
  name = req.body.name;
  res.send("修改成功");
});

// 设置模板引擎类型
app.set("view engine", "ejs");
// 设置模板引擎路径
app.set("views", path.resolve(__dirname, "views"));

// const STUDENTS = [
//   { id: 1, name: "张三", age: 18, gender: "男" },
//   { id: 2, name: "李四", age: 20, gender: "男" },
//   { id: 3, name: "王五", age: 22, gender: "男" },
// ];
let STUDENTS = require("./data/students.json");
app.get("/students", (req, res) => {
  //   res.render("students", { name, age: 12, helloStr: "<h1>你好</h1>" });
  res.render("students", { students: STUDENTS });
});

app.get("/delStudent", (req, res) => {
  console.log(req.query.id);
  let id = +req.query.id;
  STUDENTS = STUDENTS.filter((item) => item.id !== id);
  fs.writeFile(
    path.resolve(__dirname, "./data/students.json"),
    JSON.stringify(STUDENTS)
  )
    .then(() => {
      res.redirect("/students");
    })
    .catch(() => {
      res.status(500);
      res.send("删除失败");
    });
});

app.get("/toEdit", (req, res) => {
  const editStu = STUDENTS.find((item) => item.id === +req.query.id);
  console.log(editStu);
  res.render("editStudent", { stu: editStu });
});

app.post("/editStudent", (req, res) => {
  let student = STUDENTS.find((item) => item.id === +req.body.id);
  student.name = req.body.name;
  student.age = req.body.age;
  student.gender = req.body.gender;

  fs.writeFile(
    path.resolve(__dirname, "./data/students.json"),
    JSON.stringify(STUDENTS)
  )
    .then(() => {
      res.redirect("/students");
    })
    .catch(() => {
      res.status(500);
      res.send("修改失败");
    });
});

app.post("/addStudent", (req, res) => {
  const { name, age, gender } = req.body;
  const id = STUDENTS.at(-1) ? STUDENTS.at(-1).id + 1 : 1; // 不用length的原因：length变化太大
  const newStu = {
    id,
    name,
    age: +age,
    gender,
  };
  STUDENTS.push(newStu);
  //   我们往往希望添加成功之后直接刷新表格就可以了，而不是跳出一个添加成功的页面
  //   如果我们在本路由中重新渲染students页面会导致表单重复提交
  //   res.send("添加成功");
  //   res.render("students", { students: STUDENTS });
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

//在所有路由后面配置404中间件
app.use((req, res) => {
  res.status(404);
  res.send("<h1>404 Not Found</h1>");
});

app.listen(5003, () => {
  console.log("服务器已启动");
});
