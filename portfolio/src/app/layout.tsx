import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { JukeboxProvider } from "@/components/jukebox/JukeboxContext";
import TopBar from "@/components/layout/TopBar";
import {
  createPageMetadata,
  defaultDescription,
  defaultTitle,
  titleTemplate,
} from "@/lib/metadata";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const baseMetadata = createPageMetadata({
  title: defaultTitle,
  absoluteTitle: true,
  path: "/",
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    default: defaultTitle,
    template: titleTemplate,
  },
  description: defaultDescription,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} flex min-h-screen flex-col antialiased`}
      >
        <JukeboxProvider>
          <TopBar />
          <main className="flex min-h-0 flex-1 flex-col">{children}</main>
        </JukeboxProvider>
      </body>
    </html>
  );
}
