const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    clean: true,
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|png|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.m?js$/, // 以js结尾或mjs结尾的文件
        exclude: /(node_nodules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HTMLPlugin({
      //   title: "hello，webpack",
      template: "./src/index.html",
    }),
  ],
};
