import Nameplate from "./components/Nameplate";
import Television from "./components/Television";
import Pager from "./components/Pager";
import Reveal from "./components/Reveal";
import Scramble from "./components/Scramble";
import { TVLink } from "./components/StaticWipe";
import { projects } from "./data/projects";
import { SITE, BASE } from "./config";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="wrap">
      <div className="hero">
        <Television />

        <div className="hero-copy">
          <span className="badge">EST. 2022 - THE END OF TIME</span>
          <Nameplate />
          <p className="lede">
            UI/UX designer based in Orlando, Florida. On a lifetime journey of combining creativity with techonology to produce fun, accessible products for all!
          </p>
          <div className="hero-meta">
            <span>{SITE.location}</span>
            <span>EN / AR</span>
            <span>PRODUCT DESIGN</span>
            <span>ASPIRING STORYTELLER</span>
          </div>
        </div>
      </div>

      <section>
        <Reveal className="head">
          <div>
            <Scramble text="SELECTED WORK" />
            <h2>Recent work</h2>
          </div>
          <span className="count">
            {featured.length} OF {projects.length} —{" "}
            <TVLink to={`${BASE}/work`} style={{ color: "var(--shu)" }}>
              SEE ALL
            </TVLink>
          </span>
        </Reveal>

        <div className="grid">
          {featured.map((p, i) => (
            <Pager key={p.slug} project={p} delay={(i % 3) * 70} />
          ))}
        </div>
      </section>
    </div>
  );
}