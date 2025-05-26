import type { FractionData } from "./types/fraction-data";

const DIMENSIONS = {
  WIDTH: 600,
  HEIGHT: 400,
};

const CONST = {
  TIME_FRAGMENT: 100, // milliseconds

  TARGET_POINTS: [
    { x: 600 / 2, y: DIMENSIONS.HEIGHT },
    { x: DIMENSIONS.WIDTH / 4, y: DIMENSIONS.HEIGHT },
    { x: (3 * DIMENSIONS.WIDTH) / 4, y: DIMENSIONS.HEIGHT },
  ],
  LAUNCH_POINT: [
    { x: 0, y: 0 },
    { x: DIMENSIONS.WIDTH / 4, y: 0 },
    { x: (2 * DIMENSIONS.WIDTH) / 4, y: 0 },
    { x: (3 * DIMENSIONS.WIDTH) / 4, y: 0 },
    { x: DIMENSIONS.WIDTH, y: 0 },
  ],
};

const PLAYER_CONST: FractionData = {
  MISSILE_SPEED: 35,
  MISSILE_LENGTH: 50,
  MISSILE_OFFSET: 0,

  STRIKE_RADIUS: 0,
  STRIKE_SEGMENTS: 12,
  STRIKE_EXPAND_SPEED: 15,
  STRIKE_MAX_RADIUS: 50,
};

const ENEMY_CONST: FractionData = {
  MISSILE_SPEED: 10,
  MISSILE_LENGTH: 100,
  MISSILE_OFFSET: 0,

  STRIKE_RADIUS: 0,
  STRIKE_SEGMENTS: 14,
  STRIKE_EXPAND_SPEED: 7,
  STRIKE_MAX_RADIUS: 80,
};

export default CONST;
export { DIMENSIONS, PLAYER_CONST, ENEMY_CONST };
