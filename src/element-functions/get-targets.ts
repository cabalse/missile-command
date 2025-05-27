import type { City } from "../types/city";
import type { Coordinate } from "../types/coordinate";
import type { Launcher } from "../types/launcher";

const getTargets = (targetElements: (City | Launcher)[]): Coordinate[] => {
  const targets: Coordinate[] = [];

  targetElements.forEach((element) => {
    targets.push({
      x: element.position.x + element.width / 2,
      y: element.position.y - element.height,
    });
  });

  return targets;
};

export default getTargets;
