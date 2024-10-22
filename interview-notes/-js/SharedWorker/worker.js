// /**同一浏览器不同页面操作不同步，但是数据同步 */
// let counter = 1;
// let browserInstance = [];

// onconnect = function (e) {
//   const port = e.ports[0];

//   port.onmessage = function (e) {
//     counter++;
//     // sharedworker再向主线程发送消息
//     // 实现同一个浏览器不同页面操作同步
//     port.postMessage(counter++);
//   };
// };

/**同一浏览器不同页面操作同步，数据同步 */
let counter = 1;
//创建数组
let browserInstance = [];

onconnect = function (e) {
  const port = e.ports[0];
  //将不同端口的内容进行一个数据的添加
  browserInstance.push(port);

  port.onmessage = function (e) {
    counter++;
    // sharedworker再向主线程发送消息
    // port.postMessage(counter++)

    // 向每个浏览器实例发送消息
    browserInstance.forEach((instance) => {
      instance.postMessage(counter);
    });
  };
};