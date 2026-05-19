import HomePage from "@/components/home/HomePage";
import PreloadBackgrounds from "@/components/layout/PreloadBackgrounds";
import { PAGE_BACKGROUNDS } from "@/lib/backgrounds";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Kat's Portfolio!",
  absoluteTitle: true,
  path: "/",
});

export default function Home() {
  return (
    <>
      <PreloadBackgrounds
        images={[
          {
            href: PAGE_BACKGROUNDS.homeDesktop.webp,
            type: "image/webp",
            media: "(min-width: 640px)",
          },
          {
            href: PAGE_BACKGROUNDS.homeMobile.fallback,
            media: "(max-width: 639px)",
          },
        ]}
      />
      <HomePage />
    </>
  );
}
