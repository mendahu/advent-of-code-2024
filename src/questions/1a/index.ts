const parseStringAsInt = (str: string): number => {
  const num = parseInt(str);

  if (isNaN(num)) {
    throw new Error(`Could not parse string as number: ${str}`);
  }

  return num;
};

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
