const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const path = require("path");

let STUDENTS = require("../data/students.json");
router.get("/students", (req, res) => {
  res.render("students", { students: STUDENTS });
});

router.get("/delStudent", (req, res, next) => {
  console.log(req.query.id);
  let id = +req.query.id;
  STUDENTS = STUDENTS.filter((item) => item.id !== id);
  next();
});

router.get("/toEdit", (req, res) => {
  const editStu = STUDENTS.find((item) => item.id === +req.query.id);
  console.log(editStu);
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
  const { name, age, gender } = req.body;
  const id = STUDENTS.at(-1) ? STUDENTS.at(-1).id + 1 : 1; // 不用length的原因：length变化太大
  const newStu = {
    id,
    name,
    age: +age,
    gender,
  };
  STUDENTS.push(newStu);
  next();
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
