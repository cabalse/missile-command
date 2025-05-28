import Konva from "konva";
import { type Body, type System } from "detect-collisions";

import { DIMENSIONS } from "../constants";
import type { KonvaEventObject } from "konva/lib/Node";
import type { Stage } from "konva/lib/Stage";
import type { DetectObject } from "../types/detect-object";

const setUpKonva = (
  system: System<Body>,
  onClick: (e: KonvaEventObject<MouseEvent, Stage>, layer: Konva.Layer) => void
) => {
  var stage = new Konva.Stage({
    container: "app",
    width: DIMENSIONS.WIDTH,
    height: DIMENSIONS.HEIGHT,
  });

  var layer = new Konva.Layer();

  stage.on("mousedown", (e) => {
    onClick(e, layer);
  });

  stage.add(layer);

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
  layer.add(line);

  const lineDetect = system.createLine(lineStart, lineEnd) as DetectObject;
  lineDetect.data = {
    isGround: true,
  };

  return { layer: layer, line: lineDetect };
};

export default setUpKonva;
