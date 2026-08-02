import Reveal from "./Reveal";
import type { Project } from "../data/projects";

/**
 * A work item as a VHS cassette — black shell, label sticker across the
 * top, reel windows below, hinged flap along the bottom edge.
 *
 * `project.image` renders as a thumbnail stuck to the label.
 */
export default function Tape({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  const hasStudy = Boolean(project.study);

  const body = (
    <>
      <div className="tape-label">
        <div className="label-head">
          <span className="label-kanji">{project.label}</span>
          <span className="label-sku">
            {project.sku} / {project.year}
          </span>
        </div>

        <div className={`label-body ${project.image ? "has-thumb" : ""}`}>
          {project.image && (
            <span className="label-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={project.imageAlt ?? ""} />
            </span>
          )}
          <span className="label-copy">
            <h3>{project.title}</h3>
            <p>{project.blurb}</p>
          </span>
        </div>

        {project.metrics.length > 0 && (
          <div className="label-foot">
            {project.metrics.map((m) => (
              <span key={m.label}>
                {m.label} <b>{m.value}</b>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="tape-under">
        <div className="reels" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="tape-tags">
          {project.tags.map((t) => (
            <i key={t}>{t}</i>
          ))}
          {hasStudy && <i className="play">PLAY →</i>}
        </div>
        <span className="shell-mark" aria-hidden="true">
          VHS
        </span>
      </div>

      <div className="tape-flap" aria-hidden="true" />
      <span className="screw tl" aria-hidden="true" />
      <span className="screw tr" aria-hidden="true" />
    </>
  );

  const style = { ["--case" as string]: project.color };

  return (
    <Reveal delay={delay}>
      {hasStudy ? (
        <a href={`/projects/${project.slug}`} className="tape" style={style}>
          {body}
        </a>
      ) : (
        <article className="tape" style={style}>
          {body}
        </article>
      )}
    </Reveal>
  );
}