// 一个页面多个组件发送同一个请求

const fetchUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(id);
    }, 5000);
  });
};

const cache = {};

const cacheFetchUser = (id) => {
  if (cache[id]) return cache[id];
  else {
    cache[id] = fetchUser(id);
    return cache[id];
  }
};

console.log(
  cacheFetchUser(111).then((res) => {
    console.log(res);
  })
);
console.log(
  cacheFetchUser(111).then((res) => {
    console.log(res);
  })
);
console.log(
  cacheFetchUser(111).then((res) => {
    console.log(res);
  })
);
