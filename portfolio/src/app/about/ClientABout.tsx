"use client";

import TopBar from "../../../components/TopBar";
import BottomBar from "../../../components/BottomBar";
import Songbox from "../../../components/SongBox";
import { useEffect, useState } from "react";

export default function About({
  koulenClass,
  specialClass,
}: {
  koulenClass: string;
  specialClass: string;
}) {
  const [songs, setSongs] = useState<
    { name: string; artist: string; cover: string }[]
  >([]);
  
const [loaded, setLoaded] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => setLoaded(true), 100);
  return () => clearTimeout(timer);
}, []);


  useEffect(() => {
    fetch("/api/topTracks")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setSongs(data);
      });
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <div
        className={`${koulenClass} 2xl:bg-[url('/assets/aboutXL.png')] lg:bg-[url('/assets/aboutbg2.png')] bg-[url('/assets/bgimageAbout.jpg')] bg-cover bg-top lg:h-screen md:h-225 sm:h-200 h-250 min-h-screen relative`}
      >
        <TopBar />

        {/* Decorative Images */}
        <img
          className="2xl:hidden absolute pointer-events-none z-40 w-[250px] top-27 -left-2 h-auto md:w-[350px] md:top-32 md:-left-5 lg:w-[450px] lg:left-20 lg:top-55 xl:top-60"
          src="assets/catearsonme.png"
        />
        <img
          className="2xl:hidden absolute pointer-events-none z-40 w-[120px] top-20 right-2 h-auto sm:left-70 sm:w-[140px] md:w-[200px] md:top-22 md:left-75 lg:w-[220px] lg:left-100 lg:top-20 xl:left-140"
          src="assets/tonguecat.png"
        />
        <img
          className="2xl:hidden absolute pointer-events-none display:block z-40 w-[120px] top-60 left-40 h-auto sm:left-60 sm:top-45 sm:w-[140px] md:w-[200px] md:top-92 md:left-45 lg:hidden xl:block xl:left-130 xl:top-70"
          src="assets/sillycat.png"
        />
        <img
          className="2xl:hidden absolute pointer-events-none z-40 w-[90px] top-100 left-2 h-auto sm:left-20 sm:top-85 sm:w-[140px] md:block md:w-[100px] md:top-120 md:left-30 lg:top-140 lg:left-2 lg:w-[120px]"
          src="assets/catstanding.png"
        />
        <div className="flex-start">
          <img
            className="lg:hidden lg:ml-0 md:h-200 md:mt-2 h-150 w-auto absolute top-17 left-0 z-0 min-w-90"
            src="assets/meTransparent.png"
          />
          <img
            className="hidden 2xl:hidden lg:block pointer-events-none lg:ml-0 md:h-190 md:mt-2 h-150 w-auto absolute top-17 -left-70 z-0 min-w-280"
            src="assets/mesupertransparent.png"
          />
        </div>

        {/* Intro Section */}
        <div className="2xl:text-center 2xl:m-0 2xl:mt-20 xl:text-right xl:mr-10 xl:mt-25 lg:text-right lg:ml-150 lg:mr-10 text-right mr-5 mt-80 ml-0 z-90 sm:mt-40 md:mt-30 lg:mt-15">
          <h1 className={`${specialClass} 2xl:!text-5xl !text-xl sm:!text-2xl lg:!text-4xl transition-all duration-1000 ease-out 
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Hi there, I'm
          </h1>

          <h1 className={`${koulenClass} 2xl:!text-7xl !text-2xl sm:!text-4xl lg:!text-5xl transition-all duration-1000 ease-out delay-200
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Katherina Dayaon
          </h1>
        </div>

        {/* Bio */}
        <div className="burnett 2xl:justify-center 2xl:items-center 2xl:!ml-0 2xl:!mr-0 lg:m-0 2xl:flex text-right mr-5 mt-4 ml-14 sm:ml-50 md:ml-90 lg:ml-130 lg:text-right lg:mr-10 xl:ml-190">
          <p
            className={`burnett ${specialClass} 
              2xl:!mb-10 
              2xl:!ml-0 
              2xl:!mr-0 
              2xl:mx-auto
              2xl:max-w-4xl
              2xl:text-center
              !text-s md:!text-xl lg:!text-md xl:!text-lg 
              transition-all duration-1000 ease-out delay-400 
              ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            I'm a Burnett Honors Computer Science student at the University of
            Central Florida. I'm the current Knight Hacks Design Director and
            Website intern @ the UCF Arboretum! I love everything artsy, below
            are some of my favorite songs:
          </p>

        </div>

        {/* Song Section */}
        <div
          className={`flex flex-col items-center transition-all duration-1000 ease-out delay-600
            md:mt-0 lg:mt-0 lg:justify-end xl:ml-0
            2xl:max-w-6xl 2xl:mx-auto 2xl:text-center
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            2xl:flex 2xl:justify-center 2xl:items-center 2xl:mt-0
          `}
        >

          <p className="bg-kat-purple text-center p-1 rounded-md mt-10 place-self-center text-2xl 
            lg:mt-5 lg:ml-40 lg:text-xl xl:ml-10 2xl:ml-0 2xl:mt-0">
            Kat's Top Songs...
          </p>

          <div className="flex flex-row mt-5 space-x-3 md:space-x-8 lg:space-x-4 w-screen h-screen justify-center 
              lg:w-150 lg:ml-125 2xl:w-auto 2xl:h-auto 2xl:ml-0">
            {songs.slice(0, 3).map((song, index) => (
              <Songbox
                key={index}
                index={index}
                title={song.name}
                artist={song.artist}
                cover={song.cover}
              />
            ))}
          </div>
        </div>

      </div>

      <BottomBar />
    </div>
  );
}