function divideRedEnvelope(totalAmount, numberOfPeople) {
  // 参数校验
  if (totalAmount <= 0 || numberOfPeople <= 0) {
    throw new Error("总金额和份数必须大于零");
  }

  // 将元转换为分，避免浮点数精度问题
  let totalCents = Math.round(totalAmount * 100);
  const minAmount = 1; // 0.01元 = 1分

  // 检查总金额是否足够分配
  if (totalCents < numberOfPeople * minAmount) {
    throw new Error(
      `总金额过小，至少需要 ${((numberOfPeople * minAmount) / 100).toFixed(
        2
      )} 元`
    );
  }

  const result = [];
  let remainingCents = totalCents;
  let remainingPeople = numberOfPeople;

  for (let i = 0; i < numberOfPeople - 1; i++) {
    // 核心算法：计算当前可随机分配的最大金额
    const maxAllowed = Math.floor((remainingCents / remainingPeople) * 2);

    // 在 [minAmount, maxAllowed] 范围内随机生成金额（单位为分）
    // 确保随机金额不会导致剩余金额不足以分配后续红包（每人至少0.01元）
    const safeMax = Math.min(
      maxAllowed,
      remainingCents - (remainingPeople - 1) * minAmount
    );
    const randomCents =
      Math.floor(Math.random() * (safeMax - minAmount + 1)) + minAmount;

    result.push(randomCents / 100); // 转换回元
    remainingCents -= randomCents;
    remainingPeople--;
  }

  // 最后一份直接取剩余所有金额
  result.push(remainingCents / 100);

  return result;
}

function 

// 测试示例
try {
  const total = 100; // 100元
  const people = 5; // 5个人
  const envelopes = divideRedEnvelope(total, people);

  console.log(
    "红包分配结果：",
    envelopes.map((amount) => amount.toFixed(2))
  );
  console.log(
    "总和：",
    envelopes.reduce((sum, amount) => sum + amount, 0).toFixed(2)
  );
} catch (error) {
  console.error("错误：", error.message);
}
