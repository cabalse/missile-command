import type Konva from "konva";
import type { Coordinate } from "./coordinate";
import type { DetectObject } from "./detect-object";

type City = {
  id: string;
  object: Konva.Line;
  detectBody?: DetectObject;
  position: Coordinate;
  width: number;
  height: number;
};

export type { City };
