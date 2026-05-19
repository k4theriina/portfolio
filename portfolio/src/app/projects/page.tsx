"use client";

import BottomBar from "@/components/layout/BottomBar";
import LazyInView from "@/components/animations/LazyInView";
import { projects } from "@/components/projects/projectData";
import dynamic from "next/dynamic";

const ProjectBox = dynamic(() => import("@/components/projects/ProjectBox"), {
  ssr: false,
  loading: () => (
    <div
      className="aspect-[3/4] w-64 shrink-0 rounded-3xl bg-kat-black/80"
      aria-hidden
    />
  ),
});
import {
  StaggerRevealGroup,
  StaggerRevealItem,
} from "@/components/animations/StaggerReveal";
import { Koulen } from "next/font/google";
import { useEffect, useState } from "react";

const koulen = Koulen({
  subsets: ["latin"],
  weight: "400",
});

export default function Projects() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-full w-full flex-col overflow-hidden">
      <div
        className={`${koulen.className} select-none flex min-h-full w-full flex-col bg-[url('/assets/bgimageExp.jpg')] bg-cover bg-center`}
      >
        <div className="relative flex min-h-screen min-w-screen flex-col items-center text-center">
          <div>
            <img
              className={`pointer-events-none w-screen transition-all duration-1000 ease-out lg:hidden ${
                loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              src="/assets/paperstrip.webp"
              alt="Projects heading"
            />
            <img
              className={`pointer-events-none hidden w-screen transition-all duration-1000 ease-out lg:block ${
                loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              src="/assets/paperstripLong.webp"
              alt="Projects heading"
            />
          </div>

          <StaggerRevealGroup
            range={3}
            stagger={0.3}
            itemCount={projects.length}
            className="projectSection -mt-5 mb-20 flex flex-col items-center space-y-10 place-self-center sm:-mt-7 md:-mt-8 lg:-mt-10 lg:ml-20 lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-15 lg:gap-y-10 xl:-mt-12"
          >
            {projects.map((project, index) => (
              <StaggerRevealItem key={project.title} index={index}>
                <LazyInView className="w-64 shrink-0">
                  <ProjectBox {...project} />
                </LazyInView>
              </StaggerRevealItem>
            ))}
          </StaggerRevealGroup>
        </div>
        <BottomBar />
      </div>
    </div>
  );
}
