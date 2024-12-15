export type ClawGame = {
  a: [number, number];
  b: [number, number];
  prize: [number, number];
};

export const parseClawGames = (
  input: string,
  offset: number = 0
): ClawGame[] => {
  const games = input.split("\n\n").map((line) => {
    const [aLine, bLine, prizeLine] = line.split("\n");

    const a = aLine
      .split(": ")[1]
      .split(", ")
      .map((n) => {
        const [_, value] = n.split("+");
        return parseInt(value);
      });

    const b = bLine
      .split(": ")[1]
      .split(", ")
      .map((n) => {
        const [_, value] = n.split("+");
        return parseInt(value);
      });

    const prize = prizeLine
      .split(": ")[1]
      .split(", ")
      .map((n) => {
        const [_, value] = n.split("=");
        return parseInt(value) + offset;
      });

    const game: ClawGame = {
      a: [a[0], a[1]],
      b: [b[0], b[1]],
      prize: [prize[0], prize[1]],
    };

    return game;
  });

  return games;
};

const calculateToken = (game: ClawGame): number => {
  const prizeX = game.prize[0];
  const prizeY = game.prize[1];

  const aX = game.a[0];
  const aY = game.a[1];

  const bX = game.b[0];
  const bY = game.b[1];

  // High school was a long time ago
  const a =
    (prizeX * (bX - bY) - bX * (prizeX - prizeY)) /
    (aX * (bX - bY) + bX * (aY - aX));

  const b = (prizeX - aX * a) / bX;

  if (a === Math.floor(a) && b === Math.floor(b)) {
    return a * 3 + b;
  }

  return 0;
};

export const calculateTokens = (games: ClawGame[]): number => {
  let minTokens = 0;

  for (const game of games) {
    minTokens += calculateToken(game);
  }

  return minTokens;
};
