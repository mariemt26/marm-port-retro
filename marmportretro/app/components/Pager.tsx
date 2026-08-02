"use client";

import { TVLink } from "./StaticWipe";
import Reveal from "./Reveal";
import { BASE } from "../config";
import type { Project } from "../data/projects";

/**
 * A work item as a 1990s pocket pager.
 * The casing takes the project colour; the LCD carries flavour; the
 * printed label carries everything a reader actually needs to scan.
 */
export default function Pager({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  const hasStudy = Boolean(project.study);

  const unit = (
    <div className="pager-unit">
      <div className="lcd">
        <div className="lcd-top">
          <span>▶ {project.sku}</span>
          <span>{project.year}</span>
        </div>
        <div className="lcd-msg">{project.label}</div>
        <div className="lcd-sub">NEW MESSAGE</div>
      </div>

      <div className="pager-face">
        <span className="pager-brand">POCKET BELL</span>
        <div className="pager-keys" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span className="led" aria-hidden="true" />
      </div>

      <div className="pager-info">
        <h3>{project.title}</h3>
        <p>{project.blurb}</p>
        {project.metrics.length > 0 && (
          <div className="metric">
            {project.metrics.map((m) => (
              <span key={m.label}>
                {m.label} <b>{m.value}</b>
              </span>
            ))}
          </div>
        )}
        <div className="tags">
          {project.tags.map((t) => (
            <i key={t}>{t}</i>
          ))}
          {hasStudy && <i>READ CASE STUDY →</i>}
        </div>
      </div>
    </div>
  );

  const style = { ["--case" as string]: project.color };

  return (
    <Reveal delay={delay}>
      {hasStudy ? (
        <TVLink
          to={`${BASE}/projects/${project.slug}`}
          className="pager"
          style={style}
        >
          {unit}
        </TVLink>
      ) : (
        <article className="pager" style={style}>
          {unit}
        </article>
      )}
    </Reveal>
  );
}