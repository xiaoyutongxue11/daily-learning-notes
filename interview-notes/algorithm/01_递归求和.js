const arr = [5, 4, 9, 2, 3];

// 假设f(i)是求第i个元素到末尾的和
// f(0) = arr[0] + f(1)
// f(1) = arr[1] + f(2)
// ...................
// f(i) = arr[i] + f(i+1)  (i < arr.length)

// const func = (num) => {
//   if (num < arr.length) return arr[num] + func(num + 1);
//   else return 0;
// };

// console.log(func(0));

const sum = (arr) => {
  const func = (num) => {
    if (num < arr.length) return arr[num] + func(num + 1);
    else return 0;
  };
  return func(0);
};

console.log(sum(arr));
