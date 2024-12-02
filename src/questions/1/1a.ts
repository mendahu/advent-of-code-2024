import { parseStringAsInt } from "./helpers.js";

export default function (data: string): void {
  const rows = data.split("\n");

  const firstIds = [];
  const secondIds = [];

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

  firstIds.sort();
  secondIds.sort();

  const diffs = [];

  for (let i = 0; i < firstIds.length; i++) {
    const diff = Math.abs(firstIds[i] - secondIds[i]);
    diffs.push(diff);
  }

  const sum = diffs.reduce((acc, curr) => acc + curr, 0);

  console.log(sum);
}
