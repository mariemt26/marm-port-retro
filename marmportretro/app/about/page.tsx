import type { Metadata } from "next";
import MacMenuBar from "../components/MacMenuBar";
import MacWindow from "../components/MacWindow";
import PhotoStack from "../components/PhotoStack";
import Favorites from "../components/Favorites";
import PaintWindow from "../components/PaintWindow";
import Reveal from "../components/Reveal";

export const metadata: Metadata = { title: "About" };

type Skill = { label: string; name: string; slug?: string };

const TOOLS: { group: string; items: Skill[] }[] = [
  {
    group: "DESIGN",
    items: [
      { label: "Fg", name: "Figma", slug: "figma" },
      { label: "Ai", name: "Illustrator" },
      { label: "Ps", name: "Photoshop" },
      { label: "Id", name: "InDesign" },
      { label: "Xd", name: "Adobe XD" },
      { label: "Csp", name: "Clip Studio" },
    ],
  },
  {
    group: "DEVELOPMENT",
    items: [
      { label: "Nx", name: "Next.js", slug: "nextdotjs" },
      { label: "Re", name: "React", slug: "react" },
      { label: "Rn", name: "React Native", slug: "react" },
      { label: "Ts", name: "TypeScript", slug: "typescript" },
      { label: "Js", name: "JavaScript", slug: "javascript" },
      { label: "5", name: "HTML", slug: "html5" },
      { label: "3", name: "CSS", slug: "css" },
      { label: "Tw", name: "Tailwind", slug: "tailwindcss" },
      { label: "3js", name: "Three.js", slug: "threedotjs" },
      { label: "Ja", name: "Java" },
      { label: "Py", name: "Python", slug: "python" },
      { label: "C", name: "C", slug: "c" },
    ],
  },
  {
    group: "TOOLS",
    items: [
      { label: "Vc", name: "Vercel", slug: "vercel" },
      { label: "Sb", name: "Supabase", slug: "supabase" },
      { label: "Git", name: "Git", slug: "git" },
      { label: "Gh", name: "GitHub", slug: "github" },
      { label: "Sp", name: "Spline" },
      { label: "Vi", name: "Vim", slug: "vim" },
      { label: "Em", name: "Emacs", slug: "gnuemacs" },
      { label: "Tr", name: "Trello", slug: "trello" },
      { label: "Ob", name: "Obsidian", slug: "obsidian" },
    ],
  },
];


const LANGUAGES: [string, string][] = [
  ["English", "Native"],
  ["Arabic", "Fluent"],
  ["Algerian Arabic", "Fluent"],
  ["Spanish", "Intermediate"],
  ["Italian", "Introductory"],
  ["Japanese", "Introductory"],
];

const LINKS = [
  { label: "GitHub", href: "https://github.com/mariemt26", glyph: "◧" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mariem-touati",
    glyph: "▤",
  },
  { label: "Resume.pdf", href: "https://drive.google.com/file/d/1ydc5YTQuzeDACCAQimrMR6_45ZrbABfl/view?usp=sharing", glyph: "▥" },
  { label: "Email", href: "mailto:mariemtouati.04@gmail.com", glyph: "✉" },
];

export default function AboutPage() {
  return (
    <div className="wrap desk">
      <MacMenuBar />

      <div className="desk-grid">
        {}
        <div className="desk-col">
        {}
        <MacWindow title="About Me" className="win-about" tilt={-0.6}>
          <div className="doc">
            <h1>Haii, I&apos;m Mariem.</h1>
            <p>
              I&apos;m currently a rising senior attending the University of Central Florida, aiming for a bachelor&apos;s degree in Computer Science,
              a minor in digital media, and a TEFL certificate to boot. Currently, I&apos;m putting a greater focus on immersing myself within my school&apos;s wonderful tech clubs,
              meeting like-minded individuals while creating a lasting impact in my local community. It took me a while to figure out what path I wanted to walk down, but the beauty in
              life is that there is always another chance for you to try again.
            </p>
            <p>
              It was not an easy feat to decide what I wanted to be. Growing up, I would give everyone a different answer. I was a bit of a finicky kid. &quot;I want to be a diplomat&quot; is what I would tell my older brother,
              &quot;I want to be a writer&quot; is what I would tell myself. On some days, I&apos;d even tell my friends I wanted to be everything at once. One way ticket to stretching myself thin...
            </p>
            <p>
              Something I was routinely praised for throughout my life was my immense creativity, and after I decided on the route of a computer scientist,
              I spent countless hours scratching my head wondering what sort of niche was right for me, one where I would never have to dim my love for the arts again. And when my current dear friend told me of a field where a good eye for design was mandatory,
              you all can only guess how quickly I jumped the SWE ship (one I definitely was not built for) and finally found my footing for the first time in my degree.
            </p>
            <p>
              When I&apos;m not staring at a screen and beating up my eyes, I&apos;m someone who prides themselves on having many different hobbies. Drawing, writing (or moreso, imagining brutal scenarios I can put my characters in), and painting are among them.
              I&apos;m also a huge reader, who loves the feeling of escapism that is given to me through wild fantasy worlds. Whenever I need a good dose of sunlight, caring for my many plants is what calls to me, or baking with all my windows cracked open. Fun fact: all of my plants are named
              after cities in Italy, spurred by my love for Lupin the Third Part 4 (which took place in San Marino). When I want to stare at a screen, watching movies, tv shows, and anime are what speak to me the most.
            </p>
            <p>
              Thanks for stopping by and listening (I have a habit of rambling). Hope to catch you around!
            </p>
            <p className="doc-sign">— Mariem Touati, Orlando FL</p>
          </div>
        </MacWindow>

        {}
        <Reveal className="palette" delay={90}>
          <div className="pal-bar">
            <span className="pal-grip" aria-hidden="true" />
            <span>Tools</span>
          </div>
          {TOOLS.map((g) => (
            <div className="pal-group" key={g.group}>
              <span className="pal-label">{g.group}</span>
              <div className="pal-grid">
                {g.items.map((t) => (
                  <span className="pal-tool" key={t.name} title={t.name}>
                    {t.slug ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        className="pal-logo"
                        src={`https://cdn.simpleicons.org/${t.slug}/16224A`}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                      />
                    ) : (
                      <b>{t.label}</b>
                    )}
                    <i>{t.name}</i>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>

        {}
        <Reveal className="palette" delay={100}>
          <div className="pal-bar">
            <span className="pal-grip" aria-hidden="true" />
            <span>Languages</span>
          </div>
          <div className="pal-group">
            <ul className="lang-list">
              {LANGUAGES.map(([name, level]) => (
                <li key={name}>
                  <span className="lang-name">{name}</span>
                  <span className="lang-level">{level}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        </div>

        {}
        <div className="desk-col">
        {}
        <MacWindow title="Photos" className="win-photos" tilt={0.8} delay={60}>
          <PhotoStack />
        </MacWindow>

        {}
        <MacWindow title="Favorites" className="win-favs" tilt={0.5} delay={70}>
          <Favorites />
        </MacWindow>

        {}
        <MacWindow title="Scratchpad" className="win-paint" tilt={-0.5} delay={80}>
          <p className="paint-hint">Draw me something.</p>
          <PaintWindow />
        </MacWindow>

        </div>

        {}
        <Reveal className="icons" delay={120}>
          {LINKS.map((l) => (
            <a
              className="desk-icon"
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon-glyph" aria-hidden="true">
                {l.glyph}
              </span>
              <span className="icon-label">{l.label}</span>
            </a>
          ))}
        </Reveal>
      </div>
    </div>
  );
}