"use client";

import BottomBar from "@/components/layout/BottomBar";
import ExperienceBox from "@/components/experience/ExperienceBox";
import { Koulen, Special_Elite } from "next/font/google";
import { experiences } from "@/components/experience/experienceData";
import { useState, useEffect } from "react";

const koulen = Koulen({
  subsets: ["latin"],
  weight: "400",
});
const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
});

export default function ExperiencePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-full w-full flex-col overflow-hidden">
      <div
        className={`${koulen.className} flex min-h-full w-full flex-col bg-[url('/assets/bgimageExp.jpg')] bg-cover bg-center bg-repeat`}
      >
        <div className="relative flex flex-col items-center px-6 pb-32 pt-10 text-center">
          <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-[5px] -translate-x-1/2 bg-white"></div>
          <div className="relative w-1/4 place-self-center">
            <img
              className={`cat1 absolute -left-25 top-45 z-40 h-20 transition-all delay-200 duration-1000 ease-out sm:-left-40 sm:top-35 sm:h-30 md:-left-60 md:top-50 md:h-40 lg:-left-65 lg:top-70 lg:h-50 2xl:hidden ${loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              src="/assets/guitarCat.png"
              alt=""
            />
            <img
              className={`cat2 absolute left-32 top-5 z-40 h-20 transition-all duration-1000 ease-out sm:-top-5 sm:left-35 sm:h-30 md:left-60 md:top-5 md:h-40 lg:left-85 lg:h-50 2xl:hidden ${loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              src="/assets/catstanding.png"
              alt=""
            />
          </div>
          <img
            className="pointer-events-none absolute left-1/2 top-40 z-10 h-[300px] w-auto max-w-full -translate-x-1/2 -translate-y-1/2 md:top-60 md:h-[400px] lg:top-75 lg:h-[500px]"
            src="/assets/paperBubble.png"
            alt="Background Bubble"
          />
          <h1
            className={`z-10 mt-13 !text-3xl text-kat-purple transition-all delay-200 duration-1000 ease-out md:mt-25 md:!text-6xl lg:mt-37 lg:!text-7xl ${loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            Experience
          </h1>
          <p
            className={`expDesc z-10 mx-8 max-w-2xl max-w-[300px] !text-[12px]/4 text-kat-black transition-all delay-400 duration-1000 ease-out sm:mx-40 md:mx-150 md:mt-2 md:max-w-[400px] md:!text-[17px]/5 lg:max-w-[500px] lg:!text-[18px]/6 ${specialElite.className} ${loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            I&apos;m actively seeking opportunities to explore and learn more within the field of
            Computer Science. Below is a brief overview of experience I&apos;ve had in both CS and
            leadership.
          </p>
          <div className="z-10 mb-20 mt-30 h-auto space-y-8 md:space-y-20 lg:mt-60">
            {experiences.map((exp, index) => (
              <ExperienceBox key={index} {...exp} />
            ))}
          </div>
        </div>
        <BottomBar />
      </div>
    </div>
  );
}
