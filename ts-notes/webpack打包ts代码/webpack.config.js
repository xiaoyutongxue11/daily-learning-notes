const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
//模块化的项目打包后文件名中会带有唯一的ash后缀,不清空会导致dist下的文件越来越多，包越来越大
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 打包时使用的模式
  mode: "production",
  // 指定入口文件
  entry: "./src/index.ts",
  // 打包后的文件相关配置
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    environment: {
      arrowFunction: false,
    },
  },
  // 这里你可以写一些加载器相关的内容
  module: {
    rules: [
      {
        // 对哪些文件进行编译
        test: /\.ts$/,
        // 使用什么加载器
        use: [
          {
            // 指定加载器
            loader: "babel-loader",
            // 设置babel
            options: {
              presets: [
                [
                  // 设置预定义环境
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的浏览器
                    targets: {
                      chrome: "58",
                      ie: "11",
                    },
                    // 指定corejs版本
                    corejs: "3",
                    // 使用功能corejs的方式为按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        // 不对哪些文件进行编译
        exclude: /node_modules/,
      },
    ],
  },
  // 插件（加载器没有就不能达到某种功能，但是插件没有不影响）
  plugins: [
    new HTMLWebpackPlugin({
      //   title: "my App",
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  //模块化编译配置：以ts、js结尾的文件都可以作为模块化文件编译
  resolve: {
    extensions: [".ts", ".js"],
  },
};
