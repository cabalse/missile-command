import type { Coordinate } from "../types/coordinate";

function pointAlongLine(start: Coordinate, end: Coordinate, length: number) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance === 0) {
    return { x: start.x, y: start.y }; // Edge case: start and end are the same
  }

  const ratio = length / distance;

  return {
    x: start.x + dx * ratio,
    y: start.y + dy * ratio,
  };
}

export default pointAlongLine;
