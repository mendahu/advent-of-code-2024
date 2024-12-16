import {
  calculateNewPosition,
  parseRobotPositions,
  RobotState,
} from "./helpers.js";

const countRobotsByQuadrant = (
  positions: RobotState[],
  x: number,
  y: number
) => {
  const halfX = Math.floor(x / 2);
  const halfY = Math.floor(y / 2);

  return positions.reduce(
    (acc, robotState) => {
      const cx = robotState.x;
      const cy = robotState.y;

      if (cx < halfX && cy < halfY) {
        acc[0]++;
      } else if (cx > halfX && cy < halfY) {
        acc[1]++;
      } else if (cx < halfX && cy > halfY) {
        acc[2]++;
      } else if (cx > halfX && cy > halfY) {
        acc[3]++;
      }

      return acc;
    },
    [0, 0, 0, 0]
  );
};

export default function (data: string): void {
  const { x, y, robots } = parseRobotPositions(data);

  const newPositions = robots.map((robot) => {
    return calculateNewPosition(
      robot.x,
      robot.y,
      robot.vx,
      robot.vy,
      x,
      y,
      100
    );
  });

  const [q1, q2, q3, q4] = countRobotsByQuadrant(newPositions, x, y);
  const safetyFactor = q1 * q2 * q3 * q4;

  console.log(safetyFactor);
}
