import { convertToNestedArray } from "../../helpers/convertToNestedArray.js";
import { loopThroughGrid } from "../4/helpers.js";

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const getTrailScores = (grid: string[][]): number => {
  let trailScores = 0;

  loopThroughGrid(grid, (value, x, y) => {
    const summits = new Set<string>();

    const getTrailScore = (grid: string[][], x: number, y: number): number => {
      const currentElevation = parseInt(grid[y][x]);
      const targetElevation = currentElevation + 1;

      let score = 0;

      for (const [dx, dy] of directions) {
        let checkX = x + dx;
        let checkY = y + dy;

        if (
          checkX < 0 ||
          checkX >= grid[0].length ||
          checkY < 0 ||
          checkY >= grid.length
        ) {
          continue;
        }

        const nextElevation = parseInt(grid[checkY][checkX]);

        if (nextElevation === targetElevation) {
          if (nextElevation === 9) {
            if (summits.has(`${checkX},${checkY}`)) {
              continue;
            } else {
              summits.add(`${checkX},${checkY}`);
              score += 1;
            }
          } else {
            score += getTrailScore(grid, checkX, checkY);
          }
        }
      }

      return score;
    };

    if (grid[y][x] === "0") {
      trailScores += getTrailScore(grid, x, y);
    }
  });

  return trailScores;
};

export default function (data: string): void {
  const grid = convertToNestedArray(data);

  const trailScore = getTrailScores(grid);

  console.log(trailScore);
}
