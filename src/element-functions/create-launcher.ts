import Konva from "konva";
import type { Body, System } from "detect-collisions";
import type { Layer } from "konva/lib/Layer";

import type { Coordinate } from "../types/coordinate";
import type { Launcher } from "../types/launcher";
import launcherPoints from "../figures/launcher-points";
import type { DetectObject } from "../types/detect-object";
import getRandomNumber from "../utilities/get-random-number";

const createLauncher = (
  position: Coordinate,
  layer: Layer,
  system: System<Body>
): Launcher => {
  const id = `launcher-${getRandomNumber(0, 1000000)}`;
  const x = position.x;
  const y = position.y;

  const hillPoints = [x, y, x + 20, y - 20, x + 50, y - 20, x + 70, y];

  const hill = new Konva.Line({
    points: hillPoints,
    stroke: "red",
    strokeWidth: 1,
    lineCap: "round",
  });

  layer.add(hill);

  const launcherStartPoint = { x: x + 35, y: y - 20 };
  const lx = launcherStartPoint.x;
  const ly = launcherStartPoint.y;

  const line = new Konva.Line({
    points: launcherPoints(lx, ly),
    stroke: "red",
    strokeWidth: 1,
    lineCap: "round",
  });

  layer.add(line);

  const detectPos = { x: x + 28, y: y - 30 };
  const detectBox = system.createBox(detectPos, 14, 10) as DetectObject;
  detectBox.data = { id: id, isTarget: true };

  const launcher: Launcher = {
    id: id,
    object: line,
    detectBody: detectBox,
    position: { x, y },
    width: 70,
    height: 20,
  };

  return launcher;
};

export default createLauncher;
