"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { subscribeScrollReveal } from "./scrollRevealManager";

type ScrollFadeProps = {
  children: ReactNode;
  className?: string;
  /** Viewport-height fraction for reveal (center = fully shown). */
  range?: number;
  /** Dropdown offset in px when hidden. */
  drop?: number;
  /** Mount children only when near the viewport. */
  lazy?: boolean;
  style?: CSSProperties;
};

export default function ScrollFade({
  children,
  className = "",
  range = 0.62,
  drop = 48,
  lazy = true,
  style,
}: ScrollFadeProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(!lazy);
  const [reservedHeight, setReservedHeight] = useState<number | undefined>();
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const node = targetRef.current;
    if (!node) return;

    if (reducedMotionRef.current) {
      node.style.opacity = "1";
      node.style.transform = "none";
      return;
    }

    return subscribeScrollReveal(node, range, drop, (p) => {
      node.style.opacity = String(p.opacity);
      node.style.transform = `translate3d(0, ${p.translateY}px, 0)`;
      if (p.t > 0.02 && p.t < 0.98) {
        node.style.willChange = "opacity, transform";
      } else {
        node.style.willChange = "";
      }
    });
  }, [mounted, range, drop]);

  useEffect(() => {
    if (!lazy) return;
    const shell = shellRef.current;
    if (!shell) return;

    const margin = `${Math.round(window.innerHeight * 0.85)}px 0px`;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          return;
        }
        const { bottom, top } = entry.boundingClientRect;
        const vh = window.innerHeight;
        if (bottom < -vh * 1.25 || top > vh * 2.25) {
          setMounted(false);
        }
      },
      { rootMargin: margin, threshold: 0 },
    );

    io.observe(shell);
    return () => io.disconnect();
  }, [lazy]);

  useEffect(() => {
    if (!mounted) return;
    const el = targetRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const h = entry.contentRect.height;
      if (h > 0) setReservedHeight(h);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [mounted]);

  const shellStyle: CSSProperties = {
    minHeight: reservedHeight,
    contentVisibility: mounted ? "visible" : "auto",
    containIntrinsicSize: reservedHeight
      ? `auto ${reservedHeight}px`
      : "auto 320px",
    ...style,
  };

  return (
    <div ref={shellRef} style={shellStyle}>
      <div
        ref={targetRef}
        className={className}
        style={{
          opacity: lazy && !mounted ? 0 : undefined,
          transform: lazy && !mounted ? `translate3d(0, -${drop}px, 0)` : undefined,
        }}
      >
        {mounted ? children : null}
      </div>
    </div>
  );
}
