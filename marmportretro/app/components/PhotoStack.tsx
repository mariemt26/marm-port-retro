"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { photos } from "../data/photos";

/**
 * A HyperCard-ish photo stack: flip through with the arrow buttons,
 * the filmstrip, or the left/right keys when the viewer has focus.
 */
export default function PhotoStack() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const n = photos.length;

  const go = useCallback(
    (next: number) => {
      setDir(next > i || (i === n - 1 && next === 0) ? 1 : -1);
      setI((next + n) % n);
    },
    [i, n]
  );

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [go, i]);

  const p = photos[i];

  return (
    <div className="stack">
      <div
        className="stack-frame"
        ref={frameRef}
        tabIndex={0}
        role="group"
        aria-label={`Photo ${i + 1} of ${n}`}
      >

        <span className="stack-under a" aria-hidden="true" />
        <span className="stack-under b" aria-hidden="true" />

        <div className="stack-card" key={i} data-dir={dir}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} alt={p.alt} />
        </div>
      </div>

      <p className="stack-caption">{p.caption}</p>

      <div className="stack-controls">
        <button
          className="mac-btn"
          onClick={() => go(i - 1)}
          aria-label="Previous photo"
        >
          ◀
        </button>

        <div className="stack-strip" role="tablist" aria-label="Choose a photo">
          {photos.map((ph, k) => (
            <button
              key={ph.src}
              role="tab"
              aria-selected={k === i}
              aria-label={`Photo ${k + 1}`}
              className={`strip-cell ${k === i ? "on" : ""}`}
              onClick={() => go(k)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ph.src} alt="" />
            </button>
          ))}
        </div>

        <button
          className="mac-btn"
          onClick={() => go(i + 1)}
          aria-label="Next photo"
        >
          ▶
        </button>
      </div>

      <div className="stack-status">
        <span>{p.file ?? `photo-${String(i + 1).padStart(2, "0")}.jpg`}</span>
        <span>
          {i + 1} of {n}
        </span>
      </div>
    </div>
  );
}
