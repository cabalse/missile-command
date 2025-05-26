import type Konva from "konva";
import type { Coordinate } from "./coordinate";
import type { Box } from "detect-collisions";

type Launcher = {
  id: string;
  object: Konva.Line;
  detectBody?: Box;
  position: Coordinate;
  width: number;
  height: number;
};

export type { Launcher };
