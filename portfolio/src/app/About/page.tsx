"use client";

import TopBar from "../../../components/TopBar";
import BottomBar from "../../../components/BottomBar";
import Songbox from "../../../components/SongBox";

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
                <img className="absolute pointer-events-none z-40 w-[250px] top-27 -left-2 h-auto md:w-[350px] md:top-32 md:-left-5 lg:w-[450px] lg:left-20 lg:top-40 xl:top-28" src="assets/catearsonme.png"></img>   
                <img className="absolute pointer-events-none z-40 w-[120px] top-20 right-2 h-auto sm:left-70 sm:w-[140px] md:w-[200px] md:top-22 md:left-75 lg:w-[220px] lg:left-100 lg:top-20 xl:left-140" src="assets/tonguecat.png"></img>   
                <img className="absolute pointer-events-none display:block z-40 w-[120px] top-60 left-40 h-auto sm:left-60 sm:top-45 sm:w-[140px] md:w-[200px] md:top-92 md:left-45 lg:hidden xl:block xl:left-130 xl:top-70" src="assets/sillycat.png"></img>   
                <img className="absolute pointer-events-none z-40 w-[90px] top-100 left-2 h-auto sm:left-20 sm:top-85 sm:w-[140px] md:w-[100px] md:top-120 md:left-30 lg:top-140 lg:left-2 lg:w-[120px]" src="assets/catstanding.png"></img>   
                <div className="flex-start">
                    <img className="lg:hidden lg:ml-0 md:h-200 md:mt-2 h-150 w-auto absolute top-17 left-0 z-0 min-w-90" src="assets/meTransparent.png"></img>
                    <img className="hidden lg:block pointer-events-none lg:ml-0 md:h-190 md:mt-2 h-150 w-auto absolute bottom-0 -left-70 z-0 min-w-280" src="assets/mesupertransparent.png"></img>
                </div>
                <div className="xl:text-right xl:mr-10 xl:mt-25 lg:text-right lg:ml-150 lg:mr-10 text-right mr-5 mt-80 ml-0 z-90 sm:mt-40 md:mt-30">
                    <h1 className={`${specialElite.className} !text-xl sm:!text-2xl lg:!text-4xl`}>Hi there, I'm</h1>
                    <h1 className={`${koulen.className} !text-2xl sm:!text-4xl lg:!text-5xl`}>Katherina Dayaon</h1>
                </div>
                <div className="burnett text-right mr-5 mt-4 ml-14 sm:ml-50 md:ml-90 lg:ml-130 lg:text-right lg:mr-10 xl:ml-190">
                    <p className={`burnett ${specialElite.className} !text-s md:!text-xl lg:!text-md xl:!text-lg`}>I'm a Burnett Honors Computer Science student at the University of Central Florida. I'm the current Knight Hacks Design Director and future SWE intern @ the Arboretum! I love everything artsy, below are some of my favorite songs: </p>
                </div>
                <div className="place-self-center flex items-center flex-col md:mt-0 lg:mt-0 lg:justify-end lg:mt-0 xl:ml-0">
                    <p className={`bg-kat-purple text-center ml-5 p-1 rounded-md mt-10 place-self-center text-2xl lg:mt-5 lg:ml-40 lg:text-xl xl:ml-10`}>Kat's Top Songs...</p>
                    <div className="flex flex-row mt-5 space-x-3 md:space-x-8 lg:space-x-4 w-screen h-screen justify-center lg:w-150 lg:ml-125">
                        <Songbox></Songbox>
                        <Songbox></Songbox>
                        <Songbox></Songbox>
                    </div>
                </div> 
            </div>
            <div>
                <BottomBar />
            </div>
        </div>
    );
}