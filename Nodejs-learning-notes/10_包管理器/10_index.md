# 包管理器

## NPM

npm 是世界最大的包管理器，我们可以将自己开发的包上传到 npm 中供别人使用，也可以直接从 npm 中下载别人开发好的包，在自己的项目中使用。

### Package.json

package.json 是一个 json 文件，用来描述项目的一些信息，比如项目名、版本号、依赖包等。
json 文件属性名必须要用双引号，属性值可以是对象、数组、字符串、数字、布尔值、null。

```json
{
  "name": "my-project",
  "version": "1.0.0", //第一位换版本，第二位换功能，第三位该bug
  "dependencies": {},
  "main": "index.js" //入口文件
}
```

### npm 命令

执行`npm init`命令（有提问）可以创建一个 package.json 文件。
执行`npm init -y`命令会默认生成一个 package.json 文件。
执行`npm install xxx`命令可以安装依赖包。
install 时发什么了什么？

1. 将包下载到 node_modules 目录下；
2. 将包名添加到 package.json 的 dependencies 属性中；
3. 将包名添加到 package-lock.json 的 dependencies 属性中；（package-lock.json 是一个 json 文件，用来记录项目依赖的版本号，防止版本冲突，帮助加速 npm 下载）

传项目时，只要我们把依赖添加到 package.json 中，就可以通过 npm install 安装依赖。

版本号左上角的小三角匹配版本号后两位的最新版本。版本号前波浪号匹配后一位的最新版本。版本号前星号表示匹配最新版本。
直接使用 require 引入包就可以使用了。

```js
const _ = require("lodash");
console.log(_);
```

`npm install 包名 -g`全局安装，全局安装是将包安装到计算机中，通常一些工具需要全局安装。
全局安装之后，可以直接在命令行中使用。
`npm uninstall 包名 -g`全局卸载。
`npm uninstall`之后依赖也会删除。
