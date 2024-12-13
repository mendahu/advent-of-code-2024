import { convertToNestedArray } from "../../helpers/convertToNestedArray.js";
import { loopThroughGrid } from "../4/helpers.js";
import {
  getPriceFromMeasurements,
  Plot,
  recursivelyMeasureArea,
} from "./helpers.js";

const directions = {
  "up-left": [
    [-1, -1],
    [-1, 0],
    [0, -1],
  ],
  "up-right": [
    [1, -1],
    [1, 0],
    [0, -1],
  ],
  "down-left": [
    [-1, 1],
    [-1, 0],
    [0, 1],
  ],
  "down-right": [
    [1, 1],
    [1, 0],
    [0, 1],
  ],
};

export const getPermeter = (grid: Plot[][], x: number, y: number): number => {
  const plant = grid[y][x];
  let perimeter = 0;

  Object.entries(directions).forEach(([corner, siblings]) => {
    const cornerPlot = grid[y + siblings[0][0]]?.[x + siblings[0][1]];
    const sidePlotA = grid[y + siblings[1][0]]?.[x + siblings[1][1]];
    const sidePlotB = grid[y + siblings[2][0]]?.[x + siblings[2][1]];

    if (
      sidePlotA?.crop === plant.crop &&
      sidePlotB?.crop === plant.crop &&
      cornerPlot?.crop !== plant.crop
    ) {
      perimeter++;
      return;
    }

    if (sidePlotA?.crop !== plant.crop && sidePlotB?.crop !== plant.crop) {
      perimeter++;
    }
  });

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
