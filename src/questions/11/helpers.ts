export const blinkThroughStone = (
  stone: string,
  blinks: number,
  cache: Record<string, number>
): number => {
  if (blinks === 0) {
    return 1;
  }

  const cacheString = `${stone}-${blinks}`;

  if (cache[cacheString]) {
    return cache[cacheString];
  }

  if (stone === "0") {
    const result = blinkThroughStone("1", blinks - 1, cache);
    cache[cacheString] = result;
    return result;
  } else if (stone.length % 2 === 0) {
    const half = stone.length / 2;

    const firstHalf = stone.slice(0, half);
    const secondHalf = stone.slice(half, stone.length);

    const result =
      blinkThroughStone(parseInt(firstHalf).toString(), blinks - 1, cache) +
      blinkThroughStone(parseInt(secondHalf).toString(), blinks - 1, cache);

    cache[cacheString] = result;
    return result;
  } else {
    const newValue = BigInt(stone) * 2024n;
    const result = blinkThroughStone(newValue.toString(), blinks - 1, cache);
    cache[cacheString] = result;
    return result;
  }
};
