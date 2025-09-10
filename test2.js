const solve = (s) => {
  let res = "";
  for (let i = 0; i < s.length; ) {
    res += s.substring(i, i + 3);
    i += 4;
    if (i < s.length) res += ",";
  }
  console.log(res);
};
// solve("111111111");

const cloneDeep = (obj) => {
  if (typeof obj !== "object" || obj === null) return obj;
  let newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    newObj[key] = cloneDeep(obj[key]);
  }
  return newObj;
};
const res = cloneDeep({
  a: "1",
  b: "2",
  c: {
    d: "3",
  },
});
console.log(res);
