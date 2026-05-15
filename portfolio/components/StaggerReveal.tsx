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
  /** Rise from below like experience boxes (no horizontal slide). */
  rise?: boolean;
  /** Mount enter duration in ms (experience boxes use 1000). */
  enterDuration?: number;
};

type GroupContextValue = {
  register: (id: string, index: number, el: HTMLElement | null) => void;
  rise: boolean;
  dropItem: number;
  slide: number;
};

const StaggerRevealGroupContext = createContext<GroupContextValue | null>(null);

type StaggerRevealGroupProps = StaggerOptions & {
  children: ReactNode;
  className?: string;
  /** Fixed total for stagger math (avoids jumps when lazy items mount). */
  itemCount?: number;
  /** When changed (e.g. carousel page), replays left-to-right enter. */
  replayKey?: string | number;
  /** Play dropdown enter on first mount (waits until items register). */
  enterOnMount?: boolean;
};

function allItemsRegistered(
  items: { index: number }[],
  itemCount?: number,
): boolean {
  if (items.length === 0) return false;
  const expected = itemCount ?? items.length;
  if (items.length < expected) return false;
  const maxIndex = Math.max(...items.map((i) => i.index));
  return items.length >= maxIndex + 1;
}

export function StaggerRevealGroup({
  children,
  className = "",
  replayKey,
  enterOnMount = false,
  itemCount: itemCountProp,
  range = 0.7,
  drop = 48,
  stagger = 0.2,
  slide = 50,
  dropItem = 28,
  rise = false,
  enterDuration,
}: StaggerRevealGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Map<string, { index: number; el: HTMLElement }>>(
    new Map(),
  );
  const replayingRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const pendingReplayKeyRef = useRef<string | number | null>(null);
  const lastPlayedKeyRef = useRef<string | number | null>(null);
  const enterCancelRef = useRef<(() => void) | null>(null);
  const styleOpts = { stagger, slide, drop: dropItem, rise };

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

  const isAwaitingEnter = useCallback(() => {
    if (replayingRef.current) return true;
    if (
      replayKey !== undefined &&
      pendingReplayKeyRef.current !== null &&
      lastPlayedKeyRef.current !== pendingReplayKeyRef.current
    ) {
      return true;
    }
    if (enterOnMount && lastPlayedKeyRef.current !== "__mount__") return true;
    return false;
  }, [replayKey, enterOnMount]);

  const tryPlayEnter = useCallback(() => {
    if (reducedMotionRef.current || replayingRef.current) return;

    const container = containerRef.current;
    if (!container) return;

    const items = [...itemsRef.current.values()].sort(
      (a, b) => a.index - b.index,
    );
    if (!allItemsRegistered(items, itemCountProp)) return;

    let playKey: string | number | null = null;
    if (
      replayKey !== undefined &&
      pendingReplayKeyRef.current !== null &&
      lastPlayedKeyRef.current !== pendingReplayKeyRef.current
    ) {
      playKey = pendingReplayKeyRef.current;
    } else if (enterOnMount && lastPlayedKeyRef.current !== "__mount__") {
      playKey = "__mount__";
    }
    if (playKey === null) return;

    enterCancelRef.current?.();
    replayingRef.current = true;

    enterCancelRef.current = runStaggerEnter(
      items.map(({ el, index }) => ({ el, index })),
      {
        ...styleOpts,
        itemCount: resolveItemCount(),
        duration: enterDuration,
        easeOut: true,
        onFrame: (baseT) => {
          if (baseT >= 1) {
            replayingRef.current = false;
            lastPlayedKeyRef.current = playKey;
            const scrollT = enterOnMount
              ? 1
              : computeScrollProgress(container, range);
            applyAll(scrollT, true);
          }
        },
      },
    );
  }, [
    enterOnMount,
    replayKey,
    itemCountProp,
    styleOpts,
    resolveItemCount,
    range,
    applyAll,
    enterDuration,
  ]);

  const tryPlayEnterRef = useRef(tryPlayEnter);
  tryPlayEnterRef.current = tryPlayEnter;

  const isAwaitingEnterRef = useRef(isAwaitingEnter);
  isAwaitingEnterRef.current = isAwaitingEnter;

  const register = useCallback<GroupContextValue["register"]>(
    (id, index, el) => {
      if (el) {
        itemsRef.current.set(id, { index, el });
        if (
          !replayingRef.current &&
          !reducedMotionRef.current &&
          containerRef.current &&
          !isAwaitingEnter()
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
        tryPlayEnterRef.current();
      } else {
        itemsRef.current.delete(id);
      }
    },
    [
      range,
      styleOpts,
      resolveItemCount,
      isAwaitingEnter,
      replayKey,
      enterOnMount,
    ],
  );

  useLayoutEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotionRef.current && enterOnMount) {
      lastPlayedKeyRef.current = "__mount__";
    }
  }, [enterOnMount]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotionRef.current || isAwaitingEnter()) return;
    applyAll(computeScrollProgress(container, range), true);
  }, [range, applyAll, isAwaitingEnter]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotionRef.current) return;

    return subscribeScrollReveal(container, range, drop, (p) => {
      if (replayingRef.current || isAwaitingEnterRef.current()) return;
      applyAll(p.t);
    });
  }, [range, drop, applyAll]);

  useEffect(() => {
    if (replayKey === undefined || reducedMotionRef.current) return;
    pendingReplayKeyRef.current = replayKey;
    tryPlayEnter();
    return () => {
      enterCancelRef.current?.();
      enterCancelRef.current = null;
      replayingRef.current = false;
    };
  }, [replayKey, tryPlayEnter]);

  useEffect(() => {
    if (!enterOnMount || replayKey !== undefined || reducedMotionRef.current) {
      return;
    }
    const raf = requestAnimationFrame(() => tryPlayEnterRef.current());
    return () => {
      cancelAnimationFrame(raf);
      enterCancelRef.current?.();
      enterCancelRef.current = null;
      replayingRef.current = false;
    };
  }, [enterOnMount, replayKey]);

  useEffect(() => {
    if (!reducedMotionRef.current) return;
    for (const { el } of itemsRef.current.values()) {
      el.style.opacity = "1";
      el.style.transform = "none";
    }
  }, [children]);

  return (
    <StaggerRevealGroupContext.Provider
      value={{ register, rise, dropItem, slide }}
    >
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

  const hiddenTransform = ctx.rise
    ? `translate3d(0, ${ctx.dropItem}px, 0)`
    : `translate3d(-${ctx.slide}px, -${ctx.dropItem}px, 0)`;

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: hiddenTransform }}
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
