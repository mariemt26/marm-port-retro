import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * A Famicom-era RPG command window: square corners, double border,
 * dithered field, title tab notched over the top edge.
 */
export default function GameWindow({
  title,
  children,
  id,
  more = false,
  delay = 0,
}: {
  title: string;
  children: ReactNode;
  id?: string;
  more?: boolean;
  delay?: number;
}) {
  return (
    <Reveal className={`gw ${more ? "more" : ""}`} delay={delay}>
      <span className="gw-anchor" id={id} aria-hidden="true" />
      <span className="gw-title">{title}</span>
      <div className="gw-body">{children}</div>
    </Reveal>
  );
}