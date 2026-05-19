"use client";

import BottomBar from "@/components/layout/BottomBar";
import PageBackground from "@/components/layout/PageBackground";
import { PAGE_BACKGROUNDS } from "@/lib/backgrounds";
import { Koulen, Jersey_10 } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const jersey10 = Jersey_10({
  subsets: ["latin"],
  weight: "400",
});

const koulen = Koulen({
  subsets: ["latin"],
  weight: "400",
});

export default function HomePage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="select-none flex min-h-full w-full flex-1 flex-col overflow-x-hidden">
      <div
        className={`${koulen.className} relative flex min-h-[calc(95svh-4.75rem)] shrink-0 flex-col`}
      >
        <PageBackground
          priority
          objectPosition="bottom"
          imgClassName="object-bottom"
          layers={[
            {
              ...PAGE_BACKGROUNDS.homeDesktop,
              media: "(min-width: 640px)",
              fallbackType: "image/jpeg",
            },
            PAGE_BACKGROUNDS.homeMobile,
          ]}
        />
        <div className="relative mt-45 flex flex-col items-center justify-center space-y-5 text-center">
          <p
            className={`pointer-events-none text-4xl transition-all duration-1000 ease-out md:text-5xl ${loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            Software Engineer
          </p>

          <h1
            className={`katherinaText pointer-events-none relative text-7xl transition-all delay-200 duration-1000 ease-out md:text-[150px] ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          >
            <img
              src="/assets/catears.png"
              className={`catears-img pointer-events-none absolute -left-16 -top-10 h-auto w-[230px] transition-all delay-300 duration-1000 ease-out md:-left-35 md:-top-20 md:w-[500px] ${loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              alt=""
            />
            <img
              src="/assets/mewo.png"
              className={`mewo-img pointer-events-none absolute -top-50 left-16 h-auto w-[230px] transition-all delay-300 duration-1000 ease-out md:left-210 md:w-[250px] ${loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              alt=""
            />
            <img
              src="/assets/screamingcat.png"
              className={`screamingcat-img pointer-events-none absolute -left-0 top-25 h-auto w-[250px] transition-all delay-300 duration-1000 ease-out ${loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              alt=""
            />
            <img
              src="/assets/sillycat.png"
              className={`sillycat-img pointer-events-none absolute right-10 top-25 h-auto w-[300px] transition-all delay-300 duration-1000 ease-out ${loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              alt=""
            />
            <img
              src="/assets/sparkle.svg"
              className={`sparkle pointer-events-none absolute -right-30 top-15 h-auto w-[150px] transition-all delay-300 duration-1000 ease-out ${loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              alt=""
            />
            <img
              src="/assets/line.png"
              className={`line pointer-events-none absolute -top-38 right-80 h-auto w-[350px] transition-all delay-[300ms] duration-1000 ease-out ${loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              alt=""
            />

            <span className="pointer-events-none relative inline-block">Kat</span>
            herina Dayaon
          </h1>

          <button
            type="button"
            onClick={() => router.push("/about")}
            className={`${jersey10.className} cursor-pointer rounded-2xl bg-kat-purple px-7 py-2 text-3xl transition-all delay-[0ms] duration-500 ease-out hover:scale-110 hover:bg-white hover:text-kat-purple hover:shadow-lg hover:shadow-kat-purple md:text-6xl ${loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            LET&apos;S GO! :D
          </button>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
