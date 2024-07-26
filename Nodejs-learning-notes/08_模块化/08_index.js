// const m1 = require("./common");
// console.log(m1);

// m1.func();

// const m2 = require("./hello");
// console.log(m2);

import { a, b, obj as o } from "./es.mjs";
console.log(a, b, o);

import * as m4 from "./es.mjs";
console.log(m4);
console.log(m4.a);

import sum from "./es.mjs";
console.log(sum);
