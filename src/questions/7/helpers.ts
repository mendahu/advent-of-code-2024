export const convertDataToMapAndArray = (
  data: string
): { result: bigint; factors: number[] }[] => {
  const results = [];

  const dataArr = data.split("\n");

  for (const line of dataArr) {
    const [key, value] = line.trim().split(":");

    const factors = value
      .trim()
      .split(" ")
      .map((v) => parseInt(v, 10));

    results.push({ result: BigInt(key), factors });
  }

  return results;
};

export const sumSuccessfulTestCases = (
  testCases: { result: bigint; factors: number[] }[],
  validator: (result: bigint, factors: number[]) => boolean
): bigint => {
  let sum = 0n;

  for (const testCase of testCases) {
    if (validator(testCase.result, testCase.factors)) {
      sum += testCase.result;
    }
  }

  return sum;
};
