import { blinkThroughStone } from "./helpers.js";

export default function (data: string) {
  const initialStones = data.split(" ");

  const cache: Record<string, number> = {};

  const finalStoneCount = initialStones.reduce((acc, stone) => {
    const stoneCount = blinkThroughStone(stone, 75, cache);
    acc += stoneCount;
    return acc;
  }, 0);

  console.log(finalStoneCount);
}
