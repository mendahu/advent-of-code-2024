export const getCachedIndex = <T extends string | number | symbol>(
  value: T,
  array: T[],
  cache: Record<T, number>
): number => {
  if (cache[value]) {
    return cache[value];
  }

  const index = array.indexOf(value);

  cache[value] = index;

  return index;
};
