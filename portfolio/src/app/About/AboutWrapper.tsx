// src/app/about/AboutWrapper.tsx (Server Component)
import About from "./ClientABout";
import { Koulen, Special_Elite } from "next/font/google";

const koulen = Koulen({
  subsets: ["latin"],
  weight: "400",
});
const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
});

export default function AboutWrapper() {
  return <About koulenClass={koulen.className} specialClass={specialElite.className} />;
}
