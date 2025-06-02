type MissileData = {
  MISSILE_SPEED: number; // When Enemy Missile this is overridden by the stage data
  MISSILE_LENGTH: number;
  MISSILE_OFFSET: number;
  MAX_MISSILES: number; // When Enemy Missile this is overridden by the stage data
  TIME_BETWEEN_MISSILES: number; // When Enemy Missile this is overridden by the stage data
  STRIKE_RADIUS: number;
  STRIKE_SEGMENTS: number;
  STRIKE_EXPAND_SPEED: number;
  STRIKE_MAX_RADIUS: number;
};

export type { MissileData };
