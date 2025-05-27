const WAVE_PATTERN = {
  NONE: "none",
  RANDOM: "random",
  RAIN: "rain",
  RAINBOW: "rainbow",
  SINGLE: "single",
  SPREAD: "spread",
};

type WavePatternKey = (typeof WAVE_PATTERN)[keyof typeof WAVE_PATTERN];

export default WAVE_PATTERN;
export type { WavePatternKey };
