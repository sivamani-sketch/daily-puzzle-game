const KEY = "daily_progress";

export const markProgress = () => {
  const today = new Date().toDateString();
  const data = JSON.parse(localStorage.getItem(KEY) || "[]");

  if (!data.includes(today)) {
    data.push(today);
  }

  localStorage.setItem(KEY, JSON.stringify(data));
};

export const getProgress = (): string[] => {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
};
