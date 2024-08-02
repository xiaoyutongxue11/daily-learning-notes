const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid").v4;

let STUDENTS = require("../data/students.json");

router.use((req, res, next) => {
  const referer = req.get("Referer");
  if (!referer || !referer.startsWith("http://localhost:5003")) {
    res.status(403);
    res.send("您没有权限访问");
    return;
  }
  if (req.session.username) {
    next();
  } else {
    res.redirect("/");
  }
});

router.get("/students", (req, res) => {
  const token = uuid();
  req.session.csrfToken = token;
  req.session.save(() => {
    res.render("students", {
      students: STUDENTS,
      username: req.session.username,
      csrfToken: token,
    });
  });
});

router.get("/delStudent", (req, res, next) => {
  let id = +req.query.id;
  STUDENTS = STUDENTS.filter((item) => item.id !== id);
  next();
});

router.get("/toEdit", (req, res) => {
  const editStu = STUDENTS.find((item) => item.id === +req.query.id);
  res.render("editStudent", { stu: editStu });
});

router.post("/editStudent", (req, res, next) => {
  let student = STUDENTS.find((item) => item.id === +req.body.id);
  student.name = req.body.name;
  student.age = req.body.age;
  student.gender = req.body.gender;
  next();
});

router.post("/addStudent", (req, res, next) => {
  const csrf = req.body.csrf;
  const token = req.session.csrfToken;
  req.session.csrfToken = null;

  if (csrf === token) {
    const { name, age, gender } = req.body;
    const id = STUDENTS.at(-1) ? STUDENTS.at(-1).id + 1 : 1; // 不用length的原因：length变化太大
    const newStu = {
      id,
      name,
      age: +age,
      gender,
    };
    STUDENTS.push(newStu);

    req.session.save(() => {
      next();
    });
  } else res.status(403).send("token 错误");
});

router.use((req, res) => {
  fs.writeFile(
    path.resolve(__dirname, "../data/students.json"),
    JSON.stringify(STUDENTS)
  )
    .then(() => {
      //   我们往往希望添加成功之后直接刷新表格就可以了，而不是跳出一个添加成功的页面
      //   如果我们在本路由中重新渲染students页面会导致表单重复提交
      //   res.send("添加成功");
      //   res.render("students", { students: STUDENTS });
      res.redirect("/students");
    })
    .catch(() => {
      res.status(500);
      res.send("添加失败");
    });
});

module.exports = router;
