const jwt = require("jsonwebtoken");

const obj = {
  name: "sew",
  age: 12,
  sex: "男",
};
// 加密
const token = jwt.sign(obj, "fdhsjhfdjsh", {
  expiresIn: "1h", // 如果过期，将无法解密
});

console.log(token);

// 解密
try {
  const data = jwt.verify(token, "fdhsjhfdjsh");
  console.log(data);
} catch {
  console.log("token无效");
}
