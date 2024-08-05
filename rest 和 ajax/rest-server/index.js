const express = require("express");

const app = express();

const STU_ARR = [
  { id: "1", name: "张三", age: 12, gender: "男", address: "北京" },
  { id: "2", name: "李四", age: 18, gender: "男", address: "上海" },
  { id: "3", name: "王五", age: 72, gender: "男", address: "深圳" },
];

app.use(express.urlencoded({ extended: true })); // 解析请求体
app.use(express.json()); // 解析json请求体
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-type");
  next();
});

app.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "123456") {
    res.send({
      status: "ok",
      data: {
        id: "12345",
        username: "admin",
        nickname: "管理员",
      },
    });
  } else {
    res.status(403).send({
      status: "error",
      data: "用户名或密码错误",
    });
  }
});

app.get("/students", (req, res) => {
  console.log("get students");
  res.send({
    status: "ok",
    data: STU_ARR,
  });
});

app.post("/students", (req, res) => {
  console.log(req.body);
  const { name, age, gender, address } = req.body;
  const stu = {
    id: +STU_ARR.at(-1).id + 1 + "",
    name,
    age,
    gender,
    address,
  };
  STU_ARR.push(stu);
  res.send({
    status: "ok",
    data: stu,
  });
});

app.get("/students/:id", (req, res) => {
  const id = req.params.id;
  const stu = STU_ARR.find((item) => item.id === id);
  if (stu)
    res.send({
      status: "ok",
      data: stu,
    });
  else
    res.status(403).send({
      status: "error",
      data: "该学生不存在",
    });
});

app.delete("/students/:id", (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < STU_ARR.length; i++) {
    if (STU_ARR[i].id === id) {
      const stu = STU_ARR[i];
      STU_ARR.splice(i, 1);
      res.send({
        status: "ok",
        data: stu,
      });
      return;
    }
  }
  res.status(403).send({
    status: "error",
    data: "该学生不存在",
  });
});

app.put("/students", (req, res) => {
  const { id, name, age, gender, address } = req.body;
  const stu = STU_ARR.find((item) => item.id === id);
  if (stu) {
    stu.name = name;
    stu.age = age;
    stu.gender = gender;
    stu.address = address;
    res.send({
      status: "ok",
      data: stu,
    });
  } else {
    res.status(403).send({
      status: "error",
      data: "该学生不存在",
    });
  }
});

app.listen(3000, () => {
  console.log("服务器已启动");
});
