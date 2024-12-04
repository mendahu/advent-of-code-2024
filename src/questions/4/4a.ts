import { convertToNestedArray } from "../../helpers/convertToNestedArray.js";
import { loopThroughGrid } from "./helpers.js";

const checkForWord = (
  grid: string[][],
  i: number,
  j: number,
  word: string
): number => {
  const directions = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
  ];

  let count = 0;

  for (const direction of directions) {
    let x = i;
    let y = j;
    let wordIndex = 1;

    while (wordIndex < word.length) {
      x += direction.x;
      y += direction.y;

      if (x < 0 || y < 0 || x >= grid.length || y >= grid[x].length) {
        break;
      }

      if (grid[x][y] !== word[wordIndex]) {
        break;
      }

      if (wordIndex === word.length - 1) {
        count++;
      }

      wordIndex++;
    }
  }

  return count;
};

export default function (data: string): void {
  const grid = convertToNestedArray(data);

  const word = "XMAS";

  let wordCount = 0;

  loopThroughGrid(grid, (grid, x, y) => {
    if (grid[x][y] === word[0]) {
      wordCount += checkForWord(grid, x, y, word);
    }
  });

  console.log(wordCount);
}
