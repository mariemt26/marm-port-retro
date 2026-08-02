/* -----------------------------------------------------
   Last.fm — the real values live in .env.local at the
   project root (gitignored). The strings below are only
   placeholders: useLastFm checks for the "YOUR_" prefix
   to decide whether to show its NOT CONFIGURED state, so
   never put real values here.

   .env.local:
     NEXT_PUBLIC_LASTFM_USER=your-username
     NEXT_PUBLIC_LASTFM_KEY=your-api-key

   On Vercel, add the same two under project settings.
   Free API key: https://www.last.fm/api/account/create
   ----------------------------------------------------- */
export const LASTFM = {
  user: process.env.NEXT_PUBLIC_LASTFM_USER || "YOUR_LASTFM_USERNAME",
  apiKey: process.env.NEXT_PUBLIC_LASTFM_KEY || "YOUR_LASTFM_API_KEY",
  refreshSeconds: 15,
};

export const SITE = {
  name: "MARIEM TOUATI",
  shortName: "MARMALADE",
  /** Arabic wordmark in the masthead */
  wordmark: "مريم",
  wordmarkLong: "MARIEM TOUATI",
  studio: "MARMALADE STUDIOS",
  email: "mariemtouati.04@gmail.com",
  location: "ORLANDO, FL",
};

/** The site owns the root, so there's no path prefix. */
export const BASE = "";
export const HOME = BASE || "/";

/** Fills a canvas context with television snow. */
export function paintStatic(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  const img = ctx.createImageData(w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = Math.random() * 255;
    d[i] = v;
    d[i + 1] = v;
    d[i + 2] = v;
    d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;