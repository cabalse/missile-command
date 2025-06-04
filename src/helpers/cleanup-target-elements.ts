import type { City } from "../types/city";
import type { Launcher } from "../types/launcher";

const cleanupTargetElements = (targetElements: (City | Launcher)[]) => {
  targetElements.forEach((element) => {
    element.object.destroy();
  });
  targetElements = [];
};

export default cleanupTargetElements;
