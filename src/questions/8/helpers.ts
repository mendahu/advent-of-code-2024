class Antinode {
  constructor(private source: string, private coords: [number, number]) {}
}

class MapTile {
  private antinodes: Antinode[] = [];

  constructor(private value: string, public coords: [number, number]) {}

  isAntinode(): boolean {
    return this.antinodes.length > 0;
  }

  addAntinode(source: string, coords: [number, number]): void {
    this.antinodes.push(new Antinode(source, coords));
  }
}

export class AntennaMap {
  private antennaMap: MapTile[][] = [];
  private antennas: Record<string, MapTile[]> = {};

  constructor(grid: string[][]) {
    this.antennaMap = grid.map((row, y) =>
      row.map((cell, x) => {
        const mapTile = new MapTile(cell, [x, y]);
        if (cell !== ".") {
          if (!this.antennas[cell]) {
            this.antennas[cell] = [];
          }
          this.antennas[cell].push(mapTile);
        }
        return mapTile;
      })
    );
  }

  getWidth(): number {
    return this.antennaMap[0].length;
  }

  getHeight(): number {
    return this.antennaMap.length;
  }

  getTile(x: number, y: number): MapTile | undefined {
    const row = this.antennaMap[y];
    if (row) {
      return row[x];
    } else {
      return undefined;
    }
  }

  getAntinodes(
    coordsA: [number, number],
    coordsB: [number, number]
  ): [number, number][] {
    const xDiff = coordsB[0] - coordsA[0];
    const yDiff = coordsB[1] - coordsA[1];

    const antinode1: [number, number] = [
      coordsA[0] - xDiff,
      coordsA[1] - yDiff,
    ];
    const antinode2: [number, number] = [
      coordsB[0] + xDiff,
      coordsB[1] + yDiff,
    ];

    return [antinode1, antinode2];
  }

  getResonantAntinodes(
    coordsA: [number, number],
    coordsB: [number, number]
  ): [number, number][] {
    const nodes: [number, number][] = [coordsA];

    const xDiff = coordsB[0] - coordsA[0];
    const yDiff = coordsB[1] - coordsA[1];

    const getNextNode = (
      node: [number, number],
      xDiff: number,
      yDiff: number
    ): void => {
      const nextNode: [number, number] = [node[0] + xDiff, node[1] + yDiff];

      if (this.getTile(nextNode[0], nextNode[1])) {
        nodes.push(nextNode);
        getNextNode(nextNode, xDiff, yDiff);
      }
    };

    getNextNode(coordsA, xDiff, yDiff);
    getNextNode(coordsB, -xDiff, -yDiff);

    return nodes;
  }

  mapAntinodes(options?: { withResonance: boolean }): void {
    Object.keys(this.antennas).forEach((antenna) => {
      const tiles = this.antennas[antenna];

      for (let i = 0; i < tiles.length; i++) {
        for (let j = i + 1; j < tiles.length; j++) {
          const antennaA = tiles[i];
          const antennaB = tiles[j];

          const antinodes = options?.withResonance
            ? this.getResonantAntinodes(antennaA.coords, antennaB.coords)
            : this.getAntinodes(antennaA.coords, antennaB.coords);

          for (const antinode of antinodes) {
            const tile = this.getTile(antinode[0], antinode[1]);

            if (tile) {
              tile.addAntinode(antenna, antinode);
            }
          }
        }
      }
    });
  }

  getAllAntinodeTiles(): MapTile[] {
    return this.antennaMap.flat().filter((mapTile) => mapTile.isAntinode());
  }
}
