import type Konva from "konva";
import type { Body, System } from "detect-collisions";

import countEnemyMissiles from "./helpers/count-enemy-missiles";
import createEnemyMissile from "./element-functions/create-enemy-missile";
import componseEnemyMissileData from "./helpers/compose-enemy-missile-data";

import type { Coordinate } from "./types/coordinate";
import type { Missile } from "./types/missile";
import type { WaveData } from "./types/wave-data";
import WAVE_PATTERN from "./types/wave-pattern";

import { ENEMY_CONST } from "./constants";
import STAGES from "./stages";

const generateWave = (
  currentWaveMetric: WaveData,
  currentTick: number,
  targets: Coordinate[],
  missiles: Missile[],
  layer: Konva.Layer,
  system: System<Body>,
  endOfStagesCallback: () => void
): WaveData => {
  if (STAGES.length <= currentWaveMetric.currentStage) {
    endOfStagesCallback();
    return currentWaveMetric;
  }

  const retCurrentWaveMetric = { ...currentWaveMetric };
  const current_stage = STAGES[retCurrentWaveMetric.currentStage];

  console.log(
    retCurrentWaveMetric.currentWave,
    current_stage.WAVE_PATTERN,
    current_stage.WAVE_PATTERN[retCurrentWaveMetric.currentWave]
  );

  const current_wave_pattern =
    current_stage.WAVE_PATTERN[retCurrentWaveMetric.currentWave];
  const missilesInFlight = countEnemyMissiles(missiles);
  const elapsedTime = currentTick - retCurrentWaveMetric.firstTick;

  const reachedMaxMissilesInFlight =
    missilesInFlight > current_stage.MAX_MISSILES_IN_WAVE;

  const reachedMaxMissiles =
    current_stage.MISSILE_LIMIT != 0 &&
    retCurrentWaveMetric.totalMissilesFired >= current_stage.MISSILE_LIMIT;

  switch (current_wave_pattern) {
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
      if (!reachedMaxMissilesInFlight && !reachedMaxMissiles) {
        missiles.push(
          createEnemyMissile(
            layer,
            system,
            targets,
            componseEnemyMissileData(current_stage, ENEMY_CONST)
          )
        );
        retCurrentWaveMetric.totalMissilesFired++;
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
      if (!reachedMaxMissiles) {
        for (let i = 0; i < current_stage.MISSILE_LIMIT; i++) {
          missiles.push(
            createEnemyMissile(
              layer,
              system,
              targets,
              componseEnemyMissileData(current_stage, ENEMY_CONST)
            )
          );
          retCurrentWaveMetric.totalMissilesFired++;
        }
      }
      break;
    }
  }

  if (reachedMaxMissiles) {
    retCurrentWaveMetric.currentStage++;
    retCurrentWaveMetric.currentWave = 0;
    retCurrentWaveMetric.firstTick = currentTick;
    retCurrentWaveMetric.totalMissilesFired = 0;
  }

  return retCurrentWaveMetric;
};

export default generateWave;
