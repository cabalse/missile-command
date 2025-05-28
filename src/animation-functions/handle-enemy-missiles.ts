import type { Missile } from "../types/missile";
import SIDES from "../types/sides";
import getLine from "../utilities/get-line";

const handleEnemyMissiles = (deltaTime: number, data: Missile[]) => {
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
};

export default handleEnemyMissiles;
