export class FactoryTile {
  constructor(public value: string, public x: number, public y: number) {}

  isEmpty(): boolean {
    return this.value === ".";
  }

  isWall(): boolean {
    return this.value === "#";
  }

  isSmallBox(): boolean {
    return this.value === "O";
  }

  isLargeBox(): boolean {
    return this.value === "[" || this.value === "]";
  }

  isCountableBox(): boolean {
    return this.isSmallBox() || this.value === "[";
  }

  isRobot(): boolean {
    return this.value === "@";
  }
}

export class Factory {
  constructor(private grid: FactoryTile[][]) {}

  getRobotFromFactory(): FactoryTile | undefined {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        if (this.grid[row][col].isRobot()) {
          return this.grid[row][col];
        }
      }
    }

    return undefined;
  }

  loop(
    callback: (tile: FactoryTile, x: number, y: number, grid: Factory) => void
  ): void {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        const tile = this.grid[row][col];
        callback(tile, tile.x, tile.y, this);
      }
    }
  }

  getTileByCoords(x: number, y: number): FactoryTile | undefined {
    if (this.grid[y] && this.grid[y][x]) {
      return this.grid[y][x];
    }

    return undefined;
  }

  getMovePair(
    src: FactoryTile,
    dest: FactoryTile
  ): [FactoryTile, FactoryTile] | undefined {
    // Horizontal Move, no need for new logic
    if (dest.y - src.y === 0) {
      return undefined;
    }

    const horizontalOffset = dest.value === "]" ? -1 : 1;

    const pairSrc = this.getTileByCoords(src.x + horizontalOffset, src.y);
    const pairDest = this.getTileByCoords(dest.x + horizontalOffset, dest.y);

    if (!pairSrc || !pairDest) throw new Error("Invalid pair");

    return [pairSrc, pairDest];
  }

  move(src: FactoryTile, dest: FactoryTile, isPair: boolean): void {
    if (dest.isSmallBox()) {
      const nextDest = this.getTileByCoords(
        dest.x + (dest.x - src.x),
        dest.y + (dest.y - src.y)
      );

      if (!nextDest) return;

      this.move(dest, nextDest, false);
    }

    if (dest.isLargeBox()) {
      const nextDest = this.getTileByCoords(
        dest.x + (dest.x - src.x),
        dest.y + (dest.y - src.y)
      );

      if (!nextDest) return;

      if (isPair) {
        this.move(dest, nextDest, false);
        return;
      }

      const pair = this.getMovePair(src, dest);

      if (!pair) {
        this.move(dest, nextDest, false);
      } else {
        this.move(dest, nextDest, false);
        this.move(pair[0], pair[1], true);
      }
    }

    dest.value = src.value;
    src.value = ".";
  }

  tryMove(src: FactoryTile, dest: FactoryTile, isPair: boolean): boolean {
    let canMove = false;

    if (dest.isEmpty()) {
      canMove = true;
    }

    if (dest.isWall()) {
      canMove = false;
    }

    if (dest.isSmallBox()) {
      const nextDest = this.getTileByCoords(
        dest.x + (dest.x - src.x),
        dest.y + (dest.y - src.y)
      );

      if (!nextDest) return false;

      canMove = this.tryMove(dest, nextDest, false);
    }

    if (dest.isLargeBox()) {
      const nextDest = this.getTileByCoords(
        dest.x + (dest.x - src.x),
        dest.y + (dest.y - src.y)
      );

      if (!nextDest) return false;

      if (isPair) {
        canMove = this.tryMove(dest, nextDest, false);
      } else {
        const pair = this.getMovePair(src, dest);

        if (!pair) {
          canMove = this.tryMove(dest, nextDest, false);
        } else {
          canMove =
            this.tryMove(dest, nextDest, false) &&
            this.tryMove(pair[0], pair[1], true);
        }
      }
    }

    return canMove;
  }

  executeMove(move: string): void {
    const robot = this.getRobotFromFactory();

    if (!robot) return;

    const dest = this.getTileByCoords(
      robot.x + (move === ">" ? 1 : move === "<" ? -1 : 0),
      robot.y + (move === "v" ? 1 : move === "^" ? -1 : 0)
    );

    if (dest && this.tryMove(robot, dest, false)) {
      this.move(robot, dest, false);
    }
  }

  print() {
    return this.grid
      .map((row) => row.map((tile) => tile.value).join(""))
      .join("\n");
  }
}

export const parseFactory = (
  input: string,
  options?: {
    double: boolean;
  }
): [Factory, string[]] => {
  const double = options?.double || false;

  const [map, movesString] = input.split("\n\n");

  const factory = map.split("\n").map((row, y) =>
    row
      .split("")
      .map((value, x) => {
        if (double) {
          if (value === "O") {
            return [
              new FactoryTile("[", 2 * x, y),
              new FactoryTile("]", 2 * x + 1, y),
            ];
          }

          if (value === "@") {
            return [
              new FactoryTile("@", 2 * x, y),
              new FactoryTile(".", 2 * x + 1, y),
            ];
          }

          return [
            new FactoryTile(value, 2 * x, y),
            new FactoryTile(value, 2 * x + 1, y),
          ];
        }

        return new FactoryTile(value, x, y);
      })
      .flat()
  );

  const moves = movesString
    .split("\n")
    .map((row) => row.split(""))
    .flat();

  return [new Factory(factory), moves];
};
