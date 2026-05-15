import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JukeboxProvider } from "../../components/JukeboxContext";
import TopBar from "../../components/TopBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Katherina Dayaon's Portfolio",
  description: "Kat's super awesome portfolio website!",
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
