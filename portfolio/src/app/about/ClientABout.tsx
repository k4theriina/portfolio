"use client";

import TopBar from "../../../components/TopBar";
import BottomBar from "../../../components/BottomBar";
import Songbox from "../../../components/SongBox";
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
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setSongs(data);
      });
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <div
        className={`${koulenClass} lg:bg-[url('/assets/aboutXL.png')] bg-[url('/assets/bgimageAbout.jpg')] bg-cover bg-top lg:h-screen md:h-225 sm:h-200 h-250 min-h-screen relative`}
      >
        <TopBar />
        
        {/* First part */}
        <div className="flex items-center gap-10 w-full">
          <img src="/assets/UltimateKatPhoto.webp" className="lg:mt-10 lg:ml-15" ></img>

          {/* Text section */}
          <div>
            {/* Intro Section */}
          <div className="z-90 flex-1 max-w-full">
            <h1 className={`${specialClass} 2xl:!text-5xl !text-xl sm:!text-2xl lg:!text-4xl transition-all duration-1000 ease-out 
              ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Hi there, I'm
            </h1>

            <h1 className={`${koulenClass} mb-10 2xl:!text-7xl !text-2xl sm:!text-4xl lg:!text-5xl transition-all duration-1000 ease-out delay-200
              ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Katherina Dayaon
            </h1>

          </div>
            {/* Bio */}
          <div className="z-90 burnett">
            <p
              className={`burnett ${specialClass} 
                mr-20
                2xl:mx-auto
                2xl:max-w-4xl
                2xl:text-center
                !text-s md:!text-xl lg:!text-md xl:!text-lg 
                transition-all duration-1000 ease-out delay-400 
                ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
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

        {/* Song Section */}
        <div
          className={`flex flex-col items-center transition-all duration-1000 ease-out delay-600
            md:mt-0 lg:mt-0 lg:justify-end xl:ml-0
            2xl:max-w-6xl 2xl:mx-auto 2xl:text-center
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            2xl:flex 2xl:justify-center 2xl:items-center 2xl:mt-0
          `}
        >

          {/* Top songs */}
          {/* <p className="bg-kat-purple text-center p-1 rounded-md mt-10 place-self-center text-2xl 
            lg:mt-7 lg:ml-40 lg:text-xl xl:ml-10 2xl:ml-0 2xl:mt-0">
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
          </div> */}

        </div>

      </div>


      <BottomBar />
    </div>
  );
}