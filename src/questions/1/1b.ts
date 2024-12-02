import { parseStringAsInt } from "./helpers.js";

export default function (data: string): void {
  const rows = data.split("\n");

  const firstIds = [];
  const secondIds = [];

  const similarityMap: Record<number, number> = {};

  try {
    for (const row of rows) {
      const [first, second] = row.split("   ");

      const firstId = parseStringAsInt(first);
      const secondId = parseStringAsInt(second);
      firstIds.push(firstId);
      secondIds.push(secondId);
    }
  } catch (error) {
    console.error(error);
    return;
  }

  let sum = 0;

  for (const id of firstIds) {
    if (similarityMap[id]) {
      sum += similarityMap[id];
      continue;
    }

    let count = 0;

    for (const otherId of secondIds) {
      if (id === otherId) {
        count++;
      }
    }

    similarityMap[id] = id * count;

    sum += similarityMap[id];
  }

  console.log(sum);
}
