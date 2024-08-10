(function () {
  interface IUser {
    name: string;
    age: number;
    sayHello(): void;
  }

  class User implements IUser {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
    sayHello(): void {
      console.log("NiHao");
    }
  }
})();

// 接口可以定义类的结构

// 抽象类可以有抽象方法，也可以有普通方法，子类必须实现抽象方法
// 接口里面的方法都是抽象方法，实现类必须实现接口里面的所有方法和属性
