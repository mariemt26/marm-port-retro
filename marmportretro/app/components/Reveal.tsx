"use client";

import type { CSSProperties, ReactNode } from "react";
import useReveal from "../hooks/useReveal";

export default function Reveal({
  className = "",
  delay = 0,
  style,
  children,
}: {
  className?: string;
  delay?: number;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const [ref, seen] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`rise ${seen ? "seen" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}