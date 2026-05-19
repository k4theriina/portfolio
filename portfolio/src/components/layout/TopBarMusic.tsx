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
import { Jersey_10 } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { useJukebox } from "@/components/jukebox/JukeboxContext";

const jukeboxHintFont = Jersey_10({
  subsets: ["latin"],
  weight: "400",
});

/** Place `vinyl.png` in `public/assets/` (see also `Vinyl.png`). */
const VINYL_SRC = "/assets/vinyl.png";

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
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
  const spinStyle =
    spinning
      ? {
          animation: "jukebox-vinyl-rotate 2.75s linear infinite",
          WebkitAnimation: "jukebox-vinyl-rotate 2.75s linear infinite",
          transformOrigin: "center center",
        }
      : undefined;
  return (
    <span
      className={`relative inline-flex ${dim} shrink-0 select-none ${className}`.trim()}
      style={spinStyle}
    >
      <img
        src={VINYL_SRC}
        alt=""
        width={128}
        height={128}
        draggable={false}
        className="h-full w-full rounded-full object-cover shadow-[0_6px_20px_rgba(0,0,0,0.65)] ring-1 ring-white/20"
      />
    </span>
  );
}

function JukeboxDashboard({ className = "" }: { className?: string }) {
  const {
    track,
    tracks,
    idx,
    playing,
    currentTime,
    duration,
    volume,
    muted,
    togglePlay,
    goPrev,
    goNext,
    seek,
    toggleMute,
    setVolume,
  } = useJukebox();

  if (!track) return null;

  const dur = duration > 0 ? duration : 1;
  const progressPct = Math.min(100, (currentTime / dur) * 100);

  return (
    <div
      className={`box-border w-[20rem] max-w-[calc(100vw-2rem)] shrink-0 rounded-xl border border-white/15 bg-kat-black/98 p-4 shadow-2xl shadow-black/80 ring-1 ring-white/10 backdrop-blur-md sm:p-5 ${className}`}
    >
      <h2 className="mb-1 text-lg font-bold tracking-tight text-white sm:text-xl">
        Songs I like :3
      </h2>
      <p className="mb-4 text-[11px] tabular-nums text-white/40 sm:text-xs">
        {idx + 1} / {tracks.length}
      </p>

      <div className="relative mx-auto mb-4 h-[7.5rem] w-[17rem] shrink-0 sm:h-[8.5rem]">
        <div
          className="pointer-events-none absolute left-[38%] top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          <VinylImage spinning={playing} size="lg" />
        </div>

        <div className="absolute left-[58%] top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg shadow-xl ring-2 ring-white/20">
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

      <h3 className="mb-0.5 line-clamp-2 h-[2.75rem] text-center text-sm font-semibold leading-snug text-white sm:h-[3rem] sm:text-base">
        {track.title}
      </h3>
      <p className="mb-3 line-clamp-1 h-4 text-center text-xs text-white/50">
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
  );
}

function EmptyState({ className = "" }: { className?: string }) {
  return (
    <p
      className={`max-w-md text-center text-[11px] leading-snug text-white/50 sm:text-xs ${className}`}
    >
      Add MP3 (or other browser-supported) files under{" "}
      <code className="text-white/70">public/jukebox/</code> and list them in{" "}
      <code className="text-white/70">manifest.json</code> with{" "}
      <code className="text-white/70">audio</code> and optional{" "}
      <code className="text-white/70">cover</code>.
    </p>
  );
}

export default function TopBarMusic({
  variant,
}: {
  variant: "toolbar" | "menu";
}) {
  const {
    tracks,
    track,
    playing,
    manifestLoaded,
    loadFailed,
    togglePlay,
    goPrev,
    goNext,
  } = useJukebox();

  const [hintBubbleMounted, setHintBubbleMounted] = useState(false);
  const [hintBubbleRevealed, setHintBubbleRevealed] = useState(false);
  const hintBubbleSequenceStartedRef = useRef(false);

  useEffect(() => {
    if (variant !== "toolbar" || loadFailed || !manifestLoaded || !track) {
      return;
    }
    if (hintBubbleSequenceStartedRef.current) return;
    hintBubbleSequenceStartedRef.current = true;

    setHintBubbleMounted(true);
    const revealTimer = window.setTimeout(() => setHintBubbleRevealed(true), 100);

    const fadeOutTimer = window.setTimeout(() => setHintBubbleRevealed(false), 2000);
    const unmountTimer = window.setTimeout(() => {
      setHintBubbleMounted(false);
    }, 4600);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(fadeOutTimer);
      window.clearTimeout(unmountTimer);
    };
  }, [variant, loadFailed, manifestLoaded, track?.id]);

  if (loadFailed) return null;

  if (manifestLoaded && tracks.length === 0) {
    return <EmptyState className={variant === "menu" ? "px-2" : ""} />;
  }

  if (!manifestLoaded || !track) return null;

  if (variant === "menu") {
    return (
      <div className="w-full max-w-sm shrink-0 font-sans">
        <JukeboxDashboard />
      </div>
    );
  }

  return (
    <div
      className="group relative z-[400] w-[14.75rem] shrink-0 font-sans outline-none sm:w-[19.75rem]"
      tabIndex={0}
    >
      <div className="-m-1 flex w-full items-start gap-3 p-1 pb-3">
        <div className="relative shrink-0 pt-2">
          <VinylImage spinning={playing} size="sm" />
          {hintBubbleMounted ? (
            <div
              role="status"
              aria-live="polite"
              className={`${jukeboxHintFont.className} pointer-events-none absolute left-1/2 top-full z-[380] mt-3 min-w-[11rem] max-w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 rounded-xl border border-white/20 bg-kat-purple px-4 py-3 text-center text-base leading-snug text-white shadow-[0_6px_24px_rgba(0,0,0,0.5)] transition-all duration-1000 ease-out before:absolute before:left-1/2 before:top-0 before:z-0 before:h-0 before:w-0 before:-translate-x-1/2 before:-translate-y-full before:border-x-[11px] before:border-b-[13px] before:border-x-transparent before:border-b-kat-purple before:border-t-0 before:content-[''] sm:min-w-[12.5rem] sm:px-5 sm:py-3.5 sm:text-lg ${
                hintBubbleRevealed
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              check me out !! :D
            </div>
          ) : null}
        </div>

        <div className="min-w-0 flex-1 pt-2 text-left">
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

      <div
        className="pointer-events-none invisible absolute left-1/2 top-full z-[500] mt-0 w-[20rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 origin-top scale-95 opacity-0 transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:visible group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:scale-100 group-focus-within:opacity-100"
      >
        <JukeboxDashboard />
      </div>
    </div>
  );
}
