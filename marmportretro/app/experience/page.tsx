import type { Metadata } from "next";
import Scramble from "../components/Scramble";
import RoleList from "../components/RoleList";
import { roles } from "../data/experience";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  const work = roles.filter((r) => r.kind === "work");
  const club = roles.filter((r) => r.kind === "club");

  return (
    <div className="wrap">
      <div className="pagehead">
        <Scramble text="EXPERIENCE" />
        <h1>Experience</h1>
        <p>
          Take a look at all the cool places I&apos;ve worked at and clubs I&apos;ve joined!
        </p>
      </div>

      <section>
        <div className="head">
          <div>
            <Scramble text="EMPLOYMENT" />
            <h2>Work</h2>
          </div>
          <span className="count">{work.length} FILES</span>
        </div>
        <RoleList roles={work} />
      </section>

      <section>
        <div className="head">
          <div>
            <Scramble text="MEMBERSHIP" />
            <h2>Clubs &amp; societies</h2>
          </div>
          <span className="count">{club.length} FILES</span>
        </div>
        <RoleList roles={club} />
      </section>
    </div>
  );
}