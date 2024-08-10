(function () {
  class Animal {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    sayHello() {
      console.log("hello");
    }
  }
  class Dog extends Animal {
    sayHello() {
      console.log("汪汪汪");
    }
  }

  class Cat extends Animal {
    sayHello() {
      console.log("喵喵喵");
    }
  }

  class Pig extends Animal {
    sex: string;
    constructor(name: string, age: number, sex: string) {
      super(name, age);
      this.sex = sex;
    }
    sayHello() {
      super.sayHello();
    }
  }

  const dog = new Dog("旺财", 3);
  const cat = new Cat("咪咪", 2);
  const pig = new Pig("小花", 1, "公");

  dog.sayHello();
  cat.sayHello();
  pig.sayHello();
})();
