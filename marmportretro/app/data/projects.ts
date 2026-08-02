/* =====================================================
   Every project lives here. Add one object and it shows
   up on /projects automatically.

   A project links to a case study ONLY if it has a
   `study` key. Leave it off and the tape renders but
   doesn't go anywhere — which is what you want until
   the write-up actually exists.
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
      "Plant-based social app where you scan, identify, and log the plants you meet on everyday ventures. Compete with friends to grow the biggest garden. Made as a 12-hour hackathon project.",
    metrics: [],
    tags: ["MOBILE", "REACT NATIVE", "ENVIRONMENT"],
    featured: true,
    study: {
      headline: ["A garden you grow", "by paying attention."],
      facts: [
        { label: "ROLE", value: "Front-end designer" },
        { label: "TEAM", value: "Four members: Two frontend, two backend" },
        { label: "STACK", value: "React Native, TypeScript, Supabase, PostGIS" },
        { label: "YEAR", value: "2026" },
      ],
      sections: [
        {
          kana: "THE APP",
          title: "Nature made Informative",
          body: [
            "Oftentimes on our daily excursions, we look straight ahead and opt to neglect the nature that sways in the breeze around us. Very infrequently do we ever have the time to stop and smell the roses. Therefore, my team and I took it upon ourselves to make a flora social media app, where your digital garden is rooted in discovery!",
          ],
        },
        {
          kana: "VISUAL IDENTITY",
          title: "Impressionism in the Age of Minimalism",
          body: [
            "Where most plant-based apps opt for a clinical green and white color palette, with very few ever adding an extra color onto their palatte, we wished to make Fleurish exude a naturally whimsical air. As both front-end designers are also seasoned artists, we went back to the classics, taking inspiration from impressionist artists such as Claude Monet and Pierre-Auguste Renoir.",
            "From that one decision, deciding upon the rest of the palette was simple, and utilizing some of their most famous works within our app's UI gave it the daydream-esque environment we had strived for at the beginning.",
            "With our choice of including paintings, we knew that the colors would have to match. Lighter colors for lighter screens, darker colors for darker ones. Therefore, we decided to opt for a 5 color palette, with all the text in our app a dark, reflective green to match the theme. When including a piece, the opacity was dimmed, to give the app an airy feel while ensuring accessibility among the different screens and abiding by WCAG standards. On many of our screens, the paintings are simply top and bottom borders, accompanied by striking vector art.",
          ],
          pull: "Why forget that art and nature can go hand-in-hand?",
        },
      ],

      /* ── screenshots ──────────────────────────────────
         Files go in public/fleurish/. Rename these to match
         yours and delete any you don't have — a missing file
         renders as a broken image.
         Captions are where the value is: say what the screen
         solves, not what it is.
         ─────────────────────────────────────────────── */
      gallery: [
        {
          src: "/fleurish/Landing pages.png",
          caption: "The first screens the user sees when opening the app.",
          alt: "landing page.",
        },
        {
          src: "/fleurish/Login flow.png",
          caption: "These are the login, register, and forgot password screens.",
          alt: "login,register,and forgot password screens.",
        },
        {
          src: "/fleurish/Pages.png",
          caption: "The initial pages the user can navigate through via the navigation at the bottom.",
          alt: "initial screens after login.",
        },
      ],

      reflection:
        "More on the identify-to-leaderboard flow and the AI diagnosis UI is on its way. I'd rather write it properly than rush it. Happy to walk through either in a conversation in the meantime.",
    },
  },

  {
    slug: "knightrate",
    sku: "KNR-02",
    year: "2026",
    title: "KnightRate: For Knights, By Knights",
    label: "KNIGHTRATE",
    color: "#FFC22E",
    image: "/KnightRateLogo.png",
    imageAlt: "KnightRate logo",
    blurb:
      "Course reviews for UCF students, with the study resources attached. Ratings tell you a class is hard; KnightRate tells you what got people through it.",
    metrics: [],
    tags: ["WEB APP", "MERN", "EDUCATION"],
    featured: true,
    // No `study` yet — the tape renders but doesn't link.
    // Add one when the write-up is ready.
  },

  {
    slug: "connected",
    sku: "CNE-03",
    year: "2026",
    title: "ConnectEd Fellows",
    label: "CONNECTED",
    color: "#FF991C",
    blurb:
      "A nonprofit fostering a growing web of education leaders in rural Latin America. I design their wireframes and UI components as a Develop for Good student designer.",
    metrics: [],
    tags: ["WEB APP", "EDUCATION", "NONPROFIT"],
    featured: true,
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
    tags: ["WEB", "REACT", "RECREATIONAL"],
  },

  {
    slug: "logophile-lexicon",
    sku: "LGX-05",
    year: "2026",
    title: "Logophile Lexicon",
    label: "LOGOPHILE",
    color: "#950606",
    blurb:
      "A rare-word dictionary for anyone building their vocabulary. Collect words, use them in sentences, and play memorisation games to make them stick.",
    metrics: [],
    tags: ["WEB", "TYPESCRIPT", "LEARNING"],
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);