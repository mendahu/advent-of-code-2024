import {
  calculateNewPosition,
  parseRobotPositions,
  RobotState,
} from "./helpers.js";

interface GridToPrint {
  x: number;
  y: number;
}

class Display {
  private title: string = "WELOME TO ROBOT DISPLAY 9000";

  constructor(private x: number, private y: number) {
    const grid = Array.from({ length: this.y }, () =>
      Array.from({ length: this.x }, () => 0)
    );

    this.printTitle();

    for (const row of grid) {
      process.stdout.write("" + "\n");
    }
  }

  printTitle(suffix: string = "") {
    process.stdout.write(this.title + " " + suffix + "\n\n");
  }

  printGrid(
    gridToPrint: GridToPrint[],
    title: string,
    callback?: (x: number, y: number, grid: number[][]) => void
  ) {
    const grid = Array.from({ length: this.y }, () =>
      Array.from({ length: this.x }, () => 0)
    );

    gridToPrint.forEach(({ x, y }) => {
      grid[y][x]++;
    });

    process.stdout.moveCursor(0, -this.y - 2);
    this.printTitle(title);

    let hasFoundNeighbours = false;

    for (let row = 0; row < this.y; row++) {
      const string = grid[row]
        .map((cell, col) => {
          try {
            callback && callback(col, row, grid);
          } catch (err) {
            hasFoundNeighbours = true;
          }

          if (cell === 0) {
            return " ";
          }

          return "#";
        })
        .join("");

      process.stdout.cursorTo(0);
      process.stdout.clearLine(0);
      process.stdout.write(`${string}\n`);
    }

    if (hasFoundNeighbours) {
      throw new Error("Too many neighbours");
    }
  }
}

export default function (data: string): Promise<void> {
  const { x, y, robots } = parseRobotPositions(data);

  const CYCLES = 10000;

  const display = new Display(x, y);

  let i = 0;

  const hasAllNeighbours = (x: number, y: number, grid: number[][]) => {
    const MAX = 8;

    let neighbours = 0;

    const directions = [
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
    ];

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (
        newX < 0 ||
        newY < 0 ||
        newX >= grid[0].length ||
        newY >= grid.length
      ) {
        continue;
      }

      if (grid[newY][newX] > 0) {
        neighbours++;
      }
    }

    if (neighbours >= MAX) {
      throw new Error("Too many neighbours");
    }
  };

  return new Promise((resolve) => {
    const print = (positions: RobotState[]) => {
      if (i >= CYCLES) {
        return resolve();
      }

      const newPositions = positions.map((robot) => {
        return calculateNewPosition(
          robot.x,
          robot.y,
          robot.vx,
          robot.vy,
          x,
          y,
          1
        );
      });

      const title = `Cycle ${i}`;

      display.printGrid(newPositions, title, hasAllNeighbours);

      i++;

      setTimeout(() => print(newPositions), 0);
    };

    try {
      print(robots);
    } catch (err) {
      console.log("DETECTED CLUMPING");
    }
  });
}
