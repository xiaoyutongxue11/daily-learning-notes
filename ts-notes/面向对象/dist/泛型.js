"use strict";
function fn(a) {
    return a;
}
fn(111);
function fn2(x) {
    return x.length;
}
const r1 = fn2("111");
const r2 = fn2([1, 2, 3]);
class MyClass {
    constructor(x) {
        this.x = x;
    }
}
const mc = new MyClass("111");
console.log(mc.x); //(property) MyClass<string>.x: string
