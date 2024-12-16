export type RobotState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export const parseRobotPositions = (
  input: string
): { x: number; y: number; robots: RobotState[] } => {
  const [size, robots] = input.split("\n\n");

  const [x, y] = size.split(",").map(Number);

  const robotStates = robots.split("\n").map((robot) => {
    const [position, velocity] = robot.split(" ");

    const [x, y] = position.slice(2).split(",").map(Number);

    const [vx, vy] = velocity.slice(2).split(",").map(Number);

    return { x, y, vx, vy };
  });

  return { x, y, robots: robotStates };
};

export const calculateNewPosition = (
  x: number,
  y: number,
  dx: number,
  dy: number,
  width: number,
  height: number,
  cycles: number
): RobotState => {
  const newX = (x + dx * cycles) % width;
  const newY = (y + dy * cycles) % height;

  return {
    x: newX < 0 ? width + newX : newX,
    y: newY < 0 ? height + newY : newY,
    vx: dx,
    vy: dy,
  };
};
