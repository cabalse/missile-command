import Konva from "konva";
import type { Explosion } from "../types/explosion";
import type { Layer } from "konva/lib/Layer";
import getCirclePoints from "../utilities/get-circle-points";
import type { FractionData } from "../types/fraction-data";
import { type SidesKey } from "../types/sides";
import type { Body, System } from "detect-collisions";
import type { DetectObject } from "../types/detect-object";

const CreateExplosion = (
  layer: Layer,
  x: number,
  y: number,
  side: SidesKey,
  system: System<Body>,
  constants: FractionData
): Explosion => {
  const center = { x, y };
  const radius = 1;
  const circlePoints = getCirclePoints(
    center,
    radius,
    constants.STRIKE_SEGMENTS
  );

  const circleDetect = system.createCircle(center, radius) as DetectObject;

  circleDetect.data = {
    isExplosion: true,
    side: side,
  };

  const explosion: Explosion = {
    id: crypto.randomUUID(),
    side: side,
    object: new Konva.Line({
      points: circlePoints,
      stroke: "red",
      strokeWidth: 1,
    }),
    detectBody: circleDetect,
    position: center,
    radius: radius,
    speed: constants.STRIKE_EXPAND_SPEED,
    duration: 0,
  };

  layer.add(explosion.object);

  return explosion;
};

export default CreateExplosion;
