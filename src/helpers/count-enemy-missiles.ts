import type { Missile } from "../types/missile";
import SIDES from "../types/sides";

const countEnemyMissiles = (missiles: Missile[]): number => {
  return missiles.reduce((count, missile) => {
    if (missile.side === SIDES.ENEMY) {
      count += 1;
    }
    return count;
  }, 0);
};

export default countEnemyMissiles;
