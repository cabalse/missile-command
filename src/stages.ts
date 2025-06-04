import type { StageData } from "./types/stage-data";
import WAVE_PATTERN from "./types/wave-pattern";

const STAGES: StageData[] = [
  {
    ID: 1,
    TITLE: "Stage 1",
    TIME_LIMIT: 0,
    MISSILE_LIMIT: 15,
    WAVE_LIMIT: 0,
    MISSILE_SPEED: 50,
    MAX_MISSILES_IN_WAVE: 5,
    WAVE_PATTERN: [WAVE_PATTERN.RANDOM],
  },
  // {
  //   ID: 2,
  //   TITLE: "Stage 2",
  //   TIME_LIMIT: 0,
  //   MISSILE_LIMIT: 100,
  //   WAVE_LIMIT: 0,
  //   MISSILE_SPEED: 0,
  //   MAX_MISSILES_IN_WAVE: 0,
  //   WAVE_PATTERN: [WAVE_PATTERN.ANNIHILATION],
  // },
];

export default STAGES;
