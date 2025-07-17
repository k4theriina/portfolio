"use client";

import TopBar from "../../../components/TopBar";
import BottomBar from "../../../components/BottomBar";
import ExperienceBox from "../../../components/ExperienceBox";

import { Koulen, Special_Elite } from "next/font/google";

import { experiences } from "../../../components/Experience";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const koulen = Koulen({
  subsets: ['latin'],
  weight: '400',
});
const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: '400',
});

export default function Experience() {

    const router = useRouter();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 100); // slight delay
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen overflow-hidden w-full">
            <div className={`${koulen.className} bg-[url('/assets/bgimageExp.jpg')] bg-repeat bg-cover bg-center w-full`}>
                <TopBar />
                <div className="relative flex flex-col items-center text-center px-6 pt-10 pb-32">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[5px] bg-white z-0 pointer-events-none"></div>
                    <div className="place-self-center w-1/4 relative">
                        <img className={`cat1 absolute z-40 h-20 top-45 -left-25 sm:h-30 sm:top-35 sm:-left-40 md:h-40 md:top-50 md:-left-60 lg:h-50 lg:top-70 lg:-left-65 transition-all duration-1000 ease-out delay-200
                    ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} src="/assets/guitarCat.png"></img>
                        <img className={`cat2 absolute z-40 h-20 top-5 left-32 sm:h-30 sm:-top-5 sm:left-35 md:h-40 md:left-60 md:top-5 lg:h-50 lg:left-85 transition-all duration-1000 ease-out
                    ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} src="/assets/catstanding.png"></img>
                    </div>
                    <img
                        className="absolute pointer-events-none z-10 left-1/2 top-40 -translate-x-1/2 -translate-y-1/2 h-[300px] md:h-[400px] lg:h-[500px] md:top-60 lg:top-75 w-auto max-w-full"
                        src="/assets/paperBubble.png"
                        alt="Background Bubble"
                    />
                    <div>
                        
                    </div>
                    <h1 className={`z-80 text-kat-purple !text-3xl mt-13 md:!text-6xl md:mt-25 lg:!text-7xl lg:mt-37 transition-all duration-1000 ease-out delay-200
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Experience</h1>
                    <p className={`${specialElite.className} expDesc z-10 !text-[12px]/4 text-kat-black mx-8 max-w-2xl sm:mx-40 md:mx-150 max-w-[300px] md:!text-[17px]/5 md:max-w-[400px] md:mt-2 lg:!text-[18px]/6 lg:max-w-[500px]
                    transition-all duration-1000 ease-out delay-400
                    ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        I’m actively seeking opportunities to explore and learn more within the field of Computer Science. Below is a brief overview of experience I’ve had in both CS and leadership.
                    </p>
                    <div className="h-auto mt-30 space-y-8 md:space-y-20 mb-20 z-10 lg:mt-60">
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