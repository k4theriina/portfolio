/**
 * Edit this list for the “my art” gallery.
 * - `src`: image used in the masonry grid (use a smaller file when possible for speed).
 * - `fullSrc`: optional; shown in the lightbox at full width. Defaults to `src`.
 *   If it has different dimensions than `src`, update `width` / `height` to match `fullSrc` for correct lightbox aspect.
 * - `width` / `height`: real pixel size of `src` (keeps layout stable and helps `next/image`).
 * - `date`: Shown in the lightbox (any string, e.g. "March 2025" or "2025-03-12").
 * - `unoptimized`: set true for animated WebP/GIF (Next cannot optimize those). For optimized delivery,
 *   use a static WebP/JPEG/AVIF, or use MP4/WebM in a `<video>` if you need motion.
 */
export type ArtPiece = {
  id: string;
  src: string;
  fullSrc?: string;
  title: string;
  date: string;
  description: string;
  width: number;
  height: number;
  /** Animated formats: Next image optimizer skips these; set true to silence the warning. */
  unoptimized?: boolean;
};

export const MY_ART: ArtPiece[] = [
  {
    id: "1",
    src: "/assets/guitarCat.png",
    title: "Guitar practice",
    date: "November 2024",
    description:
      "A cozy study break doodle — music and cats are my favorite combo. I sketched this between classes when I needed a reset from debugging; the guitar shape started as a loose gesture and the cat kind of invited itself onto the page.",
    width: 800,
    height: 1000,
  },
  {
    id: "2",
    src: "/assets/UltimateKatPhoto.webp",
    title: "Portrait study",
    date: "January 2025",
    description:
      "Lighting practice from a photo walk around campus. I focused on rim light and skin undertones, trying to keep edges soft while still reading clearly at a distance.",
    width: 1200,
    height: 800,
    unoptimized: true,
  },
  {
    id: "3",
    src: "/assets/BgCat.png",
    title: "Background piece",
    date: "May 2025",
    description:
      "Wide composition experiment for the site background. I wanted something calm that could tile emotionally even if it is only used once — big shapes, low contrast, and a little room for the UI to breathe on top.",
    width: 1920,
    height: 1080,
  },
  {
    id: "4",
    src: "/assets/TLlogo.png",
    title: "Logo mark",
    date: "August 2024",
    description:
      "Vector-inspired mark for a personal project. Iterations went from overly detailed to this simpler lockup that still felt friendly at favicon size.",
    width: 512,
    height: 512,
  },
  {
    id: "5",
    src: "/assets/ThreeJSLogo.png",
    title: "3D render",
    date: "February 2025",
    description:
      "Quick Three.js material and lighting study. I was chasing softer speculars and a slightly filmic grade without crushing the midtones.",
    width: 900,
    height: 1200,
  },
  {
    id: "6",
    src: "/assets/ISTLogo.png",
    title: "Club poster",
    date: "September 2024",
    description:
      "Print-style layout for a student org event. Hierarchy, print margins, and a bold headline that still worked when photocopied in grayscale.",
    width: 800,
    height: 600,
  },
];
