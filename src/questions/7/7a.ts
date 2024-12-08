import { convertDataToMapAndArray, sumSuccessfulTestCases } from "./helpers.js";

/*
  @param {bigint} result
  @param {number[]} factors

  A line in the test data like 3267: 81 40 27 would be 3267 as result and [81, 40, 27] as factors.
*/
const validateTestCase = (result: bigint, factors: number[]): boolean => {
  const bits = 2 ** (factors.length - 1);

  for (let i = 1; i <= bits; i++) {
    let sum = BigInt(factors[0]);

    for (let j = 1; j < factors.length; j++) {
      if (i & (1 << (j - 1))) {
        sum += BigInt(factors[j]);
      } else {
        sum *= BigInt(factors[j]);
      }
    }

    if (sum === result) {
      return true;
    }
  }

  return false;
};

export default function (data: string): void {
  const testCases = convertDataToMapAndArray(data);

  const total = sumSuccessfulTestCases(testCases, validateTestCase);

  console.log(total);
}
