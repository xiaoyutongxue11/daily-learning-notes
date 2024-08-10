"use strict";
(function () {
    class Animal {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        sayGB() {
            console.log("good bye");
        }
    }
    class Dog extends Animal {
        sayHello() {
            console.log("汪汪汪");
        }
    }
    const dog = new Dog("旺财", 3);
    dog.sayGB();
})();
