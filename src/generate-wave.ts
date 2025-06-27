import type Konva from "konva";
import type { Body, System } from "detect-collisions";

import countEnemyMissiles from "./helpers/count-enemy-missiles";
import createEnemyMissile from "./element-functions/create-enemy-missile";
import componseEnemyMissileData from "./helpers/compose-enemy-missile-data";

import type { Coordinate } from "./types/coordinate";
import type { Missile } from "./types/missile";
import WAVE_PATTERN from "./types/wave-pattern";

import { ENEMY_CONST } from "./constants";
import STAGES from "./stages";
import displayDebugInfo from "./utilities/debug/display-debug-info";
import type { GameLoopMetrics } from "./types/enemy-attack-data";

const generateWave = (
  enemyAttackData: GameLoopMetrics,
  currentTick: number,
  targets: Coordinate[],
  missiles: Missile[],
  layer: Konva.Layer,
  system: System<Body>,
  endOfWaveCallback: () => void,
  endOfStageCallback: () => void,
  endOfAllStagesCallback: () => void
): GameLoopMetrics => {
  // Copy the Metric Object
  const retEnemyAttackData = { ...enemyAttackData };

  let currentStage = STAGES[enemyAttackData.currentStage];
  let currentWave = enemyAttackData.currentWave;

  // Misc Information
  const waveTime = currentTick - enemyAttackData.firstWaveTick; // Current time in Wave, in ticks
  let missilesInFlight = countEnemyMissiles(missiles); // The amount of missiles currently in flight
  let missilesFiredInWave = retEnemyAttackData.totalMissilesFired; // Total missiles fired in the current wave

  // Stage
  const stages = STAGES.length; // Total number of stages

  // Wave
  const waves = currentStage.WAVE_PATTERN.length; // Total number of waves in the current stage
  const currentWavePattern =
    currentStage.WAVE_PATTERN[enemyAttackData.currentWave] ||
    WAVE_PATTERN.RANDOM;

  // Triggers
  const lastStage = enemyAttackData.currentStage === stages - 1;
  const reachedMaxMissilesInFlight =
    missilesInFlight >= currentStage.MAX_MISSILES_IN_FLIGHT;
  const reachedMaxMissilesInWave =
    currentStage.MAX_MISSILES_IN_WAVE != 0 &&
    enemyAttackData.totalMissilesFired >= currentStage.MAX_MISSILES_IN_WAVE;
  const reachedMaxMissilesInStage =
    currentStage.MISSILE_LIMIT != 0 &&
    enemyAttackData.totalMissilesFired >= currentStage.MISSILE_LIMIT;
  const allTargetsDestroyed = targets.length === 0;
  const missilesStillInFlight = missiles.length > 0;

  switch (currentWavePattern) {
    case WAVE_PATTERN.NONE: {
      break;
    }
    case WAVE_PATTERN.RAIN: {
      break;
    }
    case WAVE_PATTERN.RAINBOW: {
      break;
    }
    case WAVE_PATTERN.RANDOM: {
      if (
        !reachedMaxMissilesInFlight &&
        !reachedMaxMissilesInWave &&
        !reachedMaxMissilesInStage
      ) {
        missiles.push(
          createEnemyMissile(
            layer,
            system,
            targets,
            componseEnemyMissileData(currentStage, ENEMY_CONST)
          )
        );
        retEnemyAttackData.totalMissilesFired++;
      }
      break;
    }
    case WAVE_PATTERN.SINGLE: {
      break;
    }
    case WAVE_PATTERN.SPREAD: {
      break;
    }
    case WAVE_PATTERN.ANNIHILATION: {
      if (!reachedMaxMissilesInWave) {
        for (let i = 0; i < currentStage.MISSILE_LIMIT; i++) {
          missiles.push(
            createEnemyMissile(
              layer,
              system,
              targets,
              componseEnemyMissileData(currentStage, ENEMY_CONST)
            )
          );
          retEnemyAttackData.totalMissilesFired++;
        }
      }
      break;
    }
  }

  displayDebugInfo(
    `<table>
      <tr><td>Stage</td><td></td></tr>
      <tr><td>Number of stages:</td><td>${stages}</td></tr>
      <tr><td>Current stage:</td><td>${currentStage.TITLE}</td></tr>
      <tr><td>Missile limit:</td><td>${currentStage.MISSILE_LIMIT}</td></tr>
      <tr><td>Time limit:</td><td>${currentStage.TIME_LIMIT}</td></tr>
      <tr><td>Wave limit:</td><td>${currentStage.WAVE_LIMIT}</td></tr>
      <tr style="height: 10px"><td></td><td></td></tr>
      
      <tr><td>Wave</td><td></td></tr>
      <tr><td>Number of Waves:</td><td>${waves}</td></tr>
      <tr><td>Number:</td><td>${currentWave}</td></tr>
      <tr><td>Pattern:</td><td>${currentWavePattern}</td></tr>
      <tr><td>Missiled fired in wave:</td><td>${missilesFiredInWave}</td></tr>
      <tr style="height: 10px"><td></td><td></td></tr>

      <tr><td>Misc Info</td><td></td></tr>
      <tr><td>Elapsed time</td><td>${waveTime}</td></tr>
      <tr><td>Missiles in flight:</td><td>${missilesInFlight}</td></tr>
      <tr><td>:</td><td>${"-"}</td></tr>
      <tr style="height: 10px"><td></td><td></td></tr>

      <tr><td>Triggers</td><td></td></tr>
      <tr><td>Last stage:</td><td>${lastStage}</td></tr>
      <tr><td>Last wave:</td><td>${lastWave}</td></tr>
      <tr><td>Max missiles in flight:</td><td>${reachedMaxMissilesInFlight}</td></tr>
      <tr><td>Max missiles in wave:</td><td>${reachedMaxMissilesInWave}</td></tr>
      <tr><td>Max missiles in stage:</td><td>${reachedMaxMissilesInStage}</td></tr>
      <tr><td>Missiles still in flight:</td><td>${missilesStillInFlight}</td></tr>
      <tr><td>All targets destroyed:</td><td>${allTargetsDestroyed}</td></tr>
      <tr style="height: 10px"><td></td><td></td></tr>
    </table>`
  );

  return retEnemyAttackData;
};

export default generateWave;
