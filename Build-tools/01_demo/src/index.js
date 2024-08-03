import m1 from "./m1";
import m2 from "./m2";
import Img from "./assets/img.jpg";

document.body.insertAdjacentHTML(
  "beforeend",
  `<img src="${Img}" width="600"/>`
);
console.log("hello");

m1.setH1();
m2.sayHello();

const a = 10;
console.log(a);

document.body.onclick = () => {
  alert("点击了页面");
};
