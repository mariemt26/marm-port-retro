"use client";

import { useState } from "react";
import type { Role } from "../data/experience";

/**
 * A role as an IBM-style punch card.
 *
 * The hole pattern is derived from the role text with a pure hash, so
 * the server and client render identical markup — no Math.random.
 */

const COLS = 28;
const ROWS = 5;


function punched(seed: string, col: number, row: number) {
  let h = 2166136261;
  const s = `${seed}:${col}:${row}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 100) < 26; 
}

export default function TimeCard({
  role,
  no,
}: {
  role: Role;
  no: number;
}) {
  const [open, setOpen] = useState(false);
  const current = !role.to;
  const seed = `${role.org}-${role.role}`;

  return (
    <article className={`timecard ${current ? "current" : ""} ${open ? "open" : ""}`}>
      <span className="tc-corner" aria-hidden="true" />

      <div className="tc-head">
        <span>CARD NO. {String(no).padStart(3, "0")}</span>
        <span>{current ? "ACTIVE" : "ARCHIVED"}</span>
      </div>

      <div className="tc-print" aria-hidden="true">
        {`${role.from}  ${role.to ?? "PRESENT"}  ${role.org}`.toUpperCase()}
      </div>

      <div className="tc-grid" aria-hidden="true">
        {Array.from({ length: ROWS }).map((_, r) => (
          <div className="tc-row" key={r}>
            {Array.from({ length: COLS }).map((_, c) => (
              <span
                key={c}
                className={punched(seed, c, r) ? "hole on" : "hole"}
              />
            ))}
          </div>
        ))}
      </div>

      <h3>{role.role}</h3>
      <p className="tc-org">
        {role.org} — {role.place}
      </p>

      <div className="tc-clock">
        <div>
          <span>CLOCK IN</span>
          <b>{role.from}</b>
        </div>
        <span className="tc-arrow" aria-hidden="true">▶</span>
        <div>
          <span>CLOCK OUT</span>
          <b>{role.to ?? "PRESENT"}</b>
        </div>
      </div>

      <button
        className="tc-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? "— Collapse" : "+ Punch card"}
      </button>

      {open && (
        <ul className="tc-notes">
          {role.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}

      <span className="tc-stamp" aria-hidden="true">
        {current ? "ACTIVE" : "APPROVED"}
      </span>
    </article>
  );
}