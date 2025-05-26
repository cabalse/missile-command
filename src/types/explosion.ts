import type Konva from "konva";

type Explosion = {
  id: string;
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
