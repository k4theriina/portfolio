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
/** Place `vinyl.png` in `public/assets/` (see also `Vinyl.png`). */
const VINYL_SRC = "/assets/vinyl.png";

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

function VinylImage({
  spinning,
  size,
  className = "",
}: {
  spinning: boolean;
  size: "sm" | "lg";
  className?: string;
}) {
  const dim =
    size === "sm"
      ? "h-14 w-14 sm:h-16 sm:w-16"
      : "h-[7.25rem] w-[7.25rem] sm:h-32 sm:w-32";
  return (
    <img
      src={VINYL_SRC}
      alt=""
      width={128}
      height={128}
      draggable={false}
      className={`${dim} shrink-0 select-none rounded-full object-cover shadow-[0_6px_20px_rgba(0,0,0,0.65)] ring-1 ring-white/20 ${spinning ? "jukebox-vinyl-spinning" : ""} ${className}`}
    />
  );
}

export default function TopBarMusic() {
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
    <div
      className="group relative z-[400] font-sans outline-none"
      tabIndex={0}
    >
      <audio ref={audioRef} preload="metadata" className="hidden" />

      {/* Extra bottom padding = hover bridge into the dashboard */}
      <div className="-m-1 flex items-start gap-3 p-1 pb-3">
        <VinylImage spinning={playing} size="sm" />

        <div className="min-w-0 max-w-[11rem] pt-0.5 text-left sm:max-w-[15rem]">
          <p className="truncate text-xs font-medium leading-tight text-white sm:text-sm">
            {track.title}
          </p>
          <p
            className={`mt-0.5 text-[10px] font-sans tracking-wide sm:text-xs ${
              playing ? "text-kat-purple" : "text-white/45"
            }`}
          >
            {playing ? "Now playing" : "Paused"}
          </p>
          <div className="mt-1.5 flex items-center gap-0.5">
            <button
              type="button"
              onClick={goPrev}
              disabled={tracks.length < 2}
              className="rounded p-1 text-white/75 transition enabled:hover:bg-white/10 enabled:hover:text-white disabled:opacity-30"
              aria-label="Previous track"
            >
              <FaStepBackward className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => void togglePlay()}
              className="rounded p-1 text-white transition hover:bg-white/10"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <FaPause className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              ) : (
                <FaPlay className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={tracks.length < 2}
              className="rounded p-1 text-white/75 transition enabled:hover:bg-white/10 enabled:hover:text-white disabled:opacity-30"
              aria-label="Next track"
            >
              <FaStepForward className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hover: compact dashboard below, anchored like a top-right corner card */}
      <div
        className="pointer-events-none invisible absolute right-0 top-full z-[500] mt-0 w-[min(20rem,calc(100vw-2rem))] max-w-[92vw] origin-top-right scale-95 opacity-0 transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:visible group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:scale-100 group-focus-within:opacity-100"
      >
        <div className="rounded-xl border border-white/15 bg-kat-black/98 p-4 shadow-2xl shadow-black/80 ring-1 ring-white/10 backdrop-blur-md sm:p-5">
          <h2 className="mb-1 text-lg font-bold tracking-tight text-white sm:text-xl">
            Jukebox
          </h2>
          <p className="mb-4 text-[11px] text-white/40 sm:text-xs">
            {idx + 1} / {tracks.length}
          </p>

          <div className="relative mx-auto mb-4 flex h-[7.5rem] w-full max-w-[16rem] items-center justify-center sm:h-[8.5rem] sm:max-w-[17rem]">
            <div
              className="pointer-events-none absolute left-[46%] top-1/2 z-0 -translate-y-1/2 sm:left-[48%]"
              aria-hidden
            >
              <VinylImage spinning={playing} size="lg" />
            </div>

            <div className="relative z-10 -ml-8 shrink-0 overflow-hidden rounded-lg shadow-xl ring-2 ring-white/20 sm:-ml-10">
              {track.coverUrl ? (
                <img
                  src={track.coverUrl}
                  alt=""
                  className="block h-24 w-24 object-cover sm:h-28 sm:w-28"
                  width={112}
                  height={112}
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center bg-gradient-to-br from-white/15 to-white/5 text-white/35 sm:h-28 sm:w-28">
                  <FaMusic className="h-12 w-12 sm:h-14 sm:w-14" />
                </div>
              )}
            </div>
          </div>

          <h3 className="mb-0.5 line-clamp-2 text-center text-sm font-semibold text-white sm:text-base">
            {track.title}
          </h3>
          <p className="mb-3 line-clamp-1 text-center text-xs text-white/50">
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
            <div className="mt-1 flex justify-between text-[10px] tabular-nums text-white/45 sm:text-[11px]">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={goPrev}
              disabled={tracks.length < 2}
              className="rounded-full p-2 text-white/85 transition enabled:hover:bg-white/10 enabled:hover:text-white disabled:opacity-30"
              aria-label="Previous track"
            >
              <FaStepBackward className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => void togglePlay()}
              className="rounded-full p-2 text-white transition hover:bg-white/10"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <FaPause className="h-8 w-8" />
              ) : (
                <FaPlay className="h-8 w-8 pl-0.5" />
              )}
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={tracks.length < 2}
              className="rounded-full p-2 text-white/85 transition enabled:hover:bg-white/10 enabled:hover:text-white disabled:opacity-30"
              aria-label="Next track"
            >
              <FaStepForward className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3">
            <button
              type="button"
              onClick={toggleMute}
              className="shrink-0 rounded p-1 text-white/70 hover:bg-white/10 hover:text-white"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted || volume < 0.02 ? (
                <FaVolumeMute className="h-3.5 w-3.5" />
              ) : (
                <FaVolumeUp className="h-3.5 w-3.5" />
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
            <span className="w-8 shrink-0 text-right text-[10px] tabular-nums text-white/50">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
