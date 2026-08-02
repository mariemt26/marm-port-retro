"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Plate } from "../data/projects";

/**
 * Screenshots mounted on the printout like printed plates, with a
 * lightbox for a closer look.
 *
 * `start` offsets the FIG. numbering so several galleries on one page
 * keep counting up instead of restarting.
 */
export default function PlateGallery({
  plates,
  start = 1,
}: {
  plates: Plate[];
  start?: number;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const returnTo = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    returnTo.current?.focus();
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setOpen((i) => (i === null ? i : (i + dir + plates.length) % plates.length));
    },
    [plates.length]
  );


  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const current = open === null ? null : plates[open];

  return (
    <>
      <div className="plates">
        {plates.map((p, i) => (
          <figure className={`plate ${p.wide ? "wide" : ""}`} key={p.src}>
            <button
              className="plate-btn"
              onClick={(e) => {
                returnTo.current = e.currentTarget;
                setOpen(i);
              }}
              aria-label={`Enlarge figure ${start + i}: ${p.caption}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.alt} loading="lazy" />
              <span className="plate-zoom" aria-hidden="true">
                ⤢
              </span>
            </button>
            <figcaption>
              <span className="fig-no">
                FIG. {String(start + i).padStart(2, "0")}
              </span>
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {current && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          ref={dialogRef}
          tabIndex={-1}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="lb-frame">
            <div className="lb-bar">
              <span className="lb-title">
                FIG. {String(start + (open ?? 0)).padStart(2, "0")}
              </span>
              <span className="lb-count">
                {(open ?? 0) + 1} / {plates.length}
              </span>
              <button className="lb-close" onClick={close} aria-label="Close">
                ✕
              </button>
            </div>

            <div className="lb-stage">
              {plates.length > 1 && (
                <button
                  className="lb-nav prev"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                >
                  ◀
                </button>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.src} alt={current.alt} />
              {plates.length > 1 && (
                <button
                  className="lb-nav next"
                  onClick={() => step(1)}
                  aria-label="Next image"
                >
                  ▶
                </button>
              )}
            </div>

            <p className="lb-caption">{current.caption}</p>
          </div>
        </div>
      )}
    </>
  );
}
