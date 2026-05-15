"use client";

import BottomBar from "../../../components/BottomBar";
import ScrollFade from "../../../components/ScrollFade";
import {
  StaggerRevealGroup,
  StaggerRevealItem,
} from "../../../components/StaggerReveal";
import Songbox from "../../../components/SongBox";
import ThingsILikeToDo from "../../components/about/ThingsILikeToDo";
import ArtGallery from "../../components/about/ArtGallery";
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

  useEffect(() => {
    fetch("/api/topTracks")
      .then(async (res) => {
        const data = await res.json();
        if (res.ok && Array.isArray(data)) setSongs(data);
      })
      .catch(() => setSongs([]));
  }, []);

  return (
    <div className="flex min-h-full w-full flex-col overflow-x-hidden">
      <div
        className={`${koulenClass} relative flex min-h-0 flex-col bg-[url('/assets/bgimageAbout.jpg')] bg-cover bg-top lg:min-h-[calc(100svh-4.75rem)] lg:bg-[url('/assets/aboutXL.png')]`}
      >
        <div className="flex min-h-0 flex-1 flex-col justify-center py-8 sm:py-10 lg:py-6">
          <ScrollFade
            lazy={false}
            className="mx-auto flex w-full max-w-[min(100%-1.5rem,2400px)] flex-col items-center gap-8 px-4 sm:gap-10 sm:px-6 md:gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-[clamp(1.5rem,4vw,5rem)] lg:px-8 xl:px-12 2xl:gap-16 2xl:px-16"
          >
            <img
              src="/assets/UltimateKatPhoto.webp"
              alt="Katherina Dayaon"
              className="h-auto w-[min(40rem,96vw)] shrink-0 object-contain sm:w-[min(46rem,95vw)] md:w-[min(52rem,93vw)] lg:w-[clamp(28rem,48vw,64rem)] xl:w-[clamp(32rem,46vw,72rem)] 2xl:w-[clamp(36rem,44vw,80rem)]"
            />

            <div className="flex w-full min-w-0 max-w-[min(40rem,92vw)] flex-col items-center gap-2 text-center lg:max-w-[min(55rem,48vw)] lg:items-start lg:gap-3 lg:text-left xl:max-w-[min(60rem,46vw)] 2xl:max-w-[min(68rem,44vw)]">
              <div className="w-full">
                <h1
                  className={`${specialClass} !text-[clamp(1.125rem,1.1vw+0.65rem,2.75rem)]`}
                >
                  Hi there, I&apos;m
                </h1>
                <h1
                  className={`${koulenClass} !text-[clamp(1.5rem,2.4vw+0.85rem,4.25rem)]`}
                >
                  Katherina Dayaon
                </h1>
              </div>

              <div
                className={`${specialClass} w-full !text-[clamp(0.9rem,0.45vw+0.72rem,1.35rem)] leading-relaxed`}
              >
                <p>
                  I&apos;m a Burnett Honors Computer Science student at the
                  University of Central Florida, where I&apos;m passionate about
                  creating meaningful technologies and exploring the intersection
                  of technology and creativity. I&apos;m currently a software
                  engineer intern at BNY and I&apos;m excited to be joining
                  Florida Blue this summer where I&apos;ll continue to develop my
                  skills in software engineering.
                  <br />
                  <br />
                  Beyond coding and problem-solving, I absolutely love anything
                  and everything artsy! The act of creating, whether it be music,
                  drawings, clothes, or websites gives me an immense sense of
                  fufillment. Scroll below to learn more about me! :3
                </p>
              </div>
            </div>
          </ScrollFade>
        </div>
      </div>

      <div
        className={`newDiv ${koulenClass} relative flex min-h-screen w-full flex-col items-stretch bg-[url('/assets/bgCat.png')] bg-cover bg-top`}
      >
        <ThingsILikeToDo koulenClass={koulenClass} specialClass={specialClass} />
      </div>

      <div
        className={`${koulenClass} relative flex flex-col items-center bg-[url('/assets/bgimageAbout.jpg')] bg-cover bg-top pb-12 pt-10 lg:min-h-[35rem] lg:pb-16 lg:pt-7 isolate`}
      >
        <ScrollFade className="flex w-full flex-col items-center">
          <p className="mx-auto w-fit max-w-[90vw] rounded-md bg-kat-purple p-1 text-center text-2xl lg:text-3xl">
            Kat&apos;s Top Songs...
          </p>

          <StaggerRevealGroup
            replayKey={songs.map((s) => s.name).join("|") || "empty"}
            className="mt-8 flex w-full max-w-6xl flex-row flex-wrap justify-center gap-4 px-4 sm:gap-6 md:gap-8 lg:gap-10"
          >
            {songs.slice(0, 3).map((song, index) => (
              <StaggerRevealItem key={`${song.name}-${index}`} index={index}>
                <Songbox
                  index={index}
                  title={song.name}
                  artist={song.artist}
                  cover={song.cover}
                />
              </StaggerRevealItem>
            ))}
          </StaggerRevealGroup>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 px-4 sm:mt-10 sm:gap-3">
            <span
              className={`${specialClass} text-sm text-white/75 sm:text-base`}
            >
              Powered by
            </span>
            <a
              href="https://www.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center opacity-90 transition hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
              aria-label="Spotify"
            >
              <img
                src="/assets/spotify.svg"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 sm:h-8 sm:w-8"
              />
            </a>
          </div>
        </ScrollFade>
      </div>

      <div className={`artDiv ${koulenClass} relative w-full`}>
        <ArtGallery koulenClass={koulenClass} specialClass={specialClass} />
      </div>

      <BottomBar />
    </div>
  );
}
