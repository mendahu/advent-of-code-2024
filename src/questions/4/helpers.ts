export const loopThroughGrid = (
  grid: string[][],
  callback: (grid: string[][], x: number, y: number) => void
): number => {
  let count = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      callback(grid, x, y);
    }
  }

  return count;
};
