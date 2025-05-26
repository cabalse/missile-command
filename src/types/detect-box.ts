import type { Box } from "detect-collisions";

type DetectBox = Box & {
  data?: Record<string, unknown>;
};

export type { DetectBox };
