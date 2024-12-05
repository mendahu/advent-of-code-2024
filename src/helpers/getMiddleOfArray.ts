export const getMiddleOfArray = <T>(arr: T[]): T => {
  if (arr.length % 2 === 0) {
    throw new Error("Array must have an odd number of elements");
  }

  return arr[Math.floor(arr.length / 2)];
};
