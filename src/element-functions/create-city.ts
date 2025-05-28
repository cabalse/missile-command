import Konva from "konva";
import type { Body, System } from "detect-collisions";
import type { Layer } from "konva/lib/Layer";

import type { City } from "../types/city";
import type { Coordinate } from "../types/coordinate";
import CityPoints from "../figures/city-points";
import type { DetectObject } from "../types/detect-object";
import getRandomNumber from "../utilities/get-random-number";

const createCity = (
  position: Coordinate,
  layer: Layer,
  system: System<Body>
): City => {
  const id = `city-${getRandomNumber(0, 1000000)}`;
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
  const detectBox = system.createBox(detectPos, 27, 17) as DetectObject;
  detectBox.data = { id: id, isTarget: true };

  const city: City = {
    id: id,
    object: line,
    detectBody: detectBox,
    position: { x, y },
    width: 27,
    height: 10,
  };

  return city;
};

export default createCity;
