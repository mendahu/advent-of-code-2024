import { convertToNestedArray } from "../../helpers/convertToNestedArray.js";
import { fetchGuardPosition, Guard, Lab } from "./helpers.js";

export default function (data: string): void {
  const grid = convertToNestedArray(data);

  const lab = new Lab(grid);

  const guardPosition = fetchGuardPosition(grid);

  const guard = new Guard(guardPosition[0], guardPosition[1], "N");

  let onMap = true;

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

  console.log(lab.getVisitedTiles().length);
}
