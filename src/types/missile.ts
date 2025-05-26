import type Konva from "konva";
import type { Coordinate } from "./coordinate";
import type { Line } from "detect-collisions";

type Missile = {
  id: string;
  object: Konva.Line;
  detectBody?: Line;
  start: Coordinate;
  target: Coordinate;
  length: number;
  speed: number;
  offset: number;
};

export type { Missile };
