import type { WavePatternKey } from "./wave-pattern";

type StageData = {
  ID: number;
  TITLE: string;
  TIME_LIMIT: number; // in seconds, 0 means no limit
  MISSILE_LIMIT: number; // maximum number of missiles allowed, 0 means no limit
  WAVE_LIMIT: number; // maximum number of waves, 0 means no limit
  MISSILE_SPEED: number; // speed of enemy missiles
  MAX_MISSILES_IN_WAVE: number; // maximum number of missiles in a wave
  WAVE_PATTERN: WavePatternKey[]; // key for the wave pattern
};

export type { StageData };
