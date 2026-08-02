"use client";

import { useCallback, useState } from "react";

/**
 * The System 7 "Puzzle" desk accessory — a 15-tile sliding puzzle.
 *
 * Starts solved and unshuffled so the first render is deterministic
 * (no Math.random during render, no hydration mismatch). Shuffling
 * happens on a click.
 */

const N = 4; 
const SOLVED = Array.from({ length: N * N }, (_, i) => (i + 1) % (N * N)); // 0 = empty

const neighbours = (i: number) => {
  const r = Math.floor(i / N);
  const c = i % N;
  const out: number[] = [];
  if (r > 0) out.push(i - N);
  if (r < N - 1) out.push(i + N);
  if (c > 0) out.push(i - 1);
  if (c < N - 1) out.push(i + 1);
  return out;
};

export default function PuzzleGame() {
  const [tiles, setTiles] = useState<number[]>(SOLVED);
  const [moves, setMoves] = useState(0);
  const [started, setStarted] = useState(false);

  const solved = started && tiles.every((t, i) => t === SOLVED[i]);


  const shuffle = useCallback(() => {
    const next = [...SOLVED];
    let empty = next.indexOf(0);
    let prev = -1;

    for (let s = 0; s < 250; s++) {
      const opts = neighbours(empty).filter((n) => n !== prev);
      const pick = opts[Math.floor(Math.random() * opts.length)];
      [next[empty], next[pick]] = [next[pick], next[empty]];
      prev = empty;
      empty = pick;
    }

    setTiles(next);
    setMoves(0);
    setStarted(true);
  }, []);

  const slide = (i: number) => {
    if (!started || solved) return;
    const empty = tiles.indexOf(0);
    if (!neighbours(i).includes(empty)) return;

    const next = [...tiles];
    [next[empty], next[i]] = [next[i], next[empty]];
    setTiles(next);
    setMoves((m) => m + 1);
  };

  return (
    <div className="puzzle">
      <div className="puz-board" role="group" aria-label="Sliding puzzle">
        {tiles.map((t, i) =>
          t === 0 ? (
            <span key={i} className="puz-hole" aria-hidden="true" />
          ) : (
            <button
              key={i}
              className="puz-tile"
              onClick={() => slide(i)}
              disabled={!started || solved}
              aria-label={`Tile ${t}`}
            >
              {t}
            </button>
          )
        )}
      </div>

      <div className="puz-bar">
        <button className="mac-btn wide" onClick={shuffle}>
          {started ? "Shuffle" : "Start"}
        </button>
        <span className="puz-status">
          {solved
            ? `Solved in ${moves} moves!`
            : started
            ? `${moves} moves`
            : "Press Start"}
        </span>
      </div>
    </div>
  );
}
