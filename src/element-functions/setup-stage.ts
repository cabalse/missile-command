import type { Layer } from "konva/lib/Layer";
import type { Body, System } from "detect-collisions";

import createCity from "./create-city";
import type { City } from "../types/city";
import { DIMENSIONS } from "../constants";
import createLauncher from "./create-launcher";
import type { Launcher } from "../types/launcher";

const setupStage = (
  stage: string,
  layer: Layer,
  system: System<Body>
): (City | Launcher)[] => {
  const cities: City[] = [];
  const launchers: Launcher[] = [];

  let base = 379;
  let xDistance = 70;
  let amount = 5;
  let widthOfTarget = 40;

  let widthCenter = DIMENSIONS.WIDTH / 2;
  let cityCenter = (xDistance * amount - widthOfTarget) / 2;
  let xStart = widthCenter - cityCenter;

  for (let i = 0; i < amount; i++) {
    cities.push(
      createCity({ x: xStart + (xDistance * i + 1), y: base }, layer, system)
    );
  }

  launchers.push(
    createLauncher(
      { x: widthCenter - cityCenter - 100, y: base },
      layer,
      system
    )
  );
  launchers.push(
    createLauncher({ x: widthCenter + cityCenter + 40, y: base }, layer, system)
  );

  return [...cities, ...launchers];
};

export default setupStage;
