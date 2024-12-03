export default function (data: string): void {
  const removeNewLinesRegex = new RegExp(/\n/g);

  const noNewLinesData = data.replaceAll(removeNewLinesRegex, "");

  const dontRemoverRegex = new RegExp(/don't\(\).*?(do\(\)|$)/g);

  const subData = noNewLinesData.trim().replaceAll(dontRemoverRegex, "");

  const regex = new RegExp(/(mul\((?<a>\d{1,3}?),(?<b>\d{1,3}?)\))/g);

  const sum = subData.matchAll(regex).reduce((acc, match) => {
    if (!match.groups) {
      throw new Error("No groups found in match");
    }

    const a = parseInt(match.groups.a);
    const b = parseInt(match.groups.b);

    return acc + a * b;
  }, 0);

  console.log(sum);
}