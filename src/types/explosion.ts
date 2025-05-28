import type Konva from "konva";
import type { SidesKey } from "./sides";
import type { Circle } from "detect-collisions";

type Explosion = {
  id: string;
  side: SidesKey;
  object: Konva.Line;
  detectBody?: Circle;
  position: {
    x: number;
    y: number;
  };
  radius: number;
  speed: number;
  duration: number;
};

export type { Explosion };
