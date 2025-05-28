import type { Missile } from "../types/missile";

const removeMissile = (id: string, missiles: Missile[]) => {
  const index = missiles.findIndex((missile) => missile.id === id);

  const missile = missiles[index];

  if (missile && missile.object) {
    missile.object.destroy();
  }

  if (index !== -1) {
    missiles.splice(index, 1);
  }
};

export default removeMissile;
