export const parseStringAsInt = (str: string): number => {
  const num = parseInt(str);

  if (isNaN(num)) {
    throw new Error(`Could not parse string as number: ${str}`);
  }

  return num;
};
