import AboutWrapper from "@/components/about/AboutWrapper";
import PreloadBackgrounds from "@/components/layout/PreloadBackgrounds";
import { PAGE_BACKGROUNDS } from "@/lib/backgrounds";
import { createPageMetadata } from "@/lib/metadata";

const LG_MEDIA = "(min-width: 1024px)";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about Katherina Dayaon — software engineer, creative technologist, artist, and cat enthusiast.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PreloadBackgrounds
        images={[
          {
            href: PAGE_BACKGROUNDS.aboutHeroLg.webp,
            type: "image/webp",
            media: LG_MEDIA,
          },
          {
            href: PAGE_BACKGROUNDS.aboutHero.fallback,
            media: `(max-width: 1023px)`,
          },
          {
            href: PAGE_BACKGROUNDS.aboutThings.webp,
            type: "image/webp",
          },
        ]}
      />
      <AboutWrapper />
    </>
  );
}
