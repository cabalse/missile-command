import { CONST } from "../constants";

const getMoveBySpeed = (speed: number, timeDiff: number): number => {
  return (speed * timeDiff) / CONST.TIME_FRAME;
};

export default getMoveBySpeed;
