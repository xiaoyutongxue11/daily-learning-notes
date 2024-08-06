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

## token

使用本地存储存在问题：

1. 数据不安全。
2. 服务器不知道客户端是否登录。

解决问题：

rest 风格的服务器是无状态的服务器，不能在服务器中存储用户的数据（不要使用 session）。

可以将用户信息发送给客户端保存。客户端每次访问服务器时，直接将用户信息发回给服务器。服务器就能根据用户信息来识别用户身份。

如果将数据直接发送给客户端同样会有数据安全问题，所以服务器需要对数据进行加密，加密后再将数据发送给客户端保存，这样可避免数据的泄漏。

在 node 中可以直接使用 jsonwebtoken（通过对 json 加密后生成一个 web 中使用的令牌） 包来对数据进行加密。

加密和解密过程：

```js
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
```

使用流程：

1. 客户端首次登录时，向服务器发送登录信息（用户名、密码等）
2. 服务器收到登录请求，检验密码正确后，向客户端发送用户的基本信息（用户名、昵称等）和一个加密 token。
3. 客户端收到数据后，将 token 保存在本地。
4. 客户端每次访问服务器时，将 token 发送给服务器。
5. 服务器收到客户端发来的 token 进行解密，如果 token 有效，则允许访问，否则拒绝访问。

## axios

axios 是一个基于 promise 的 HTTP 库，可以用于浏览器和 node.js。(对 xhr 的再次封装)

axios 和 fetch 的区别：

- axios 请求时携带的数据为 data 而 fetch 请求时携带的数据为 body。
- axios 不用添加 res.json 等语句来解析响应数据。
- axios 的数据在第一次 then 中就可以拿到。

```js
btn2.onclick = () => {
  axios({
    method: "post",
    url: "http://localhost:3000/students",
    data: {
      name: "六七",
      age: 11,
      gender: "男",
      address: "河北",
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch(() => {
      console.log(err);
    });
};
```
