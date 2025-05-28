import type { City } from "../types/city";
import type { Launcher } from "../types/launcher";

const removeTargetElement = (id: string, targets: (City | Launcher)[]) => {
  const index = targets.findIndex((target) => target.id === id);

  const target = targets[index];

  if (target && target.object) {
    target.object.destroy();
  }

  if (index !== -1) {
    targets.splice(index, 1);
  }
};

export default removeTargetElement;
