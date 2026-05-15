"use client";

import { useEffect, useRef, type JSX } from "react";
import { Koulen, Special_Elite } from "next/font/google";
import { FaReact, FaPython } from "react-icons/fa";
import { SiFigma, SiTailwindcss, SiTypescript } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { FaFlutter } from "react-icons/fa6";

const techIcons: Record<string, JSX.Element> = {
  React: <FaReact className="h-8 w-8 text-sky-400" />,
  Figma: <SiFigma className="h-8 w-8 text-pink-500" />,
  Tailwind: <SiTailwindcss className="h-8 w-8 text-teal-400" />,
  Typescript: <SiTypescript className="h-8 w-8 text-blue-500" />,
  Javascript: <IoLogoJavascript className="h-8 w-8 text-yellow-500" />,
  Python: <FaPython className="h-8 w-8 text-blue-600" />,
  Flutter: <FaFlutter className="h-8 w-8 text-cyan-500" />,
  ThreeJS: (
    <img
      src="/assets/ThreeJSLogo.png"
      alt="Three.js"
      className="h-8 w-8"
      loading="lazy"
      decoding="async"
    />
  ),
};

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
});

const koulen = Koulen({
  subsets: ["latin"],
  weight: "400",
});

export type ProjectData = {
  title: string;
  gif: string;
  description: string;
  caption: string;
  technologies: string[];
  link: string;
};

/** Rendered only when parent LazyInView mounts (near viewport). */
export function ProjectBox({
  title,
  gif,
  description,
  caption,
  technologies,
  link,
}: ProjectData) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => {});
    return () => {
      video.pause();
    };
  }, [gif]);

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="flex aspect-[3/4] w-64 flex-col items-center rounded-3xl bg-kat-black transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:shadow-kat-purple">
        <h1 className="mb-2 mt-4 !text-2xl">{title}</h1>

        <video
          ref={videoRef}
          className="h-55 aspect-square rounded-3xl object-cover"
          src={gif}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        />

        <div className="mt-4 h-55 w-full rounded-4xl border-x-12 border-b-10 border-kat-black bg-linear-to-t from-kat-black to-[#1C1A31] p-4">
          <p className={`${specialElite.className} text-sm`}>{description}</p>
          <p className={`${koulen.className} mb-2 mt-2 text-sm`}>{caption}</p>
          <div className="icons mt-3 flex flex-row items-center justify-center space-x-2">
            {technologies.map((tech) => (
              <div key={tech}>{techIcons[tech]}</div>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

export default ProjectBox;
