"use client";

import { useEffect, useRef, useState } from "react";
import { LASTFM } from "../config";

export type Track = {
  state: string;
  title: string;
  artist: string;
  art: string | null;
  playing: boolean;
};

const NOT_CONFIGURED =
  LASTFM.user.startsWith("YOUR_") || LASTFM.apiKey.startsWith("YOUR_");

const TUNING: Track = {
  state: "TUNING…",
  title: "Connecting to Last.fm",
  artist: "",
  art: null,
  playing: false,
};

const UNSET: Track = {
  state: "NOT CONFIGURED",
  title: "Add your Last.fm details",
  artist: ".env.local",
  art: null,
  playing: false,
};

export default function useLastFm(): Track {
  const [track, setTrack] = useState<Track>(TUNING);
  const lastKey = useRef("");

  useEffect(() => {
    // nothing to poll — the unconfigured state is derived below
    if (NOT_CONFIGURED) return;

    let cancelled = false;

    const url =
      "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks" +
      `&user=${encodeURIComponent(LASTFM.user)}` +
      `&api_key=${encodeURIComponent(LASTFM.apiKey)}` +
      "&format=json&limit=1";

    // every setTrack below happens inside an async callback,
    // never in the effect body
    async function poll() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.error) throw new Error(data.message || "Last.fm error");
        if (cancelled) return;

        const list = data?.recenttracks?.track;
        const t = Array.isArray(list) ? list[0] : list;
        if (!t) {
          setTrack({
            state: "NO SIGNAL",
            title: "Nothing scrobbled yet",
            artist: "",
            art: null,
            playing: false,
          });
          return;
        }

        const playing = t["@attr"]?.nowplaying === "true";
        const title: string = t.name || "Unknown track";
        const artist: string = t.artist?.["#text"] || t.artist?.name || "";
        const album: string = t.album?.["#text"] || "";
        const art: string | null =
          [...((t.image as { "#text": string }[]) || [])]
            .reverse()
            .find((i) => i["#text"])?.["#text"] || null;

        const key = `${title}|${artist}|${playing}`;
        if (key === lastKey.current) return;
        lastKey.current = key;

        setTrack({
          state: playing ? "ON AIR" : "LAST PLAYED",
          title,
          artist: artist + (album ? ` — ${album}` : ""),
          art,
          playing,
        });
      } catch {
        if (cancelled) return;
        setTrack({
          state: "NO SIGNAL",
          title: "Can't reach Last.fm",
          artist: "Check the username and key",
          art: null,
          playing: false,
        });
      }
    }

    poll();
    const id = setInterval(poll, Math.max(15, LASTFM.refreshSeconds) * 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return NOT_CONFIGURED ? UNSET : track;
}