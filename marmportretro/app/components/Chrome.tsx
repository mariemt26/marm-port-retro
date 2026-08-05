"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Ticker from "./Ticker";
import Masthead from "./Masthead";
import CursorTrail from "./CursorTrail";
import Footer from "./Footer";
import Radio from "./Radio";
import { StaticWipeProvider } from "./StaticWipe";
import { BASE, HOME } from "../config";

const TICKERS: Record<string, string[]> = {
  [HOME]: [
    "WELCOME TO: The Site Where Everything Happens",
    "With your wonderful host, the terribly neurotic yet immensely persistent",
    "Operating from the superior EST Time Zone",
  ],
  [`${BASE}/projects`]: [
    "CATALOGUE",
    "Where all the magic happens",
    "Full case studies available soon",
    "Please don't ruin the tapes, they cost a lot of money",
    "Do people even collect VHS tapes anymore",
  ],
  [`${BASE}/experience`]: [
    "TIME CARDS",
    "Jobs and club leadership",
    "Punched in since 2023",
    "Wow I really have a lot of time on my hands huh",
    "Is anyone even reading these",
  ],
  [`${BASE}/about`]: [
    "OWNER'S MANUAL",
    "MODEL MARMALADE-01",
    "Read before interacting",
  ],
  [`${BASE}/contact`]: [
    "GET IN TOUCH",
    "Beepboopbeep",
    "I wish I had a flip phone",
    "Replies INSTANTLY (maybe)",
    "If you've ever watched the anime Nana, the reason I want a flip phone is so I can answer the phone like Hachi",
    "Beeeeeep beeeeep beeeeep",
  ],
};


export default function Chrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const items =
    TICKERS[pathname] ||
    (pathname.startsWith(`${BASE}/projects/`)
      ? [
          "CASE STUDY",
          "Read the whole thing, the numbers are at the bottom",
        ]
      : TICKERS[HOME]);
 
  const page =
    pathname === HOME
      ? "page-home"
      : pathname.startsWith(`${BASE}/projects/`)
      ? "page-case"
      : pathname.startsWith(`${BASE}/projects`)
      ? "page-work"
      : pathname.startsWith(`${BASE}/experience`)
      ? "page-experience"
      : pathname.startsWith(`${BASE}/about`)
      ? "page-about"
      : pathname.startsWith(`${BASE}/contact`)
      ? "page-contact"
      : "page-home";
 
  return (
    <StaticWipeProvider>
      <div className={`hs-root ${page}`}>
        <CursorTrail />
        <Ticker items={items} />
        <Masthead />
        <main>{children}</main>
        <Footer />
        <Radio />
      </div>
    </StaticWipeProvider>
  );
}