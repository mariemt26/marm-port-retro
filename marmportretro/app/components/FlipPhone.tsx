"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SITE } from "../config";

type Entry = {
  key: string;          // the QWERTY key that opens it (desktop)
  num: string;          // the dial digit that opens it (mobile)
  ja: string;
  en: string;
  value: string;
  href: string;
  external?: boolean;
};

/* Each contact sits on a letter and a digit. The letters are mnemonic —
   M is Last.fm because L is already LinkedIn and M is music. The digits
   just follow list order, since numbers can't stand for anything. */
const ENTRIES: Entry[] = [
  { key: "E", num: "1", ja: "Email", en: "EMAIL", value: SITE.email, href: `mailto:${SITE.email}` },
  { key: "L", num: "2", ja: "Professional", en: "LINKEDIN", value: "/in/mariemtouati", href: "https://www.linkedin.com/in/mariem-touati-297894216/", external: true },
  { key: "G", num: "3", ja: "Code", en: "GITHUB", value: "github.com/mariemtouati", href: "https://github.com/mariemt26", external: true },
  { key: "P", num: "4", ja: "Visual boards", en: "PINTEREST", value: "@mariemtouati", href: "#", external: true },
  { key: "S", num: "5", ja: "Reading", en: "STORYGRAPH", value: "/marmalade_toast", href: "https://app.thestorygraph.com/profile/marmalade_toast", external: true },
  { key: "I", num: "6", ja: "Social", en: "INSTAGRAM", value: "@marmalade.studios", href: "#", external: true },
  { key: "M", num: "7", ja: "Listening", en: "LAST.FM", value: "/user/mariemtouati", href: "https://www.last.fm/user/marm-w-toast", external: true },
  { key: "R", num: "8", ja: "Full CV", en: "RESUME PDF", value: "resume.pdf", href: "https://drive.google.com/file/d/1ydc5YTQuzeDACCAQimrMR6_45ZrbABfl/view?usp=sharing", external: true },
];

/* The keyboard, shown above 620px. `w` is the flex weight, so the wide
   keys push their rows out of alignment the way a real thumb keyboard
   does — the stagger isn't faked. */
type Key = { cap: string; w?: number };
const ROWS: Key[][] = [
  [{ cap: "Q" }, { cap: "W" }, { cap: "E" }, { cap: "R" }, { cap: "T" }, { cap: "Y" }, { cap: "U" }, { cap: "I" }, { cap: "O" }, { cap: "P" }],
  [{ cap: "A" }, { cap: "S" }, { cap: "D" }, { cap: "F" }, { cap: "G" }, { cap: "H" }, { cap: "J" }, { cap: "K" }, { cap: "L" }, { cap: "⌫", w: 1.5 }],
  [{ cap: "⇧", w: 1.5 }, { cap: "Z" }, { cap: "X" }, { cap: "C" }, { cap: "V" }, { cap: "B" }, { cap: "N" }, { cap: "M" }, { cap: "," }, { cap: "." }],
  [{ cap: "SYM", w: 1.5 }, { cap: "fn", w: 1.2 }, { cap: "␣", w: 5 }, { cap: "@", w: 1.2 }, { cap: "↵", w: 1.8 }],
];

/* The dial pad, shown below 620px. Contacts sit on 1–8; the rest are
   dead caps, same as a real handset. */
const DIAL: [string, string][] = [
  ["1", "oo"], ["2", "abc"], ["3", "def"],
  ["4", "ghi"], ["5", "jkl"], ["6", "mno"],
  ["7", "pqrs"], ["8", "tuv"], ["9", "wxyz"],
  ["*", "@$+%"], ["0", "+"], ["#", "ABC"],
];

/* Your charms. Point src at your own art in /public.
   len — how far it dangles      size — how big it hangs
   tilt — resting angle          swing / delay — stagger these,
   or they sway in unison, which is what reads as fake. */
type Charm = { src: string; len: string; size: string; tilt: string; swing: string; delay: string };
const CHARMS: Charm[] = [
  // Empty until you add art — otherwise you get cords on broken images.
  // { src: "/charm-1.png", len: "18px", size: "34px", tilt: "-6deg", swing: "3.4s", delay: "0s" },
  // { src: "/charm-2.png", len: "34px", size: "26px", tilt: "9deg",  swing: "4.3s", delay: "-0.9s" },
  // { src: "/charm-3.png", len: "26px", size: "30px", tilt: "-3deg", swing: "2.8s", delay: "-1.7s" },
];

/* one contact, two labels — match on either */
const byKey = (k: string) => ENTRIES.find((e) => e.key === k || e.num === k);

export default function FlipPhone() {
  const router = useRouter();
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
    select(ENTRIES[(i + dir + ENTRIES.length) % ENTRIES.length].key);
  };

  return (
    <div
      className="phone"
      onKeyDown={(e) => {
        if (e.key === "ArrowDown") { e.preventDefault(); step(1); }
        if (e.key === "ArrowUp") { e.preventDefault(); step(-1); }
        if (e.key === "Enter" && e.target === e.currentTarget) open(byKey(selected));
        // typing the letter or the digit does the same thing as
        // clicking its key
        const hit = byKey(e.key.toUpperCase());
        if (hit) { e.preventDefault(); select(hit.key); open(hit); }
      }}
      tabIndex={-1}
    >
      {/* ---------- upper deck ---------- */}
      <div className="phone-lid">
        <span className="lid-grille" aria-hidden="true" />

        <div className="phone-screen">
          <div className="ph-status" aria-hidden="true">
            <span className="ph-bars"><i /><i /><i /><i /></span>
            <span>1X EV</span>
            <span className="ph-mail">✉</span>
            <span className="ph-batt" />
          </div>

          <div className="ph-title">CONTACT</div>
          <div className="ph-note">PRESS A KEY TO OPEN</div>

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
                    <span className="ph-num">
                      <span className="chip-key">{e.key}</span>
                      <span className="chip-num">{e.num}</span>
                    </span>
                    <span className="ph-ja">{e.ja}</span>
                    <span className="ph-val">{e.value}</span>
                    <span className="ph-en">{e.en}</span>
                  </a>
                </li>
              ))}
            </ul>
            <span className="ph-scroll" aria-hidden="true"><i /></span>
          </div>

          <div className="ph-soft" aria-hidden="true">
            <span>MENU</span>
            <span>OK</span>
            <span>BACK</span>
          </div>
        </div>

        <span className="lid-grille" aria-hidden="true" />
      </div>

      {/* ---------- hinge ---------- */}
      <div className="phone-hinge" aria-hidden="true">
        <span className="hinge-bar" />
      </div>

      {/* ---------- lower deck ---------- */}
      <div className="phone-base">
        <div className="deck-top">
          <Link className="softkey" href="/">MENU</Link>
          <button
            type="button"
            className="okkey"
            onClick={() => open(byKey(selected))}
            aria-label={`Open ${byKey(selected)?.en ?? "selection"}`}
          >
            OK
          </button>
          <button type="button" className="softkey" onClick={() => router.back()}>
            BACK
          </button>
          <button
            type="button"
            className="callkey send"
            onClick={() => { const e = byKey("E"); if (e) { select(e.key); open(e); } }}
            aria-label="Send — email me"
          >
            ✆
          </button>
          <button
            type="button"
            className="callkey end"
            onClick={() => { select(ENTRIES[0].key); listRef.current?.scrollTo({ top: 0 }); }}
            aria-label="End — back to the top of the list"
          >
            ✆
          </button>
        </div>

        {/* QWERTY above 620px */}
        <div className="qwerty">
          {ROWS.map((row, r) => (
            <div className={`qrow r${r + 1}`} key={r}>
              {row.map((k) => {
                const entry = byKey(k.cap);
                const style = k.w ? ({ "--w": String(k.w) } as CSSProperties) : undefined;

                if (!entry) {
                  return (
                    <span key={k.cap} className="qkey" style={style} aria-hidden="true">
                      <b>{k.cap}</b>
                    </span>
                  );
                }

                const cls = `qkey live ${lit === k.cap ? "lit" : ""} ${selected === k.cap ? "sel" : ""}`;
                return (
                  <button
                    type="button"
                    key={k.cap}
                    className={cls}
                    style={style}
                    onClick={() => { select(k.cap); open(entry); }}
                    onMouseEnter={() => setHovered(k.cap)}
                    onMouseLeave={() => setHovered(null)}
                    aria-label={`${k.cap} — open ${entry.en}`}
                    aria-pressed={selected === k.cap}
                  >
                    <b>{k.cap}</b>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* dial pad below 620px */}
        <div className="dialpad">
          {DIAL.map(([cap, sub]) => {
            const entry = byKey(cap);
            if (!entry) {
              return (
                <span key={cap} className="dkey" aria-hidden="true">
                  <b>{cap}</b>
                  <i>{sub}</i>
                </span>
              );
            }
            const cls = `dkey live ${lit === entry.key ? "lit" : ""} ${selected === entry.key ? "sel" : ""}`;
            return (
              <button
                type="button"
                key={cap}
                className={cls}
                onClick={() => { select(entry.key); open(entry); }}
                onMouseEnter={() => setHovered(entry.key)}
                onMouseLeave={() => setHovered(null)}
                aria-label={`${cap} — open ${entry.en}`}
                aria-pressed={selected === entry.key}
              >
                <b>{cap}</b>
                <i>{sub}</i>
              </button>
            );
          })}
        </div>

        <span className="phone-badge" aria-hidden="true">MARMALADE VX-03</span>
      </div>

      {/* ---------- sticker slots ----------
          swap the src for your own art; B and C are waiting */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <span className="slot a"><img src="/smiski.png" alt="" aria-hidden="true" /></span>
      {/* <span className="slot b"><img src="/sticker-b.png" alt="" aria-hidden="true" /></span> */}
      {/* <span className="slot c"><img src="/sticker-c.png" alt="" aria-hidden="true" /></span> */}

      {/* ---------- charm strap ---------- */}
      <span className="phone-strap" aria-hidden="true">
        {CHARMS.map((c, i) => (
          <span
            key={i}
            className="charm"
            style={{
              "--len": c.len,
              "--size": c.size,
              "--tilt": c.tilt,
              "--swing": c.swing,
              animationDelay: c.delay,
            } as CSSProperties}
          >
            <span className="charm-cord" />
            <span className="charm-ring" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="charm-art" src={c.src} alt="" />
          </span>
        ))}
      </span>
    </div>
  );
}