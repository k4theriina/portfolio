"use client";

import {
  FaMusic,
  FaPause,
  FaPlay,
  FaStepBackward,
  FaStepForward,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const JUKEBOX_BASE = "/jukebox";

const VINYL_BG = `radial-gradient(circle at 50% 50%, #0D0B0F 0%, #0D0B0F 6%, transparent 6.5%), repeating-radial-gradient(circle at 50% 50%, #25252c 0px, #25252c 1px, #141418 2px, #141418 3px)`;

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

type ResolvedTrack = {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl: string | null;
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

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

function VinylDisc({
  spinning,
  size,
  className = "",
}: {
  spinning: boolean;
  size: "sm" | "lg";
  className?: string;
}) {
  const dim = size === "sm" ? "h-11 w-11" : "h-[8.25rem] w-[8.25rem] sm:h-36 sm:w-36";
  const hole = size === "sm" ? "h-2 w-2" : "h-3.5 w-3.5";
  const shadow =
    size === "sm"
      ? "shadow-[0_4px_14px_rgba(0,0,0,0.75)]"
      : "shadow-[0_14px_36px_rgba(0,0,0,0.9)]";

  return (
    <div
      className={`relative ${dim} shrink-0 rounded-full ${shadow} ring-1 ring-black/70 ${spinning ? "jukebox-vinyl-spinning" : ""} ${className}`}
      style={{ background: VINYL_BG }}
      aria-hidden
    >
      <div
        className={`absolute left-1/2 top-1/2 ${hole} -translate-x-1/2 -translate-y-1/2 rounded-full bg-kat-black ring-1 ring-white/20`}
      />
    </div>
  );
}

export default function TopBarMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playAfterLoadRef = useRef(false);

  const [tracks, setTracks] = useState<ResolvedTrack[]>([]);
  const [manifestLoaded, setManifestLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

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
    if (!dashboardOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDashboardOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dashboardOpen]);

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

  if (loadFailed) return null;

  if (manifestLoaded && tracks.length === 0) {
    return (
      <p className="max-w-md text-center text-[11px] leading-snug text-white/50 sm:text-xs">
        Add MP3 (or other browser-supported) files under{" "}
        <code className="text-white/70">public/jukebox/</code> and list them in{" "}
        <code className="text-white/70">manifest.json</code> with{" "}
        <code className="text-white/70">audio</code> and optional{" "}
        <code className="text-white/70">cover</code>.
      </p>
    );
  }

  if (!manifestLoaded || !track) return null;

  const dur = duration > 0 ? duration : 1;
  const progressPct = Math.min(100, (currentTime / dur) * 100);

  return (
    <div className="relative z-[400] flex w-full max-w-xl min-w-0 justify-center font-sans">
      <audio ref={audioRef} preload="metadata" className="hidden" />

      {/* Top bar: only the vinyl — click opens dashboard */}
      <button
        type="button"
        onClick={() => setDashboardOpen(true)}
        className="rounded-full p-0.5 outline-none ring-kat-purple/0 transition hover:ring-2 hover:ring-kat-purple/50 focus-visible:ring-2 focus-visible:ring-kat-purple"
        aria-label="Open jukebox"
        aria-expanded={dashboardOpen}
        aria-haspopup="dialog"
      >
        <VinylDisc spinning={playing} size="sm" />
      </button>

      {/* Full dashboard — click vinyl / control to open; backdrop or Escape to close */}
      {dashboardOpen && (
        <div
          className="fixed inset-0 z-[500] flex items-start justify-center overflow-y-auto bg-black/65 px-3 pt-16 pb-10 sm:pt-20"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            tabIndex={-1}
            aria-label="Close jukebox"
            onClick={() => setDashboardOpen(false)}
          />
          <div
            role="dialog"
            aria-modal
            aria-labelledby="jukebox-title"
            className="relative z-10 mt-0 w-full max-w-md rounded-xl border border-white/15 bg-kat-black/98 p-5 shadow-2xl shadow-black/70 ring-1 ring-white/10 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <h2
                id="jukebox-title"
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                Jukebox
              </h2>
              <button
                type="button"
                onClick={() => setDashboardOpen(false)}
                className="shrink-0 rounded-md px-2 py-1 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="mb-5 text-center text-xs text-white/45 sm:text-sm">
              Local tracks · {idx + 1} / {tracks.length}
            </p>

            <div className="relative mx-auto mb-6 flex h-[9.5rem] w-full max-w-[19rem] items-center justify-center sm:h-[10.5rem]">
              <div
                className="pointer-events-none absolute left-[46%] top-1/2 z-0 -translate-y-1/2 sm:left-[47%]"
                aria-hidden
              >
                <VinylDisc spinning={playing} size="lg" />
              </div>

              <div className="relative z-10 -ml-10 shrink-0 overflow-hidden rounded-lg shadow-2xl ring-2 ring-white/20 sm:-ml-12">
                {track.coverUrl ? (
                  <img
                    src={track.coverUrl}
                    alt=""
                    className="block h-[8.25rem] w-[8.25rem] object-cover sm:h-36 sm:w-36"
                    width={144}
                    height={144}
                  />
                ) : (
                  <div className="flex h-[8.25rem] w-[8.25rem] items-center justify-center bg-gradient-to-br from-white/15 to-white/5 text-white/40 sm:h-36 sm:w-36">
                    <FaMusic className="h-16 w-16 sm:h-20 sm:w-20" />
                  </div>
                )}
              </div>
            </div>

            <h3 className="mb-1 line-clamp-2 text-center text-lg font-semibold text-white sm:text-xl">
              {track.title}
            </h3>
            <p className="mb-5 line-clamp-2 text-center text-sm text-white/55">
              {track.artist}
            </p>

            <div className="mb-1">
              <input
                type="range"
                min={0}
                max={dur}
                step={0.05}
                value={Math.min(currentTime, dur)}
                onChange={(e) => seek(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer accent-kat-purple"
                aria-label="Seek"
                style={{
                  background: `linear-gradient(to right, rgb(168 85 247) ${progressPct}%, rgba(255,255,255,0.12) ${progressPct}%)`,
                }}
              />
              <div className="mt-1 flex justify-between text-[11px] tabular-nums text-white/45">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-8">
              <button
                type="button"
                onClick={goPrev}
                disabled={tracks.length < 2}
                className="rounded-full p-2 text-white/85 transition enabled:hover:bg-white/10 enabled:hover:text-white disabled:opacity-30"
                aria-label="Previous track"
              >
                <FaStepBackward className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={() => void togglePlay()}
                className="rounded-full p-2 text-white transition hover:bg-white/10"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <FaPause className="h-10 w-10" />
                ) : (
                  <FaPlay className="h-10 w-10 pl-1" />
                )}
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={tracks.length < 2}
                className="rounded-full p-2 text-white/85 transition enabled:hover:bg-white/10 enabled:hover:text-white disabled:opacity-30"
                aria-label="Next track"
              >
                <FaStepForward className="h-7 w-7" />
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={toggleMute}
                className="shrink-0 rounded p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted || volume < 0.02 ? (
                  <FaVolumeMute className="h-4 w-4" />
                ) : (
                  <FaVolumeUp className="h-4 w-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.02}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="h-1.5 min-w-0 flex-1 cursor-pointer accent-kat-purple"
                aria-label="Volume"
              />
              <span className="w-9 shrink-0 text-right text-[11px] tabular-nums text-white/50">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
