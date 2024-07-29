# 网络通信

## http 协议

http 是一种用于客户端和服务器之间的请求和响应的协议。
网络的服务器是基于请求和响应的。
客户端向服务器发送请求，服务器返回响应。

http://www.baidu.com/index.html
http:// 协议名。
www.baidu.com 域名：整个网络中存在无数服务器，每个服务器都有她自己的唯一标识，这个标识就是他的 ip 地址。但是 ip 地址不方便记忆，域名相当于 ip 地址的别名，方便记忆。
index.html 文件名：网站资源路径。

当在浏览器输入地址后发生了什么？

1. dns 解析域名，获取网站的 ip 地址
2. 浏览器和服务器建立连接（tcp/ip：建立连接：三次握手，释放连接：四次挥手）
3. 浏览器向服务器发送请求
4. 服务器处理请求，并返回响应（http 协议）
5. 浏览器接收响应，并解析响应，将响应的页面进行渲染
6. 断开和服务器的连接

http 协议是应用层协议，用来规定客户端和服务器间报文的。

什么是报文？
浏览器和服务器之间是基于请求和响应的。
浏览器向服务器发送请求 request，服务器返回响应 response。
request：请求报文
response：响应报文

http 协议规定报文格式：

请求报文：
请求行：请求方式 请求路径 HTTP/1.1
请求头：请求头名：请求头值
空行
请求体：请求体数据

User-Agent：用户代理，用来描述浏览器信息的字符串

```text
POST /login HTTP/1.1
Host: dc.uav.mt178.com
Connection: keep-alive
Content-Length: 43
accept: */*
satoken:
User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605. 1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1 wechatdevtools/1.06.2405020 MicroMessenger/8.0.5 webview/
content-type: application/json
Sec-Fetch-Site: cross-site
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Referer: https://servicewechat.com/wx2dc2c9815b0a13d1/devtools/page-frame.html
Accept-Encoding: gzip, deflate, br
```

响应报文：
响应行：HTTP/1.1 状态码 状态描述
响应头：响应头名：响应头值
空行
响应体：响应体数据

响应状态码：
1xx：请求处理中
2xx：请求成功
3xx：重定向
4xx：客户端错误
5xx：服务器错误


