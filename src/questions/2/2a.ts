import { isSafe } from "./helpers.js";

export default function (data: string): void {
  const safeCount = data
    .split("\n")
    .map((report) => report.split(" ").map(Number))
    .filter(isSafe).length;

  console.log(safeCount);
}
