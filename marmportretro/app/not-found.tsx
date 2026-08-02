import DeadChannel from "./components/DeadChannel";
import { TVLink } from "./components/StaticWipe";
import { BASE, HOME } from "./config";

export default function NotFound() {
  return (
    <div className="wrap notfound">
      <DeadChannel />

      <div className="nf-dial">
        <span className="nf-label">TRY A CHANNEL</span>
        <div className="nf-links">
          <TVLink to={HOME}>1 · HOME</TVLink>
          <TVLink to={`${BASE}/projects`}>2 · PROJECTS</TVLink>
          <TVLink to={`${BASE}/experience`}>3 · EXPERIENCE</TVLink>
          <TVLink to={`${BASE}/about`}>4 · ABOUT</TVLink>
          <TVLink to={`${BASE}/contact`}>5 · CONTACT</TVLink>
        </div>
      </div>
    </div>
  );
}
