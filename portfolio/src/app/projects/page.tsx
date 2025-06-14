"use client";

import TopBar from "../../../components/TopBar";
import BottomBar from "../../../components/BottomBar";
import ProjectBox from "../../../components/ProjectBox";

import { Koulen, Special_Elite } from "next/font/google";

import { projects } from "../../../components/Projects";

const koulen = Koulen({
  subsets: ['latin'],
  weight: '400',
});
const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: '400',
});

export default function Projects() {
    return (
        <div className="min-h-screen overflow-hidden w-full">
            <div className={`${koulen.className} bg-[url('/assets/bgimageExp.jpg')] bg-cover bg-center w-full`}>
                <TopBar />
                <div className="relative flex flex-col items-center text-center min-h-screen min-w-screen">
                    <div>
                        <img className="lg:hidden min-w-screen pointer-events-none" src="/assets/paperstrip.png" alt="Projects heading" ></img>
                        <img className="hidden lg:block min-w-screen pointer-events-none" src="/assets/paperstripLong.png" alt="Projects heading" ></img>
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