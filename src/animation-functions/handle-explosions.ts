import type { Explosion } from "../types/explosion";
import type { FractionData } from "../types/fraction-data";
import getCirclePoints from "../utilities/get-circle-points";

const handleExplosions = (
  deltaTime: number,
  constants: FractionData,
  data: Explosion[]
) => {
  data.forEach((explosion) => {
    if (explosion.radius >= constants.STRIKE_MAX_RADIUS) {
    }

    const radious =
      explosion.radius + constants.STRIKE_EXPAND_SPEED * deltaTime;

    explosion.object.points(
      getCirclePoints(
        { x: explosion.position.x, y: explosion.position.y },
        radious,
        constants.STRIKE_SEGMENTS
      )
    );

    explosion.radius = radious;
  });

  data.forEach((explosion) => {
    if (explosion.radius > constants.STRIKE_MAX_RADIUS) {
      const index = data.indexOf(explosion);

      if (index > -1) {
        explosion.object.destroy();
        data.splice(index, 1);
      }
    }
  });
};

export default handleExplosions;
