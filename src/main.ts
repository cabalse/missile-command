import Konva from "konva";
import { Response, System } from "detect-collisions";

import type { Missile } from "./types/missile";
import type { Explosion } from "./types/explosion";

import { CONST, ENEMY_CONST } from "./constants";

import setUpKonva from "./element-functions/setup-konva";
import handleEnemyMissiles from "./animation-functions/handle-enemy-missiles";

import "./style.css";
import handleExplosions from "./animation-functions/handle-explosions";
import CreateExplosion from "./element-functions/create-explosion";
import type { DetectLine } from "./types/detect-line";
import setupStage from "./element-functions/setup-stage";
import SIDES from "./types/sides";
import generateAttacks from "./generate-attacks";
import getTargets from "./element-functions/get-targets";

let gameState = "init";
let stage = 0;
let lastTick = 0;

const missiles: Missile[] = [];
const explosions: Explosion[] = [];

const system = new System();
const { layer, line } = setUpKonva(system);

const handleMissileHit = (x: number, y: number) => {
  explosions.push(CreateExplosion(layer, x, y, SIDES.ENEMY, ENEMY_CONST));
};

// Create the initial stage with cities and launchers, and create viable target coordinates
const targetElements = setupStage("", layer, system);
const targets = getTargets(targetElements);

// Main Animation Loop
const anim = new Konva.Animation(function (frame) {
  if (!frame) return;

  const deltaTime = frame.timeDiff / CONST.TIME_FRAGMENT;

  // Generate the attacks
  lastTick = generateAttacks(
    stage,
    Math.floor(frame.time),
    lastTick,
    layer,
    system,
    targets,
    missiles
  );

  // Handle animations of the elements
  handleEnemyMissiles(deltaTime, missiles);
  handleExplosions(deltaTime, ENEMY_CONST, explosions);

  // Handle collosion detection
  system.checkAll(({ a, b }: Response) => {
    const body = a as DetectLine;
    const collider = b as DetectLine;
    if (collider.data?.isMissile && !body.data?.isMissile) {
      handleMissileHit(collider.pos.x, collider.pos.y);
      system.remove(collider);
    }
  });
}, layer);

anim.start();
