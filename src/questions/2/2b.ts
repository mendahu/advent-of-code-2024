import { isSafe } from "./helpers.js";

export default function (data: string): void {
  const safeCount = data
    .split("\n")
    .map((report) => report.split(" ").map(Number))
    .filter((report) => {
      for (let i = 0; i < report.length; i++) {
        const clonedReport = [...report];

        // remove the current element
        clonedReport.splice(i, 1);

        if (isSafe(clonedReport)) {
          return true;
        }
      }

      return false;
    }).length;

  console.log(safeCount);
}
