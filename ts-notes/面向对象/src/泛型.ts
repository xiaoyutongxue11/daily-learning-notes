function fn<T>(a: T): T {
  return a;
}

fn<number>(111);

interface A {
  length: number;
}

function fn2<T extends A>(x: T) {
  return x.length;
}

const r1 = fn2<string>("111");
const r2 = fn2<number[]>([1, 2, 3]);

class MyClass<T> {
  constructor(public x: T) {}
}
const mc = new MyClass<string>("111");
console.log(mc.x); //(property) MyClass<string>.x: string

