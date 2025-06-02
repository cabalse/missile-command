import getMoveBySpeed from "../helpers/get-move-by-speed";
import type { Explosion } from "../types/explosion";
import type { MissileData } from "../types/missile-data";
import type { SidesKey } from "../types/sides";
import getCirclePoints from "../utilities/get-circle-points";

const handleExplosions = (
  deltaTime: number,
  data: Explosion[],
  side: SidesKey,
  missileData: MissileData
) => {
  data.forEach((explosion) => {
    if (explosion.side !== side) return;

    const radius =
      explosion.radius +
      getMoveBySpeed(missileData.STRIKE_EXPAND_SPEED, deltaTime);

    explosion.object.points(
      getCirclePoints(
        { x: explosion.position.x, y: explosion.position.y },
        radius,
        missileData.STRIKE_SEGMENTS
      )
    );

    explosion.radius = radius;

    if (explosion.detectBody) {
      explosion.detectBody.setScale(radius);
    }
  });

  data.forEach((explosion) => {
    if (explosion.side !== side) return;

    if (explosion.radius > missileData.STRIKE_MAX_RADIUS) {
      const index = data.indexOf(explosion);

      if (index > -1) {
        explosion.object.destroy();
        data.splice(index, 1);
      }
    }
  });
};

export default handleExplosions;
