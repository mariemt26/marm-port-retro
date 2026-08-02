/* =====================================================
   Radio stations — what the dial tunes between.
   NOW PLAYING is live from Last.fm; the rest are yours.

   `art` is optional. Square images go in public/stations/
   and render at 66px, so ~200x200 is plenty. Leave it off
   and the station shows a ◉ placeholder instead.
   ===================================================== */

export type Station = {
  /** dial position, 0–100 */
  freq: number;
  /** what shows on the frequency readout */
  band: string;
  name: string;
  /** lines the station "broadcasts" — cycled while tuned in */
  lines: string[];
  /** square image in /public — e.g. "/stations/greenhouse.jpg" */
  art?: string;
};

export const stations: Station[] = [
  {
    freq: 10,
    band: "88.1",
    name: "THE SHELF",
    art: "/stations/The Everlasting.jpg",
    lines: [
      "Currently reading: The Everlasting",
      "Just finished: Jade City",
      "On the pile: Untethered Sky",
    ],
  },
  {
    freq: 26,
    band: "92.3",
    name: "GREENHOUSE",
    art: "/stations/birdofparadise.jpg",
    lines: [
      "Every plant I own is named after an Italian city.",
      "Currently thriving: Portofino. Currently sulking: Bologna.",
      "Watering schedule: purely vibe based.",
    ],
  },
  {
    freq: 44,
    band: "97.9",
    name: "THE DRAFTS",
    art: "/stations/nana.jpg",
    lines: [
      "Writing, mostly. Or imagining scenarios while listening to music.",
      "There is a difference between plotting and stalling. I know both well.",
      "Currently owed a rewrite: several.",
    ],
  },
  {
    freq: 63,
    band: "103.5",
    name: "STUDIO",
    art: "/stations/chiikawa.jpg",
    lines: [
      "Built this site in Next.js.",
      "Working on Logophile Lexicon.",
      "Rising senior at UCF — CS, digital media, TEFL certificate.",
    ],
  },
  {
    freq: 86,
    band: "107.7",
    name: "KITCHEN",
    art: "/stations/kibby.jpg",
    lines: [
      "Baking the best brownies ever.",
      "Chef's Up exists because I kept Googling flour subs.",
      "I can't handle caffeine anymore.",
    ],
  },
];