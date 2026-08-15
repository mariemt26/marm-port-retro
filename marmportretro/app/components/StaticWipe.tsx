"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type AnchorHTMLAttributes,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { paintStatic, prefersReducedMotion } from "../config";

// fallback so a <TVLink> still navigates if it ever renders outside the provider
const WipeContext = createContext<(to: string) => void>((to: string) => {
  if (typeof window !== "undefined") window.location.href = to;
});

/** Navigate through a burst of television snow. */
//JUST LIKE TENNA DELTARUNE
export const useWipeNavigate = () => useContext(WipeContext);

export function StaticWipeProvider({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [on, setOn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const go = useCallback(
    (to: string) => {
      if (to === pathname) return;
      if (prefersReducedMotion()) {
        router.push(to);
        return;
      }
      const canvas = canvasRef.current;
      if (!canvas) {
        router.push(to);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        router.push(to);
        return;
      }

      canvas.width = Math.floor(window.innerWidth / 5);
      canvas.height = Math.floor(window.innerHeight / 5);

      setOn(true);
      paintStatic(ctx, canvas.width, canvas.height);
      const timer = setInterval(
        () => paintStatic(ctx, canvas.width, canvas.height),
        45
      );
      setTimeout(() => {
        clearInterval(timer);
        router.push(to);
        setOn(false);
      }, 280);
    },
    [router, pathname]
  );

  return (
    <WipeContext.Provider value={go}>
      {children}
      <div id="wipe" className={on ? "on" : ""} aria-hidden="true">
        <canvas ref={canvasRef} />
      </div>
    </WipeContext.Provider>
  );
}

type TVLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

/**
 * An internal link that departs through static.
 * Deliberately not next/link — we intercept the click to run the
 * transition, then push manually. Prefetch isn't worth losing the effect.
 */
export function TVLink({ to, children, ...rest }: TVLinkProps) {
  const go = useWipeNavigate();
  return (
    <a
      href={to}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        go(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}