"use client";

import { useEffect, useRef } from "react";


type Dot = { x: number; y: number; life: number; hue: number };


const COLOURS = ["#FF7EA8"];
const MAX = 10;
const FADE = 0.075;
const ALPHA = 0.32;

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener("resize", size);

    const dots: Dot[] = [];
    let last = { x: 0, y: 0 };
    let n = 0;

    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      if (dx * dx + dy * dy < 200) return;
      last = { x: e.clientX, y: e.clientY };
      dots.push({ x: e.clientX, y: e.clientY, life: 1, hue: n++ % COLOURS.length });
      if (dots.length > MAX) dots.shift();
    };
    window.addEventListener("pointermove", onMove);

    let raf = 0;
    const frame = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        d.life -= FADE;
        if (d.life <= 0) {
          dots.splice(i, 1);
          continue;
        }
        const r = 1.5 + d.life * 3.5;
        ctx.globalAlpha = d.life * d.life * ALPHA;
        ctx.fillStyle = COLOURS[d.hue];
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", size);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />;
}