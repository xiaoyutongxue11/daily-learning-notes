function counter(initValue, step) {
  function add() {
    initValue += step;
    return initValue;
  }
  function sub() {
    initValue -= step;
    return initValue;
  }
  return {
    add: add,
    sub: sub,
  };
}

let c = counter(2, 1);

console.log(c.add());
console.log(c.sub());
