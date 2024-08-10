class Dog {
  name: string;
  age: number;

  // this是当前实例对象
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const dog1 = new Dog("小黑", 3);
const dog2 = new Dog("小黄", 2);

console.log(dog1);
console.log(dog2);
