"use strict";
(function () {
    class Person {
        constructor(name, age) {
            this._name = name;
            this._age = age;
        }
        say() {
            console.log("hello");
        }
        // setName(name: string) {
        //   this.name = name;
        // }
        // getName() {
        //   return this.name;
        // }
        setAge(age) {
            if (age >= 0) {
                this._age = age;
            }
        }
        get name() {
            return this._name;
        }
        set name(name) {
            this._name = name;
        }
    }
    const per = new Person("小明", 18);
    // 在外面使用get set 方法，可以直接用对象来获取，直接点方法名就行了
    console.log(per.name); // 这里调用了get方法
    per.name = "小红"; // 这里调用了set方法
    class Student {
        // 可以将属性定义在构造函数的参数中
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }
    const stu = new Student("小红", 18);
    console.log(stu.name);
})();
// 读取、修改权限在类的设计者上
