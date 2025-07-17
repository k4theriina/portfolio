"use client";

import TopBar from "../../../components/TopBar";
import BottomBar from "../../../components/BottomBar";
import ProjectBox from "../../../components/ProjectBox";

import { Koulen, Special_Elite } from "next/font/google";

import { projects } from "../../../components/Projects";
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

export default function Projects() {

    const router = useRouter();
        const [loaded, setLoaded] = useState(false);
    
        useEffect(() => {
            const timer = setTimeout(() => setLoaded(true), 100); // slight delay
            return () => clearTimeout(timer);
        }, []);

    return (
        <div className="min-h-screen overflow-hidden w-full">
            <div className={`${koulen.className} bg-[url('/assets/bgimageExp.jpg')] bg-cover bg-center w-full`}>
                <TopBar />
                <div className="relative flex flex-col items-center text-center min-h-screen min-w-screen">
                    <div>
                        <img
                            className={`lg:hidden w-screen pointer-events-none transition-all duration-1000 ease-out delay-0 ${
                                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                            src="/assets/paperstrip.png"
                            alt="Projects heading"
                        />

                        <img
                            className={`hidden lg:block w-screen pointer-events-none transition-all duration-1000 ease-out delay-0 ${
                                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                            src="/assets/paperstripLong.png"
                            alt="Projects heading"
                        />

                    </div>
                    <div className="lg:grid lg:grid-cols-3 lg:space-y-10 lg:space-x-15 lg:ml-20 projectSection mb-20 mt-5 flex place-self-center items-center flex-col space-y-10">
                        {projects.map((project, index) => (
                            <ProjectBox key={index}{...project}></ProjectBox>
                        ))}
                    </div>
                </div>
                <BottomBar />
            </div>
        </div>
    );
}