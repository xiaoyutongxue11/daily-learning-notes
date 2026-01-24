const obj = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 },
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3,
};
const obj1 = [1, 2, { a: 3 }];

// flatten1(obj);
//结果返回如下
/**
   {
   	a.b: 1,
     a.c: 2,
     a.d.e: 5,
     b[0]: 1,
     b[1]: 3,
     b[2].a: 2,
     b[2].b: 3,
     c: 3
   }**/
const flatten = (obj) => {
  let res = {};

  // 递归处理函数
  const process = (currentObj, path = "") => {
    // 处理基本数据类型（递归终止条件）
    if (currentObj === null || typeof currentObj !== "object") {
      if (path) {
        res[path] = currentObj;
      }
      return;
    }

    // 处理数组
    if (Array.isArray(currentObj)) {
      if (currentObj.length === 0) {
        // 空数组特殊处理
        res[path] = [];
      } else {
        currentObj.forEach((item, index) => {
          // 为数组元素构建新路径：path[index]
          const newPath = path ? `${path}[${index}]` : `[${index}]`;
          process(item, newPath);
        });
      }
      return;
    }

    // 处理对象
    const keys = Object.keys(currentObj);
    if (keys.length === 0) {
      // 空对象特殊处理
      res[path] = {};
    } else {
      keys.forEach((key) => {
        // 为对象属性构建新路径：path.key 或 key（如果是根级属性）
        const newPath = path ? `${path}.${key}` : key;
        process(currentObj[key], newPath);
      });
    }
  };

  // 开始处理
  process(obj);
  return res;
};

const flatten1 = (obj) => {
  let res = {};
  const process = (currentObj, path = "") => {
    if (typeof currentObj !== "object" && currentObj !== null) {
      if (path) {
        res[path] = currentObj;
      }
      return;
    } else if (Array.isArray(currentObj)) {
      if (currentObj.length === 0) {
        res[path] = [];
        return;
      }
      currentObj.forEach((item, index) => {
        let newPath = path ? `${path}[${index}]` : `[${index}]`;
        process(item, newPath);
      });
    } else {
      let keys = Object.keys(currentObj);
      if (keys.length === 0) {
        res[path] = {};
        return;
      }
      for (let key in currentObj) {
        let newPath = path ? `${path}.${key}` : key;
        process(currentObj[key], newPath);
      }
    }
  };
  process(obj);
  return res;
};

const res = flatten1(obj1);
console.log(res);
