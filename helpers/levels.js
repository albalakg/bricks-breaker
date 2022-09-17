import Brick from './brick.js'

export function buildLevel(game, level) {
  if (!level) return false;

  let bricks = [];
  level.forEach((row, rowI) => {
    row.forEach((brick, brickI) => {
      let position = {
        x: 50 * brickI,
        y: 50 + 20 * rowI
      };
      if (brick === 1) {
        bricks.push(new Brick(game, position));
      }
    });
  });
  return bricks;
}

export const Speed = [
  8, 10, 12
];

export const Level1 = [
  [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const Level2 = [
  [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const Level3 = [
  [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];