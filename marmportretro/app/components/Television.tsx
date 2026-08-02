"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useWipeNavigate } from "./StaticWipe";
import { paintStatic, prefersReducedMotion, BASE } from "../config";

const CHANNELS = [
  {
    button: "1 INTRO",
    kana: "INTRODUCTION",
    headline: ["Code, Create,", "and Write!"],
    body: "My ideas have no limits. Wherever my mind leads me, I'll follow!",
    to: `${BASE}/about`,
    cta: "More about me →",
  },
  {
    button: "2 WORK",
    kana: "SELECTED WORK",
    headline: ["All my projects,", "start to ship."],
    body: "Research, flows, design systems and the handoff. Full case studies coming soon.",
    to: `${BASE}/projects`,
    cta: "See the work →",
  },
  {
    button: "3 CONTACT",
    kana: "CONTACT",
    headline: ["Always a", "message away."],
    body: "Want to collab? Have a question? In the mood to just chat? Shoot me a message!",
    to: `${BASE}/contact`,
    cta: "Get in touch →",
  },
  {
    button: "4 ???",
    kana: "???",
    headline: ["Wish for", "something different?"],
    body: "Click enter to peek behind the curtains...",
    to: `${BASE}/contact`,
    cta: "Proceed →",
  },
];

export default function Television() {
  const [current, setCurrent] = useState(0);
  const [angle, setAngle] = useState(0);
  const [snowOn, setSnowOn] = useState(false);
  const [clock, setClock] = useState("--:--");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const busy = useRef(false);
  const go = useWipeNavigate();

  useEffect(() => {
    const size = () => {
      const c = canvasRef.current;
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.width = Math.max(1, Math.floor(r.width / 2));
      c.height = Math.max(1, Math.floor(r.height / 2));
    };
    size();
    window.addEventListener("resize", size);
    return () => window.removeEventListener("resize", size);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(
        `${String(d.getHours()).padStart(2, "0")}:${String(
          d.getMinutes()
        ).padStart(2, "0")}`
      );
    };
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);

  const tune = useCallback(
    (next: number) => {
      if (next === current) return;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (prefersReducedMotion() || busy.current || !canvas || !ctx) {
        setCurrent(next);
        return;
      }
      busy.current = true;
      const { width, height } = canvas;

      setSnowOn(true);
      paintStatic(ctx, width, height);
      const timer = setInterval(() => paintStatic(ctx, width, height), 45);

      setTimeout(() => setCurrent(next), 150);
      setTimeout(() => {
        clearInterval(timer);
        setSnowOn(false);
        busy.current = false;
      }, 330);
    },
    [current]
  );

  const turn = (dir: number) => {
    setAngle((a) => a + dir * (360 / CHANNELS.length));
    tune((current + dir + CHANNELS.length) % CHANNELS.length);
  };

  return (
    <div className="tv">
      <div className="screen-hood">
        <div className="screen">
          <canvas ref={canvasRef} id="snow" className={snowOn ? "on" : ""} />
          <div className="bug">
            <em>●</em> CH <b>{current + 1}</b>
            <br />
            <span>{clock}</span>
          </div>

          {CHANNELS.map((ch, i) => (
            <div key={ch.button} className={`ch ${i === current ? "live" : ""}`}>
              <span className="kana">{ch.kana}</span>
              <h2>
                {ch.headline[0]}
                <br />
                {ch.headline[1]}
              </h2>
              <p>{ch.body}</p>
              <a
                className="go"
                href={ch.to}
                tabIndex={i === current ? 0 : -1}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                  e.preventDefault();
                  go(ch.to);
                }}
              >
                {ch.cta}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="controls">
        <button
          className="dial"
          aria-label="Turn the dial to change channel"
          style={{ transform: `rotate(${angle}deg)` }}
          onClick={() => turn(1)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
              e.preventDefault();
              turn(1);
            }
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
              e.preventDefault();
              turn(-1);
            }
          }}
        />
        <div className="dial-cap">
          CHANNEL
          <br />
          DIAL
        </div>

        <div className="chbtns" role="group" aria-label="Select channel">
          {CHANNELS.map((ch, i) => (
            <button
              key={ch.button}
              aria-pressed={i === current}
              onClick={() => tune(i)}
            >
              {ch.button}
            </button>
          ))}
          <button
            style={{ background: "var(--kiiro)" }}
            onClick={() => go(CHANNELS[current].to)}
          >
            ENTER
          </button>
        </div>

        <div className="grille" aria-hidden="true" />
      </div>
    </div>
  );
}