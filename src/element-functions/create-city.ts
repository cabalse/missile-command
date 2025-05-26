import Konva from "konva";
import type { Body, System } from "detect-collisions";
import type { Layer } from "konva/lib/Layer";

import type { City } from "../types/city";
import type { Coordinate } from "../types/coordinate";
import type { DetectBox } from "../types/detect-box";

const createCity = (
  position: Coordinate,
  layer: Layer,
  system: System<Body>
): City => {
  const x = position.x;
  const y = position.y;

  const points = [
    x,
    y,
    x,
    y - 15,
    x + 5,
    y - 15,
    x + 5,
    y,
    x + 10,
    y,
    x + 10,
    y - 7,
    x + 15,
    y - 7,
    x + 15,
    y - 3,
    x + 18,
    y - 3,
    x + 18,
    y - 17,
    x + 20,
    y - 17,
    x + 27,
    y - 10,
    x + 27,
    y,
  ];

  const line = new Konva.Line({
    points: points,
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
