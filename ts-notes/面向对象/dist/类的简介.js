"use strict";
class Person {
    constructor() {
        // 实例属性
        this.name = "孙悟空";
        this.age = 13;
    }
    //实例方法
    sayHello() {
        console.log("hello");
    }
    // 类方法\静态方法
    static sayHi() {
        console.log("hi");
    }
}
// 静态属性\类属性
Person.sex = "男";
const per = new Person();
per.name = "猪八戒";
console.log(per.name);
per.sayHello();
