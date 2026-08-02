"use client";

import { useState } from "react";
import { favorites } from "../data/favorites";

/**
 * A Finder window in icon view: folder tabs across the top, a grid of
 * covers, and a detail strip that fills in when you pick something.
 */
export default function Favorites() {
  const [tab, setTab] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const group = favorites[tab];
  const item = picked === null ? null : group.items[picked];

  return (
    <div className="favs">
      <div className="fav-tabs" role="tablist" aria-label="Favorites">
        {favorites.map((g, i) => (
          <button
            key={g.name}
            role="tab"
            aria-selected={i === tab}
            className={`fav-tab ${i === tab ? "on" : ""}`}
            onClick={() => {
              setTab(i);
              setPicked(null);
            }}
          >
            {g.name}
          </button>
        ))}
      </div>

      {/* icon view */}
      <div className="fav-grid">
        {group.items.map((f, i) => (
          <button
            key={`${f.title}-${i}`}
            className={`fav-item ${picked === i ? "on" : ""}`}
            onClick={() => setPicked(picked === i ? null : i)}
            aria-pressed={picked === i}
          >
            <span className="fav-cover">
              {f.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.image} alt="" loading="lazy" />
              ) : (
                <span className="fav-blank" aria-hidden="true">
                  ?
                </span>
              )}
            </span>
            <span className="fav-name">{f.title}</span>
          </button>
        ))}
      </div>

      {/* detail strip */}
      <div className="fav-detail">
        {item ? (
          <>
            <b>{item.title}</b>
            {item.by && <span className="fav-by">{item.by}</span>}
            {item.note && <p>{item.note}</p>}
          </>
        ) : (
          <span className="fav-hint">
            {group.items.length} item{group.items.length === 1 ? "" : "s"} — click
            one for details
          </span>
        )}
      </div>
    </div>
  );
}
