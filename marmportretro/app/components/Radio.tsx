"use client";

import { useEffect, useRef, useState } from "react";
import useLastFm from "../hooks/useLastFm";
import { stations } from "../data/stations";

const NOW_FREQ = 50; 

export default function Radio() {
  const { state, title, artist, art, playing } = useLastFm();
  const [minimised, setMinimised] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [freq, setFreq] = useState(NOW_FREQ);
  const [line, setLine] = useState(0);
  const [dragging, setDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);


  const nearest = stations.reduce((best, s) =>
    Math.abs(s.freq - freq) < Math.abs(best.freq - freq) ? s : best
  );
  const onNow = Math.abs(freq - NOW_FREQ) < Math.abs(nearest.freq - freq);
  const locked = onNow
    ? Math.abs(freq - NOW_FREQ) < 7
    : Math.abs(freq - nearest.freq) < 7;


  useEffect(() => {
    if (onNow || !locked) return;
    const id = setInterval(() => setLine((n) => n + 1), 4200);
    return () => clearInterval(id);
  }, [onNow, locked, nearest.name]);


  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    setScroll(false);
    const span = el.querySelector("span");
    if (span && span.scrollWidth > el.clientWidth) setScroll(true);
  }, [title, minimised, freq]);


  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => {
      const el = stripRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const pct = ((e.clientX - r.left) / r.width) * 100;
      setFreq(Math.min(100, Math.max(0, pct)));
    };
    const up = () => setDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [dragging]);

  const tuneTo = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setFreq(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)));
    setDragging(true);
  };


  const showing = onNow
    ? {
        state: locked ? state : "TUNING…",
        head: locked ? title : "· · · · ·",
        sub: locked ? artist : "keep turning",
        band: "78.5",
        name: "NOW PLAYING",
      }
    : {
        state: locked ? `● ${nearest.name}` : "TUNING…",
        head: locked ? nearest.lines[line % nearest.lines.length] : "· · · · ·",
        sub: locked ? `FM ${nearest.band}` : "keep turning",
        band: nearest.band,
        name: nearest.name,
      };

  const classes = [
    "radio",
    playing && onNow && locked ? "playing" : "",
    minimised ? "min" : "",
    locked ? "locked" : "static",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className={classes} aria-label="Radio">
      <div className="radio-top">
        <span className="radio-brand">
          <em>◉</em> FM MARMALADE {showing.band}
        </span>
        <button
          className="radio-toggle"
          aria-expanded={!minimised}
          aria-label={minimised ? "Expand the radio" : "Collapse the radio"}
          onClick={() => setMinimised((m) => !m)}
        >
          {minimised ? "+" : "–"}
        </button>
      </div>

      <div className="radio-body">
        <div className="radio-art" aria-hidden="true">
          {onNow && locked && art ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={art} alt="" />
          ) : (
            <span className="art-blank">{locked ? "◉" : "?"}</span>
          )}
        </div>

        <div className="radio-info">
          <span className={`radio-state ${playing && onNow ? "" : "idle"}`}>
            {showing.state}
          </span>
          <div
            className={`radio-track ${scroll ? "scroll" : ""}`}
            ref={trackRef}
            title={showing.head}
          >
            <span>{scroll ? `${showing.head}　★　${showing.head}　★　` : showing.head}</span>
          </div>
          <span className="radio-artist">{showing.sub}</span>
          <div className="eq" aria-hidden="true">
            <i /><i /><i /><i /><i />
          </div>
        </div>
      </div>

      <div
        className="radio-dialstrip"
        ref={stripRef}
        onPointerDown={tuneTo}
        role="slider"
        tabIndex={0}
        aria-label="Tune the radio"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(freq)}
        aria-valuetext={showing.name}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); setFreq((f) => Math.min(100, f + 4)); }
          if (e.key === "ArrowLeft") { e.preventDefault(); setFreq((f) => Math.max(0, f - 4)); }
        }}
      >
  
        <span className="mark-now" style={{ left: `${NOW_FREQ}%` }} aria-hidden="true" />
        {stations.map((s) => (
          <span
            key={s.name}
            className="mark-st"
            style={{ left: `${s.freq}%` }}
            aria-hidden="true"
          />
        ))}
        <div className="radio-needle" style={{ left: `${freq}%` }} />
      </div>


      <div className="radio-presets" role="group" aria-label="Station presets">
        <button
          className={`preset ${onNow && locked ? "on" : ""}`}
          onClick={() => setFreq(NOW_FREQ)}
          aria-pressed={onNow && locked}
          title="Now playing"
        >
          <b>1</b>
          <i>NOW</i>
        </button>

        {stations.map((st, i) => {
          const lit = !onNow && locked && nearest.name === st.name;
          return (
            <button
              key={st.name}
              className={`preset ${lit ? "on" : ""}`}
              onClick={() => {
                setFreq(st.freq);
                setLine(0);
              }}
              aria-pressed={lit}
              title={st.name}
            >
              <b>{i + 2}</b>
              <i>{st.name.split(" ")[0]}</i>
            </button>
          );
        })}
      </div>

      <span className="radio-hint" aria-hidden="true">
        {locked ? showing.name : "◀ DRAG TO TUNE ▶"}
      </span>
    </aside>
  );
}