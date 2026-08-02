/* =====================================================
   Radio stations — what the dial tunes between.
   NOW PLAYING is live from Last.fm; the rest are yours.
   ===================================================== */

export type Station = {
  freq: number;
  band: string;
  name: string;
  lines: string[];
};

export const stations: Station[] = [
  {
    freq: 12,
    band: "88.1",
    name: "THE SHELF",
    lines: [
      "Currently reading: The Everlasting",
      "Last finished: Jade City",
      "On the pile: Untethered Sky",
    ],
  },
  {
    freq: 63,
    band: "103.5",
    name: "STUDIO",
    lines: [
      "Building this site in Next.js.",
      "Rising senior at UCF — CS, digital media, TEFL.",
      "Booking design work from TODO.",
    ],
  },
  {
    freq: 88,
    band: "108.0",
    name: "OFF THE CLOCK",
    lines: [
      "Drawing, writing, painting, baking.",
      "Windows cracked open, preferably.",
      "Ask me about brutal scenarios for my characters.",
    ],
  },
];
