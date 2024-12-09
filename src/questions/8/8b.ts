import { convertToNestedArray } from "../../helpers/convertToNestedArray.js";
import { AntennaMap } from "./helpers.js";

export default function (data: string): void {
  const grid = convertToNestedArray(data);

  const antennaMap = new AntennaMap(grid);

  antennaMap.mapAntinodes({ withResonance: true });

  const antinodes = antennaMap.getAllAntinodeTiles();

  console.log(antinodes.length);
}
