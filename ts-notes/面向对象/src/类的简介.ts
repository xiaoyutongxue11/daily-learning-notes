class Person {
  // 实例属性
  name: string = "孙悟空";
  readonly age: number = 13;

  // 静态属性\类属性
  static readonly sex: string = "男";
  //实例方法
  sayHello() {
    console.log("hello");
  }

  // 类方法\静态方法
  static sayHi() {
    console.log("hi");
  }
}

const per = new Person();
per.name = "猪八戒";
console.log(per.name);

per.sayHello();
