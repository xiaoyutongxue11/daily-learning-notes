# Rest

我们使用 node 编写的服务器是传统的服务器，服务器的结构是基于 MVC 模式。

Model：数据模型
View：视图，用来呈现
Controller：控制器，复杂数据加载并选择视图来呈现数据（前面我们使用的中间件就是控制器）

传统的服务器是直接为客户端返回一个页面。

现在的应用场景，一个应用通常会有多个客户端存在。
web 端、移动端、pc 端。
我们写的传统的服务器直接返回一个 html 页面，只适用 web 端。其他类型的客户端需要单独开发服务器，这样就提高了开发和维护的成本。

如何解决这个问题？
传统服务器需要做两件事情：加载数据、将木星渲染进视图。

将渲染视图的功能从服务器中剥离出来，渲染视图的工作由客户端自行完成。

分离以后，服务器只提供数据，一个服务器可以同时为多种客户端提供服务。同时将试图渲染的工作交给客户端后，简化了服务器代码的编写。

## Rest 是什么

Rest：表示层状态传输（一种服务器的设计风格），REST 认为客户端和服务器之间交互传输的其实不是数据，而是数据的“表示”，而这种“表示”是资源当前“状态”的体现。或严格地说，表示是对资源当前状态的机器可读解释。所谓的 REST，即是两台机器通过“传输”资源的“表示”，来反映资源的当前“状态”或所需“状态”。

Rest 是一种软件架构风格，而不是标准，是一种设计风格。

Rest 主要特点：服务器只返回数据。

服务器和客户端传输数据时通常会会使用 JSON 作为数据格式。

传统服务器一般只用 GET、POST 两种请求方式。

REST 风格服务器的请求方式有：
GET：加载数据
POST：新建数据
PUT：添加或修改数据
DELETE：删除数据
PATCH：修改数据
OPTION：由浏览器自动发送，检查请求的一些权限

API（接口/端点/endpoint）：服务器提供的一个接口，客户端可以通过这个接口来发送请求。

下载请求工具，来向服务器发送请求。

最终上线的时候，客户端和服务器是部署到两个服务器的。

AJAX 是符合 REST 风格的请求方式。
