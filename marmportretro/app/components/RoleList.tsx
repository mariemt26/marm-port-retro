"use client";

import { useState } from "react";
import type { Role } from "../data/experience";

/**
 * Roles as manila personnel files in a drawer. One is open at a time
 * and fills the page; the rest sit behind it as tabs.
 */

/** deterministic file number so server and client agree */
const fileNo = (seed: string) => {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return String(((h >>> 0) % 9000) + 1000);
};

const TONES = ["kiiro", "momo", "mint", "iris"] as const;

export default function RoleList({ roles }: { roles: Role[] }) {
  const ordered = [...roles].sort((a, b) => b.from.localeCompare(a.from));
  const [open, setOpen] = useState(0);
  const file = ordered[open];
  const club = file.kind === "club";

  return (
    <div className="cabinet">
      {/* ── the drawer of tabs ── */}
      <div className="cab-tabs" role="tablist" aria-label="Personnel files">
        {ordered.map((r, i) => (
          <button
            key={r.id}
            role="tab"
            aria-selected={i === open}
            className={`cab-tab tone-${TONES[i % TONES.length]} ${
              i === open ? "on" : ""
            }`}
            onClick={() => setOpen(i)}
          >
            <span className="tab-org">{r.org}</span>
            <span className="tab-year">{r.from.slice(0, 4)}</span>
          </button>
        ))}
      </div>

      {/* ── the open file ── */}
      <article className={`cab-file tone-${TONES[open % TONES.length]}`}>
        <div className="file-stamp-row">
          <span className="file-no">FILE {fileNo(file.org + file.role)}</span>
        </div>

        <header className="file-head">
          <span className="file-kicker">
            {club ? "MEMBERSHIP RECORD" : "EMPLOYMENT RECORD"}
          </span>
          <h3>{file.role}</h3>
          <p className="file-org">{file.org}</p>
        </header>

        <dl className="file-meta">
          <div>
            <dt>LOCATION</dt>
            <dd>{file.place}</dd>
          </div>
          <div>
            <dt>COMMENCED</dt>
            <dd>{file.from}</dd>
          </div>
          <div>
            <dt>CONCLUDED</dt>
            <dd>{file.to ?? "Present"}</dd>
          </div>
        </dl>

        <div className="file-body">
          <span className="file-label">RECORD OF DUTIES</span>
          <ol className="file-notes">
            {file.notes.map((n, i) => (
              <li key={n}>
                <span className="note-no">{String(i + 1).padStart(2, "0")}</span>
                <span>{n}</span>
              </li>
            ))}
          </ol>
        </div>

        <footer className="file-foot">
          <span className="file-sign">
            <i>FILED BY</i>
            <b>M. TOUATI</b>
          </span>
          <span className="file-punch" aria-hidden="true">
            <i /><i /><i />
          </span>
        </footer>
      </article>
    </div>
  );
}