"use client";

import TopBar from "../../../components/TopBar";
import BottomBar from "../../../components/BottomBar";

import { Koulen, Special_Elite } from "next/font/google";

const koulen = Koulen({
  subsets: ['latin'],
  weight: '400',
});
const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: '400',
});

export default function About() {
    return (
        <div className="min-h-screen overflow-hidden">
            <div className={`${koulen.className} lg:bg-[url('/assets/aboutbg2.png')] bg-[url('/assets/bgimageAbout.jpg')] bg-cover bg-top lg:h-screen md:h-225 sm:h-200 h-250 min-h-screen relative`}>
                <TopBar></TopBar>
                <img className="absolute" src="assets/catearsonme.png"></img>   
                <div className="flex-start">
                    <img className="lg:hidden lg:ml-0 md:h-200 md:mt-2 h-150 w-auto absolute top-17 left-0 z-0 min-w-90" src="assets/meTransparent.png"></img>
                    <img className="hidden lg:block pointer-events-none lg:ml-0 md:h-190 md:mt-2 h-150 w-auto absolute bottom-0 -left-70 z-0 min-w-280" src="assets/mesupertransparent.png"></img>
                </div>
                <div className="xl:text-right xl:mr-10 xl:mt-25 lg:text-right lg:ml-150 lg:mr-10 text-right mr-5 mt-80 ml-0 z-90 sm:mt-40 md:mt-30">
                    <h1 className={`${specialElite.className} !text-xl sm:!text-2xl lg:!text-4xl`}>Hi there, I'm</h1>
                    <h1 className={`${koulen.className} !text-2xl sm:!text-4xl lg:!text-5xl`}>Katherina Dayaon</h1>
                </div>
                <div className="burnett text-right mr-5 mt-4 ml-14 sm:ml-50 md:ml-80 lg:ml-130 lg:text-right lg:mr-10 xl:ml-190">
                    <p className={`${specialElite.className} !text-s md:!text-xl lg:!text-md xl:!text-lg`}>I'm a Burnett Honors Computer Science student at the University of Central Florida. I'm the current Knight Hacks Design Director and future SWE intern @ the Arboretum! I love anything artsy, below are some of my fav songs: </p>
                </div>
                <div className="place-self-center flex items-center flex-col md:mt-10 lg:mt-0 lg:justify-end lg:mt-0 xl:ml-0">
                    <p className={`bg-kat-purple text-center ml-5 p-1 rounded-md mt-10 place-self-center text-2xl lg:mt-15 lg:ml-40 lg:text-xl xl:ml-10`}>Kat's Top Songs...</p>
                    <div className="flex flex-row mt-5 space-x-3 md:space-x-8 lg:space-x-4 w-screen h-screen justify-center lg:w-150 lg:ml-125">
                        <div className="bg-kat-black w-1/4 h-1/3 lg:h-1/5 rounded-xl xl:w-1/3 xl:h-1/4"></div>
                        <div className="bg-kat-black w-1/4 h-1/3 lg:h-1/5 rounded-xl xl:w-1/3 xl:h-1/4"></div>
                        <div className="bg-kat-black w-1/4 h-1/3 lg:h-1/5 rounded-xl xl:w-1/3 xl:h-1/4"></div>
                    </div>
                </div> 
            </div>
            <div>
                <BottomBar />
            </div>
        </div>
    );
}