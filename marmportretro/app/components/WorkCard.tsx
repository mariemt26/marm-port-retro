"use client";

import { TVLink } from "./StaticWipe";
import Reveal from "./Reveal";
import { BASE } from "../config";
import type { Project } from "../data/projects";

export default function WorkCard({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  const hasStudy = Boolean(project.study);

  const inner = (
    <>
      <div className="swatch" style={{ background: project.color }}>
        <b>{project.label}</b>
      </div>
      <span className="sku">
        {project.sku} / {project.year}
      </span>
      <h3>{project.title}</h3>
      <p>{project.blurb}</p>
      <div className="metric">
        {project.metrics.map((m) => (
          <span key={m.label}>
            {m.label} <b>{m.value}</b>
          </span>
        ))}
      </div>
      <div className="tags">
        {project.tags.map((t) => (
          <i key={t}>{t}</i>
        ))}
        {hasStudy && <i>READ CASE STUDY →</i>}
      </div>
    </>
  );

  return (
    <Reveal delay={delay}>
      {hasStudy ? (
        <TVLink to={`${BASE}/work/${project.slug}`} className="card">
          {inner}
        </TVLink>
      ) : (
        <article className="card">{inner}</article>
      )}
    </Reveal>
  );
}
