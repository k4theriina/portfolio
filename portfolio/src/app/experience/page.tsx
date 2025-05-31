"use client";

import TopBar from "../../../components/TopBar";
import BottomBar from "../../../components/BottomBar";
import ExperienceBox from "../../../components/ExperienceBox";

import { Koulen, Special_Elite } from "next/font/google";

import { experiences } from "../../../components/Experience";

const koulen = Koulen({
  subsets: ['latin'],
  weight: '400',
});
const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: '400',
});

export default function Experience() {
    return (
        <div className="min-h-screen overflow-hidden w-full">
            <div className={`${koulen.className} bg-[url('/assets/bgimageExp.jpg')] bg-cover bg-center w-full`}>
                <TopBar />
                <div className="relative flex flex-col items-center text-center px-6 pt-10 pb-32">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[2px] bg-white z-0 pointer-events-none"></div>
                    
                    <img
                        className="absolute pointer-events-none z-10 left-1/2 top-40 -translate-x-1/2 -translate-y-1/2 h-[300px] md:h-[400px] lg:h-[500px] md:top-60 lg:top-75 w-auto max-w-full"
                        src="/assets/paperBubble.png"
                        alt="Background Bubble"
                    />
                    <h1 className="z-10 text-kat-purple !text-3xl mt-13 md:!text-6xl md:mt-25 lg:!text-7xl lg:mt-37">Experience</h1>
                    <p className={`${specialElite.className} expDesc z-10 !text-[12px]/4 text-kat-black mx-8 max-w-2xl sm:mx-40 md:mx-150 max-w-[300px] md:!text-[17px]/5 md:max-w-[400px] md:mt-2 lg:!text-[18px]/6 lg:max-w-[500px]`}>
                        I’m actively seeking opportunities to explore and learn more within the field of Computer Science. Below is a brief overview of experience I’ve had in both CS and leadership.
                    </p>
                    <div className="h-auto mt-30 space-y-8 md:space-y-12 mb-20 z-10 lg:mt-50">
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