const SIDES = {
  PLAYER: "player",
  ENEMY: "enemy",
};

type SidesKey = (typeof SIDES)[keyof typeof SIDES];

export default SIDES;
export type { SidesKey };
