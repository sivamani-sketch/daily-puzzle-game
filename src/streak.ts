export interface StreakData {
  streak: number;
  lastPlayed: string;
}

const STORAGE_KEY = "daily_streak";
const PLAYED_KEY = "played_today";

// Get streak from localStorage
export const getStreak = (): StreakData => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return { streak: 0, lastPlayed: "" };
  }

  return JSON.parse(data);
};

// Check if already solved today
export const hasPlayedToday = (): boolean => {
  const today = new Date().toDateString();
  return localStorage.getItem(PLAYED_KEY) === today;
};

// Mark today's puzzle as solved
export const markPlayedToday = () => {
  const today = new Date().toDateString();
  localStorage.setItem(PLAYED_KEY, today);
};

// Update streak
export const updateStreak = (): StreakData => {
  const today = new Date().toDateString();
  const data = getStreak();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (data.lastPlayed === today) {
    return data;
  }

  if (data.lastPlayed === yesterday.toDateString()) {
    data.streak += 1;
  } else {
    data.streak = 1;
  }

  data.lastPlayed = today;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  return data;
};
