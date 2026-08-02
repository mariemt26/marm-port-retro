"use client";

import { useState } from "react";
import type { Role } from "../data/experience";

/**
 * Career as a level-select map. Roles sit on a winding path in
 * chronological order; work roles ride the main track, club roles
 * branch off above and below it.
 *
 * Node positions are derived from the index — deterministic, so
 * server and client render identically.
 */

type Node = Role & { x: number; y: number; side: boolean };

const toNum = (d: string) => {
  const [y, m] = d.split(".");
  return Number(y) + (Number(m ?? 1) - 1) / 12;
};

const LANE = { main: 33, side: 70 }; 


const layout = (roles: Role[]): Node[] => {
  const stamps = roles.map((r) => toNum(r.from));
  const lo = Math.min(...stamps);
  const hi = Math.max(...stamps);
  const span = hi - lo || 1;

  const place = (list: Role[], laneY: number, side: boolean): Node[] =>
    [...list]
      .sort((a, b) => a.from.localeCompare(b.from))
      .map((r, i) => {
        const t = (toNum(r.from) - lo) / span;
        return {
          ...r,
          x: 11 + t * 78,
          y: laneY + Math.sin(i * 1.1) * 6,
          side,
        };
      });

  return [
    ...place(roles.filter((r) => r.kind !== "club"), LANE.main, false),
    ...place(roles.filter((r) => r.kind === "club"), LANE.side, true),
  ];
};

function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  const d = [`M ${pts[0].x} ${pts[0].y}`];

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;

    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;

    d.push(
      `C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(
        2
      )}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
    );
  }
  return d.join(" ");
}

export default function LevelMap({ roles }: { roles: Role[] }) {
  const nodes = layout(roles);
  const [open, setOpen] = useState<number>(nodes.length - 1); 
  const [touched, setTouched] = useState(false); 

  const current = nodes[open];
  const mainNodes = nodes.filter((n) => !n.side);
  const sideNodes = nodes.filter((n) => n.side);
  const dMain = smoothPath(mainNodes);
  const dSide = smoothPath(sideNodes);

  return (
    <div className="handheld">
      <div className="hh-top">
        <span className="hh-brand">
          MARMALADE <b>POCKET</b>
        </span>
        <span className="hh-model">MODEL MT-01</span>
      </div>

      <div className="hh-legend">
        <span><i className="key main" /> WORK</span>
        <span><i className="key side" /> CLUBS &amp; SOCIETIES</span>
        <span className="dim">CLICK A STAGE</span>
      </div>

      <div className="lvmap">
      <div className="lv-board">
        {[
          { w: "26%", left: "6%", top: "9%", dur: "68s" },
          { w: "18%", left: "58%", top: "6%", dur: "94s" },
          { w: "14%", left: "34%", top: "20%", dur: "80s" },
        ].map((c, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            className="lv-cloud"
            src="/cloud.png"
            alt=""
            aria-hidden="true"
            style={{ width: c.w, left: c.left, top: c.top, ["--dur" as string]: c.dur }}
          />
        ))}

        <svg
          className="lv-path"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {dMain && (
            <>
              <path className="road-case" d={dMain} />
              <path className="road-line" d={dMain} />
            </>
          )}
          {dSide && (
            <>
              <path className="road-case side" d={dSide} />
              <path className="road-line side" d={dSide} />
            </>
          )}
        </svg>

        {nodes.map((nd, i) => (
          <button
            key={nd.id}
            className={`lv-node ${nd.side ? "side" : ""} ${
              i === open ? "on" : ""
            } ${!nd.to ? "current" : ""} ${!touched ? "hint" : ""}`}
            style={{ left: `${nd.x}%`, top: `${nd.y}%` }}
            onClick={() => {
              setOpen(i);
              setTouched(true);
            }}
            aria-pressed={i === open}
            aria-label={`${nd.role} at ${nd.org}`}
          >
            <span className="lv-badge">
              {nd.icon ?? (nd.side ? "★" : "●")}
            </span>
            <span className="lv-tag">{nd.from.slice(0, 4)}</span>
            {i === open && (
              <span className="lv-marker" aria-hidden="true">
                ▼
              </span>
            )}
          </button>
        ))}

        {!touched && (
          <span className="lv-prompt" aria-hidden="true">
            ▶ PICK A STAGE
          </span>
        )}

        <span className="lane-label main" aria-hidden="true">WORK</span>
        <span className="lane-label side" aria-hidden="true">CLUBS</span>
        <span className="lv-now" aria-hidden="true">NOW ▶</span>
      </div>

      <div className={`lv-card ${current.side ? "side" : ""}`}>
        <div className="lv-card-top">
          <span className="lv-stage">
            STAGE {String(open + 1).padStart(2, "0")}
          </span>
          <span className={`lv-kind ${current.side ? "side" : ""}`}>
            {current.side ? "SIDE QUEST" : "MAIN STORY"}
          </span>
          {!current.to && <span className="lv-live">● IN PROGRESS</span>}
        </div>

        <h3>{current.role}</h3>
        <p className="lv-org">
          {current.org} — {current.place}
        </p>

        <div className="lv-dates">
          <b>{current.from}</b>
          <span aria-hidden="true">→</span>
          <b>{current.to ?? "NOW"}</b>
        </div>

        <ul className="lv-notes">
          {current.notes.map((nt) => (
            <li key={nt}>{nt}</li>
          ))}
        </ul>
      </div>
    </div>

      <div className="hh-deck">
        <div className="hh-dpad">
          <button
            className="dp dp-left"
            onClick={() => { setOpen((i) => Math.max(0, i - 1)); setTouched(true); }}
            disabled={open === 0}
            aria-label="Previous stage"
          >
            ◀
          </button>
          <span className="dp-hub" aria-hidden="true" />
          <button
            className="dp dp-right"
            onClick={() => { setOpen((i) => Math.min(nodes.length - 1, i + 1)); setTouched(true); }}
            disabled={open === nodes.length - 1}
            aria-label="Next stage"
          >
            ▶
          </button>
          <span className="dp dp-up" aria-hidden="true" />
          <span className="dp dp-down" aria-hidden="true" />
        </div>

        <div className="hh-readout">
          <span className="hh-stage">
            STAGE {String(open + 1).padStart(2, "0")} / {String(nodes.length).padStart(2, "0")}
          </span>
          <span className="hh-speaker" aria-hidden="true" />
        </div>

        <div className="hh-ab">
          <button
            className="ab b"
            onClick={() => { setOpen((i) => Math.max(0, i - 1)); setTouched(true); }}
            disabled={open === 0}
            aria-label="Previous stage"
          >
            B
          </button>
          <button
            className="ab a"
            onClick={() => { setOpen((i) => Math.min(nodes.length - 1, i + 1)); setTouched(true); }}
            disabled={open === nodes.length - 1}
            aria-label="Next stage"
          >
            A
          </button>
        </div>
      </div>
    </div>
  );
}