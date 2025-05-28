import type Konva from "konva";
import type { SidesKey } from "./sides";
import type { DetectObject } from "./detect-object";

type Explosion = {
  id: string;
  side: SidesKey;
  object: Konva.Line;
  detectBody?: DetectObject;
  position: {
    x: number;
    y: number;
  };
  radius: number;
  speed: number;
  duration: number;
};

export type { Explosion };
