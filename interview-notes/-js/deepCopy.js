function deepClone(obj) {
  // if (obj === null || typeof obj !== "object") return obj;
  // let result = Array.isArray(obj) ? [] : {};
  // for (let key in obj) {
  //   //只拷贝对象自身的属性，不考虑原型链上的属性
  //   if (obj.hasOwnProperty(key)) {
  //     result[key] = deepClone(obj[key]);
  //   }
  // }
  // return result;
  if(obj===null||typeof obj !=="object")return obj;
  let res=Array.isArray(obj)?[]:{};
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      res[key]=deepClone(obj[key]);
    }
  }
  return res;
}

let obj = {
  name: "111",
  age: 23,
  friends: ["222", "333", "444"],
  mom: {
    name: "555",
    age: 36,
  },
};

let newObj = deepClone(obj);

obj.mom.name = "bebe";
newObj.mom.name = "haha";

console.log(obj);
console.log(newObj);
