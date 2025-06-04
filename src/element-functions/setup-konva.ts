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

  // const lineDetect = system.createLine(lineStart, lineEnd) as DetectObject;
  // lineDetect.data = {
  //   isGround: true,
  // };

  return { layer: layer };
};

export default setUpKonva;
