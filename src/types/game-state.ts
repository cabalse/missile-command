const GAME_STATE = {
  PRE_GAME: "pre_game",
  PRE_GAME_WAIT: "pre_game_wait",
  INIT: "init",
  RUNNING: "running",
  PAUSED: "paused",
  GAME_OVER: "game_over",
  GAME_OVER_WAIT: "game_over_wait",
};

type GameStateKey = (typeof GAME_STATE)[keyof typeof GAME_STATE];

export default GAME_STATE;
export type { GameStateKey };
