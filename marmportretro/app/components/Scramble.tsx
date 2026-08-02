"use client";

import { useEffect, useRef, useState } from "react";
import useReveal, { useReducedMotion } from "../hooks/useReveal";

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/-*+#";


export default function Scramble({
  text,
  className = "eyebrow",
}: {
  text: string;
  className?: string;
}) {
  const [ref, seen] = useReveal<HTMLSpanElement>(0.6);
  const reduced = useReducedMotion();
  const [out, setOut] = useState(text); 
  const done = useRef(false);

  useEffect(() => {
    if (!seen || reduced || done.current) return;
    done.current = true;

    let frame = 0;
    const id = setInterval(() => {
      frame++;
      let next = "";
      for (let i = 0; i < text.length; i++) {
        next +=
          i < frame / 2
            ? text[i]
            : POOL[Math.floor(Math.random() * POOL.length)];
      }
      setOut(next); 
      if (frame / 2 >= text.length) {
        clearInterval(id);
        setOut(text);
      }
    }, 55);

    return () => clearInterval(id);
  }, [seen, reduced, text]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}