export const GAME_LEVELS_KEYS = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

export const GAME_LEVELS = [
  { label: GAME_LEVELS_KEYS.EASY },
  { label: GAME_LEVELS_KEYS.MEDIUM },
  { label: GAME_LEVELS_KEYS.HARD },
];

export const AUTO_SKIPPING_TIME_IN_SECONDS = {
  EASY: 1.5 * 60,
  MEDIUM: 1 * 60,
  HARD: 30,
};

export const RANDOM_CATEGORY = {
  name: "Random Questions",
  index: 24,
};

export const MAX_NUMBER_OF_QUESTIONS = 2;
export const MAX_NUMBER_OF_CATEGORIES = 3;

export const QUESTIONS_TYPE = {
  BOOLEON: "boolean",
  MULTI: "multiple",
};