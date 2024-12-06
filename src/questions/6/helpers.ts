class Obstruction {
  N: boolean;
  E: boolean;
  S: boolean;
  W: boolean;
  is: boolean;

  constructor(is: boolean) {
    this.N = false;
    this.E = false;
    this.S = false;
    this.W = false;
    this.is = is;
  }
}

export class LabTile {
  private obstruction: Obstruction;

  constructor(
    obstruction: boolean,
    private visited: boolean,
    private coords: [number, number]
  ) {
    this.obstruction = new Obstruction(obstruction);
  }

  isObstructed(): boolean {
    return this.obstruction.is;
  }

  hasBeenVisited(): boolean {
    return this.visited;
  }

  visit(): void {
    this.visited = true;
  }

  markObstruction(from: "N" | "E" | "S" | "W"): void {
    this.obstruction[from] = true;
  }

  hasObstructed(from: "N" | "E" | "S" | "W"): boolean {
    return this.obstruction[from];
  }

  getX(): number {
    return this.coords[0];
  }

  getY(): number {
    return this.coords[1];
  }
}

export class Lab {
  private lab: LabTile[][];

  constructor(grid: string[][]) {
    this.lab = grid.map((row, y) =>
      row.map((cell, x) => new LabTile(cell === "#", false, [x, y]))
    );
  }

  setLab(lab: LabTile[][]): void {
    this.lab = lab;
  }

  getTile(x: number, y: number): LabTile {
    if (x < 0 || y < 0 || x >= this.lab.length || y >= this.lab[x].length) {
      throw new Error("Tile is out of bounds.");
    }

    return this.lab[y][x];
  }

  getVisitedTiles(): LabTile[] {
    return this.lab
      .flat()
      .filter((tile) => tile.hasBeenVisited() && !tile.isObstructed());
  }

  addObstruction(x: number, y: number): void {
    this.lab[y][x] = new LabTile(true, false, [x, y]);
  }
}

export class Guard {
  constructor(
    private x: number,
    private y: number,
    private direction: "N" | "E" | "S" | "W"
  ) {}

  advance(): void {
    switch (this.direction) {
      case "N":
        this.y--;
        break;
      case "E":
        this.x++;
        break;
      case "S":
        this.y++;
        break;
      case "W":
        this.x--;
        break;
    }
  }

  turnRight(): void {
    switch (this.direction) {
      case "N":
        this.direction = "E";
        break;
      case "E":
        this.direction = "S";
        break;
      case "S":
        this.direction = "W";
        break;
      case "W":
        this.direction = "N";
        break;
    }
  }

  getCurrentTileCoords(): [number, number] {
    return [this.x, this.y];
  }

  getNextTileCoords(): [number, number] {
    switch (this.direction) {
      case "N":
        return [this.x, this.y - 1];
      case "E":
        return [this.x + 1, this.y];
      case "S":
        return [this.x, this.y + 1];
      case "W":
        return [this.x - 1, this.y];
    }
  }

  getCurrentDirection(): "N" | "E" | "S" | "W" {
    return this.direction;
  }
}

export const fetchGuardPosition = (grid: string[][]): [number, number] => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "^") {
        return [x, y];
      }
    }
  }

  throw new Error("No guard found on the map.");
};
