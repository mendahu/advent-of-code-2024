import { convertToNestedArray } from "../../helpers/convertToNestedArray.js";
import { fetchGuardPosition, Guard, Lab } from "./helpers.js";

// runs a simulation of the guard's route and return true if the guard completes the route or false if they are caught in a loop
const runSimulation = (
  lab: Lab,
  guard: Guard,
  addedTile: [number, number]
): boolean => {
  let onMap = true;
  let caughtInLoop = false;

  while (onMap) {
    const nextTileCoords = guard.getNextTileCoords();

    try {
      const nextTile = lab.getTile(nextTileCoords[0], nextTileCoords[1]);

      if (nextTile.isObstructed()) {
        if (nextTile.hasObstructed(guard.getCurrentDirection())) {
          caughtInLoop = true;
          break;
        }
        nextTile.markObstruction(guard.getCurrentDirection()); // mark's an obstruction as visited for loop checks
        guard.turnRight();
      } else {
        guard.advance();
      }
    } catch (err) {
      onMap = false;
      break;
    }
  }

  return caughtInLoop;
};

export default function (data: string): void {
  const grid = convertToNestedArray(data);

  const lab = new Lab(grid);

  const guardPosition = fetchGuardPosition(grid);

  const guard = new Guard(guardPosition[0], guardPosition[1], "N");

  let onMap = true;

  let loopsDiscovered = 0;

  // trace path
  while (onMap) {
    //mark guard's current position
    const currentCoords = guard.getCurrentTileCoords();
    const currentTile = lab.getTile(currentCoords[0], currentCoords[1]);
    currentTile.visit();

    const nextTileCoords = guard.getNextTileCoords();

    try {
      const nextTile = lab.getTile(nextTileCoords[0], nextTileCoords[1]);

      if (nextTile.isObstructed()) {
        guard.turnRight();
      } else {
        guard.advance();
      }
    } catch (err) {
      onMap = false;
      break;
    }
  }

  for (const tile of lab.getVisitedTiles()) {
    if (tile.getX() === guardPosition[0] && tile.getY() === guardPosition[1]) {
      continue;
    }

    //simulate obstruction here
    const simLab = new Lab(grid);
    simLab.addObstruction(tile.getX(), tile.getY());
    const simGuard = new Guard(guardPosition[0], guardPosition[1], "N");

    if (runSimulation(simLab, simGuard, [tile.getX(), tile.getY()])) {
      loopsDiscovered++;
    }
  }

  console.log("Loops Discovered:", loopsDiscovered);
}
