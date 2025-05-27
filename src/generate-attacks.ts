import type { Body, System } from "detect-collisions";
import { CONST, ENEMY_CONST } from "./constants";
import type { Missile } from "./types/missile";
import type Konva from "konva";
import createEnemyMissile from "./element-functions/create-enemy-missile";
import type { Coordinate } from "./types/coordinate";

const generateAttacks = (
  stage: number,
  currentTime: number,
  lastTick: number,
  layer: Konva.Layer,
  system: System<Body>,
  targets: Coordinate[],
  missiles: Missile[]
): number => {
  let internalLastTick = lastTick;
  const numberOfMissiles = missiles.length;

  const tooManyMissiles = numberOfMissiles >= ENEMY_CONST.MAX_MISSILES;

  if (Math.floor(currentTime) > lastTick) {
    internalLastTick = Math.floor(currentTime) + CONST.TIME_BETWEEN_TICKS;
    if (!tooManyMissiles) {
      missiles.push(createEnemyMissile(layer, system, targets, ENEMY_CONST));
    }
  }

  return internalLastTick;
};

export default generateAttacks;
