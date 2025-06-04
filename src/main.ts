import Konva from "konva";
import type { Line } from "konva/lib/shapes/Line";
import type { Rect } from "konva/lib/shapes/Rect";
import { Response, System } from "detect-collisions";

import type { Missile } from "./types/missile";
import type { Explosion } from "./types/explosion";
import type { Launcher } from "./types/launcher";
import type { City } from "./types/city";
import type { DetectObject } from "./types/detect-object";
import type { Coordinate } from "./types/coordinate";
import type { GameStateKey } from "./types/game-state";
import type { WaveData } from "./types/wave-data";
import GAME_STATE from "./types/game-state";
import SIDES from "./types/sides";

import setUpKonva from "./element-functions/setup-konva";
import handleEnemyMissiles from "./animation-functions/handle-enemy-missiles";
import handleExplosions from "./animation-functions/handle-explosions";
import CreateExplosion from "./element-functions/create-explosion";
import setupStage from "./element-functions/setup-stage";
import getTargets from "./element-functions/get-targets";
import removeMissile from "./helpers/remove-missile";
import removeTargetElement from "./helpers/remove-target-element";
import writeSentence from "./element-functions/write-sentence";
import cleanUpTextElements from "./helpers/cleanup-text-elements";
import generateWave from "./generate-wave";

import { ENEMY_CONST, PLAYER_CONST } from "./constants";

import "./style.css";

let gameState: GameStateKey = GAME_STATE.PRE_GAME;
let ticks = 0; // Current tick count
let lastTickTime = 0; // Last tick time
let currentWaveMetric: WaveData = {
  currentStage: 0,
  currentWave: 0,
  firstTick: 0,
  lastTick: 0,
  totalMissilesFired: 0,
};

let missiles: Missile[] = [];
let explosions: Explosion[] = [];
let targetElements: (City | Launcher)[] = [];
let targetPoints: Coordinate[] = [];
let textElements: (Line | Rect)[] = [];

const system = new System(); // Collision System

// Player Mouse Down Event Handler
const handleMouseDown = (
  e: Konva.KonvaEventObject<MouseEvent>,
  layer: Konva.Layer
) => {
  switch (gameState) {
    case GAME_STATE.PRE_GAME_WAIT:
      gameState = GAME_STATE.INIT;
      break;
    case GAME_STATE.RUNNING:
      const x = e.evt.offsetX;
      const y = e.evt.offsetY;
      explosions.push(
        CreateExplosion(layer, x, y, SIDES.PLAYER, system, PLAYER_CONST)
      );
      break;
    case GAME_STATE.GAME_OVER_WAIT:
      gameState = GAME_STATE.INIT;
      break;
  }
};

// Set up the Konva stage and layer, handle the player on click events
const { layer, line } = setUpKonva(system, handleMouseDown);

const handleMissileHit = (x: number, y: number) => {
  explosions.push(
    CreateExplosion(layer, x, y, SIDES.ENEMY, system, ENEMY_CONST)
  );
};

// Main Animation Loop
const anim = new Konva.Animation(function (frame) {
  if (!frame) return;

  const deltaTime = frame.timeDiff;
  if (Math.floor(frame.time) > lastTickTime) ticks += 1;

  switch (gameState) {
    case GAME_STATE.PRE_GAME: {
      textElements = writeSentence("MISSILE COMMAND", { x: 90, y: 200 }, layer);
      // textElements = writeSentence("CLICK TO START", { x: 120, y: 200 }, layer);
      gameState = GAME_STATE.PRE_GAME_WAIT;
      break;
    }
    case GAME_STATE.INIT: {
      cleanUpTextElements(textElements); // Clean up any previous text elements
      // Create the initial stage with cities and launchers, and create viable target coordinates
      targetElements = setupStage(gameState, layer, system);
      targetPoints = getTargets(targetElements);
      gameState = GAME_STATE.RUNNING;
      break;
    }
    case GAME_STATE.RUNNING: {
      // Generate the attacks in waves
      currentWaveMetric = generateWave(
        currentWaveMetric,
        ticks,
        targetPoints,
        missiles,
        layer,
        system,
        () => {
          gameState = GAME_STATE.GAME_OVER; // End the game when all waves are completed
        }
      );

      if (gameState === GAME_STATE.GAME_OVER) break;

      // Handle animations of the elements
      handleEnemyMissiles(deltaTime, missiles);
      handleExplosions(deltaTime, explosions, SIDES.ENEMY, ENEMY_CONST);
      handleExplosions(deltaTime, explosions, SIDES.PLAYER, PLAYER_CONST);

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
          removeMissile(collider.data?.id as string, missiles); // Remove the missile from the game
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

        if (collider.data?.isMissile && body.data?.isGround) {
          handleMissileHit(collider.pos.x, collider.pos.y);
          removeMissile(collider.data?.id as string, missiles);
          system.remove(collider);
        }
      });

      // Check if game is over by all Targets are destroyed
      if (targetElements.length === 0) {
        gameState = GAME_STATE.GAME_OVER;
      }
      // Check if game is over when all waves are completed
      if (
        currentWaveMetric.currentStage >= 1 &&
        currentWaveMetric.currentWave >= 3
      ) {
        gameState = GAME_STATE.GAME_OVER;
      }
      break;
    }
    case GAME_STATE.GAME_OVER: {
      // Clear all Missiles, graphics and collosion bodies
      missiles.forEach((missile) => {
        if (missile.detectBody) system.remove(missile.detectBody);
        missile.object.destroy();
      });
      missiles = [];
      // Clear all Explosions, graphics and collosion bodies
      explosions.forEach((explosion) => {
        if (explosion.detectBody) system.remove(explosion.detectBody);
        explosion.object.destroy();
      });
      explosions = [];
      // Write the game over text
      textElements = writeSentence("GAME OVER", { x: 170, y: 200 }, layer);
      gameState = GAME_STATE.GAME_OVER_WAIT;
      break;
    }
  }
}, layer);

anim.start();
