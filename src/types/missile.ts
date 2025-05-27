import type Konva from "konva";
import type { Coordinate } from "./coordinate";
import type { Line } from "detect-collisions";
import type { SidesKey } from "./sides";

type Missile = {
  id: string;
  side: SidesKey;
  object: Konva.Line;
  detectBody?: Line;
  start: Coordinate;
  target: Coordinate;
  length: number;
  speed: number;
  offset: number;
};

export type { Missile };
