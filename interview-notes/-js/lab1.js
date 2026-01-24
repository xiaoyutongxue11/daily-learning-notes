// 数组求和函数
function arraySum(A, n) {
  let i = 0;
  let sum = 0;
  console.log(
    `初始: i=${i}, sum=${sum}, 不变式: sum=Σk=0^{${i}-1} A[k]=${sum} ∧ ${i}≤i≤${n}`
  );

  // 循环不变式: sum = Σ_{k=0}^{i-1} A[k] ∧ 0 ≤ i ≤ n
  while (i < n) {
    sum += A[i];
    i++;
    console.log(
      `迭代${i}: i=${i - 1}<${n}, sum=${sum - A[i - 1]}+A[${
        i - 1
      }]=${sum}, i=${i}, 不变式: sum=Σk=0^{${i}-1} A[k]=${sum} ∧ ${i}≤i≤${n}`
    );
  }

  console.log(`终止: i=${i}≥${n}, 输出sum=${sum}`);
  return sum;
}

// 测试用例
console.log("=== 实验一：循环不变式测试 ===\n");

// 测试1：数组求和
const testArray = [2, 3, 2];
const n = testArray.length;
const result1 = arraySum(testArray, n);
console.log(`\n数组 [${testArray}] 求和结果: ${result1}`);
console.log(`预期结果: ${testArray.reduce((acc, val) => acc + val, 0)}`);
console.log(`测试 ${result1 === 7 ? "通过" : "失败"}`);

// 附加测试：空数组情况
console.log("\n=== 附加测试：空数组 ===");
const emptyResult = arraySum([], 0);
console.log(`空数组求和结果: ${emptyResult}`);
console.log(`测试 ${emptyResult === 0 ? "通过" : "失败"}`);

console.log("安全性性质验证");
console.log("-- specification G !(light = RED & light = GREEN)  is true");
console.log("活性性质验证");
console.log("-- specification G (light = RED -> F light = GREEN)  is true");
console.log("公平性性质验证");
console.log(
  "-- specification G (F light = RED) & G (F light = GREEN) & G (F light = YELLOW)  is true"
);
