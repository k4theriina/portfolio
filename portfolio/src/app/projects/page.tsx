import ProjectsPage from "@/components/projects/ProjectsPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Software engineering projects by Katherina Dayaon — creative technologist and aspiring software engineer.",
  path: "/projects",
});

export default function Projects() {
  return <ProjectsPage />;
}
