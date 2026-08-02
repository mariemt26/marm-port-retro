/* =====================================================
   Every project lives here. Add one object and it shows
   up on /projects automatically; give it a `study` and it
   gets a full case study page at /projects/<slug>.
   ===================================================== */

export type Metric = { label: string; value: string };
export type Fact = { label: string; value: string };
export type Plate = {
  /** path in /public — must start with "/" and NOT include "public" */
  src: string;
  /** shown under the plate and in the lightbox */
  caption: string;
  /** describe the image for screen readers */
  alt: string;
  /** true for wide screenshots — takes a full row */
  wide?: boolean;
};
export type StudySection = {
  /** small kicker label above the heading */
  kana: string;
  title: string;
  body?: string[];
  list?: string[];
  pull?: string;
  images?: Plate[];
};
export type Study = {
  headline: [string, string];
  facts: Fact[];
  sections: StudySection[];
  gallery?: Plate[];
  /** optional — omit entirely rather than inventing numbers */
  results?: { value: string; label: string }[];
  reflection?: string;
};
export type Project = {
  slug: string;
  sku: string;
  year: string;
  title: string;
  /** short display label on the pager LCD / cassette label */
  label: string;
  /** thumbnail in /public — path must start with "/" */
  image?: string;
  /** describe the thumbnail for screen readers */
  imageAlt?: string;
  color: string;
  blurb: string;
  /** leave as [] until you have numbers you can back up */
  metrics: Metric[];
  tags: string[];
  featured?: boolean;
  study?: Study;
};

export const projects: Project[] = [
  {
    slug: "fleurish",
    sku: "FLR-01",
    year: "2026",
    title: "Fleurish: Rooted In Discovery",
    label: "FLEURISH",
    color: "#E89EB8",
    blurb:
      "Plant-based social app where you scan, identify, and log the plants you meet on everyday ventures. Compete with friends to grow the biggest garden.",
    metrics: [],
    tags: ["MOBILE", "ENVIRONMENT"],
    featured: true,
    study: {
      headline: ["TODO —", "TODO."],
      facts: [
        { label: "TYPE", value: "TODO" },
        { label: "ROLE", value: "TODO" },
        { label: "TEAM", value: "TODO" },
        { label: "DURATION", value: "TODO, 2026" },
      ],
      sections: [
        {
          kana: "PROBLEM",
          title: "TODO",
          body: ["TODO"],
        },
        {
          kana: "DESIGN",
          title: "TODO",
          body: ["TODO"],
        },
        {
          kana: "OUTCOME",
          title: "TODO",
          body: ["TODO"],
        },
      ],
      // add screenshots when you have them:
      // gallery: [{ src: "/fleurish/01.png", caption: "TODO", alt: "TODO" }],
      reflection: "TODO",
    },
  },

  {
    slug: "knightrate",
    sku: "KNR-02",
    year: "2026",
    title: "KnightRate: For Knights, By Knights",
    label: "KNIGHTRATE",
    color: "#FFC22E",
    // file lives at public/KnightRateLogo.png
    image: "/KnightRateLogo.png",
    imageAlt: "KnightRate logo",
    blurb:
      "Course reviews for UCF students, with the study resources attached. Ratings tell you a class is hard; KnightRate tells you what got people through it.",
    metrics: [],
    tags: ["WEB APP", "MOBILE", "EDUCATION"],
    featured: true,
    study: {
      headline: ["Reviews that", "hand you the notes."],
      facts: [
        { label: "TYPE", value: "Self-directed project" },
        { label: "ROLE", value: "TODO — design? design + build?" },
        { label: "TEAM", value: "TODO — solo, or who else?" },
        { label: "DURATION", value: "TODO, 2026" },
      ],
      sections: [
        {
          kana: "PROBLEM",
          title: "Ratings without resources are only half an answer",
          body: [
            "Course reviews tell you a class is hard, that the curve is generous, that the professor doesn't take attendance. What they never tell you is the thing students actually pass the class with — the study guide someone made in 2023, the practice exams, the one YouTube playlist that finally explained recursion.",
            "That material exists. It just lives in group chats, in a friend's Google Drive, in a Discord that dies at the end of every semester. Every cohort rebuilds it from nothing.",
          ],
        },
        {
          kana: "RESEARCH",
          title: "TODO — what did you actually learn from students?",
          body: [
            "Replace this with what you found. Even informal counts: how many students you talked to, where they said they currently look for materials, what made them distrust existing review sites.",
          ],
          list: [
            "TODO — a finding that surprised you",
            "TODO — a behaviour you saw repeatedly",
            "TODO — something that killed an assumption you had",
          ],
          pull: "TODO — the one sentence that reframed the project for you.",
        },
        {
          kana: "DESIGN",
          title: "Making a resource worth attaching",
          body: ["TODO — describe the decisions. Some questions worth answering here:"],
          list: [
            "How does someone rate a course without it turning into a professor popularity contest?",
            "What stops the resource library filling with dead links and junk?",
            "How do you show a course at a glance — one score, or several dimensions?",
            "What does a course page look like when nobody has reviewed it yet?",
            "How do you handle academic integrity, so it stays study materials and not answer keys?",
          ],
          // ── inline screenshots for this section ──
          // Files go in public/knightrate/. Rename these to match yours,
          // and delete any you don't have — a missing file shows a broken icon.
          images: [
            {
              src: "/knightrate/course-page.png",
              caption: "Course page — rating summary with attached resources",
              alt: "Course detail screen showing a rating breakdown and a list of shared files",
            },
            {
              src: "/knightrate/search.png",
              caption: "Search by course code or professor",
              alt: "Search results screen listing matching courses",
            },
          ],
        },
        {
          kana: "TESTING",
          title: "TODO — what did you put in front of people?",
          body: [
            "Even a rough round counts. What you showed them, what confused them, what you changed because of it. If a feature got cut here, say so — that's the most convincing part of any case study.",
          ],
        },
      ],

      // ── a block of plates at the end, after the sections ──
      // Use this for the Figma frames that don't belong to one section.
      gallery: [
        {
          src: "/knightrate/flow.png",
          caption: "Full user flow, from search to saved resource",
          alt: "Flow diagram of the KnightRate user journey",
          wide: true,
        },
        {
          src: "/knightrate/wireframes.png",
          caption: "Early wireframes",
          alt: "Grid of low-fidelity wireframe screens",
        },
        {
          src: "/knightrate/components.png",
          caption: "Component set — cards, ratings, file rows",
          alt: "Figma component library showing reusable UI pieces",
        },
      ],

      reflection:
        "TODO — what you'd do differently. This is the section recruiters read closest, so be specific: a decision you'd reverse, a step you skipped, something the project taught you that you now do by default.",
    },
  },

  {
    slug: "connected",
    sku: "CNE-03",
    year: "2026",
    title: "ConnectEd Fellows",
    label: "CONNECTED",
    color: "#FF991C",
    blurb:
      "A nonprofit fostering a growing web of education leaders in rural Latin America. I served as their enthusiastic volunteer.",
    metrics: [],
    tags: ["WEB APP", "EDUCATION", "NONPROFIT"],
    featured: true,
    study: {
      headline: ["TODO —", "TODO."],
      facts: [
        { label: "TYPE", value: "TODO" },
        { label: "ROLE", value: "Volunteer" },
        { label: "TEAM", value: "TODO" },
        { label: "DURATION", value: "TODO, 2026" },
      ],
      sections: [
        {
          kana: "PROBLEM",
          title: "TODO",
          body: ["TODO"],
        },
        {
          kana: "DESIGN",
          title: "TODO",
          body: ["TODO"],
        },
        {
          kana: "OUTCOME",
          title: "TODO",
          body: ["TODO"],
        },
      ],
      // add screenshots:
      // gallery: [{ src: "/connected/01.png", caption: "TODO", alt: "TODO" }],
      reflection: "TODO",
    },
  },

  {
    slug: "chef-up",
    sku: "CHF-04",
    year: "2026",
    title: "Chef's Up: Surf for Recipes",
    label: "CHEF'S UP",
    color: "#06402B",
    blurb:
      "Check off what's already in your kitchen and get recipes tailored to your fashionable lack. No more Googling substitutes for cake flour mid-bake.",
    metrics: [],
    tags: ["MOBILE", "RECREATIONAL"],
    study: {
      headline: ["TODO —", "TODO."],
      facts: [
        { label: "TYPE", value: "TODO" },
        { label: "ROLE", value: "TODO" },
        { label: "TEAM", value: "TODO" },
        { label: "DURATION", value: "TODO, 2026" },
      ],
      sections: [
        {
          kana: "PROBLEM",
          title: "TODO",
          body: ["TODO"],
        },
        {
          kana: "DESIGN",
          title: "TODO",
          body: ["TODO"],
        },
        {
          kana: "OUTCOME",
          title: "TODO",
          body: ["TODO"],
        },
      ],
      // add screenshots when you have them:
      // gallery: [{ src: "/chef-up/01.png", caption: "TODO", alt: "TODO" }],
      reflection: "TODO",
    },
  },

  {
    slug: "logophile-lexicon",
    sku: "LGX-05",
    year: "2026",
    title: "Logophile Lexicon",
    label: "LOGOPHILE",
    color: "#950606",
    blurb:
      "A rare word dictionary. Perfect for all those who want to increase their vocabular level. Collect rare words, use them in sentences, and play memorization games.",
    metrics: [],
    tags: ["WEB", "TYPOGRAPHY"],
    study: {
      headline: ["TODO —", "TODO."],
      facts: [
        { label: "TYPE", value: "TODO" },
        { label: "ROLE", value: "TODO" },
        { label: "TEAM", value: "TODO" },
        { label: "DURATION", value: "TODO, 2026" },
      ],
      sections: [
        {
          kana: "PROBLEM",
          title: "TODO",
          body: ["TODO"],
        },
        {
          kana: "DESIGN",
          title: "TODO",
          body: ["TODO"],
        },
        {
          kana: "OUTCOME",
          title: "TODO",
          body: ["TODO"],
        },
      ],
      // add screenshots when you have them:
      // gallery: [{ src: "/logophile-lexicon/01.png", caption: "TODO", alt: "TODO" }],
      reflection: "TODO",
    },
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);