import ExperiencePage from "@/components/experience/ExperiencePage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Experience",
  description:
    "Work and leadership experience of Katherina Dayaon in computer science and beyond.",
  path: "/experience",
});

export default function Experience() {
  return <ExperiencePage />;
}
