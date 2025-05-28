import type Konva from "konva";
import type { Coordinate } from "./coordinate";
import type { SidesKey } from "./sides";
import type { DetectObject } from "./detect-object";

type Missile = {
  id: string;
  side: SidesKey;
  object: Konva.Line;
  detectBody?: DetectObject;
  start: Coordinate;
  target: Coordinate;
  length: number;
  speed: number;
  offset: number;
};

export type { Missile };
