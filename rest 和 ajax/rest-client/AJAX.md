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
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE"); // 设置允许的请求方式
  res.setHeader("Access-Control-Allow-Headers", "Content-type"); // 设置允许传递的请求头
  next();
});
```

### 读取响应信息

AJAX 是异步的。发送请求后，服务器返回响应信息，通过 xhr.onload 事件监听响应信息。

渲染数据：

```js
xhr.responseType = "json"; // 将响应数据类型设为json格式后，会自动帮我们解析json格式的数据，加了这行代码就可以不使用JSON.parse()来解析response了
xhr.onload = function () {
  if (xhr.status === 200) {
    // 响应状态码，不是数据
    const res = xhr.response;
    if (res.status === "ok") {
      // 数据状态
      const ul = document.createElement("ul");
      document.body.appendChild(ul);
      for (let stu of res.data) {
        ul.insertAdjacentHTML(
          "beforeend",
          `<li>${stu.id} - ${stu.name} - ${stu.age} - ${stu.gender} - ${stu.address}</li>`
        );
      }
    }
  }
};
```

## fetch

fetch 是 xhr 的升级版，采用的是 Promise API。
fetch 是原生 js 就支持的一种 ajax 请求方式。

```js
fetch("http://localhost:3000/students")
  .then((res) => {
    if (res.status === 200) {
      // res.json()可以用来读取json格式的数据，值是promise
      return res.json();
    } else {
      throw new Error("加载失败");
    }
  })
  .then((res) => {
    if (res.status === "ok") {
      console.log(res.data);
    }
  })
  .catch((err) => {
    console.log(err);
  });
```

使用 fetch 请求时，服务器不会自动生成 cookie，session 是基于 cookie 的，也不能使用。

### 本地存储

在登录成功后，我们需要保存用户的登录状态。我们现在写的登录 demo 是前后端分离的。客户端和服务器是跨域的，不能使用 cookie。我们可以使用本地存储。

本地存储是客户端（浏览器自身的存储空间）。

- sessionStorage：会话存储空间，有效范围：当前页面，关闭浏览器后数据消失
- localStorage：本地存储空间，关闭浏览器后数据不会消失

存数据：`setItem(name,value)`
取数据：`getItem(name)`
删数据：`removeItem(name)`
清空数据：`clear()`
