import Konva from "konva";
import type { Body, System } from "detect-collisions";
import type { Layer } from "konva/lib/Layer";

import type { City } from "../types/city";
import type { Coordinate } from "../types/coordinate";
import type { DetectBox } from "../types/detect-box";
import CityPoints from "../figures/city-points";

const createCity = (
  position: Coordinate,
  layer: Layer,
  system: System<Body>
): City => {
  const x = position.x;
  const y = position.y;

  const line = new Konva.Line({
    points: CityPoints(x, y),
    stroke: "red",
    strokeWidth: 1,
    lineCap: "round",
  });

  layer.add(line);

  const detectPos = { x: x, y: y - 17 };
  const detectBox = system.createBox(detectPos, 27, 17) as DetectBox;

  const city: City = {
    id: `city-${Date.now()}`,
    object: line,
    detectBody: detectBox,
    position: { x, y },
    width: 27,
    height: 10,
  };

  return city;
};

export default createCity;
