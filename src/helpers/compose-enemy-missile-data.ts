import type { MissileData } from "../types/missile-data";
import type { StageData } from "../types/stage-data";

const componseEnemyMissileData = (
  stageData: StageData,
  missileData: MissileData
): MissileData => {
  const ret = { ...missileData };
  ret.MISSILE_SPEED = stageData.MISSILE_SPEED;
  return ret;
};

export default componseEnemyMissileData;
