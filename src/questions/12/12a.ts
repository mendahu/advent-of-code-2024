import { convertToNestedArray } from "../../helpers/convertToNestedArray.js";
import { loopThroughGrid } from "../4/helpers.js";
import {
  directions,
  getPriceFromMeasurements,
  Plot,
  recursivelyMeasureArea,
} from "./helpers.js";

export const getPermeter = (grid: Plot[][], x: number, y: number): number => {
  const plant = grid[y][x];
  let perimeter = 0;

  for (const [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;

    if (grid[newY]?.[newX]?.crop !== plant.crop) {
      perimeter++;
    }
  }

  return perimeter;
};

export default function (data: string) {
  const grid = convertToNestedArray(data).map((row) =>
    row.map((cell) => new Plot(cell))
  );

  const plants: [string, { area: number; perimeter: number }][] = [];

  loopThroughGrid(grid, (grid, x, y) => {
    const plot = grid[y][x];
    if (plot.isCounted()) {
      return;
    }

    const measurement = recursivelyMeasureArea(grid, x, y, getPermeter);

    plants.push([plot.crop, measurement]);
  });

  const price = getPriceFromMeasurements(plants);

  console.log(price);
}
