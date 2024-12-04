import { convertToNestedArray } from "../../helpers/convertToNestedArray.js";
import { loopThroughGrid } from "./helpers.js";

const getLetterByCoords = (
  grid: string[][],
  x: number,
  y: number
): string | undefined => {
  if (x < 0 || y < 0 || x >= grid.length || y >= grid[x].length) {
    return undefined;
  }

  return grid[x][y];
};

const getTopLeftLetter = (
  grid: string[][],
  x: number,
  y: number
): string | undefined => {
  return getLetterByCoords(grid, x - 1, y - 1);
};

const getTopRightLetter = (
  grid: string[][],
  x: number,
  y: number
): string | undefined => {
  return getLetterByCoords(grid, x + 1, y - 1);
};

const getBottomLeftLetter = (
  grid: string[][],
  x: number,
  y: number
): string | undefined => {
  return getLetterByCoords(grid, x - 1, y + 1);
};

const getBottomRightLetter = (
  grid: string[][],
  x: number,
  y: number
): string | undefined => {
  return getLetterByCoords(grid, x + 1, y + 1);
};

const checkForCross = (
  grid: string[][],
  x: number,
  y: number,
  word: string
): boolean => {
  if (word.length !== 3) {
    throw new Error("Word must be least three characters long.");
  }

  // edge check
  if (x === 0 || y === 0 || x === grid.length - 1 || y === grid[x].length - 1) {
    return false;
  }

  // Only check if middle letter matches
  if (grid[x][y] !== word[1]) {
    return false;
  }

  // left check
  if (
    getTopLeftLetter(grid, x, y) === word[0] &&
    getBottomLeftLetter(grid, x, y) === word[0] &&
    getTopRightLetter(grid, x, y) === word[2] &&
    getBottomRightLetter(grid, x, y) === word[2]
  ) {
    return true;
  }

  // right check
  if (
    getTopRightLetter(grid, x, y) === word[0] &&
    getBottomRightLetter(grid, x, y) === word[0] &&
    getTopLeftLetter(grid, x, y) === word[2] &&
    getBottomLeftLetter(grid, x, y) === word[2]
  ) {
    return true;
  }

  // top check
  if (
    getTopLeftLetter(grid, x, y) === word[0] &&
    getTopRightLetter(grid, x, y) === word[0] &&
    getBottomLeftLetter(grid, x, y) === word[2] &&
    getBottomRightLetter(grid, x, y) === word[2]
  ) {
    return true;
  }

  // bottom check
  if (
    getBottomLeftLetter(grid, x, y) === word[0] &&
    getBottomRightLetter(grid, x, y) === word[0] &&
    getTopLeftLetter(grid, x, y) === word[2] &&
    getTopRightLetter(grid, x, y) === word[2]
  ) {
    return true;
  }

  return false;
};

export default function (data: string): void {
  const grid = convertToNestedArray(data);

  let crossCount = 0;

  loopThroughGrid(grid, (grid, x, y) => {
    if (checkForCross(grid, x, y, "MAS")) {
      crossCount++;
    }
  });

  console.log(crossCount);
}
