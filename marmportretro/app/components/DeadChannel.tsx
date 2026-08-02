"use client";

import { useEffect, useRef, useState } from "react";

export default function DeadChannel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [clock, setClock] = useState("--:--");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const size = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(r.width / 3));
      canvas.height = Math.max(1, Math.floor(r.height / 3));
    };
    size();
    window.addEventListener("resize", size);

    const paint = () => {
      const img = ctx.createImageData(canvas.width, canvas.height);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    };

    paint();
    const id = setInterval(paint, 70);
    return () => {
      clearInterval(id);
      window.removeEventListener("resize", size);
    };
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

  return (
    <div className="deadtv">
      <div className="dt-hood">
        <div className="dt-screen">
          <canvas ref={canvasRef} className="dt-snow" />

          <div className="dt-bars" aria-hidden="true">
            <i /><i /><i /><i /><i /><i /><i />
          </div>

          <div className="dt-copy">
            <span className="dt-code">ERROR 404</span>
            <h1>No signal.</h1>
            <p>
              That channel isn&apos;t broadcasting. Check the number, or turn
              the dial back to something that is.
            </p>
          </div>

          <div className="dt-bug" aria-hidden="true">
            <em>●</em> CH ??
            <br />
            <span>{clock}</span>
          </div>
        </div>
      </div>

      <div className="dt-base" aria-hidden="true">
        <span className="dt-grille" />
        <span className="dt-knob" />
      </div>
    </div>
  );
}
