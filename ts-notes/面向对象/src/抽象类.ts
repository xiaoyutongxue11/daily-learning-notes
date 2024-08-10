(function () {
  abstract class Animal {
    name: string;
    age: number;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }

    // 抽象方法只能定义在抽象类，且子类必须重写抽象方法
    abstract sayHello(): void;
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
