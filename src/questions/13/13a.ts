import { calculateTokens, parseClawGames } from "./helpers.js";

export default function (data: string): void {
  const games = parseClawGames(data);

  const minTokens = calculateTokens(games);

  console.log(minTokens);
}
