"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useReveal";
import { SITE } from "../config";


export default function Nameplate() {
  const full = SITE.name;
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) return;

    let i = 0;
    let timer: ReturnType<typeof setTimeout>;


    const tick = () => {
      i += 1;
      setCount(i);
      if (i < full.length) {
        timer = setTimeout(tick, full[i - 1] === " " ? 180 : 68 + (i % 3) * 26);
      }
    };

    timer = setTimeout(tick, 380);
    return () => clearTimeout(timer);
  }, [full, reduced]);

  const typed = reduced ? full : full.slice(0, count);
  const done = typed.length === full.length;

  return (
    <div className="nameplate">

      {SITE.wordmarkLong && SITE.wordmarkLong !== full && (
        <span className="np-ar" lang="ar" dir="rtl" aria-hidden="true">
          {SITE.wordmarkLong}
        </span>
      )}

      <h1 className="np-name">
        <span className="np-sr">{full}</span>
        <span className="np-type" aria-hidden="true" data-text={typed}>
          {typed}
          <b className={`np-caret ${done ? "idle" : ""}`} />
        </span>
      </h1>

      <div className="np-foot" aria-hidden="true">
        <span className="np-barcode" />
        <span className="np-role">UI / UX DESIGNER</span>
      </div>
    </div>
  );
}