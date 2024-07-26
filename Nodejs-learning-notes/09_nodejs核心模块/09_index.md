# nodejs 自带核心模块

Window 是浏览器宿主对象，node 中没有。
global 是 nodejs 的全局对象。
es 标准下，全局对象的标准名是 globalThis。
在浏览器中访问 globalThis 就是 Window，在 nodejs 中访问 globalThis 就是 global。

## process

process 是 nodejs 的全局对象，可以直接使用，可以获取当前进程的信息，或者对进程做各种操作。

### process.exit

结束当前进程。

```js
console.log(111);
process.exit();
console.log(222);
```

exit()可以传数字，有的时候我们希望知道结束的状态。

### process.nextTick

将函数插入到 tick 队列。

```js
setTimeout(() => {
  console.log(111);
});

console.log(222);

queueMicrotask(() => {
  console.log(333);
});

process.nextTick(() => {
  console.log(444);
});
```

```text
222
444
333
111
```

代码执行顺序：
调用栈 =》tick 队列 =》微任务队列 =》宏任务队列
现在基本上不再使用了。

## path

表示路径，通过 path 可以获取各种路径，使用 path 需要对其进行引入。

### path.resolve([...paths])

用来生成一个绝对路径。
绝对路径：

- Windows 中：C:\xxx
- Linux 中：/xxx
- 网络中：http://xxx

如果直接调用 path.resolve()，会返回当前目录的绝对路径。
通过在不同工作目录执行执行，路径可能不同。
通过 f5 调式的，一般是以根文件夹为当前文件的目录，通过终端到上一级文件位置执行 node 命令的，一般是以上一级文件目录为当前文件的目录。
如果将一个相对路径作为参数，则 resolve 会自动将其转换为绝对路径。
通常传两个参数，第一个参数传 node 的 dirname，第二个参数传相对路径。

```js
const path = require("node:path");
console.log(path.resolve(__dirname, "./09_index.js"));
```

这样换保证了代码的健壮性，代码到不同的电脑上运行都可以。

## fs

fs 用来帮助 node 操作磁盘中的文件。
文件操作也就是所谓的 I/O 操作。
使用 fs，同样需要先引入。

### fs.readFileSync

fs.readFileSync()同步地读取文件的方法，会阻塞后面代码的执行。

```js
const fs = require("node:fs");

const buf = fs.readFileSync(path.resolve(__dirname, "./09_index.js"));

console.log(buf.toString());
```

读到的数据总会以 Buffer 对象形式返回。
Buffer 就是一个临时存储数据的缓冲区。
不建议使用 fs.readFileSync，他是同步执行的，会影响后面代码的执行速度。

### fs.readFile

fs.readFile()是异步地读取文件的方法，不会阻塞后面代码的执行。
同时，fs.readFile()的返回值是 Promise。

#### 传路径+回调函数

```js
fs.readFile(path.resolve(__dirname, "./09_index.js"), (err, buffer) => {
  if (err) {
    console.log("出错了");
  }
  if (buffer) {
    console.log(buffer.toString());
  }
});
```

```js
fs.readFile(path.resolve(__dirname, "./09_index.js"))
  .then((buffer) => {
    console.log(buffer.toString());
  })
  .catch((err) => {
    console.log(err);
  });
```

```js
async () => {
  try {
    const buffer = await fs.readFile(path.resolve(__dirname, "./09_index.js"));
    console.log(buffer.toString());
  } catch (err) {
    console.log(err, "出错了");
  }
};
```

### fs.appendFile

向文件中添加内容：

```js
fs.appendFile(path.resolve(__dirname, "./hello.txt"), "今天天气真好").then(
  (res) => {
    console.log("添加成功");
  }
);
```

如果文件不存在，就会直接新建一个文件。
结合上面的读文件和这个添加文件我们可以实现文件复制。
例如，将 D 盘下的某张图片复制到当前模块目录下：

```js
fs.readFile(path.resolve("D:/下载/QQ图片20240419181521.jpg"))
  .then((buffer) => {
    return fs.appendFile(path.resolve(__dirname, "./img.jpg"), buffer);
  })
  .then(() => {
    console.log("添加成功");
  });
```

### fs.mkdir

用来创建文件夹。

```js
fs.mkdir(path.resolve(__dirname, "./hello")).then(() => {
  console.log("创建成功");
});
```

当上一级目录存在时，可以接着在里面创建文件夹。

```js
fs.mkdir(path.resolve(__dirname, "./hello/a")).then(() => {
  console.log("创建成功");
});
```

当上一级目录不存在时，创建会失败。
此时，添加一个参数，recursive，设置为 true，就可以实现递归创建了。也就是，目录中，没有的文件夹，就会重新创建。

```js
fs.mkdir(path.resolve(__dirname, "./hello/a"), { recursive: true })
  .then(() => {
    console.log("创建成功");
  })
  .catch(() => {
    console.log("创建失败");
  });
```

### fs.rmdir

```js
fs.rmdir(path.resolve(__dirname, "./hello"), { recursive: true }).then(() => {
  console.log("删除成功");
});
```

同样，在目录中有其他文件时，不能直接删除，可以添加`{ recursive: true }`参数来解决这个问题。

### fs.rename

```js
fs.rename(
  path.resolve(__dirname, "./img.jpg"),
  path.resolve(__dirname, "./image.jpg")
).then(() => {
  console.log("修改成功");
});
```

当文件名相同，路径不同时，就实现了剪贴功能：

```js
fs.rename(
  path.resolve(__dirname, "./image.jpg"),
  path.resolve(__dirname, "../image.jpg")
).then(() => {
  console.log("修改成功");
});
```
