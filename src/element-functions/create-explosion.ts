import Konva from "konva";
import type { Explosion } from "../types/explosion";
import type { Layer } from "konva/lib/Layer";
import getCirclePoints from "../utilities/get-circle-points";
import type { FractionData } from "../types/fraction-data";
import { type SidesKey } from "../types/sides";

const CreateExplosion = (
  layer: Layer,
  x: number,
  y: number,
  side: SidesKey,
  constants: FractionData
): Explosion => {
  const explosion: Explosion = {
    id: crypto.randomUUID(),
    side: side,
    object: new Konva.Line({
      points: getCirclePoints({ x, y }, 1, constants.STRIKE_SEGMENTS),
      stroke: "red",
      strokeWidth: 1,
    }),
    position: { x, y },
    radius: 1,
    speed: constants.STRIKE_EXPAND_SPEED,
    duration: 0,
  };

  layer.add(explosion.object);

  return explosion;
};

export default CreateExplosion;
