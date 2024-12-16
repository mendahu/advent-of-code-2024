import { Factory, FactoryTile, parseFactory } from "./helpers.js";

const getGPSCoordinateScore = (factory: FactoryTile): number => {
  return factory.isCountableBox() ? 100 * factory.y + factory.x : 0;
};

const sumGPSCoordinateScores = (factory: Factory): number => {
  let sum = 0;

  factory.loop((tile) => {
    sum += getGPSCoordinateScore(tile);
  });

  return sum;
};

export default function (data: string): void {
  const [factory, moves] = parseFactory(data);

  for (const move of moves) {
    factory.executeMove(move);
  }

  const score = sumGPSCoordinateScores(factory);

  console.log(score);
}
