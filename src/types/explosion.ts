import type Konva from "konva";
import type { SidesKey } from "./sides";

type Explosion = {
  id: string;
  side: SidesKey;
  object: Konva.Line;
  position: {
    x: number;
    y: number;
  };
  radius: number;
  speed: number;
  duration: number;
};

export type { Explosion };
