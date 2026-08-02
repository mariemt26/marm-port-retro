import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * A System 7 style window: pinstriped title bar, close box,
 * hairline border, hard drop shadow.
 */
export default function MacWindow({
  title,
  children,
  className = "",
  tilt = 0,
  zoomBox = true,
  delay = 0,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  tilt?: number;
  zoomBox?: boolean;
  delay?: number;
}) {
  return (
    <Reveal
      className={`macwin ${className}`}
      delay={delay}
      style={tilt ? { ["--tilt" as string]: `${tilt}deg` } : undefined}
    >
      <div className="mac-bar">
        <span className="mac-close" aria-hidden="true" />
        <span className="mac-title">{title}</span>
        {zoomBox && <span className="mac-zoom" aria-hidden="true" />}
      </div>
      <div className="mac-body">{children}</div>
    </Reveal>
  );
}
