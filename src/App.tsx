import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { generatePuzzle, validateAnswer } from './puzzles/engine';
import {
  updateStreak,
  getStreak,
  hasPlayedToday,
  markPlayedToday,
} from './streak';
import { markProgress, getProgress } from './progress';

// 🔥 STEP 2.2 — Lazy Load Heatmap
const Heatmap = React.lazy(() => import('./Heatmap'));

function App() {
  const puzzle = useMemo(() => generatePuzzle(), []);

  // STATES
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('');
  const [streak, setStreak] = useState(0);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);

  const [hintUsed, setHintUsed] = useState(false);
  const [hintText, setHintText] = useState('');
  const [hintPenalty, setHintPenalty] = useState(0);

  const [progress, setProgress] = useState<string[]>([]);

  // Load streak + progress
  useEffect(() => {
    const data = getStreak();
    setStreak(data.streak);

    const progressData = getProgress();
    setProgress(progressData);
  }, []);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Hint
  const handleHint = () => {
    if (hintUsed) return;

    setHintText(`Hint: starts with "${puzzle.answer[0]}"`);
    setHintUsed(true);
    setHintPenalty(10);
  };

  // Submit
  const handleSubmit = () => {
    if (hasPlayedToday()) {
      setResult('You already solved today’s puzzle 🔒');
      return;
    }

    const correct = validateAnswer(puzzle, answer);
    setResult(correct ? 'Correct ✅' : 'Wrong ❌');

    if (correct) {
      const finalScore = Math.max(100 - time - hintPenalty, 10);
      setScore(finalScore);

      const data = updateStreak();
      setStreak(data.streak);

      markPlayedToday();

      markProgress();
      setProgress(getProgress());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white space-y-4">
      {/* 🔥 STEP 2.3 — Lazy Loaded Heatmap */}
      <Suspense fallback={<div>Loading heatmap...</div>}>
        <Heatmap progress={progress} />
      </Suspense>

      <p className="text-yellow-400 text-lg">🔥 Streak: {streak}</p>
      <p className="text-green-400">⏱ Time: {time}s</p>
      <p className="text-purple-400">⭐ Score: {score}</p>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm uppercase text-blue-400">{puzzle.type}</p>

        <h1 className="text-2xl mt-2">{puzzle.question}</h1>
      </motion.div>

      <input
        className="px-4 py-2 text-black rounded"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter answer"
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 rounded"
      >
        Submit
      </motion.button>

      <button onClick={handleHint} className="px-4 py-2 bg-orange-500 rounded">
        Get Hint (-10 pts)
      </button>

      <p className="text-orange-300">{hintText}</p>
      <p className="text-xl">{result}</p>
    </div>
  );
}

export default App;
