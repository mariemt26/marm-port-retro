"use client";

import { useEffect, useRef, useState } from "react";
import PuzzleGame from "./PuzzleGame";

type Overlay = "puzzle" | "about" | "shutdown" | null;

const MENUS = ["File", "Edit", "View"];

export default function MacMenuBar() {
  const [open, setOpen] = useState(false);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);


  useEffect(() => {
    if (!overlay) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOverlay(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [overlay]);

  const pick = (o: Overlay) => {
    setOverlay(o);
    setOpen(false);
  };

  return (
    <>
      <div className="menubar" ref={wrapRef}>
        <span className="apple" aria-hidden="true">✦</span>
        {MENUS.map((m) => (
          <span className="menu-item dim" key={m}>
            {m}
          </span>
        ))}

        <div className="menu-drop">
          <button
            className={`menu-item trigger ${open ? "on" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="menu"
          >
            Special
          </button>

          {open && (
            <ul className="drop" role="menu">
              <li role="none">
                <button role="menuitem" onClick={() => pick("puzzle")}>
                  Puzzle<span className="drop-key">⌘P</span>
                </button>
              </li>
              <li role="none">
                <button role="menuitem" onClick={() => pick("about")}>
                  About This Designer
                </button>
              </li>
              <li className="drop-sep" role="separator" />
              <li role="none">
                <button role="menuitem" disabled>
                  Clean Up Desktop
                </button>
              </li>
              <li role="none">
                <button role="menuitem" onClick={() => pick("shutdown")}>
                  Shut Down
                </button>
              </li>
            </ul>
          )}
        </div>

        <span className="menu-clock">About This Designer</span>
      </div>


      {overlay === "puzzle" && (
        <div className="mac-modal" onClick={() => setOverlay(null)}>
          <div
            className="macwin modal-win"
            role="dialog"
            aria-modal="true"
            aria-label="Puzzle"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mac-bar">
              <button
                className="mac-close as-btn"
                onClick={() => setOverlay(null)}
                aria-label="Close"
              />
              <span className="mac-title">Puzzle</span>
            </div>
            <div className="mac-body">
              <PuzzleGame />
            </div>
          </div>
        </div>
      )}

      {overlay === "about" && (
        <div className="mac-modal" onClick={() => setOverlay(null)}>
          <div
            className="macwin modal-win narrow"
            role="dialog"
            aria-modal="true"
            aria-label="About This Designer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mac-bar">
              <button
                className="mac-close as-btn"
                onClick={() => setOverlay(null)}
                aria-label="Close"
              />
              <span className="mac-title">About This Designer</span>
            </div>
            <div className="mac-body aboutbox">
              <h3>Marmalade Studios</h3>
              <p className="ab-ver">Version 2026.1 · Orlando, FL</p>

              <dl className="ab-mem">
                <div>
                  <dt>Coffee</dt>
                  <dd><span className="bar" style={{ width: "84%" }} />84%</dd>
                </div>
                <div>
                  <dt>Deadlines</dt>
                  <dd><span className="bar" style={{ width: "62%" }} />62%</dd>
                </div>
                <div>
                  <dt>Free Space</dt>
                  <dd><span className="bar" style={{ width: "18%" }} />18%</dd>
                </div>
              </dl>

              <p className="ab-note">
                Built by hand. No templates were harmed in the making of this
                portfolio.
              </p>
            </div>
          </div>
        </div>
      )}

      {overlay === "shutdown" && (
        <div
          className="shutdown"
          role="dialog"
          aria-modal="true"
          aria-label="Shut down"
          onClick={() => setOverlay(null)}
        >
          <p className="sd-msg">
            It is now safe to turn off
            <br />
            your computer.
          </p>
          <p className="sd-hint">click anywhere to wake</p>
        </div>
      )}
    </>
  );
}
