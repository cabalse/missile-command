import Konva from "konva";
import { Response, System } from "detect-collisions";

import type { Missile } from "./types/missile";
import type { Explosion } from "./types/explosion";

import CONST, { ENEMY_CONST } from "./constants";

import setUpKonva from "./element-functions/setup-konva";
import createEnemyMissile from "./element-functions/create-enemy-missile";
import handleEnemyMissiles from "./animation-functions/handle-enemy-missiles";

import "./style.css";
import handleExplosions from "./animation-functions/handle-explosions";
import CreateExplosion from "./element-functions/create-explosion";
import type { DetectLine } from "./types/detect-line";

let gameState = "init";
let lastTick = 0;

const enemyMissiles: Missile[] = [];
const enemyExplosions: Explosion[] = [];

const system = new System();
const { layer, line } = setUpKonva(system);

const handleMissileHit = (x: number, y: number) => {
  enemyExplosions.push(CreateExplosion(layer, x, y, ENEMY_CONST));
};

// Main Animation Loop
const anim = new Konva.Animation(function (frame) {
  if (!frame) return;

  const deltaTime = frame.timeDiff / CONST.TIME_FRAGMENT;

  if (Math.floor(frame.time) > lastTick) {
    lastTick = Math.floor(frame.time) + 250;
    enemyMissiles.push(createEnemyMissile(layer, system, ENEMY_CONST));
  }

  handleEnemyMissiles(deltaTime, enemyMissiles);
  handleExplosions(deltaTime, ENEMY_CONST, enemyExplosions);

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
