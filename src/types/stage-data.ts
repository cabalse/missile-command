import type { WavePatternKey } from "./wave-pattern";

// Stages are defined in src/stages.ts
// Each stage is either runned to its completion or the game ends when the player lose all their cities
// A stage is made up of a number of waves (WAVE_LIMIT) or a set number of missiles (MISSILE_LIMIT)
// or a time limit (TIME_LIMIT), Whichever comes first. When a stage is completed, the next stage is started.
// When the number of defined stages is completed, the game ends.
// A Wave is defined by a WAVE_PATTERN, which determines how the missiles are launched.
// A Wave is complete when the MAX_MISSILES_IN_WAVE is reached.
// If neither WAVE_LIMIT, MISSILE_LIMIT or TIME_LIMIT is reched (or not set) the next wave is started.
// When the WAVE_LIMIT is reached, the next stage is started.
// If the number of Wave Patterns is less than the number of waves, the Patterns are repeated.

type StageData = {
  ID: number;
  TITLE: string;
  TIME_LIMIT: number; // in seconds, 0 means no limit
  MISSILE_LIMIT: number; // maximum number of missiles allowed, 0 means no limit
  WAVE_LIMIT: number; // maximum number of waves, 0 means no limit
  MISSILE_SPEED: number; // speed of enemy missiles
  MAX_MISSILES_IN_WAVE: number; // maximum number of missiles in a wave
  WAVE_PATTERN: WavePatternKey[]; // key for the wave pattern, if empty, the Random pattern is used
};

export type { StageData };
