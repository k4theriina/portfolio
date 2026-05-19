import ExperiencePage from "@/components/experience/ExperiencePage";
import PreloadBackgrounds from "@/components/layout/PreloadBackgrounds";
import { PAGE_BACKGROUNDS } from "@/lib/backgrounds";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Experience",
  description:
    "Work and leadership experience of Katherina Dayaon in computer science and beyond.",
  path: "/experience",
});

export default function Experience() {
  return (
    <>
      <PreloadBackgrounds
        images={[
          {
            href: PAGE_BACKGROUNDS.experience.webp,
            type: "image/webp",
          },
        ]}
      />
      <ExperiencePage />
    </>
  );
}
