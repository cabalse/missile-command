import Konva from "konva";
import { Response, System } from "detect-collisions";

import type { Missile } from "./types/missile";
import type { Explosion } from "./types/explosion";
import type { Launcher } from "./types/launcher";
import type { City } from "./types/city";

import { CONST, ENEMY_CONST, PLAYER_CONST } from "./constants";
import SIDES from "./types/sides";

import setUpKonva from "./element-functions/setup-konva";
import handleEnemyMissiles from "./animation-functions/handle-enemy-missiles";
import handleExplosions from "./animation-functions/handle-explosions";
import CreateExplosion from "./element-functions/create-explosion";
import setupStage from "./element-functions/setup-stage";
import generateAttacks from "./generate-attacks";
import getTargets from "./element-functions/get-targets";
import removeMissile from "./helpers/remove-missile";
import removeTargetElement from "./helpers/remove-target-element";

import "./style.css";
import type { DetectObject } from "./types/detect-object";
import type { Coordinate } from "./types/coordinate";
import writeSentence from "./element-functions/write-sentence";
import type { Line } from "konva/lib/shapes/Line";
import type { Rect } from "konva/lib/shapes/Rect";
import handleText from "./animation-functions/handle-text";

let gameState = "init";
let stage = 0;
let lastTick = 0;
let ticks = 0;

const missiles: Missile[] = [];
const explosions: Explosion[] = [];
let targetElements: (City | Launcher)[] = [];
let targetPoints: Coordinate[] = [];
let textElements: (Line | Rect)[] = [];

const system = new System(); // Collision System

// Player Mouse Down Event Handler
const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
  const x = e.evt.offsetX;
  const y = e.evt.offsetY;
  explosions.push(
    CreateExplosion(layer, x, y, SIDES.PLAYER, system, PLAYER_CONST)
  );
};

// Set up the Konva stage and layer, handle the player on click events
const { layer, line } = setUpKonva(system, handleMouseDown);

textElements = writeSentence("MISSILE COMMANDE", { x: 55, y: 100 }, layer);

const handleMissileHit = (x: number, y: number) => {
  explosions.push(
    CreateExplosion(layer, x, y, SIDES.ENEMY, system, ENEMY_CONST)
  );
};

// Create the initial stage with cities and launchers, and create viable target coordinates
targetElements = setupStage(gameState, layer, system);
targetPoints = getTargets(targetElements);

// Main Animation Loop
const anim = new Konva.Animation(function (frame) {
  if (!frame) return;

  const deltaTime = frame.timeDiff / CONST.TIME_FRAGMENT;
  if (Math.floor(frame.time) > lastTick) ticks += 1;

  // Generate the attacks
  lastTick = generateAttacks(
    stage,
    Math.floor(frame.time),
    lastTick,
    layer,
    system,
    targetPoints,
    missiles
  );

  // Handle animations of the elements
  handleEnemyMissiles(deltaTime, missiles);
  handleExplosions(deltaTime, explosions, SIDES.ENEMY, ENEMY_CONST);
  handleExplosions(deltaTime, explosions, SIDES.PLAYER, PLAYER_CONST);
  handleText(ticks, textElements);
  // Handle collosion detection
  system.checkAll(({ a, b }: Response) => {
    const body = a as DetectObject;
    const collider = b as DetectObject;

    // Collision between an ENEMY MISSILE and a TARGET
    if (
      collider.data?.isMissile &&
      collider.data?.side === SIDES.ENEMY &&
      body.data?.isTarget
    ) {
      handleMissileHit(collider.pos.x, collider.pos.y); // Create explosion at the target hit
      removeTargetElement(body.data?.id as string, targetElements); // Remove the target element from the game
      targetPoints = getTargets(targetElements); // Update the target points after removing the target
      system.remove(body); // Remove the target body from the collision system
      system.remove(collider); // Remove the missile body from the collision system
    }

    // Collision between a PLAYER MISSILE and a ENEMY MISSILE
    if (
      collider.data?.isExplosion &&
      collider.data?.side === SIDES.PLAYER &&
      body.data?.isMissile &&
      body.data?.side === SIDES.ENEMY
    ) {
      removeMissile(body.data?.id as string, missiles);
      system.remove(body);
      system.remove(collider);
    }
  });

  // Check if game is over
  if (targetElements.length === 0) {
    anim.stop();
    textElements = writeSentence("GAME OVER", { x: 140, y: 100 }, layer);
  }
}, layer);

anim.start();
