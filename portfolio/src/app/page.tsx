import HomePage from "@/components/home/HomePage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Kat's Portfolio!",
  absoluteTitle: true,
  path: "/",
});

export default function Home() {
  return <HomePage />;
}
