import type { Missile } from "../types/missile";
import SIDES from "../types/sides";
import getLine from "../utilities/get-line";

const handleEnemyMissiles = (
  deltaTime: number,
  data: Missile[],
  hitCallback?: (x: number, y: number) => void
) => {
  data.forEach((missile) => {
    if (missile.side !== SIDES.ENEMY) return;

    missile.offset += missile.speed * deltaTime;

    const linePoints = getLine(
      missile.start,
      missile.target,
      missile.length,
      missile.offset
    );

    missile.object.points([
      linePoints.startPoint.x,
      linePoints.startPoint.y,
      linePoints.endPoint.x,
      linePoints.endPoint.y,
    ]);

    if (missile.detectBody) {
      missile.detectBody.setPosition(
        linePoints.startPoint.x,
        linePoints.startPoint.y
      );
    }
  });

  data.forEach((missile) => {
    missile.offset += missile.speed * deltaTime;
    const dx = missile.target.x - missile.start.x;
    const dy = missile.target.y - missile.start.y;
    const lineLength = Math.sqrt(dx * dx + dy * dy);

    // Check for target hit
    if (missile.offset > lineLength) {
      const index = data.indexOf(missile);

      if (hitCallback) {
        hitCallback(missile.target.x, missile.target.y);
      }

      if (index > -1) {
        missile.object.destroy();
        data.splice(index, 1);
      }
    }
  });
};

export default handleEnemyMissiles;
