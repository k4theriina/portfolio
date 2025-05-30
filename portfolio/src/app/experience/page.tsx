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
            <div className="absolute top-50 left-1/2 -translate-x-1/2 h-full w-[2px] bg-white z-0 pointer-events-none"></div>
            <div className={`${koulen.className} bg-[url('/assets/bgimageExp.jpg')] bg-cover bg-center w-full`}>
                <TopBar></TopBar>
                <div className="relative flex flex-col items-center text-center px-6">
                    <img
                        className="absolute z-0 left-1/2 top-40 -translate-x-1/2 -translate-y-1/2 h-[300px] w-auto max-w-full"
                        src="/assets/paperBubble.png"
                        alt="Background Bubble"
                    />
                    <h1 className="z-10 text-kat-purple !text-3xl mt-22">Experience</h1>
                    <p className={`${specialElite.className} z-10 !text-[12px]/4 text-kat-black mx-5 max-w-2xl`}>
                        I’m actively seeking opportunities to explore and learn more within the field of CS. Below is a brief overview of experience I’ve had so far in both CS and leadership.
                    </p>
                <div className="h-auto mt-30 space-y-8 mb-20">
                     {experiences.map((exp, index) => (
                         <ExperienceBox key={index} {...exp} />
                        ))}
                </div>
                </div>
                <BottomBar></BottomBar>
            </div>
        </div>
    );
}