/* =====================================================
   Every project lives here.
   ===================================================== */

export type Metric = { label: string; value: string };
export type Fact = { label: string; value: string };
export type Plate = {
  src: string;
  caption: string;
  alt: string;
  wide?: boolean;
};

export type StudySection = {
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
  results?: { value: string; label: string }[];
  reflection?: string;
};

export type Project = {
  slug: string;
  sku: string;
  year: string;
  title: string;
  label: string;
  image?: string;
  imageAlt?: string;
  color: string;
  blurb: string;
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
            "Where most plant-based apps opt for a clinical green and white color palette, with very few ever adding an extra color onto their palette, we wished to make Fleurish exude a naturally whimsical air. As both front-end designers are also seasoned artists, we went back to the classics, taking inspiration from impressionist artists such as Claude Monet and Pierre-Auguste Renoir.",
            "From that one decision, deciding upon the rest of the palette was simple. Utilizing some of their most famous works within our app's UI gave it the daydream-esque environment we had strived for at the beginning.",
            "With our choice of including paintings, we knew that the colors would have to match. Lighter colors for lighter screens, darker colors for darker ones. Therefore, we decided on a 5 color palette, with all the text in our app a dark, reflective green to match the theme. When including a piece, the opacity was dimmed, to give the app an airy feel while ensuring accessibility among the different screens and abiding by WCAG standards. On many of our screens, the paintings are simply top and bottom borders, accompanied by striking vector art.",
          ],
          pull: "Why forget that art and nature can go hand-in-hand?",
        },
      ],

      /* ── screenshots ──────────────────────────────────
         Files go in public/fleurish/. 
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
    //image: "/KnightRateLogo.png",
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
      "A nonprofit connecting education leaders across rural Latin America. We rebuilt how their site explains the fellowship, and gave the team the tools to run it themselves.",
    metrics: [],
    tags: ["WEB", "NONPROFIT", "DEVELOP FOR GOOD"],
    featured: true,
    study: {
      headline: ["A site that could", "enforce a message."],
      facts: [
        { label: "ROLE", value: "Designer" },
        { label: "TEAM", value: "Develop for Good — 3 designers, 5 developers, 2 managers" },
        { label: "CLIENT", value: "ConnectEd Fellows" },
        { label: "DURATION", value: "May — August 2026" },
      ],
      sections: [
        {
          kana: "THE CLIENT",
          title: "A network of local educators, not a charity handing things down",
          body: [
            "ConnectEd Fellows is a nonprofit founded in 2013 that connects, equips and grows a network of local education leaders in rural Latin America. It backs the educators already in those communities and the projects they run, thriving on a bottom-up model rather than a top-down one.",
            "They work across Guatemala and Nicaragua, and expanded into Colombia this year. That expansion brings the Fellows network to 92 schools across three countries, reaching more than 19,000 people.",
          ],
        },
        {
          kana: "THE PROBLEM",
          title: "A model nobody could find, on a stack nobody could maintain",
          body: [
            "The site didn\u2019t clearly communicate what the fellowship actually was, what it had achieved, or how someone could get involved. Three of the most important things an organisation has to say, and they were all spread across countless pages and communicated using disconnected jargon.",
            "Underneath, the tech stack was complex and expensive enough that the team couldn\u2019t comfortably manage the site themselves. And they had no visibility into performanc. They had no sense of who was arriving, from where, or what they did next.",
          ],
          pull:
            "A nonprofit that can\u2019t update its own website has a design problem, not a technical one.",
        },
        {
          kana: "PROCESS",
          title: "Scope in May, build through summer, hand it over in August",
          body: [
            "We opened with a scoping phase in May, aligning with the client on objectives, constraints and priorities. Potential solutions were weighed on impact, effort and technical complexity before anything got built.",
            "Development ran June through August in continuous iteration cycles, folding in feedback from both the client and our mentor on each requirement. A midpoint check-in in July validated the direction. August went to handoff: documentation covering what we\u2019d shipped, what we hadn\u2019t, and what a future team should pick up.",
          ],
        },
        {
          kana: "FAQ",
          title: "Answers where the questions actually occur",
          body: [
            "We started with a plain wireframe to agree the structure and behaviour before refining anything, and worked inside ConnectEd\u2019s existing orange-and-white branding and coherent design system so it stayed visually consistent.",
            "To decide what belonged in it, we each audited the site independently, looking for places where information felt unclear or under-explained. That surfaced the real questions rather than the ones we assumed people had.",
            "The decision I\u2019d defend hardest: we didn\u2019t make it a standalone FAQ page. It sits inside the browsing experience, so a visitor hits clarification right after learning about the model, the impact, or how to get involved, appearing at the moment the question forms, not on a page they\u2019d have to go looking for.",
          ],
        },
        {
          kana: "POST-DONATION",
          title: "A receipt is a dead end",
          body: [
            "The confirmation page was doing nothing but confirming. We rebuilt it around four goals: show donors where the money goes, reinforce trust, keep offering ways to be involved, and open more paths to stay connected.",
            "That meant surfacing relevant calls to action, trust and certification badges, and ConnectEd\u2019s social channels. In turn, the end of a transaction became the start of a relationship.",
          ],
        },
        {
          kana: "TESTIMONIALS",
          title: "Letting visitors choose which impact they care about",
          body: [
            "A static wall of quotes asks the reader to do the sorting. We added category filtering so visitors can browse stories by the values and areas of impact they\u2019re actually interested in.",
            "We also built an \"Add Your Story\" pathway, so fellows, donors and other stakeholders can contribute their own. That shifted the page from displaying testimonials to collecting them.",
            "A bonafide wall of positive, first-hand accounts."
          ],
        },
        {
          kana: "PLUMBING",
          title: "Newsletter, analytics, and a stack the team can afford",
          body: [
            "We streamlined the newsletter subscription flow, making it easier for visitors to sign up, and ensuring less complexity in the tools the organisation has to maintain.",
            "We also implemented a GA4 dashboard surfacing traffic and engagement across their key recruitment channels, including WhatsApp and Facebook. The point was was to turn tracking output that nobody on the team could interpret into visualisations they could act on.",
            "The whole build sits on WordPress with WPForms, Elementor, WP Mail SMTP and Bluehost, an established choice because ConnectEd already had licences for most of it. It is cheap to keep running, and nothing they\u2019d need us to operate.",
          ],
        },
      ],
 
      gallery: [
        {
          src: "/connected/faq.png",
          caption: "The FAQ, built as its own page rather than being baked into exisiting user flow",
          alt: "FAQ section in ConnectEd's orange and white branding",
        },
        {
          src: "/connected/post-donation.png",
          caption: "Post-donation page, featuring trust badges, next steps, and social channels",
          alt: "Donation confirmation screen with calls to action",
        },
        {
          src: "/connected/testimonials.png",
          caption: "Testimonials with category filtering and an Add Your Story pathway, crucial for prospective donors and education leaders",
          alt: "Testimonial page showing filter categories",
        },
      ],
 
      results: [
        { value: "92", label: "SCHOOLS IN NETWORK" },
        { value: "19,000+", label: "PEOPLE REACHED" },
        { value: "3", label: "COUNTRIES" },
        { value: "GA4", label: "ANALYTICS, FROM ZERO" },
      ],
 
      reflection:
        "Time contraints were tough to deal with, especially near the end of the program. With our client busy throughout the month of July, a lot of communication between our client and our team became muddled and sparse. Greater communication would be enforced in a foreseeable future, with a higher frequency of meetings between the single weekly client meeting enforced. The landing page, although sleek and inviting, was in need of greater adjustments that were not approved at the end. I wish to see an altered home page utilizing the interactive wireframe that my team and I created being utilized.",
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