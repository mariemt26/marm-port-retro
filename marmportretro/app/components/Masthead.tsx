"use client";

import { usePathname } from "next/navigation";
import { TVLink } from "./StaticWipe";
import { SITE, BASE, HOME } from "../config";

const NAV = [
  { to: HOME, label: "HOME" },
  { to: `${BASE}/experience`, label: "EXPERIENCE" },
  { to: `${BASE}/projects`, label: "PROJECTS" },
  { to: `${BASE}/about`, label: "ABOUT" },
  { to: `${BASE}/contact`, label: "CONTACT" },
];

export default function Masthead() {
  const pathname = usePathname();
  const isCurrent = (to: string) =>
    to === HOME ? pathname === HOME : pathname.startsWith(to);

  return (
    <div className="wrap">
      <header className="masthead">
        <TVLink to={HOME} className="mark" aria-label={SITE.name}>
          <b lang="ar" dir="rtl">{SITE.wordmark}</b>
          <i>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="mark-jar" src="/jam.png" alt="" aria-hidden="true" />
            {SITE.studio}
          </i>
        </TVLink>
        <nav>
          {NAV.map((item) => (
            <TVLink
              key={item.to}
              to={item.to}
              aria-current={isCurrent(item.to) ? "page" : undefined}
            >
              {item.label}
            </TVLink>
          ))}
        </nav>
      </header>
    </div>
  );
}