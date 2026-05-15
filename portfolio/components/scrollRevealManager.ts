/** One shared scroll loop for all scroll-reveal elements (single listener, one rAF). */

export type RevealProgress = {
  /** 0 = hidden / offset, 1 = centered in final position */
  t: number;
  opacity: number;
  translateY: number;
};

type Subscriber = {
  el: HTMLElement;
  range: number;
  drop: number;
  onUpdate: (value: RevealProgress) => void;
};

const subscribers = new Set<Subscriber>();
let rafId = 0;
let listening = false;

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function computeProgress(
  el: HTMLElement,
  rangeFactor: number,
  dropPx: number,
): RevealProgress {
  const vh = window.innerHeight;
  const viewportCenter = vh * 0.5;
  const rect = el.getBoundingClientRect();
  const elementCenter = rect.top + rect.height * 0.5;
  const distance = Math.abs(elementCenter - viewportCenter);
  const range = Math.max(vh * rangeFactor, 1);
  const linear = Math.max(0, Math.min(1, 1 - distance / range));
  const t = smoothstep(linear);
  const translateY = -(1 - t) * dropPx;

  return { t, opacity: t, translateY };
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

  for (const sub of subscribers) {
    if (!isNearViewport(sub.el, slack)) continue;
    sub.onUpdate(computeProgress(sub.el, sub.range, sub.drop));
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
  if (subscribers.size > 0 || !listening) return;
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
  const sub: Subscriber = { el, range, drop, onUpdate };
  subscribers.add(sub);
  ensureListening();
  onUpdate(computeProgress(el, range, drop));
  scheduleTick();

  return () => {
    subscribers.delete(sub);
    stopListeningIfIdle();
  };
}
