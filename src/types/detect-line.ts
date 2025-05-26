import type { Line } from "detect-collisions";

type DetectLine = Line & {
  data?: Record<string, unknown>;
};

export type { DetectLine };
