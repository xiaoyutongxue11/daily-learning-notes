const express = require("express");
const router = express.Router();

router.get("/hello", (req, res) => {
  res.send("<h1>hello goods</h1>");
});

router.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});

let name = "张三";
router.post("/setName", (req, res) => {
  name = req.body.name;
  res.send("修改成功");
});

module.exports = router;
