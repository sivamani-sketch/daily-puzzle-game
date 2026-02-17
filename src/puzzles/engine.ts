import type { Puzzle } from "./types";
import { mathPuzzles } from "./math";
import { wordPuzzles } from "./word";
import { logicPuzzles } from "./logic";
import { patternPuzzles } from "./pattern";
import { riddlePuzzles } from "./riddle";

const allPuzzles: Puzzle[] = [
  ...mathPuzzles,
  ...wordPuzzles,
  ...logicPuzzles,
  ...patternPuzzles,
  ...riddlePuzzles,
];

const getDailyIndex = (): number => {
  const today = new Date();
  const seed =
    today.getFullYear() +
    today.getMonth() +
    today.getDate();

  return seed % allPuzzles.length;
};

export const generatePuzzle = (): Puzzle => {
  return allPuzzles[getDailyIndex()];
};

export const validateAnswer = (
  puzzle: Puzzle,
  userAnswer: string
): boolean => {
  return (
    puzzle.answer.toLowerCase() ===
    userAnswer.trim().toLowerCase()
  );
};
