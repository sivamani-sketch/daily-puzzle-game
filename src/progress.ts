import LZString from 'lz-string';

const KEY = 'daily_progress';

// Save compressed progress
export const markProgress = () => {
  const today = new Date().toDateString();

  const existing = localStorage.getItem(KEY);
  const decompressed = existing ? LZString.decompress(existing) : '[]';

  const data: string[] = JSON.parse(decompressed || '[]');

  if (!data.includes(today)) {
    data.push(today);
  }

  const compressed = LZString.compress(JSON.stringify(data));

  localStorage.setItem(KEY, compressed);
};

// Load decompressed progress
export const getProgress = (): string[] => {
  const stored = localStorage.getItem(KEY);

  if (!stored) return [];

  const decompressed = LZString.decompress(stored);

  return JSON.parse(decompressed || '[]');
};
