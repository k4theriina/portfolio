import type { Metadata } from "next";
import { Geist, Geist_Mono, Jersey_10, Koulen } from "next/font/google";
import "./globals.css";

const jersey10 = Jersey_10({
  subsets: ['latin'],
  weight: '400',
});

const koulen = Koulen({
  subsets: ['latin'],
  weight: '400',
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Katherina Dayaon",
  description: "Kat's portfolio website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
