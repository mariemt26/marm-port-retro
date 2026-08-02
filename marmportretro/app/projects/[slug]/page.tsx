import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "../../components/Reveal";
import PlateGallery from "../../components/PlateGallery";
import { TVLink } from "../../components/StaticWipe";
import { projects, getProject } from "../../data/projects";
import { BASE } from "../../config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.filter((p) => p.study).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "No signal" };
  return { title: project.title, description: project.blurb };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.study) notFound();

  const { study } = project;
  const stamp = `${project.sku}-${project.year}`;

  return (
    <div className="wrap printout">
      <div className="print-top">
        <TVLink to={`${BASE}/projects`} className="backlink">
          ← BACK TO WORK
        </TVLink>
        <span className="print-job">JOB {stamp} · 1 COPY · CONTINUOUS FEED</span>
      </div>

      <Reveal className="paper">
        <span className="sprockets left" aria-hidden="true" />
        <span className="sprockets right" aria-hidden="true" />

        <div className="paper-body">
          <header className="print-head">
            <pre className="print-banner" aria-hidden="true">
{`+${"-".repeat(46)}+
|  CASE STUDY / ${project.sku.padEnd(31)}|
+${"-".repeat(46)}+`}
            </pre>

            <h1>{project.title}</h1>
            <p className="print-line">{project.blurb}</p>

            <dl className="print-facts">
              {study.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </header>

          <hr className="perf" />

          {/* body */}
          <div className="print-prose">
            {study.sections.map((s, i) => {
              const figStart =
                study.sections
                  .slice(0, i)
                  .reduce((n, sec) => n + (sec.images?.length ?? 0), 0) + 1;
              return (
              <section key={s.title}>
                <h2>
                  <span className="sec-no">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                  <span className="sec-kicker">{s.kana}</span>
                </h2>

                {s.body?.map((p, k) => (
                  <p key={k}>{p}</p>
                ))}

                {s.list && (
                  <ul>
                    {s.list.map((li, k) => (
                      <li key={k}>{li}</li>
                    ))}
                  </ul>
                )}

                {s.pull && <blockquote className="pull">{s.pull}</blockquote>}

                {s.images?.length ? (
                  <PlateGallery plates={s.images} start={figStart} />
                ) : null}
              </section>
              );
            })}

            {study.gallery?.length ? (
              <section>
                <h2>
                  <span className="sec-no">
                    {String(study.sections.length + 1).padStart(2, "0")}
                  </span>
                  Screens
                  <span className="sec-kicker">SELECTED PLATES</span>
                </h2>
                <PlateGallery
                  plates={study.gallery}
                  start={
                    study.sections.reduce(
                      (n, sec) => n + (sec.images?.length ?? 0),
                      0
                    ) + 1
                  }
                />
              </section>
            ) : null}

            {study.results?.length ? (
              <section>
                <h2>
                  <span className="sec-no">
                    {String(study.sections.length + 1).padStart(2, "0")}
                  </span>
                  Results
                  <span className="sec-kicker">MEASURED AFTER LAUNCH</span>
                </h2>
                <table className="greenbar">
                  <tbody>
                    {study.results.map((r) => (
                      <tr key={r.label}>
                        <th scope="row">{r.label}</th>
                        <td>{r.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ) : null}

            {study.reflection && (
              <section>
                <h2>
                  <span className="sec-no">
                    {String(
                      study.sections.length + (study.results?.length ? 2 : 1)
                    ).padStart(2, "0")}
                  </span>
                  What I&apos;d do differently
                  <span className="sec-kicker">POST-MORTEM</span>
                </h2>
                <p>{study.reflection}</p>
              </section>
            )}
          </div>

          <hr className="perf" />

          <footer className="print-foot">
            <span>END OF DOCUMENT</span>
            <span>{stamp}</span>
            <span>PAGE 1 OF 1</span>
          </footer>
        </div>
      </Reveal>

      <div className="print-bottom">
        <TVLink to={`${BASE}/projects`} className="backlink">
          ← BACK TO WORK
        </TVLink>
      </div>
    </div>
  );
}