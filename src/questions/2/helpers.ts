export const isSafe = (report: number[]): boolean => {
  if (report[0] < report[1]) {
    report.reverse();
  }

  for (let i = 0; i < report.length; i++) {
    const step = report[i] - report[i + 1];

    if (step < 1 || step > 3) {
      return false;
    }
  }

  return true;
};
