"use client";

import { useCallback, useRef, useState } from "react";
import { SITE } from "../config";

type Entry = {
  key: string;
  ja: string;
  en: string;
  value: string;
  href: string;
  external?: boolean;
};

const ENTRIES: Entry[] = [
  { key: "1", ja: "Email", en: "EMAIL", value: SITE.email, href: `mailto:${SITE.email}` },
  { key: "2", ja: "Professional", en: "LINKEDIN", value: "/in/mariemtouati", href: "https://www.linkedin.com/in/mariem-touati-297894216/", external: true },
  { key: "3", ja: "Code", en: "GITHUB", value: "github.com/mariemtouati", href: "https://github.com/mariemt26", external: true },
  { key: "4", ja: "Visual boards", en: "PINTEREST", value: "@mariemtouati", href: "#", external: true },
  { key: "5", ja: "Reading", en: "STORYGRAPH", value: "/marmalade_toast", href: "https://app.thestorygraph.com/profile/marmalade_toast", external: true },
  { key: "6", ja: "Social", en: "INSTAGRAM", value: "@marmalade.studios", href: "#", external: true },
  { key: "7", ja: "Listening", en: "LAST.FM", value: "/user/mariemtouati", href: "https://www.last.fm/user/marm-w-toast", external: true },
  { key: "8", ja: "Full CV", en: "RESUME PDF", value: "resume.pdf", href: "#", external: true },
];

const KEYS: [string, string][] = [
  ["1", "oo"], ["2", "abc"], ["3", "def"],
  ["4", "ghi"], ["5", "jkl"], ["6", "mno"],
  ["7", "pqrs"], ["8", "tuv"], ["9", "wxyz"],
  ["*", "@$+%!"], ["0", "+"], ["#", "ABC123"],
];

const byKey = (k: string) => ENTRIES.find((e) => e.key === k);

export default function FlipPhone() {
  const [selected, setSelected] = useState<string>(ENTRIES[0].key);
  const [hovered, setHovered] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const lit = hovered ?? selected;

  const open = useCallback((entry?: Entry) => {
    if (!entry) return;
    if (entry.external) window.open(entry.href, "_blank", "noopener,noreferrer");
    else window.location.href = entry.href;
  }, []);

  const select = (k: string) => {
    if (!byKey(k)) return; 
    setSelected(k);
    listRef.current
      ?.querySelector<HTMLAnchorElement>(`[data-key="${k}"]`)
      ?.scrollIntoView({ block: "nearest" });
  };


  const step = (dir: 1 | -1) => {
    const i = ENTRIES.findIndex((e) => e.key === selected);
    const next = (i + dir + ENTRIES.length) % ENTRIES.length;
    select(ENTRIES[next].key);
  };

  return (
    <div
      className="phone"
      onKeyDown={(e) => {
        if (e.key === "ArrowDown") { e.preventDefault(); step(1); }
        if (e.key === "ArrowUp") { e.preventDefault(); step(-1); }
        if (e.key === "Enter" && e.target === e.currentTarget) open(byKey(selected));
      }}
      tabIndex={-1}
    >

      <div className="phone-lid">
        <div className="phone-speaker" aria-hidden="true" />
        <div className="phone-screen">
          <div className="ph-status" aria-hidden="true">
            <span className="ph-bars"><i /><i /><i /><i /></span>
            <span>LTE</span>
            <span className="ph-mail">✉</span>
            <span className="ph-batt" />
          </div>

          <div className="ph-title">CONTACT</div>
          <div className="ph-note">REPLIES INSTANTLY</div>

          <div className="ph-listwrap">
            <ul className="ph-list" ref={listRef}>
              {ENTRIES.map((e) => (
                <li key={e.key}>
                  <a
                    href={e.href}
                    data-key={e.key}
                    className={selected === e.key ? "sel" : ""}
                    target={e.external ? "_blank" : undefined}
                    rel={e.external ? "noopener noreferrer" : undefined}
                    onMouseEnter={() => setHovered(e.key)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setSelected(e.key)}
                  >
                    <span className="ph-num">{e.key}</span>
                    <span className="ph-text">
                      <span className="ph-ja">{e.ja}</span>
                      <span className="ph-val">{e.value}</span>
                    </span>
                    <span className="ph-en">{e.en}</span>
                  </a>
                </li>
              ))}
            </ul>
            <span className="ph-scroll" aria-hidden="true"><i /></span>
          </div>

          <div className="ph-soft" aria-hidden="true">
            <span>MENU</span>
            <span>SELECT</span>
            <span>BACK</span>
          </div>
        </div>
      </div>


      <div className="phone-hinge" aria-hidden="true">
        <span className="hinge-bar" />
      </div>

      <div className="phone-base">
        <div className="pad-nav">
          <span className="softkey left" aria-hidden="true">—</span>

          <span className="dpad">
            <span className="dpad-ring" aria-hidden="true" />
            <button
              className="dpad-up"
              onClick={() => step(-1)}
              aria-label="Previous contact"
            />
            <button
              className="dpad-down"
              onClick={() => step(1)}
              aria-label="Next contact"
            />
            <button
              className="dpad-ok"
              onClick={() => open(byKey(selected))}
              aria-label={`Open ${byKey(selected)?.en ?? "selection"}`}
            >
              OK
            </button>
          </span>

          <span className="softkey right" aria-hidden="true">—</span>
          <span className="callkey send" aria-hidden="true">✆</span>
          <span className="callkey end" aria-hidden="true">✆</span>
        </div>

        <div className="pad-mid" aria-hidden="true">
          <span className="midkey">★</span>
          <span className="midkey">✉</span>
          <span className="midkey">↩</span>
        </div>

        <div className="phone-keys">
          {KEYS.map(([k, latin]) => {
            const entry = byKey(k);
            const cls = `pkey ${lit === k ? "lit" : ""} ${selected === k ? "sel" : ""}`;

            if (!entry) {
              return (
                <span key={k} className="pkey dead" aria-hidden="true">
                  <b>{k}</b>
                  <span className="pkey-sub"><i>{latin}</i></span>
                </span>
              );
            }

            return (
              <button
                key={k}
                className={cls}
                onClick={() => {
                  select(k);
                  open(entry);
                }}
                aria-label={`Key ${k} — open ${entry.en}`}
                aria-pressed={selected === k}
              >
                <b>{k}</b>
                <span className="pkey-sub"><i>{latin}</i></span>
              </button>
            );
          })}
        </div>

        <span className="phone-strap" aria-hidden="true" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="phone-sticker" src="/smiski.png" alt="" aria-hidden="true" />
    </div>
  );
}