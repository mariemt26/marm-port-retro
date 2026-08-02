"use client";

import { useEffect, useState } from "react";


export default function PunchClock({
  cards,
  years,
}: {
  cards: number;
  years: string;
}) {
  const [now, setNow] = useState("--:--");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(
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
    <div className="clockbox">
      <div className="clock-face">
        <span className="clock-brand">TIME RECORDER</span>
        <span className="clock-readout">{now}</span>
        <span className="clock-slot" aria-hidden="true" />
      </div>

      <div className="clock-plate">
        <span>EMPLOYEE RECORDS</span>
        <span className="dim">PUNCH IN ON ARRIVAL</span>
        <dl className="clock-totals">
          <div>
            <dt>CARDS ON FILE</dt>
            <dd>{cards}</dd>
          </div>
          <div>
            <dt>PERIOD</dt>
            <dd>{years}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
