/* =====================================================
   Roles — jobs and club involvement.
   Add an entry and it appears on /experience automatically.
   `kind` decides which lane it rides on: "work" is the upper
   track, "club" the lower one.

   `from` / `to` must be "YYYY.MM" — the map places nodes by
   real date, so the two lanes line up chronologically.
   Omit `to` for anything you're still doing.
   ===================================================== */

export type Role = {
  id: string;
  kind: "work" | "club";
  role: string;
  org: string;
  place: string;
  from: string;
  /** omit `to` for a role you currently hold */
  to?: string;
  notes: string[];
  /** emoji or short glyph shown on the map node */
  icon?: string;
};

export const roles: Role[] = [
  {
    id: "w1",
    kind: "work",
    role: "Student Designer",
    org: "Develop for Good",
    place: "Remote",
    from: "2026.05",
    icon: "✿",
    notes: [
      "Design low- and high-fidelity wireframes in Figma for ConnectED, a nonprofit building education-leadership networks across rural Latin American communities, focusing on user flows and accessibility.",
      "Iterate on UI components — typography, iconography, CTA placement and visual hierarchy — incorporating feedback across multiple design review cycles.",
      "Collaborate with fellow designers and a design manager to translate organizational goals into user-centered design solutions.",
    ],
  },
  {
    id: "w2",
    kind: "work",
    role: "Retail Associate",
    org: "Three Diamonds Beauty Supply",
    place: "Cocoa, FL",
    from: "2019.03",
    to: "2024.08",
    icon: "◈",
    notes: [
      "Educated customers on product specifications and benefits, tailoring inquiries into custom recommendations.",
    ],
  },
  {
    id: "c1",
    kind: "club",
    role: "Outreach Team",
    org: "Knight Hacks",
    place: "University of Central Florida",
    from: "2026.02",
    icon: "★",
    notes: [
      "Collaborate on the production of social media content, including filming videos, to increase club engagement and visibility within the student body.",
      "Draft captions for promotional videos, ensuring a consistent voice across social media posts.",
    ],
  },
  {
    id: "c2",
    kind: "club",
    role: "Creative Committee",
    org: "Association for Computing Machinery",
    place: "University of Central Florida",
    from: "2024.05",
    to: "2025.05",
    icon: "✎",
    notes: [
      "Assisted in the proofreading and creation of promotional materials in Canva.",
      "Tackled the ideation of easily digestible phrasing for a variety of promotional content.",
    ],
  },
];