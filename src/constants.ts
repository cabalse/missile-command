import type { FractionData } from "./types/fraction-data";
import type { StageData } from "./types/stage-data";
import WAVE_PATTERN from "./types/wave-pattern";

const DIMENSIONS = {
  WIDTH: 600,
  HEIGHT: 400,
};

const CONST = {
  TIME_FRAGMENT: 400, // milliseconds
  TIME_BETWEEN_TICKS: 1000, // milliseconds
};

const PLAYER_CONST: FractionData = {
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

const ENEMY_CONST: FractionData = {
  MISSILE_SPEED: 7,
  MISSILE_LENGTH: 100,
  MISSILE_OFFSET: 0,

  MAX_MISSILES: 5,
  TIME_BETWEEN_MISSILES: 1000,

  STRIKE_RADIUS: 0,
  STRIKE_SEGMENTS: 8,
  STRIKE_EXPAND_SPEED: 30,
  STRIKE_MAX_RADIUS: 80,
};

const STAGE_CONST: StageData[] = [
  {
    ID: 0,
    TITLE: "Stage 1",
    TIME_LIMIT: 0,
    MISSILE_LIMIT: 0,
    WAVE_LIMIT: 0,
    MISSILE_SPEED: 0,
    MAX_MISSILES_IN_WAVE: 0,
    WAVE_PATTERN: [WAVE_PATTERN.RANDOM],
  },
];

export { CONST, DIMENSIONS, PLAYER_CONST, ENEMY_CONST, STAGE_CONST };
