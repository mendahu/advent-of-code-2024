export class Plot {
  constructor(public crop: string, private counted: boolean = false) {}

  markAsCounted() {
    this.counted = true;
  }

  isCounted() {
    return this.counted;
  }
}
export const directions = [
  [0, -1], // up
  [1, 0], // right
  [0, 1], // down
  [-1, 0], // left
];

export const getPriceFromMeasurements = (
  plants: [string, { area: number; perimeter: number }][] = []
) => {
  let price = 0;

  plants.forEach(([crop, measurements]) => {
    price += measurements.area * measurements.perimeter;
  });

  return price;
};

export const recursivelyMeasureArea = (
  grid: Plot[][],
  x: number,
  y: number,
  getPermeter: (grid: Plot[][], x: number, y: number) => number
): { area: number; perimeter: number } => {
  let area = 0;
  let perimeter = 0;

  const plot = grid[y][x];

  if (!plot.isCounted()) {
    plot.markAsCounted();
    area++;
    perimeter += getPermeter(grid, x, y);

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (grid[newY]?.[newX]?.crop === plot.crop) {
        const { area: subArea, perimeter: subPerimeter } =
          recursivelyMeasureArea(grid, newX, newY, getPermeter);

        area += subArea;
        perimeter += subPerimeter;
      }
    }
  }

  return { area, perimeter };
};
