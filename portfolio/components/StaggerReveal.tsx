"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import {
  applyStaggerStyle,
  computeScrollProgress,
  runStaggerEnter,
  staggerStyleFromProgress,
  subscribeScrollReveal,
} from "./scrollRevealManager";

type StaggerOptions = {
  range?: number;
  drop?: number;
  stagger?: number;
  slide?: number;
  dropItem?: number;
};

type GroupContextValue = {
  register: (id: string, index: number, el: HTMLElement | null) => void;
};

const StaggerRevealGroupContext = createContext<GroupContextValue | null>(null);

type StaggerRevealGroupProps = StaggerOptions & {
  children: ReactNode;
  className?: string;
  /** Fixed total for stagger math (avoids jumps when lazy items mount). */
  itemCount?: number;
  /** When changed (e.g. carousel page), replays left-to-right enter. */
  replayKey?: string | number;
};

export function StaggerRevealGroup({
  children,
  className = "",
  replayKey,
  itemCount: itemCountProp,
  range = 0.7,
  drop = 48,
  stagger = 0.2,
  slide = 50,
  dropItem = 28,
}: StaggerRevealGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Map<string, { index: number; el: HTMLElement }>>(
    new Map(),
  );
  const replayingRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const styleOpts = { stagger, slide, drop: dropItem };

  const resolveItemCount = useCallback(
    () => Math.max(1, itemCountProp ?? itemsRef.current.size),
    [itemCountProp],
  );

  const applyAll = useCallback(
    (baseT: number, immediate = false) => {
      const itemCount = resolveItemCount();
      for (const { el, index } of itemsRef.current.values()) {
        applyStaggerStyle(
          el,
          staggerStyleFromProgress(baseT, index, {
            ...styleOpts,
            itemCount,
          }),
          { immediate },
        );
      }
    },
    [stagger, slide, dropItem, resolveItemCount],
  );

  const register = useCallback<GroupContextValue["register"]>(
    (id, index, el) => {
      if (el) {
        itemsRef.current.set(id, { index, el });
        if (
          !replayingRef.current &&
          !reducedMotionRef.current &&
          containerRef.current
        ) {
          const baseT = computeScrollProgress(containerRef.current, range);
          applyStaggerStyle(
            el,
            staggerStyleFromProgress(baseT, index, {
              ...styleOpts,
              itemCount: resolveItemCount(),
            }),
            { immediate: true },
          );
        }
      } else {
        itemsRef.current.delete(id);
      }
    },
    [range, styleOpts, resolveItemCount],
  );

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotionRef.current) return;
    applyAll(computeScrollProgress(container, range), true);
  }, [range, applyAll]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotionRef.current) return;

    return subscribeScrollReveal(container, range, drop, (p) => {
      if (replayingRef.current) return;
      applyAll(p.t);
    });
  }, [range, drop, applyAll]);

  useEffect(() => {
    if (replayKey === undefined || reducedMotionRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    const items = [...itemsRef.current.values()].sort(
      (a, b) => a.index - b.index,
    );
    if (items.length === 0) return;

    replayingRef.current = true;
    const cancel = runStaggerEnter(
      items.map(({ el, index }) => ({ el, index })),
      {
        ...styleOpts,
        onFrame: (baseT) => {
          if (baseT >= 1) replayingRef.current = false;
        },
      },
    );

    return () => {
      cancel();
      replayingRef.current = false;
    };
  }, [replayKey, stagger, slide, dropItem]);

  useEffect(() => {
    if (!reducedMotionRef.current) return;
    for (const { el } of itemsRef.current.values()) {
      el.style.opacity = "1";
      el.style.transform = "none";
    }
  }, [children]);

  return (
    <StaggerRevealGroupContext.Provider value={{ register }}>
      <div ref={containerRef} className={className}>
        {children}
      </div>
    </StaggerRevealGroupContext.Provider>
  );
}

type StaggerRevealItemProps = {
  index: number;
  children: ReactNode;
  className?: string;
};

export function StaggerRevealItem({
  index,
  children,
  className = "",
}: StaggerRevealItemProps) {
  const ctx = useContext(StaggerRevealGroupContext);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ctx) return;
    const el = ref.current;
    ctx.register(id, index, el);
    return () => ctx.register(id, index, null);
  }, [ctx, id, index]);

  if (!ctx) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: "translate3d(-40px, -28px, 0)" }}
    >
      {children}
    </div>
  );
}

/** Standalone item (no group) — own scroll subscription. */
export function StaggerRevealSolo({
  index,
  children,
  className = "",
  range = 0.5,
  stagger = 0.11,
  slide = 40,
  dropItem = 28,
  replayKey,
}: StaggerRevealItemProps &
  StaggerOptions & { replayKey?: string | number }) {
  const ref = useRef<HTMLDivElement>(null);
  const replayingRef = useRef(false);
  const styleOpts = { stagger, slide, drop: dropItem };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    return subscribeScrollReveal(el, range, 48, (p) => {
      if (replayingRef.current) return;
      applyStaggerStyle(
        el,
        staggerStyleFromProgress(p.t, index, { ...styleOpts, itemCount: 1 }),
      );
    });
  }, [index, range, stagger, slide, dropItem]);

  useEffect(() => {
    const el = ref.current;
    if (!el || replayKey === undefined) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    replayingRef.current = true;
    const cancel = runStaggerEnter([{ el, index }], {
      ...styleOpts,
      onFrame: (t) => {
        if (t >= 1) replayingRef.current = false;
      },
    });
    return () => {
      cancel();
      replayingRef.current = false;
    };
  }, [replayKey, index, stagger, slide, dropItem]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: "translate3d(-40px, -28px, 0)" }}
    >
      {children}
    </div>
  );
}
