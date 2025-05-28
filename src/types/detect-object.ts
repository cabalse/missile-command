import type { Box, Circle, Line } from "detect-collisions";

type DetectObject = (Line | Box | Circle) & {
  data?: Record<string, unknown>;
};

export type { DetectObject };
