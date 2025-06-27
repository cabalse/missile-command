import Konva from "konva";
import { DIMENSIONS } from "../constants";
import type { Body, System } from "detect-collisions";
import type { DetectObject } from "../types/detect-object";

const setUpFrame = (layer: Konva.Layer, system: System<Body>): void => {
  var frame = new Konva.Line({
    points: [
      0,
      0,
      0,
      DIMENSIONS.HEIGHT,
      DIMENSIONS.WIDTH,
      DIMENSIONS.HEIGHT,
      DIMENSIONS.WIDTH,
      0,
      0,
      0,
    ],
    stroke: "red",
    strokeWidth: 2,
    dash: [10, 5],
  });

  layer.add(frame);

  const lineStart = { x: 0, y: DIMENSIONS.HEIGHT - 20 };
  const lineEnd = { x: DIMENSIONS.WIDTH, y: DIMENSIONS.HEIGHT - 20 };

  var line = new Konva.Line({
    points: [lineStart.x, lineStart.y, lineEnd.x, lineEnd.y],
    stroke: "red",
    strokeWidth: 1,
    lineCap: "round",
  });

  const lineDetect = system.createLine(lineStart, lineEnd) as DetectObject;
  lineDetect.data = {
    isGround: true,
  };

  layer.add(line);
};

export default setUpFrame;
