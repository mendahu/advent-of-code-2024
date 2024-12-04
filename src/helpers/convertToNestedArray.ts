/*
  This function will convert a string into a nested array using newlines and then individual characters as the delimiters.
*/
export const convertToNestedArray = (data: string): string[][] => {
  return data.split("\n").map((row) => row.split(""));
};
