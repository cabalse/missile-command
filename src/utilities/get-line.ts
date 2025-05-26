import type { Coordinate } from "../types/coordinate";
import type { LineStartEndPoint } from "../types/line-start-endpoint";
import pointAlongLine from "./point-along-line";

const getLine = (
  start: Coordinate,
  end: Coordinate,
  length: number,
  offset: number
): LineStartEndPoint => {
  const startPoint = pointAlongLine(start, end, offset);
  const endPoint = pointAlongLine(start, end, offset - length);
  return { startPoint, endPoint };
};

export default getLine;
