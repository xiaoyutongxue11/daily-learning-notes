// 防抖：等待操作完成后停顿一会再触发，只触发一次；比如按钮多次点击停顿之后、比如输入框输入后停顿一会之后、比如窗口大小改变后停顿一会再触发
function debounce(fn, delay = 1000) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
} 
// 节流：在一段时间内多次进行操作，只会触发一次，多用在监听滚动、鼠标移动、按钮高频点击
function throttle(fn, delay = 1000) {
  let lastTime;
  return function (...args) {
    let now = Date.now();
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}
