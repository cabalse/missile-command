import type { MissileData } from "./types/missile-data";
import type { StageData } from "./types/stage-data";
import WAVE_PATTERN from "./types/wave-pattern";

const DIMENSIONS = {
  WIDTH: 600,
  HEIGHT: 400,
};

const CONST = {
  TIME_FRAME: 1000, // Time per frame in milliseconds
  TIME_TICKS: 1000, // Time per tick in milliseconds
};

const PLAYER_MISSILE: MissileData = {
  MISSILE_SPEED: 35,
  MISSILE_LENGTH: 50,
  MISSILE_OFFSET: 0,

  MAX_MISSILES: 4,
  TIME_BETWEEN_MISSILES: 0,

  STRIKE_RADIUS: 0,
  STRIKE_SEGMENTS: 12,
  STRIKE_EXPAND_SPEED: 15,
  STRIKE_MAX_RADIUS: 25,
};

const ENEMY_MISSILE: MissileData = {
  MISSILE_SPEED: 50,
  MISSILE_LENGTH: 100,
  MISSILE_OFFSET: 0,

  MAX_MISSILES: 5,
  TIME_BETWEEN_MISSILES: 1000,

  STRIKE_RADIUS: 0,
  STRIKE_SEGMENTS: 8,
  STRIKE_EXPAND_SPEED: 30,
  STRIKE_MAX_RADIUS: 80,
};

export {
  CONST,
  DIMENSIONS,
  PLAYER_MISSILE as PLAYER_CONST,
  ENEMY_MISSILE as ENEMY_CONST,
};
