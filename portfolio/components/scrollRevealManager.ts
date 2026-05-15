/** Shared scroll loop + stagger math for reveal animations (single listener, one rAF). */

export type RevealProgress = {
  t: number;
  opacity: number;
  translateY: number;
};

export type StaggerRevealStyle = {
  opacity: number;
  translateX: number;
  translateY: number;
};

type ScrollSubscriber = {
  el: HTMLElement;
  range: number;
  drop: number;
  onUpdate: (value: RevealProgress) => void;
};

const scrollSubscribers = new Set<ScrollSubscriber>();
let rafId = 0;
let listening = false;

export function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

export function computeScrollProgress(
  el: HTMLElement,
  rangeFactor: number,
): number {
  const vh = window.innerHeight;
  const viewportCenter = vh * 0.5;
  const rect = el.getBoundingClientRect();
  const elementCenter = rect.top + rect.height * 0.5;
  const distance = Math.abs(elementCenter - viewportCenter);
  const range = Math.max(vh * rangeFactor, 1);
  const linear = Math.max(0, Math.min(1, 1 - distance / range));
  return smoothstep(linear);
}

export function computeVerticalReveal(
  el: HTMLElement,
  rangeFactor: number,
  dropPx: number,
): RevealProgress {
  const t = computeScrollProgress(el, rangeFactor);
  return { t, opacity: t, translateY: -(1 - t) * dropPx };
}

/** Map scroll progress + index → left-to-right dropdown fade. */
export function staggerStyleFromProgress(
  baseT: number,
  index: number,
  options: {
    stagger?: number;
    slide?: number;
    drop?: number;
    /** Total items in the group — ensures the last item reaches full opacity at baseT=1. */
    itemCount?: number;
  } = {},
): StaggerRevealStyle {
  const stagger = options.stagger ?? 0.11;
  const slide = options.slide ?? 40;
  const drop = options.drop ?? 28;
  const count = Math.max(1, options.itemCount ?? 1);
  const maxIndex = Math.max(0, count - 1);
  const totalSpread = maxIndex * stagger;

  const linear =
    maxIndex === 0
      ? baseT
      : Math.max(0, Math.min(1, baseT * (1 + totalSpread) - index * stagger));
  const t = smoothstep(linear);

  return {
    opacity: t,
    translateX: -(1 - t) * slide,
    translateY: -(1 - t) * drop,
  };
}

const REVEAL_LERP = 0.14;

function readRevealState(el: HTMLElement): StaggerRevealStyle | null {
  const opacity = parseFloat(el.dataset.revealO ?? "");
  if (!Number.isFinite(opacity)) return null;
  return {
    opacity,
    translateX: parseFloat(el.dataset.revealX ?? "0") || 0,
    translateY: parseFloat(el.dataset.revealY ?? "0") || 0,
  };
}

function writeRevealState(el: HTMLElement, style: StaggerRevealStyle): void {
  el.dataset.revealO = String(style.opacity);
  el.dataset.revealX = String(style.translateX);
  el.dataset.revealY = String(style.translateY);
}

export function applyStaggerStyle(
  el: HTMLElement,
  style: StaggerRevealStyle,
  options?: { immediate?: boolean },
): void {
  const prev = readRevealState(el);
  const immediate = options?.immediate ?? !prev;

  const next: StaggerRevealStyle = immediate
    ? style
    : {
        opacity: prev!.opacity + (style.opacity - prev!.opacity) * REVEAL_LERP,
        translateX:
          prev!.translateX + (style.translateX - prev!.translateX) * REVEAL_LERP,
        translateY:
          prev!.translateY + (style.translateY - prev!.translateY) * REVEAL_LERP,
      };

  el.style.opacity = String(next.opacity);
  el.style.transform = `translate3d(${next.translateX}px, ${next.translateY}px, 0)`;
  writeRevealState(el, next);

  if (next.opacity > 0.02 && next.opacity < 0.98) {
    el.style.willChange = "opacity, transform";
  } else {
    el.style.willChange = "";
  }
}

function isNearViewport(el: HTMLElement, margin = vhSlack()): boolean {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  return rect.bottom >= -margin && rect.top <= vh + margin;
}

function vhSlack(): number {
  return typeof window !== "undefined" ? window.innerHeight * 0.75 : 600;
}

function tick() {
  rafId = 0;
  const slack = vhSlack();

  for (const sub of scrollSubscribers) {
    if (!isNearViewport(sub.el, slack)) continue;
    sub.onUpdate(computeVerticalReveal(sub.el, sub.range, sub.drop));
  }
}

function scheduleTick() {
  if (rafId !== 0) return;
  rafId = requestAnimationFrame(tick);
}

function ensureListening() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  window.addEventListener("scroll", scheduleTick, { passive: true });
  window.addEventListener("resize", scheduleTick, { passive: true });
}

function stopListeningIfIdle() {
  if (scrollSubscribers.size > 0 || !listening) return;
  listening = false;
  window.removeEventListener("scroll", scheduleTick);
  window.removeEventListener("resize", scheduleTick);
  if (rafId !== 0) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }
}

export function subscribeScrollReveal(
  el: HTMLElement,
  range: number,
  drop: number,
  onUpdate: (value: RevealProgress) => void,
): () => void {
  const sub: ScrollSubscriber = { el, range, drop, onUpdate };
  scrollSubscribers.add(sub);
  ensureListening();
  onUpdate(computeVerticalReveal(el, range, drop));
  scheduleTick();

  return () => {
    scrollSubscribers.delete(sub);
    stopListeningIfIdle();
  };
}

/** Time-based stagger enter (pagination, etc.). Returns cancel fn. */
export function runStaggerEnter(
  items: { el: HTMLElement; index: number }[],
  options: {
    stagger?: number;
    slide?: number;
    drop?: number;
    duration?: number;
    itemCount?: number;
    onFrame?: (baseT: number) => void;
  } = {},
): () => void {
  const duration = options.duration ?? 520;
  let raf = 0;
  let start = 0;

  const frame = (now: number) => {
    if (!start) start = now;
    const linear = Math.min(1, (now - start) / duration);
    const baseT = smoothstep(linear);

    const itemCount = items.length;
    for (const { el, index } of items) {
      applyStaggerStyle(
        el,
        staggerStyleFromProgress(baseT, index, { ...options, itemCount }),
        { immediate: true },
      );
    }
    options.onFrame?.(baseT);

    if (linear < 1) {
      raf = requestAnimationFrame(frame);
    }
  };

  const itemCount = items.length;
  for (const { el, index } of items) {
    applyStaggerStyle(
      el,
      staggerStyleFromProgress(0, index, { ...options, itemCount }),
      { immediate: true },
    );
  }
  raf = requestAnimationFrame(frame);

  return () => {
    if (raf) cancelAnimationFrame(raf);
  };
}
