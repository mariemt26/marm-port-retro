import { TVLink } from "./components/StaticWipe";
import { BASE, HOME } from "./config";

export default function NotFound() {
  return (
    <div className="wrap">
      <div className="pagehead">
        <span className="eyebrow">NO SIGNAL</span>
        <h1>No signal</h1>
        <p>
          That channel doesn&apos;t broadcast. Try the dial on the home page, or
          head straight to the work.
        </p>
      </div>
      <div className="links" style={{ marginTop: 0 }}>
        <TVLink to={HOME}>HOME</TVLink>
        <TVLink to={`${BASE}/work`}>WORK</TVLink>
      </div>
    </div>
  );
}