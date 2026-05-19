import ProjectsPage from "@/components/projects/ProjectsPage";
import PreloadBackgrounds from "@/components/layout/PreloadBackgrounds";
import { PAGE_BACKGROUNDS } from "@/lib/backgrounds";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Software engineering projects by Katherina Dayaon — creative technologist and aspiring software engineer.",
  path: "/projects",
});

export default function Projects() {
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
      <ProjectsPage />
    </>
  );
}
