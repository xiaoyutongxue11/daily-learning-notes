# AJAX

A：异步
J：JavaScript
A：and
X：XML

异步的 js 和 xml
它的作用是通过 js 向服务器发送请求加载数据
xml 是早期 AJAX 使用的数据格式
目前都是使用 JSON
AJAX 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。

AJAX 发送请求可选择的方案：

1. XMLHttpRequest
2. Fetch API
3. Axios

## xhr

传输的是请求报文，首先要拿到请求报文，然后再发送请求。请求报文在浏览器中，就是对象。

使用 xhr 发送请求：

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/students");
xhr.send();
```

服务器已经收到请求，但是浏览器报错：`Access to XMLHttpRequest at 'http://localhost:3000/students' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`这是 CORS 跨域资源共享问题。

### 跨域问题

如果两个网站的域名不相同就会发生跨域问题。此时 a 网站和 b 网站都不能相互访问。

跨域需要检查三个东西：协议、域名、端口号。三个有一个不相同就会发生跨域问题。

当我们通过 AJAX 去发送跨域请求时，浏览器为了服务器的安全，会阻止 js 读取服务器的数据。

服务器可以设置允许跨域的请求头（Access10-Control-Allow-Origin）。这样浏览器就不会阻止 js 读取服务器的数据。
下面的`*`表示所有浏览器都能访问，可以直接设置某个网站的具体地址，来限制其他网站访问。例如：` res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");`，这样设置时，只能设置一个。如果我们想设置多个网站访问，需要在服务器中设置网站数组，请求发进来了，然后一个一个判断，如果是当前地址，再动态设置请求头。

注意：localhost 是直接访问本机，127.0.0.1 是通过网络访问本机。

```js
app.get("/students", (req, res) => {
  console.log("get students");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send({
    status: "ok",
    data: STU_ARR,
  });
});
```

服务器的所有请求都要设置请求头，可以添加一个中间件来处理跨域这件事情。

```js
app.use((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE"); // 设置允许的请求方式
  res.setHeader("Access-Control-Allow-Headers", "Content-type"); // 设置允许传递的请求头
});
```
