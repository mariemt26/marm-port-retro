import type { Metadata } from "next";
import Tape from "../components/Tape";
import Scramble from "../components/Scramble";
import { projects } from "../data/projects";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <div className="wrap">
      <div className="pagehead">
        <Scramble text="SELECTED WORK" />
        <h1>Work</h1>
        <p>
          ★ STAFF PICKS ★ — My most recent projects, personally selected by the staff (me, the only staff). 
          Organized by most recent. Make sure to take good care of the tapes. Store them upright in a cool place, avoid sunlight.
        </p>
      </div>
      <div className="storebar">
        <span className="store-sign">NEW RELEASES</span>
        <span className="store-note">BE KIND · REWIND</span>
        <span className="store-note dim">MEMBER SINCE 2023</span>
      </div>

      <div className="shelf">
        {projects.map((p, i) => (
          <Tape key={p.slug} project={p} delay={(i % 3) * 60} />
        ))}
      </div>

      <div className="storefoot">
        <span className="store-note">ALL TITLES AVAILABLE FOR SCREENING</span>
        <span className="store-note dim">ASK AT THE COUNTER</span>
      </div>
    </div>
  );
}