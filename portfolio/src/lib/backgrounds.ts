export type BackgroundLayer = {
  webp?: string;
  fallback: string;
  media?: string;
  fallbackType?: "image/jpeg" | "image/png" | "image/webp";
};

/** Optimized WebP + original fallback paths for large page backgrounds. */
export const PAGE_BACKGROUNDS = {
  homeDesktop: {
    webp: "/assets/bgimageHome.webp",
    fallback: "/assets/bgimageHome.jpg",
  },
  homeMobile: {
    fallback: "/assets/mobilehomebg.jpg",
  },
  aboutHeroLg: {
    webp: "/assets/aboutXL.webp",
    fallback: "/assets/aboutXL.png",
  },
  aboutHero: {
    fallback: "/assets/bgimageAbout.jpg",
  },
  aboutThings: {
    webp: "/assets/BgCat.webp",
    fallback: "/assets/BgCat.png",
  },
  experience: {
    webp: "/assets/bgimageExp.webp",
    fallback: "/assets/bgimageExp.jpg",
  },
} as const;
