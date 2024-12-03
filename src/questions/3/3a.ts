export default function (data: string): void {
  const regex = new RegExp(/(mul\((?<a>\d{1,3}?),(?<b>\d{1,3}?)\))/g);

  const matches = data.matchAll(regex);

  let sum = 0;

  for (const match of matches) {
    const { groups } = match;

    if (!groups) {
      throw new Error("No groups found in match");
    }

    const a = parseInt(groups.a);
    const b = parseInt(groups.b);

    sum += a * b;
  }

  console.log(sum);
}
