"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A MacPaint-ish scratchpad. Fixed internal resolution scaled by CSS,
 * so the drawing never resamples when the window resizes.
 */

const W = 640;
const H = 420;

const COLORS = [
  { name: "Ink", value: "#16224A" },
  { name: "Vermillion", value: "#F2432B" },
  { name: "Marigold", value: "#FFC22E" },
  { name: "Bubblegum", value: "#FF7EA8" },
  { name: "Mint", value: "#5BC4B4" },
  { name: "White", value: "#FFFFFF" },
];

const SIZES = [2, 5, 11, 22];

export default function PaintWindow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  const [color, setColor] = useState(COLORS[0].value);
  const [size, setSize] = useState(SIZES[1]);
  const [erasing, setErasing] = useState(false);

  const wipe = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, W, H);
  }, []);

  useEffect(() => {
    wipe();
  }, [wipe]);

  const posOf = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const el = canvasRef.current!;
    const r = el.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * W,
      y: ((e.clientY - r.top) / r.height) * H,
    };
  };

  const stroke = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = erasing ? "#FFFFFF" : color;
    ctx.lineWidth = erasing ? size * 2.2 : size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  };

  const down = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    const p = posOf(e);
    last.current = p;
    stroke(p, { x: p.x + 0.01, y: p.y }); 
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || !last.current) return;
    const p = posOf(e);
    stroke(last.current, p);
    last.current = p;
  };

  const up = () => {
    drawing.current = false;
    last.current = null;
  };

  const save = () => {
    const url = canvasRef.current?.toDataURL("image/png");
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = "scratchpad.png";
    a.click();
  };

  return (
    <div className="paint">
      <div className="paint-tools">
        <div className="paint-group">
          <span className="paint-label">BRUSH</span>
          <div className="paint-sizes">
            {SIZES.map((s) => (
              <button
                key={s}
                className={`size-btn ${!erasing && size === s ? "on" : ""}`}
                onClick={() => {
                  setSize(s);
                  setErasing(false);
                }}
                aria-label={`Brush size ${s}`}
                aria-pressed={!erasing && size === s}
              >
                <span style={{ width: s, height: s }} />
              </button>
            ))}
          </div>
        </div>

        <div className="paint-group">
          <span className="paint-label">INK</span>
          <div className="paint-swatches">
            {COLORS.map((c) => (
              <button
                key={c.value}
                className={`swatch-btn ${!erasing && color === c.value ? "on" : ""}`}
                style={{ background: c.value }}
                onClick={() => {
                  setColor(c.value);
                  setErasing(false);
                }}
                aria-label={c.name}
                aria-pressed={!erasing && color === c.value}
              />
            ))}
          </div>
        </div>

        <div className="paint-group">
          <span className="paint-label">TOOL</span>
          <div className="paint-actions">
            <button
              className={`mac-btn wide ${erasing ? "on" : ""}`}
              onClick={() => setErasing((v) => !v)}
              aria-pressed={erasing}
            >
              Eraser
            </button>
            <button className="mac-btn wide" onClick={wipe}>
              Clear
            </button>
            <button className="mac-btn wide" onClick={save}>
              Save
            </button>
          </div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="paint-canvas"
        width={W}
        height={H}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        aria-label="Scratchpad — draw with the mouse or your finger"
      />

      <div className="paint-status">
        <span>scratchpad.png</span>
        <span>{erasing ? "ERASER" : `${size}px`}</span>
      </div>
    </div>
  );
}
