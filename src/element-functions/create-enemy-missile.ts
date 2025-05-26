import Konva from "konva";

import CONST, { DIMENSIONS } from "../constants";
import getLine from "../utilities/get-line";
import getRandomNumber from "../utilities/get-random-number";

import type { Missile } from "../types/missile";
import type { Layer } from "konva/lib/Layer";
import type { FractionData } from "../types/fraction-data";
import type { Body, System } from "detect-collisions";
import type { DetectLine } from "../types/detect-line";

const createEnemyMissile = (
  layer: Layer,
  system: System<Body>,
  constants: FractionData
): Missile => {
  // Missile ID
  const missileID = `enemy-${Date.now()}`;

  // Create a random launch point along the top of the screen
  const launchPoint = getRandomNumber(0, DIMENSIONS.WIDTH);
  const start = {
    x: launchPoint,
    y: 0,
  };

  // Select a random target point from the predefined target points, for now! (TODO: Make this predetermined)
  const targetPoint = getRandomNumber(0, 3);
  // Define the missiles trajectories line
  const linePoints = getLine(
    start,
    CONST.TARGET_POINTS[targetPoint],
    constants.MISSILE_LENGTH,
    constants.MISSILE_OFFSET
  );

  // Create the line object for the missile
  const line = new Konva.Line({
    points: [
      linePoints.startPoint.x,
      linePoints.startPoint.y,
      linePoints.endPoint.x,
      linePoints.endPoint.y,
    ],
    stroke: "red",
    strokeWidth: 1,
    lineCap: "round",
  });

  // Create the collision detection line
  const lineDetect = system.createLine(
    linePoints.startPoint,
    linePoints.endPoint
  ) as DetectLine;

  lineDetect.data = { id: missileID, isMissile: true };

  // Create the missile object with its properties
  const missile: Missile = {
    id: missileID,
    object: line,
    detectBody: lineDetect,
    start: start,
    target: CONST.TARGET_POINTS[targetPoint],
    length: constants.MISSILE_LENGTH,
    speed: constants.MISSILE_SPEED,
    offset: constants.MISSILE_OFFSET,
  };

  // Add the missile to the system and layer
  layer.add(line);

  return missile;
};

export default createEnemyMissile;
