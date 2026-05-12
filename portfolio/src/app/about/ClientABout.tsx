"use client";

import TopBar from "../../../components/TopBar";
import BottomBar from "../../../components/BottomBar";
import Songbox from "../../../components/SongBox";
import ThingsILikeToDo from "../../components/about/ThingsILikeToDo";
import { useEffect, useState } from "react";
import { Jersey_10 } from "next/font/google";

const jersey10 = Jersey_10({
  subsets: ['latin'],
  weight: '400',
});

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
      .then(async (res) => {
        const data = await res.json();
        if (res.ok && Array.isArray(data)) setSongs(data);
      })
      .catch(() => setSongs([]));
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <div
        className={`${koulenClass} lg:bg-[url('/assets/aboutXL.png')] bg-[url('/assets/bgimageAbout.jpg')] bg-cover bg-top lg:h-screen relative`}
      >
        <TopBar />
        
        {/* First part */}
        <div className="flex flex-col lg:flex-row items-center gap-0 w-full">
          <img src="/assets/UltimateKatPhoto.webp" className="
            lg:mr-5
            lg:mt-10 lg:ml-0" >
          </img>

          {/* Text section */}
          <div className="text-center md:text-left ">
            {/* Intro Section */}
          <div className="z-90 flex-1 max-w-full">
            <h1 className={`${specialClass} 2xl:!text-5xl !text-xl lg:!text-xl transition-all duration-1000 ease-out 
              ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Hi there, I'm
            </h1>

            <h1 className={`${koulenClass} mb-2 2xl:!text-7xl !text-2xl sm:!text-4xl lg:!text-5xl transition-all duration-1000 ease-out delay-200
              ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Katherina Dayaon
            </h1>

          </div>
            {/* Bio */}
          <div
              className={`burnett ${specialClass} 
                text-sm
                mb-10
                ml-10
                mr-10
                z-90 burnett text-left
                mr-0
                lg:mr-15
                lg:ml-0
                2xl:mx-auto
                2xl:max-w-4xl
                2xl:text-center
                !text-s md:!text-md lg:!text-md xl:!text-lg 
                transition-all duration-1000 ease-out delay-400 
                ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p
            >
            I'm a Burnett Honors Computer Science student at the University of
  Central Florida, where I'm passionate about creating meaningful technologies
  and exploring the intersection of technology and creativity. I'm currently
  a software engineer intern at BNY and I'm excited to be joining Florida Blue this summer
  where I'll continue to develop my skills in software engineering.

<br></br><br></br>Beyond coding and problem-solving, I absolutely love anything and everything artsy! The act of creating, whether it be music,
drawings, clothes, or websites gives me an immense sense of fufillment. Scroll below to learn more about me! :3

            </p>

          </div>

          </div>

        </div>

      </div>
      
      <div
        className={`newDiv ${koulenClass} relative flex min-h-screen flex-col bg-[url('/assets/bgCat.png')] bg-cover bg-top`}
      >
        <ThingsILikeToDo koulenClass={koulenClass} specialClass={specialClass} />
      </div>

      <div
        className={`${koulenClass} relative bg-[url('/assets/bgimageAbout.jpg')] bg-cover bg-top pb-12 pt-10 lg:min-h-[28rem] lg:pb-16 lg:pt-7 isolate`}
      >
        {/* Top songs — padding-top on this block avoids margin-collapse gap (black strip) above */}
        <p className="mx-auto w-fit max-w-[90vw] rounded-md bg-kat-purple p-1 text-center text-2xl lg:text-xl">
          Kat's Top Songs...
        </p>

        <div className="flex flex-row mt-5 space-x-3 md:space-x-8 lg:space-x-4 w-screen justify-center 
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


      <BottomBar />
    </div>
  );
}