import { calculateTokens, parseClawGames } from "./helpers.js";

export default function (data: string): void {
  const games = parseClawGames(data, 10000000000000);

  const minTokens = calculateTokens(games);

  console.log(minTokens);
}
