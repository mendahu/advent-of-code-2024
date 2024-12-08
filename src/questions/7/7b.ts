import { convertDataToMapAndArray, sumSuccessfulTestCases } from "./helpers.js";

const concat = (a: bigint, b: bigint): bigint =>
  BigInt(a.toString() + b.toString());

/*
  @param {bigint} result
  @param {number[]} factors

  A line in the test data like 3267: 81 40 27 would be 3267 as result and [81, 40, 27] as factors.
*/
const validateTestCase = (result: bigint, factors: number[]): boolean => {
  const bits = 3 ** (factors.length - 1);

  let valid = false;

  let sumCount = 0;
  let mulCount = 0;
  let concatCount = 0;

  for (let i = 1; i <= bits; i++) {
    let sum = BigInt(factors[0]);

    for (let j = 1; j < factors.length; j++) {
      const bitCheck = Math.floor((i / 3 ** (j - 1)) % 3);

      if (bitCheck === 0) {
        sum += BigInt(factors[j]);
        sumCount++;
      } else if (bitCheck === 1) {
        sum *= BigInt(factors[j]);
        mulCount++;
      } else {
        sum = concat(sum, BigInt(factors[j]));
        concatCount++;
      }
    }

    if (sum === result) {
      valid = true;
    }
  }

  let expected = (bits * (factors.length - 1)) / 3;

  if (
    sumCount !== expected ||
    mulCount !== expected ||
    concatCount !== expected
  ) {
    console.log(result, factors);
    console.log("Error: ", sumCount, mulCount, concatCount, expected);
  }

  return valid;
};

export default function (data: string): void {
  const testCases = convertDataToMapAndArray(data);

  const total = sumSuccessfulTestCases(testCases, validateTestCase);

  console.log(total);
}
