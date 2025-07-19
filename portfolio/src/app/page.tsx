"use client";

import TopBar from "../../components/TopBar";
import BottomBar from "../../components/BottomBar";
import { Koulen } from "next/font/google";
import { Jersey_10 } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Head from "next/head";

const jersey10 = Jersey_10({
  subsets: ['latin'],
  weight: '400',
});

const koulen = Koulen({
  subsets: ['latin'],
  weight: '400',
});

export default function Home() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
      <title>Katherina Dayaon | Software Engineer & Creative</title>
      <meta name="description" content="Katherina's personal website — aspiring software engineer, creative technologist, and designer. Discover her projects, ideas, and silly cat-themed design choices." />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta property="og:title" content="Kat Dayaon | Software Engineer & Creative" />
      <meta property="og:description" content="Katherina's personal website — aspiring software engineer, creative technologist, and designer. Discover her projects, ideas, and silly cat-themed design choices." />
      <meta property="og:image" content="https://katherinadayaon.me/assets/og-image.jpg" />
      <meta property="og:url" content="https://katherinadayaon.me/" />
      <meta property="og:type" content="website" />

      </Head>


      <div className="min-h-screen overflow-hidden">
        <div
          className={`${koulen.className} 
            bg-[url('/assets/mobilehomebg.jpg')] 
            sm:bg-[url('/assets/bgimageHome.jpg')] 
            bg-cover bg-bottom h-screen min-h-screen`}
        >

          <TopBar />

          <div className="flex flex-col space-y-5 items-center text-center justify-center mt-45">
            {/* Text fades and slides in */}
            <p className={`text-4xl md:text-5xl pointer-events-none transition-all duration-1000 ease-out 
              ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Software Engineer
            </p>

            <h1 className={`katherinaText pointer-events-none text-7xl md:text-[150px] relative transition-all duration-1000 ease-out delay-200
              ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

              {/* Decorative images */}
              <img
                src="/assets/catears.png"
                className={`pointer-events-none catears-img absolute w-[230px] -top-10 -left-16 md:-top-20 md:-left-35 md:w-[500px] h-auto transition-all duration-1000 ease-out delay-300 
                ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                alt="cat ears"
              />
              <img
                src="/assets/mewo.png"
                className={`pointer-events-none mewo-img absolute w-[230px] left-16 -top-50 md:left-210 md:w-[250px] h-auto transition-all duration-1000 ease-out delay-300 
                ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                alt="mewo"
              />
              <img
                src="/assets/screamingcat.png"
                className={`pointer-events-none screamingcat-img absolute top-25 -left-0 w-[250px] h-auto transition-all duration-1000 ease-out delay-300 
                ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                alt="screaming-cat"
              />
              <img
                src="/assets/sillycat.png"
                className={`sillycat-img pointer-events-none absolute top-25 right-10 w-[300px] h-auto transition-all duration-1000 ease-out delay-300 
                ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                alt="silly-cat"
              />
              <img
                src="/assets/sparkle.svg"
                className={`sparkle pointer-events-none absolute top-15 -right-30 w-[150px] h-auto transition-all duration-1000 ease-out delay-300 
                ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                alt="sparkle"
              />
              <img
                src="/assets/line.png"
                className={`line pointer-events-none absolute -top-38 right-80 w-[350px] h-auto transition-all duration-1000 ease-out delay-[300ms] 
                ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                alt="line"
              />

              <span className="relative inline-block">Kat</span>
              herina Dayaon
            </h1>

            {/* Button fades & slides in */}
            <button
              onClick={() => router.push("/about")}
              className={`${jersey10.className} cursor-pointer bg-kat-purple py-2 px-7 rounded-2xl text-3xl md:text-6xl transition-all duration-500 ease-out delay-[0ms]
                hover:bg-white hover:text-kat-purple hover:scale-110 hover:shadow-lg hover:shadow-kat-purple transform
                ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              DISCOVERY
            </button>
          </div>
        </div>

        <div>
          <BottomBar />
        </div>
      </div>

    </>
  );
}
