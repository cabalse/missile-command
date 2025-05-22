import type { Coordinate } from "../types/coordinate";

function circlePoints(center: Coordinate, radius: number, segments: number) {
  const points = [];
  const angleStep = (Math.PI * 2) / segments;

  for (let i = 0; i < segments; i++) {
    const angle = i * angleStep;
    const x = center.x + Math.cos(angle) * radius;
    const y = center.y + Math.sin(angle) * radius;
    points.push(x, y);
  }

  return points;
}

export default circlePoints;
