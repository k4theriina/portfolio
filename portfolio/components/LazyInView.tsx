"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyInViewProps = {
  children: ReactNode;
  className?: string;
  /** Mount children immediately (e.g. above-the-fold cards). */
  eager?: boolean;
  /** IntersectionObserver rootMargin (preload distance). */
  rootMargin?: string;
  /** Unmount when this far off-screen (viewport heights). */
  unloadVH?: number;
};

/**
 * Mounts children only when near the viewport; unmounts when far away to free memory
 * (e.g. project videos).
 */
export default function LazyInView({
  children,
  className = "",
  eager = false,
  rootMargin = "120px 0px",
  unloadVH = 1.5,
}: LazyInViewProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(eager);

  useEffect(() => {
    if (eager) return;
    const shell = shellRef.current;
    if (!shell) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          return;
        }
        const { top, bottom } = entry.boundingClientRect;
        const vh = window.innerHeight;
        const far = bottom < -vh * unloadVH || top > vh * (1 + unloadVH);
        if (far) setMounted(false);
      },
      { rootMargin, threshold: 0 },
    );

    io.observe(shell);
    return () => io.disconnect();
  }, [eager, rootMargin, unloadVH]);

  return (
    <div
      ref={shellRef}
      className={className}
      style={{ contentVisibility: mounted ? "visible" : "auto" }}
    >
      {mounted ? children : null}
    </div>
  );
}
