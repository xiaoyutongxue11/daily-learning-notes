const useRequest = (url, option = { maxTime: 4 }) => {
  // 数据、错误重试
  let res = {};
  res = fetch(url);
  if (res.code === 200)
    return {
      data: res,
      state: "success",
    };
  else {
    let count = option.maxTime;
    let t = setTimeout(() => {
      if (count--) {
        res = fetch(url);
        if (res.code == 200)
          return {
            data: res,
            state: "success",
          };
      } else clearTimeout(t);
    }, 1000);
    return {
      data: res,
      state: "failed",
    };
  }
};
