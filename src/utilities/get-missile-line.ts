import type { LineStartEndPoint } from "../types/line-start-endpoint";
import type { Missile } from "../types/missile";
import getLine from "./get-line";

const getMissileLine = (missile: Missile): LineStartEndPoint => {
  // const dx = missile.target.x - missile.start.x;
  // const dy = missile.target.y - missile.start.y;
  // const lineLength = Math.sqrt(dx * dx + dy * dy);

  const line = getLine(
    missile.start,
    missile.target,
    missile.length,
    missile.offset
  );

  return line;
};

export default getMissileLine;
