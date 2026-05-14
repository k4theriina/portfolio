"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const JUKEBOX_BASE = "/jukebox";

type ManifestTrack = {
  id: string;
  title: string;
  artist: string;
  audio: string;
  cover?: string;
};

type Manifest = {
  tracks: ManifestTrack[];
};

export type ResolvedTrack = {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl: string | null;
};

function resolveJukeboxFile(name: string): string {
  const safe = name.trim().replace(/^\/+|\/+$/g, "");
  if (!safe || safe.includes("..")) return "";
  return `${JUKEBOX_BASE}/${safe.split("/").map(encodeURIComponent).join("/")}`;
}

function parseManifest(raw: unknown): ResolvedTrack[] {
  if (!raw || typeof raw !== "object") return [];
  const tracks = (raw as Manifest).tracks;
  if (!Array.isArray(tracks)) return [];
  const out: ResolvedTrack[] = [];
  for (const t of tracks) {
    if (!t || typeof t !== "object") continue;
    const id = typeof t.id === "string" ? t.id : "";
    const title = typeof t.title === "string" ? t.title : "Untitled";
    const artist = typeof t.artist === "string" ? t.artist : "Unknown";
    const audio = typeof t.audio === "string" ? t.audio : "";
    const audioUrl = resolveJukeboxFile(audio);
    if (!audioUrl) continue;
    const cover =
      typeof t.cover === "string" && t.cover.trim()
        ? resolveJukeboxFile(t.cover.trim())
        : null;
    out.push({
      id: id || `track-${out.length}`,
      title,
      artist,
      audioUrl,
      coverUrl: cover,
    });
  }
  return out;
}

type JukeboxContextValue = {
  tracks: ResolvedTrack[];
  track: ResolvedTrack | null;
  idx: number;
  playing: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  manifestLoaded: boolean;
  loadFailed: boolean;
  togglePlay: () => Promise<void>;
  goPrev: () => void;
  goNext: () => void;
  seek: (seconds: number) => void;
  toggleMute: () => void;
  setVolume: (v: number) => void;
};

const JukeboxContext = createContext<JukeboxContextValue | null>(null);

export function useJukebox(): JukeboxContextValue {
  const ctx = useContext(JukeboxContext);
  if (!ctx) {
    throw new Error("useJukebox must be used within JukeboxProvider");
  }
  return ctx;
}

export function JukeboxProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playAfterLoadRef = useRef(false);

  const [tracks, setTracks] = useState<ResolvedTrack[]>([]);
  const [manifestLoaded, setManifestLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [muted, setMuted] = useState(false);

  const track = tracks[idx] ?? null;

  useEffect(() => {
    let cancelled = false;
    fetch(`${JUKEBOX_BASE}/manifest.json`, { cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) throw new Error("manifest");
        return r.json() as Promise<unknown>;
      })
      .then((raw) => {
        if (cancelled) return;
        setTracks(parseManifest(raw));
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      })
      .finally(() => {
        if (!cancelled) setManifestLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a || !track) return;

    const shouldPlay = playAfterLoadRef.current;
    playAfterLoadRef.current = false;

    a.src = track.audioUrl;
    void a.load();

    const onLoaded = () => {
      setDuration(a.duration || 0);
      if (shouldPlay) {
        void a.play().catch(() => {
          setPlaying(false);
        });
      } else {
        setPlaying(false);
        setCurrentTime(0);
      }
    };

    if (a.readyState >= HTMLMediaElement.HAVE_METADATA) {
      onLoaded();
    } else {
      a.addEventListener("loadedmetadata", onLoaded, { once: true });
    }
    return () => {
      a.removeEventListener("loadedmetadata", onLoaded);
    };
  }, [track?.id, track?.audioUrl]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
  }, [volume]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = muted;
  }, [muted]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrentTime(a.currentTime);
    const onDur = () => setDuration(a.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setCurrentTime(0);
      if (tracks.length > 1) {
        playAfterLoadRef.current = true;
        setIdx((i) => (i + 1) % tracks.length);
      } else {
        setPlaying(false);
      }
    };

    a.addEventListener("timeupdate", onTime);
    a.addEventListener("durationchange", onDur);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("durationchange", onDur);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnded);
    };
  }, [tracks.length]);

  const togglePlay = useCallback(async () => {
    const a = audioRef.current;
    if (!a || !track) return;
    if (playing) {
      a.pause();
    } else {
      try {
        await a.play();
      } catch {
        setPlaying(false);
      }
    }
  }, [playing, track]);

  const goPrev = useCallback(() => {
    if (tracks.length < 2) return;
    playAfterLoadRef.current = playing;
    setIdx((i) => (i - 1 + tracks.length) % tracks.length);
  }, [tracks.length, playing]);

  const goNext = useCallback(() => {
    if (tracks.length < 2) return;
    playAfterLoadRef.current = playing;
    setIdx((i) => (i + 1) % tracks.length);
  }, [tracks.length, playing]);

  const seek = useCallback((seconds: number) => {
    const a = audioRef.current;
    if (!a || !Number.isFinite(seconds)) return;
    a.currentTime = Math.max(0, Math.min(seconds, a.duration || seconds));
    setCurrentTime(a.currentTime);
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => !m);
  }, []);

  const value = useMemo<JukeboxContextValue>(
    () => ({
      tracks,
      track,
      idx,
      playing,
      currentTime,
      duration,
      volume,
      muted,
      manifestLoaded,
      loadFailed,
      togglePlay,
      goPrev,
      goNext,
      seek,
      toggleMute,
      setVolume,
    }),
    [
      tracks,
      track,
      idx,
      playing,
      currentTime,
      duration,
      volume,
      muted,
      manifestLoaded,
      loadFailed,
      togglePlay,
      goPrev,
      goNext,
      seek,
      toggleMute,
    ]
  );

  return (
    <JukeboxContext.Provider value={value}>
      <audio ref={audioRef} preload="metadata" className="hidden" aria-hidden />
      {children}
    </JukeboxContext.Provider>
  );
}
