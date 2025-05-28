import type Konva from "konva";
import type { Coordinate } from "./coordinate";
import type { DetectObject } from "./detect-object";

type Launcher = {
  id: string;
  object: Konva.Line;
  detectBody?: DetectObject;
  position: Coordinate;
  width: number;
  height: number;
};

export type { Launcher };
