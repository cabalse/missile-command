import type { Circle } from "detect-collisions";

type DetectCircle = Circle & {
  data?: Record<string, unknown>;
};

export type { DetectCircle };
