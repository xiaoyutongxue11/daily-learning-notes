// console.log(globalThis);
// console.log(process);

// console.log(111);
// process.exit();
// console.log(222);

// setTimeout(() => {
//   console.log(111);
// });

// console.log(222);

// queueMicrotask(() => {
//   console.log(333);
// });

// process.nextTick(() => {
//   console.log(444);
// });

const path = require("node:path");
// console.log(path);
// console.log(path.resolve());

console.log(path.resolve(__dirname, "./09_index.js"));

const fs = require("node:fs/promises");

// const buf = fs.readFileSync(path.resolve(__dirname, "./09_index.js"));

// console.log(buf.toString());

// fs.readFile(path.resolve(__dirname, "./09_index.js"), (err, buffer) => {
//   if (err) {
//     console.log("出错了");
//   }
//   if (buffer) {
//     console.log(buffer.toString());
//   }
// });
// fs.readFile(path.resolve(__dirname, "./09_index.js"))
//   .then((buffer) => {
//     console.log(buffer.toString());
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async () => {
//   try {
//     const buffer = await fs.readFile(path.resolve(__dirname, "./09_index.js"));
//     console.log(buffer.toString());
//   } catch (err) {
//     console.log(err, "出错了");
//   }
// };

// fs.appendFile(path.resolve(__dirname, "./hello123.txt"), "今天天气真好").then(
//   (res) => {
//     console.log("添加成功");
//   }
// );

//D:\下载\QQ图片20240419181521
// fs.readFile(path.resolve("D:/下载/QQ图片20240419181521.jpg"))
//   .then((buffer) => {
//     return fs.appendFile(path.resolve(__dirname, "./img.jpg"), buffer);
//   })
//   .then(() => {
//     console.log("添加成功");
//   });

// fs.mkdir(path.resolve(__dirname, "./hello/a"), { recursive: true })
//   .then(() => {
//     console.log("创建成功");
//   })
//   .catch(() => {
//     console.log("创建失败");
//   });

// fs.rmdir(path.resolve(__dirname, "./hello"), { recursive: true }).then(() => {
//   console.log("删除成功");
// });

fs.rename(
  path.resolve(__dirname, "../image.jpg"),
  path.resolve(__dirname, "./image.jpg")
).then(() => {
  console.log("修改成功");
});
